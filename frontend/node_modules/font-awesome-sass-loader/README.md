font-awesome-sass-loader
========================

Font Awesome configuration and loading package for webpack, using font-awesome (Sass).

Based on [font-awesome-webpack](https://github.com/gowravshekar/font-awesome-webpack) by [Gowrav Shekar](https://github.com/gowravshekar) ([@gowravshekar](https://www.npmjs.com/~gowravshekar)) and [bootstrap-sass-loader](https://github.com/shakacode/bootstrap-sass-loader/) by [Shaka Code](https://github.com/shakacode) ([@justin808](https://www.npmjs.com/~justin808).

Usage
-----

To properly load font-awesome fonts, you need to configure loaders in your `webpack.config.js`. Example:

``` javascript
module.exports = {
  module: {
    loaders: [
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  }
};
```

Font Awesome font urls are of the format `[dot][extension]?=[version-number]`, for example `.woff?v=4.4.0`

The Regex for font types are adjusted to support these formats. Regex also support urls ending with .woff, .ttf, .eot and .svg (used by Bootstrap).

### Complete Font-Awesome

To use the complete font-awesome package including all styles with the default settings:

``` javascript
require("font-awesome-sass-loader");
```

### Custom configuration

You can configurate font-awesome-sass-loader with two configuration files:

* `font-awesome-sass.config.js`
* and set `fontAwesomeCustomizations` option

Add both files *next to each other* in your project. Then:

``` javascript
require("font-awesome-sass-loader!./path/to/font-awesome-sass.config.js");
```

Or simple add it as entry point to your `webpack.config.js`:

``` javascript
module.exports = {
  entry: [
    "font-awesome-sass!./path/to/font-awesome.config.js",
    "your-existing-entry-point"
  ]
};
```

#### `font-awesome-sass.config.js`

Example:

``` javascript
module.exports = {
  fontAwesomeCustomizations: "./_font-awesome.config.scss",

  styles: {
    "mixins": true,

    "core": true,
    "icons": true,

    "larger": true,
    "path": true,
  }
};
```

### _font-awesome.config.scss

Imported after Font-Awesome's default variables, but before anything else.

You may customize Font-Awesome here.

Example:

``` sass
$fa-inverse: #eee;
$fa-border-color: #ddd;
```

### extract-text-webpack-plugin

Configure style loader in `font-awesome-sass.config.js`.

Example:

``` javascript
module.exports = {
  styleLoader: require("extract-text-webpack-plugin").extract("style-loader", "css-loader!sass-loader"),

  styles: {
    ...
  }
};
```

Install `extract-text-webpack-plugin` before using this configuration.
