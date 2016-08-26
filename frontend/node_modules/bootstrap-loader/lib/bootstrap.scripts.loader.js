'use strict';

var _processModules = require('./utils/processModules');

var _processModules2 = _interopRequireDefault(_processModules);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bootstrap JS scripts loader
 *
 * @returns {string}
 */
/* eslint func-names: 0 */

module.exports = function () {
  if (this.cacheable) this.cacheable();

  var config = global.__BOOTSTRAP_CONFIG__;
  var scripts = config.scripts;
  var bootstrapVersion = config.bootstrapVersion;
  var bootstrapRelPath = config.bootstrapRelPath;


  var processedScripts = (0, _processModules2.default)(scripts, bootstrapVersion, bootstrapRelPath, true);

  var scriptsOutput = processedScripts.map(function (script) {
    return script + '\n';
  }).join('');

  _logger2.default.debug('Scripts output:', '\n', scriptsOutput);

  return scriptsOutput;
};