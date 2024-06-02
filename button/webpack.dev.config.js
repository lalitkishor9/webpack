
const path = require('path');

//this plugin is for Reducing the size of the bundle.js
// const TerserPlugin = require('terser-webpack-plugin');

//This plugin is for creating a separate css file at the time of bundling
// const miniCssExtractPlugins = require('mini-css-extract-plugin');

//Auto clean the bundles to reduce redundency
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// for creating html file dynamically
const HtmlWebpackPlugin = require('html-webpack-plugin');

//for Microfrontend plugin
const {ModuleFederationPlugin} = require('webpack').container;

module.exports = {
    entry: {
        button: './src/button.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        // This is the exact or relative path of the assets
        // publicPath: '/dist/'
        publicPath: 'http://localhost:9002/'
    },
    mode: 'development',
    devServer: {
        port: 9002, 
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        }
    },
    module: {
        rules: [
            {
                // For image files to bundle
                test: /\.(jpg|png)$/,
                type: 'asset'
            },
            {
                // For CSS files to bundle
                test: /\.css$/,
                use: [
                    // miniCssExtractPlugins.loader,
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                // For browser support, Babel loader converts new features of JS into older versions of ES6
                test: /\.js$/,
                exclude: /node_modules/, // Exclude node_modules from Babel processing
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Hello World',
            chunks: ['button'],
            filename: 'index.html',
            meta:{
                description: "Some Description",
            }
        }),
        // new HtmlWebpackPlugin({
        //     title: 'Image',
        //     chunks: ['image'],
        //     filename: 'image.html',
        //     meta:{
        //         description: "Some Description",
        //     }
        // }),
        new ModuleFederationPlugin({
            name: 'button',
            filename: 'remoteEntry.js',
            exposes: {
                './HelloWorldButton' : './src/component/hello-world-button/hello-world.js'
            }
        })
    ],
};