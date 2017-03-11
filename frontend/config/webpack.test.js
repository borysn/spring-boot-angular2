/* webpack.test.js */
const webpack = require('webpack');
const helpers = require('./helpers');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [helpers.root('src'), 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        enforce: 'pre',
        exclude: [helpers.root('node_modules')]
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
        exclude: [
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular')
        ]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            query: {
              sourceMap: false,
              inlineSourceMap: true,
              compilerOptions: {
                removeComments: true
              }
            },
          },
          'angular2-template-loader'
        ],
        exclude: [/\.e2e\.ts$/]
      },
      { 
        test: /\.json$/, 
        loader: 'json-loader', 
        exclude: [helpers.root('src/index.html')] 
      },
      {
        test: /\.scss$/,
        use: ['raw-loader', 'sass-loader'],
        exclude: [helpers.root('node_modules')]
      },
      { 
        test: /\.css$/, loaders: ['to-string-loader', 'css-loader'], 
        exclude: [helpers.root('src/index.html')] 
      },
      { 
        test: /\.html$/, 
        loader: 'raw-loader', 
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.(js|ts)$/, 
        loader: 'istanbul-instrumenter-loader',
        include: helpers.root('src'),
        enforce: 'post',
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'HMR': false,
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV),
        'HMR': false,
      }
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        debug: false,
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: 'src'
        }
     }
    })
  ],

  node: {
    global: true,
    process: false,
    crypto: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};
