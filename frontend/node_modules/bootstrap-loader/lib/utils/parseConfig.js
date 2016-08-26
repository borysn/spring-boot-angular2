'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (configPath) {
  var configContent = (0, _stripJsonComments2.default)(_fs2.default.readFileSync(configPath, 'utf8'));
  return _jsYaml2.default.safeLoad(configContent);
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _stripJsonComments = require('strip-json-comments');

var _stripJsonComments2 = _interopRequireDefault(_stripJsonComments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }