/* karma.conf.js */
const path = require('path');
const testWebpackConfig = require('./webpack.test.js');

module.exports = function(config) {
  var configuration = {
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [ ],
    client: { captureConsole: false },
    files: [{pattern: './spec-bundle.js', watched: false}],
    preprocessors: { 
      './spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] 
    },

    webpack: testWebpackConfig,

    coverageReporter: {
      type: 'in-memory'
    },

    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },

    webpackServer: { noInfo: true },

    reporters: ['mocha', 'coverage', 'remap-coverage'],

    colors: true,

    logLevel: config.LOG_WARN,

    autoWatch: false,

    browsers: [
      'Chrome'
    ],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    singleRun: true
  };

  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
