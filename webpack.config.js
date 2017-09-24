var webpack = require('webpack');
var path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';

module.exports = {

    //watch: isDevelopment,
    devtool: isDevelopment && 'eval-source-map',

    entry: [
        './src/app.js'
    ],

    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    devServer: {
        historyApiFallback: true //чтобы сервер не делал роутинг
    },

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },

            {
                test:   /\.css$/,
                loader: "style!css!autoprefixer?browsers=last 2 versions"
            },

            {
                test: /\.js/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        })
    ]
};