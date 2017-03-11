/* webpack.common.js */
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        modules: [helpers.root('src'), "node_modules"],
        descriptionFiles: ['package.json'],
        extensions: ['.js', '.ts', '.css', '.scss', '.json', '.html']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre',
                exclude: [helpers.root('node_modules')]
            },
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader'],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.html$/,
                use: ['raw-loader'],
                exclude: [helpers.root('src/index.html')]
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader?importLoaders=1',
                  'postcss-loader'
                ]
            },
            {
                test: /initial\.scss$/,
                use: ['stye-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.scss$/,
                use: ['raw-loader', 'sass-loader'],
                exclude: [helpers.root('node_modules')]
            },
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                use: ['url-loader?limit=10000&mimetype=application/font-woff']
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                use: ['file-loader']
            },
            {
                test: /\.json$/,
                use: ['json-loader']
            },
            {
                test: /bootstrap\/dist\/js\/umd\//,
                use: ['imports-loader?jQuery=jquery']
            }
        ],
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            postcss: [autoprefixer],
          }
        }),

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),

        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disable: false, allChunks: true
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new CopyWebpackPlugin([{
          from: 'src/assets',
          to: 'assets'
        }]),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency'
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            "window.moment": "moment",
            'Tether': 'tether',
            'window.Tether': 'tether',
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Util: "exports-loader?Util!bootstrap/js/dist/util"
        })
    ],

    node: {
        global: true,
        crypto: false,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
