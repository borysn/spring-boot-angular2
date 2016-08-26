var styles = [
  'mixins',

  'bordered-pulled',
  'core',
  'fixed-width',
  'icons',
  'larger',
  'list',
  'path',
  'rotated-flipped',
  'animated',
  'stacked'
];

module.exports = function (content) {
  this.cacheable(true);

  var config = this.exec(content, this.resourcePath);
  var start =
      "@import        \"~font-awesome/scss/variables\";\n"
    + "$fa-font-path: \"~font-awesome/fonts/\";\n";

  if (config.fontAwesomeCustomizations) {
    start += "@import \"" + config.fontAwesomeCustomizations + "\";\n";
  }

  source = start + styles.filter(function (style) {
    return config.styles[style];
  }).map(function (style) {
    return "@import \"~font-awesome/scss/" + style + "\";";
  }).join("\n");

  return source;
}
