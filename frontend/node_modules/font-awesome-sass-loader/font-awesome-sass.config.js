module.exports = {
  // Default for the style loading
  //styleLoader: "style-loader!css-loader!sass-loader",

  // If you want to use the ExtractTextPlugin
  //styleLoader: require('extract-text-webpack-plugin').extract('style-loader', 'css-loader!sass-loader'),

  // Use fontAwesomeCustomizations to utilize other sass variables defined in
  // _variables.scss file. This is useful to set one customization value based
  // on another value.
  //fontAwesomeCustomizations: "./_font-awesome.config.scss",

  styles: {
    "mixins": true,

    "bordered-pulled": true,
    "core": true,
    "fixed-width": true,
    "icons": true,
    "larger": true,
    "list": true,
    "path": true,
    "rotated-flipped": true,
    "animated": true,
    "stacked": true
  }
};
