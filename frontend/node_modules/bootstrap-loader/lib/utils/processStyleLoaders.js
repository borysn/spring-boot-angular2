'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (loaders) {
  if (!Array.isArray(loaders)) {
    throw new Error('\n      Specify your loaders as an array.\n      Default is [\'style\', \'css\', \'sass\']\n    ');
  }

  // We need to match user loaders in different formats:
  // 'sass', 'sass-loader', 'sass?someParam' etc.
  var getLoaderRegExp = function getLoaderRegExp(module) {
    return new RegExp('^' + (0, _escapeRegexp2.default)(module) + '(?:-loader)?(?:\\?.*)?$');
  };
  var sassLoaderRegExp = getLoaderRegExp('sass');
  var resolveUrlLoaderRegExp = getLoaderRegExp('resolve-url');

  var sassLoader = loaders.find(function (loader) {
    return sassLoaderRegExp.test(loader);
  });
  var resolveUrlLoader = loaders.find(function (loader) {
    return resolveUrlLoaderRegExp.test(loader);
  });

  if (!sassLoader) {
    throw new Error('\n      I can\'t find \'sass-loader\'.\n      Add it to array of loaders in .bootstraprc.\n    ');
  }

  var sassLoaderQuery = sassLoader.split('?')[1];

  // We need to check if user's loader already contains sourceMap param
  // And if it's not there - inject it
  var sassLoaderWithSourceMap = void 0;
  if (sassLoaderQuery) {
    sassLoaderWithSourceMap = sassLoaderQuery.includes('sourceMap') ? sassLoader : sassLoader + '&sourceMap';
  } else {
    sassLoaderWithSourceMap = sassLoader + '?sourceMap';
  }

  var sassLoaderIndex = loaders.indexOf(sassLoader);

  loaders[sassLoaderIndex] = sassLoaderWithSourceMap;

  if (!resolveUrlLoader) {
    loaders.splice(sassLoaderIndex, 0, 'resolve-url');
  }

  return loaders;
};

var _escapeRegexp = require('escape-regexp');

var _escapeRegexp2 = _interopRequireDefault(_escapeRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }