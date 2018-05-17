'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')
var path = require('path');

var projectName = 'search-filter-react';
var projectPath = path.resolve(__dirname, projectName);

module.exports = {

    context: projectPath,

    //=======================================================================================================
    //  For cases when we should copy 'index.html' file into 'dist' directory
    //=======================================================================================================
    /*
    entry: [
        './index-template.html',
        './src/main.js'
    ],
    */

    entry: {
        app: './src/main.js'
    },

    output: {
        path: path.resolve(projectPath, 'dist'),
        filename: 'build.js'
    },

    //=======================================================================================================
    //  Watch for changes in development mode only
    //=======================================================================================================
    watch: NODE_ENV === 'development',

    //=======================================================================================================
    //  Make source-map enabled in development mode only
    //=======================================================================================================
    devtool: NODE_ENV === 'development' ? 'source-map':false,

    //=======================================================================================================
    //  Set server path to project folder
    //=======================================================================================================
    devServer: {
        contentBase: projectPath
    },

    module: {
        rules: [

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: 'css-loader', options: {minimize: NODE_ENV === 'production'}}
                    ]
                })

            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: 'css-loader', options: {minimize: NODE_ENV === 'production'}},
                        {loader: 'sass-loader', options: {
                            data: '@import "variables";',
                            includePaths: [
                                path.resolve(projectPath, 'src/styles')
                            ]
                        }}
                    ]
                })
            },

            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: 'css-loader', options: {minimize: NODE_ENV === 'production'}},
                        {loader: 'sass-loader?indentedSyntax'}
                    ]
                })
            },

            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react','env']
                }
            },

            /*
             *  Rules for images
             */
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/images',
                    publicPath: 'dist/assets/images' // prefix for compiled css
                }
            },

            /*
             *  Rules for fonts
             */
            {
                test: /\.(eot|ttf|eof|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts'
                    //publicPath: 'fonts' // prefix for compiled css
                }
            },

            /*
             *  Copy index.html in 'dist' directory
             */
            {
                test: /\.html$/,
                loader: 'file-loader',
                options: {
                    name: 'index.html',
                    outputPath: '/',
                    publicPath: '/'
                }
            }

            /*
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=1024'
            }
            */
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin("build.css", {allChunks: true})
   ]
};

if (process.env.NODE_ENV === 'production') {

    module.exports.plugins = (module.exports.plugins || []).concat([
        new UglifyJSWebpackPlugin({
            sourceMap: false,
        })
    ])
}