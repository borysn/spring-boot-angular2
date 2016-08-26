'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Resolves default config for default Bootstrap version
 *
 * @param {string} configFile
 * @param {number} bootstrapPathotstrapVersion
 * @returns {string}
 */
exports.default = function (configFile, bootstrapVersion) {
  return _path2.default.resolve(__dirname, '../../' + configFile + '-' + bootstrapVersion + '-default');
};