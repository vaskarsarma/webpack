var path = require('path');
var webpack= require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Htmlwebpackplugin= require("html-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
   filename: 'main.css'
});

module.exports = {
    entry: {
        app: './src/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        //publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test:/\.html$/,
                use:['html-loader']
            },
            {
                test: /\.(jpg|png)/,
                use:[
                    {
                    loader: 'file-loader',
                    options:{
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/'
                    }
                    }]
            },
            {
                test: /\.html$/,
                use:[
                    {
                    loader: 'file-loader',
                    options:{
                        name: '[name].[ext]'
                    }
                    }],
                exclude: path.resolve(__dirname,'src/index.html')
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        extractPlugin,
        new Htmlwebpackplugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks:['app']
        }),
        // new Htmlwebpackplugin({
        //     filename: 'users.html',
        //     template: './src/users.html',
        //     chunks:[]
        // }),
        new CleanWebpackPlugin(['dist'])
    ]
};