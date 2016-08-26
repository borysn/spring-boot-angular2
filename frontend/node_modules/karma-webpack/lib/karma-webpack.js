'use strict';

var _ = require('lodash');
var path = require('path');
var async = require('async');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var SingleEntryDependency = require('webpack/lib/dependencies/SingleEntryDependency');

var blocked = [];
var isBlocked = false;

function Plugin(
/* config.webpack */webpackOptions,
/* config.webpackServer */webpackServerOptions,
/* config.webpackMiddleware */webpackMiddlewareOptions,
/* config.basePath */basePath,
/* config.files */files,
/* config.frameworks */frameworks, customFileHandlers, emitter) {
  webpackOptions = _.clone(webpackOptions) || {};
  webpackMiddlewareOptions = _.clone(webpackMiddlewareOptions || webpackServerOptions) || {};

  var applyOptions = Array.isArray(webpackOptions) ? webpackOptions : [webpackOptions];
  var includeIndex = applyOptions.length > 1;

  applyOptions.forEach(function (webpackOptions, index) {
    // The webpack tier owns the watch behavior so we want to force it in the config
    webpackOptions.watch = true;

    // Webpack 2.1.0-beta.7+ will throw in error if both entry and plugins are not specified in options
    // https://github.com/webpack/webpack/commit/b3bc5427969e15fd3663d9a1c57dbd1eb2c94805
    if (!webpackOptions.entry) {
      webpackOptions.entry = {};
    };

    if (!webpackOptions.output) {
      webpackOptions.output = {};
    };

    // When using an array, even of length 1, we want to include the index value for the build.
    // This is due to the way that the dev server exposes commonPath for build output.
    var indexPath = includeIndex ? index + '/' : '';
    var publicPath = indexPath !== '' ? indexPath + '/' : '';

    // Must have the common _karma_webpack_ prefix on path here to avoid
    // https://github.com/webpack/webpack/issues/645
    webpackOptions.output.path = '/_karma_webpack_/' + indexPath;
    webpackOptions.output.publicPath = '/_karma_webpack_/' + publicPath;
    webpackOptions.output.filename = '[name]';
    if (includeIndex) {
      webpackOptions.output.jsonpFunction = 'webpackJsonp' + index;
    }
    webpackOptions.output.chunkFilename = '[id].bundle.js';
  });

  this.emitter = emitter;
  this.wrapMocha = frameworks.indexOf('mocha') >= 0 && includeIndex;
  this.optionsCount = applyOptions.length;
  this.files = [];
  this.basePath = basePath;
  this.waiting = [];

  var compiler = webpack(webpackOptions);
  var applyPlugins = compiler.compilers || [compiler];

  applyPlugins.forEach(function (compiler) {
    compiler.plugin('this-compilation', function (compilation, params) {
      compilation.dependencyFactories.set(SingleEntryDependency, params.normalModuleFactory);
    });
    compiler.plugin('make', this.make.bind(this));
  }, this);

  ['invalid', 'watch-run', 'run'].forEach(function (name) {
    compiler.plugin(name, function (_, callback) {
      isBlocked = true;

      if (typeof callback === 'function') {
        callback();
      }
    });
  });

  compiler.plugin('done', function (stats) {
    var applyStats = Array.isArray(stats.stats) ? stats.stats : [stats];
    var assets = [];
    var noAssets = false;

    applyStats.forEach(function (stats) {
      stats = stats.toJson();

      assets.push.apply(assets, stats.assets);
      if (stats.assets.length === 0) {
        noAssets = true;
      }
    });

    if (!this.waiting || this.waiting.length === 0) {
      this.notifyKarmaAboutChanges();
    }

    if (this.waiting && !noAssets) {
      var w = this.waiting;

      this.waiting = null;
      w.forEach(function (cb) {
        cb();
      });
    }

    isBlocked = false;
    for (var i = 0; i < blocked.length; i++) {
      blocked[i]();
    }
    blocked = [];
  }.bind(this));
  compiler.plugin('invalid', function () {
    if (!this.waiting) {
      this.waiting = [];
    }
  }.bind(this));

  webpackMiddlewareOptions.publicPath = '/_karma_webpack_/';
  var middleware = this.middleware = new webpackDevMiddleware(compiler, webpackMiddlewareOptions);

  customFileHandlers.push({
    urlRegex: /^\/_karma_webpack_\/.*/,
    handler: function handler(req, res) {
      middleware(req, res, function () {
        res.statusCode = 404;
        res.end('Not found');
      });
    }
  });

  emitter.on('exit', function (done) {
    middleware.close();
    done();
  });
}

Plugin.prototype.notifyKarmaAboutChanges = function () {
  // Force a rebuild
  this.emitter.refreshFiles();
};

Plugin.prototype.addFile = function (entry) {
  if (this.files.indexOf(entry) >= 0) {
    return;
  }
  this.files.push(entry);

  return true;
};

Plugin.prototype.make = function (compilation, callback) {
  async.forEach(this.files.slice(), function (file, callback) {
    var entry = file;

    if (this.wrapMocha) {
      entry = require.resolve('./mocha-env-loader') + '!' + entry;
    }

    var dep = new SingleEntryDependency(entry);

    compilation.addEntry('', dep, path.relative(this.basePath, file).replace(/\\/g, '/'), function () {
      // If the module fails because of an File not found error, remove the test file
      if (dep.module && dep.module.error && dep.module.error.error && dep.module.error.error.code === 'ENOENT') {
        this.files = this.files.filter(function (f) {
          return file !== f;
        });
        this.middleware.invalidate();
      }
      callback();
    }.bind(this));
  }.bind(this), callback);
};

Plugin.prototype.readFile = function (file, callback) {
  var middleware = this.middleware;
  var optionsCount = this.optionsCount;

  function doRead() {
    if (optionsCount > 1) {
      async.times(optionsCount, function (idx, callback) {
        middleware.fileSystem.readFile('/_karma_webpack_/' + idx + '/' + file.replace(/\\/g, '/'), callback);
      }, function (err, contents) {
        if (err) {
          return callback(err);
        };
        contents = contents.reduce(function (arr, x) {
          if (!arr) {
            return [x];
          };
          arr.push(new Buffer('\n'), x);

          return arr;
        }, null);
        callback(null, Buffer.concat(contents));
      });
    } else {
      middleware.fileSystem.readFile('/_karma_webpack_/' + file.replace(/\\/g, '/'), callback);
    }
  }
  if (!this.waiting) {
    doRead();
  } else {
    // Retry to read once a build is finished
    // do it on process.nextTick to catch changes while building
    this.waiting.push(process.nextTick.bind(process, this.readFile.bind(this, file, callback)));
  }
};

function createPreprocesor( /* config.basePath */basePath, webpackPlugin) {
  return function (content, file, done) {
    if (webpackPlugin.addFile(file.path)) {
      // recompile as we have an asset that we have not seen before
      webpackPlugin.middleware.invalidate();
    }

    // read blocks until bundle is done
    webpackPlugin.readFile(path.relative(basePath, file.path), function (err, content) {
      if (err) {
        throw err;
      }

      done(err, content && content.toString());
    });
  };
}

function createWebpackBlocker() {
  return function (request, response, next) {
    if (isBlocked) {
      blocked.push(next);
    } else {
      next();
    }
  };
}

module.exports = {
  webpackPlugin: ['type', Plugin],
  'preprocessor:webpack': ['factory', createPreprocesor],
  'middleware:webpackBlocker': ['factory', createWebpackBlocker]
};
//# sourceMappingURL=data:application/json;base64,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LENBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLFFBQS9CLENBQS9CLENBQWxCO0FBQ0Q7QUFDRixDQWpDRDs7QUFtQ0EsU0FBUyxpQkFBVCxFQUEyQixxQkFBc0IsUUFBakQsRUFBMkQsYUFBM0QsRUFBMEU7QUFDeEUsU0FBTyxVQUFTLE9BQVQsRUFBa0IsSUFBbEIsRUFBd0IsSUFBeEIsRUFBOEI7QUFDbkMsUUFBSSxjQUFjLE9BQWQsQ0FBc0IsS0FBSyxJQUEzQixDQUFKLEVBQXNDO0FBQ3BDO0FBQ0Esb0JBQWMsVUFBZCxDQUF5QixVQUF6QjtBQUNEOztBQUVEO0FBQ0Esa0JBQWMsUUFBZCxDQUF1QixLQUFLLFFBQUwsQ0FBYyxRQUFkLEVBQXdCLEtBQUssSUFBN0IsQ0FBdkIsRUFBMkQsVUFBUyxHQUFULEVBQWMsT0FBZCxFQUF1QjtBQUNoRixVQUFJLEdBQUosRUFBUztBQUNQLGNBQU0sR0FBTjtBQUNEOztBQUVELFdBQUssR0FBTCxFQUFVLFdBQVcsUUFBUSxRQUFSLEVBQXJCO0FBQ0QsS0FORDtBQU9ELEdBZEQ7QUFlRDs7QUFFRCxTQUFTLG9CQUFULEdBQWdDO0FBQzlCLFNBQU8sVUFBUyxPQUFULEVBQWtCLFFBQWxCLEVBQTRCLElBQTVCLEVBQWtDO0FBQ3ZDLFFBQUksU0FBSixFQUFlO0FBQ2IsY0FBUSxJQUFSLENBQWEsSUFBYjtBQUNELEtBRkQsTUFFTztBQUNMO0FBQ0Q7QUFDRixHQU5EO0FBT0Q7O0FBRUQsT0FBTyxPQUFQLEdBQWlCO0FBQ2YsaUJBQWUsQ0FBQyxNQUFELEVBQVMsTUFBVCxDQURBO0FBRWYsMEJBQXdCLENBQUMsU0FBRCxFQUFZLGlCQUFaLENBRlQ7QUFHZiwrQkFBNkIsQ0FBQyxTQUFELEVBQVksb0JBQVo7QUFIZCxDQUFqQiIsImZpbGUiOiJrYXJtYS13ZWJwYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF8gPSByZXF1aXJlKCdsb2Rhc2gnKVxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbnZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJylcbnZhciB3ZWJwYWNrRGV2TWlkZGxld2FyZSA9IHJlcXVpcmUoJ3dlYnBhY2stZGV2LW1pZGRsZXdhcmUnKVxudmFyIHdlYnBhY2sgPSByZXF1aXJlKCd3ZWJwYWNrJylcbnZhciBTaW5nbGVFbnRyeURlcGVuZGVuY3kgPSByZXF1aXJlKCd3ZWJwYWNrL2xpYi9kZXBlbmRlbmNpZXMvU2luZ2xlRW50cnlEZXBlbmRlbmN5JylcblxudmFyIGJsb2NrZWQgPSBbXVxudmFyIGlzQmxvY2tlZCA9IGZhbHNlXG5cbmZ1bmN0aW9uIFBsdWdpbihcblx0LyogY29uZmlnLndlYnBhY2sgKi8gd2VicGFja09wdGlvbnMsXG5cdC8qIGNvbmZpZy53ZWJwYWNrU2VydmVyICovIHdlYnBhY2tTZXJ2ZXJPcHRpb25zLFxuXHQvKiBjb25maWcud2VicGFja01pZGRsZXdhcmUgKi8gd2VicGFja01pZGRsZXdhcmVPcHRpb25zLFxuXHQvKiBjb25maWcuYmFzZVBhdGggKi8gYmFzZVBhdGgsXG5cdC8qIGNvbmZpZy5maWxlcyAqLyBmaWxlcyxcblx0LyogY29uZmlnLmZyYW1ld29ya3MgKi8gZnJhbWV3b3Jrcyxcblx0Y3VzdG9tRmlsZUhhbmRsZXJzLFxuXHRlbWl0dGVyKSB7XG4gIHdlYnBhY2tPcHRpb25zID0gXy5jbG9uZSh3ZWJwYWNrT3B0aW9ucykgfHwge31cbiAgd2VicGFja01pZGRsZXdhcmVPcHRpb25zID0gXy5jbG9uZSh3ZWJwYWNrTWlkZGxld2FyZU9wdGlvbnMgfHwgd2VicGFja1NlcnZlck9wdGlvbnMpIHx8IHt9XG5cbiAgdmFyIGFwcGx5T3B0aW9ucyA9IEFycmF5LmlzQXJyYXkod2VicGFja09wdGlvbnMpID8gd2VicGFja09wdGlvbnMgOiBbd2VicGFja09wdGlvbnNdXG4gIHZhciBpbmNsdWRlSW5kZXggPSBhcHBseU9wdGlvbnMubGVuZ3RoID4gMVxuXG4gIGFwcGx5T3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHdlYnBhY2tPcHRpb25zLCBpbmRleCkge1xuICAgIC8vIFRoZSB3ZWJwYWNrIHRpZXIgb3ducyB0aGUgd2F0Y2ggYmVoYXZpb3Igc28gd2Ugd2FudCB0byBmb3JjZSBpdCBpbiB0aGUgY29uZmlnXG4gICAgd2VicGFja09wdGlvbnMud2F0Y2ggPSB0cnVlXG5cbiAgICAvLyBXZWJwYWNrIDIuMS4wLWJldGEuNysgd2lsbCB0aHJvdyBpbiBlcnJvciBpZiBib3RoIGVudHJ5IGFuZCBwbHVnaW5zIGFyZSBub3Qgc3BlY2lmaWVkIGluIG9wdGlvbnNcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrL2NvbW1pdC9iM2JjNTQyNzk2OWUxNWZkMzY2M2Q5YTFjNTdkYmQxZWIyYzk0ODA1XG4gICAgaWYgKCF3ZWJwYWNrT3B0aW9ucy5lbnRyeSkge1xuICAgICAgd2VicGFja09wdGlvbnMuZW50cnkgPSB7fVxuICAgIH07XG5cbiAgICBpZiAoIXdlYnBhY2tPcHRpb25zLm91dHB1dCkge1xuICAgICAgd2VicGFja09wdGlvbnMub3V0cHV0ID0ge31cbiAgICB9O1xuXG4gICAgLy8gV2hlbiB1c2luZyBhbiBhcnJheSwgZXZlbiBvZiBsZW5ndGggMSwgd2Ugd2FudCB0byBpbmNsdWRlIHRoZSBpbmRleCB2YWx1ZSBmb3IgdGhlIGJ1aWxkLlxuICAgIC8vIFRoaXMgaXMgZHVlIHRvIHRoZSB3YXkgdGhhdCB0aGUgZGV2IHNlcnZlciBleHBvc2VzIGNvbW1vblBhdGggZm9yIGJ1aWxkIG91dHB1dC5cbiAgICB2YXIgaW5kZXhQYXRoID0gaW5jbHVkZUluZGV4ID8gaW5kZXggKyAnLycgOiAnJ1xuICAgIHZhciBwdWJsaWNQYXRoID0gaW5kZXhQYXRoICE9PSAnJyA/IGluZGV4UGF0aCArICcvJyA6ICcnXG5cbiAgICAvLyBNdXN0IGhhdmUgdGhlIGNvbW1vbiBfa2FybWFfd2VicGFja18gcHJlZml4IG9uIHBhdGggaGVyZSB0byBhdm9pZFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrL3dlYnBhY2svaXNzdWVzLzY0NVxuICAgIHdlYnBhY2tPcHRpb25zLm91dHB1dC5wYXRoID0gJy9fa2FybWFfd2VicGFja18vJyArIGluZGV4UGF0aFxuICAgIHdlYnBhY2tPcHRpb25zLm91dHB1dC5wdWJsaWNQYXRoID0gJy9fa2FybWFfd2VicGFja18vJyArIHB1YmxpY1BhdGhcbiAgICB3ZWJwYWNrT3B0aW9ucy5vdXRwdXQuZmlsZW5hbWUgPSAnW25hbWVdJ1xuICAgIGlmIChpbmNsdWRlSW5kZXgpIHtcbiAgICAgIHdlYnBhY2tPcHRpb25zLm91dHB1dC5qc29ucEZ1bmN0aW9uID0gJ3dlYnBhY2tKc29ucCcgKyBpbmRleFxuICAgIH1cbiAgICB3ZWJwYWNrT3B0aW9ucy5vdXRwdXQuY2h1bmtGaWxlbmFtZSA9ICdbaWRdLmJ1bmRsZS5qcydcbiAgfSlcblxuICB0aGlzLmVtaXR0ZXIgPSBlbWl0dGVyXG4gIHRoaXMud3JhcE1vY2hhID0gZnJhbWV3b3Jrcy5pbmRleE9mKCdtb2NoYScpID49IDAgJiYgaW5jbHVkZUluZGV4XG4gIHRoaXMub3B0aW9uc0NvdW50ID0gYXBwbHlPcHRpb25zLmxlbmd0aFxuICB0aGlzLmZpbGVzID0gW11cbiAgdGhpcy5iYXNlUGF0aCA9IGJhc2VQYXRoXG4gIHRoaXMud2FpdGluZyA9IFtdXG5cbiAgdmFyIGNvbXBpbGVyID0gd2VicGFjayh3ZWJwYWNrT3B0aW9ucylcbiAgdmFyIGFwcGx5UGx1Z2lucyA9IGNvbXBpbGVyLmNvbXBpbGVycyB8fCBbY29tcGlsZXJdXG5cbiAgYXBwbHlQbHVnaW5zLmZvckVhY2goZnVuY3Rpb24oY29tcGlsZXIpIHtcbiAgICBjb21waWxlci5wbHVnaW4oJ3RoaXMtY29tcGlsYXRpb24nLCBmdW5jdGlvbihjb21waWxhdGlvbiwgcGFyYW1zKSB7XG4gICAgICBjb21waWxhdGlvbi5kZXBlbmRlbmN5RmFjdG9yaWVzLnNldChTaW5nbGVFbnRyeURlcGVuZGVuY3ksIHBhcmFtcy5ub3JtYWxNb2R1bGVGYWN0b3J5KVxuICAgIH0pXG4gICAgY29tcGlsZXIucGx1Z2luKCdtYWtlJywgdGhpcy5tYWtlLmJpbmQodGhpcykpXG4gIH0sIHRoaXMpO1xuXG4gIFsnaW52YWxpZCcsICd3YXRjaC1ydW4nLCAncnVuJ10uZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgY29tcGlsZXIucGx1Z2luKG5hbWUsIGZ1bmN0aW9uKF8sIGNhbGxiYWNrKSB7XG4gICAgICBpc0Jsb2NrZWQgPSB0cnVlXG5cbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgY29tcGlsZXIucGx1Z2luKCdkb25lJywgZnVuY3Rpb24oc3RhdHMpIHtcbiAgICB2YXIgYXBwbHlTdGF0cyA9IEFycmF5LmlzQXJyYXkoc3RhdHMuc3RhdHMpID8gc3RhdHMuc3RhdHMgOiBbc3RhdHNdXG4gICAgdmFyIGFzc2V0cyA9IFtdXG4gICAgdmFyIG5vQXNzZXRzID0gZmFsc2VcblxuICAgIGFwcGx5U3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0cykge1xuICAgICAgc3RhdHMgPSBzdGF0cy50b0pzb24oKVxuXG4gICAgICBhc3NldHMucHVzaC5hcHBseShhc3NldHMsIHN0YXRzLmFzc2V0cylcbiAgICAgIGlmIChzdGF0cy5hc3NldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG5vQXNzZXRzID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoIXRoaXMud2FpdGluZyB8fCB0aGlzLndhaXRpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLm5vdGlmeUthcm1hQWJvdXRDaGFuZ2VzKClcbiAgICB9XG5cbiAgICBpZiAodGhpcy53YWl0aW5nICYmICFub0Fzc2V0cykge1xuICAgICAgdmFyIHcgPSB0aGlzLndhaXRpbmdcblxuICAgICAgdGhpcy53YWl0aW5nID0gbnVsbFxuICAgICAgdy5mb3JFYWNoKGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIGNiKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaXNCbG9ja2VkID0gZmFsc2VcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJsb2NrZWRbaV0oKVxuICAgIH1cbiAgICBibG9ja2VkID0gW11cbiAgfS5iaW5kKHRoaXMpKVxuICBjb21waWxlci5wbHVnaW4oJ2ludmFsaWQnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMud2FpdGluZykge1xuICAgICAgdGhpcy53YWl0aW5nID0gW11cbiAgICB9XG4gIH0uYmluZCh0aGlzKSlcblxuICB3ZWJwYWNrTWlkZGxld2FyZU9wdGlvbnMucHVibGljUGF0aCA9ICcvX2thcm1hX3dlYnBhY2tfLydcbiAgdmFyIG1pZGRsZXdhcmUgPSB0aGlzLm1pZGRsZXdhcmUgPSBuZXcgd2VicGFja0Rldk1pZGRsZXdhcmUoY29tcGlsZXIsIHdlYnBhY2tNaWRkbGV3YXJlT3B0aW9ucylcblxuICBjdXN0b21GaWxlSGFuZGxlcnMucHVzaCh7XG4gICAgdXJsUmVnZXg6IC9eXFwvX2thcm1hX3dlYnBhY2tfXFwvLiovLFxuICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gICAgICBtaWRkbGV3YXJlKHJlcSwgcmVzLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDRcbiAgICAgICAgcmVzLmVuZCgnTm90IGZvdW5kJylcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuXG4gIGVtaXR0ZXIub24oJ2V4aXQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgbWlkZGxld2FyZS5jbG9zZSgpXG4gICAgZG9uZSgpXG4gIH0pXG59XG5cblBsdWdpbi5wcm90b3R5cGUubm90aWZ5S2FybWFBYm91dENoYW5nZXMgPSBmdW5jdGlvbigpIHtcbiAgLy8gRm9yY2UgYSByZWJ1aWxkXG4gIHRoaXMuZW1pdHRlci5yZWZyZXNoRmlsZXMoKVxufVxuXG5QbHVnaW4ucHJvdG90eXBlLmFkZEZpbGUgPSBmdW5jdGlvbihlbnRyeSkge1xuICBpZiAodGhpcy5maWxlcy5pbmRleE9mKGVudHJ5KSA+PSAwKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5maWxlcy5wdXNoKGVudHJ5KVxuXG4gIHJldHVybiB0cnVlXG59XG5cblBsdWdpbi5wcm90b3R5cGUubWFrZSA9IGZ1bmN0aW9uKGNvbXBpbGF0aW9uLCBjYWxsYmFjaykge1xuICBhc3luYy5mb3JFYWNoKHRoaXMuZmlsZXMuc2xpY2UoKSwgZnVuY3Rpb24oZmlsZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgZW50cnkgPSBmaWxlXG5cbiAgICBpZiAodGhpcy53cmFwTW9jaGEpIHtcbiAgICAgIGVudHJ5ID0gcmVxdWlyZS5yZXNvbHZlKCcuL21vY2hhLWVudi1sb2FkZXInKSArICchJyArIGVudHJ5XG4gICAgfVxuXG4gICAgdmFyIGRlcCA9IG5ldyBTaW5nbGVFbnRyeURlcGVuZGVuY3koZW50cnkpXG5cbiAgICBjb21waWxhdGlvbi5hZGRFbnRyeSgnJywgZGVwLCBwYXRoLnJlbGF0aXZlKHRoaXMuYmFzZVBhdGgsIGZpbGUpLnJlcGxhY2UoL1xcXFwvZywgJy8nKSwgZnVuY3Rpb24oKSB7XG4gICAgICAvLyBJZiB0aGUgbW9kdWxlIGZhaWxzIGJlY2F1c2Ugb2YgYW4gRmlsZSBub3QgZm91bmQgZXJyb3IsIHJlbW92ZSB0aGUgdGVzdCBmaWxlXG4gICAgICBpZiAoZGVwLm1vZHVsZSAmJiBkZXAubW9kdWxlLmVycm9yICYmXG4gICAgICAgIGRlcC5tb2R1bGUuZXJyb3IuZXJyb3IgJiZcbiAgICAgICAgZGVwLm1vZHVsZS5lcnJvci5lcnJvci5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgICB0aGlzLmZpbGVzID0gdGhpcy5maWxlcy5maWx0ZXIoZnVuY3Rpb24oZikge1xuICAgICAgICAgIHJldHVybiBmaWxlICE9PSBmXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubWlkZGxld2FyZS5pbnZhbGlkYXRlKClcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKClcbiAgICB9LmJpbmQodGhpcykpXG4gIH0uYmluZCh0aGlzKSwgY2FsbGJhY2spXG59XG5cblBsdWdpbi5wcm90b3R5cGUucmVhZEZpbGUgPSBmdW5jdGlvbihmaWxlLCBjYWxsYmFjaykge1xuICB2YXIgbWlkZGxld2FyZSA9IHRoaXMubWlkZGxld2FyZVxuICB2YXIgb3B0aW9uc0NvdW50ID0gdGhpcy5vcHRpb25zQ291bnRcblxuICBmdW5jdGlvbiBkb1JlYWQoKSB7XG4gICAgaWYgKG9wdGlvbnNDb3VudCA+IDEpIHtcbiAgICAgIGFzeW5jLnRpbWVzKG9wdGlvbnNDb3VudCwgZnVuY3Rpb24oaWR4LCBjYWxsYmFjaykge1xuICAgICAgICBtaWRkbGV3YXJlLmZpbGVTeXN0ZW0ucmVhZEZpbGUoJy9fa2FybWFfd2VicGFja18vJyArIGlkeCArICcvJyArIGZpbGUucmVwbGFjZSgvXFxcXC9nLCAnLycpLCBjYWxsYmFjaylcbiAgICAgIH0sIGZ1bmN0aW9uKGVyciwgY29udGVudHMpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgIH07XG4gICAgICAgIGNvbnRlbnRzID0gY29udGVudHMucmVkdWNlKGZ1bmN0aW9uKGFyciwgeCkge1xuICAgICAgICAgIGlmICghYXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gW3hdXG4gICAgICAgICAgfTtcbiAgICAgICAgICBhcnIucHVzaChuZXcgQnVmZmVyKCdcXG4nKSwgeClcblxuICAgICAgICAgIHJldHVybiBhcnJcbiAgICAgICAgfSwgbnVsbClcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgQnVmZmVyLmNvbmNhdChjb250ZW50cykpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBtaWRkbGV3YXJlLmZpbGVTeXN0ZW0ucmVhZEZpbGUoJy9fa2FybWFfd2VicGFja18vJyArIGZpbGUucmVwbGFjZSgvXFxcXC9nLCAnLycpLCBjYWxsYmFjaylcbiAgICB9XG4gIH1cbiAgaWYgKCF0aGlzLndhaXRpbmcpIHtcbiAgICBkb1JlYWQoKVxuICB9IGVsc2Uge1xuICAgIC8vIFJldHJ5IHRvIHJlYWQgb25jZSBhIGJ1aWxkIGlzIGZpbmlzaGVkXG4gICAgLy8gZG8gaXQgb24gcHJvY2Vzcy5uZXh0VGljayB0byBjYXRjaCBjaGFuZ2VzIHdoaWxlIGJ1aWxkaW5nXG4gICAgdGhpcy53YWl0aW5nLnB1c2gocHJvY2Vzcy5uZXh0VGljay5iaW5kKHByb2Nlc3MsIHRoaXMucmVhZEZpbGUuYmluZCh0aGlzLCBmaWxlLCBjYWxsYmFjaykpKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByZXByb2Nlc29yKC8qIGNvbmZpZy5iYXNlUGF0aCAqLyBiYXNlUGF0aCwgd2VicGFja1BsdWdpbikge1xuICByZXR1cm4gZnVuY3Rpb24oY29udGVudCwgZmlsZSwgZG9uZSkge1xuICAgIGlmICh3ZWJwYWNrUGx1Z2luLmFkZEZpbGUoZmlsZS5wYXRoKSkge1xuICAgICAgLy8gcmVjb21waWxlIGFzIHdlIGhhdmUgYW4gYXNzZXQgdGhhdCB3ZSBoYXZlIG5vdCBzZWVuIGJlZm9yZVxuICAgICAgd2VicGFja1BsdWdpbi5taWRkbGV3YXJlLmludmFsaWRhdGUoKVxuICAgIH1cblxuICAgIC8vIHJlYWQgYmxvY2tzIHVudGlsIGJ1bmRsZSBpcyBkb25lXG4gICAgd2VicGFja1BsdWdpbi5yZWFkRmlsZShwYXRoLnJlbGF0aXZlKGJhc2VQYXRoLCBmaWxlLnBhdGgpLCBmdW5jdGlvbihlcnIsIGNvbnRlbnQpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9XG5cbiAgICAgIGRvbmUoZXJyLCBjb250ZW50ICYmIGNvbnRlbnQudG9TdHJpbmcoKSlcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVdlYnBhY2tCbG9ja2VyKCkge1xuICByZXR1cm4gZnVuY3Rpb24ocmVxdWVzdCwgcmVzcG9uc2UsIG5leHQpIHtcbiAgICBpZiAoaXNCbG9ja2VkKSB7XG4gICAgICBibG9ja2VkLnB1c2gobmV4dClcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dCgpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB3ZWJwYWNrUGx1Z2luOiBbJ3R5cGUnLCBQbHVnaW5dLFxuICAncHJlcHJvY2Vzc29yOndlYnBhY2snOiBbJ2ZhY3RvcnknLCBjcmVhdGVQcmVwcm9jZXNvcl0sXG4gICdtaWRkbGV3YXJlOndlYnBhY2tCbG9ja2VyJzogWydmYWN0b3J5JywgY3JlYXRlV2VicGFja0Jsb2NrZXJdXG59XG4iXX0=