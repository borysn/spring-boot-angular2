module.exports = function () {};
module.exports.pitch = function (remainingRequest) {
  var configFilePath = this.resourcePath || remainingRequest;
  this.cacheable(true);

  if (!configFilePath || configFilePath.trim() === '') {
    var msg = 'You specified the font-awesome-sass-loader with no configuration file. Please specify' +
      ' the configuration file, like: \'font-awesome-sass!./font-awesome-sass.config.js\' or use' +
      ' require(\'font-awesome-sass-loader\').';
    console.error('ERROR: ' + msg);
    throw new Error(msg);
  }

  var config = require(configFilePath);
  var styleLoader = config.styleLoader || 'style-loader!css-loader!sass-loader';

  return 'require(' + JSON.stringify('-!' + styleLoader + '!' +
    require.resolve('./font-awesome-sass-styles.loader.js') + '!' + configFilePath) + ');';
};
