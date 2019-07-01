const path = require('path');
const webpackConfig =  {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: './loaders/remove-strict'
                },
                    {
                        loader: 'babel-loader'
                    }]
            },
            {
                test: /riot\/.*\.js$/,
                use: {
                    loader: './loaders/necoo-loader'
                }
            },
            {
                test: /\.riot$/,
                exclude: /node_modules/,
                use: [{
                    loader: '@riotjs/webpack-loader',
                    options: {
                        hot: false, // set it to true if you are using hmr
                        // add here all the other @riotjs/compiler options riot.js.org/compiler
                        // template: 'pug' for example
                    }
                }]
            }
        ]
    }
};
module.exports = webpackConfig;
