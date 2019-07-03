const path = require('path');
const webpack = require('webpack');
const webpackConfig =  {
    mode: 'development',
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
    entry: {
        app: path.resolve(__dirname, '../src/vue/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
    },
    resolveLoader: {
        modules: [path.join(__dirname, '../loaders/'), 'node_modules']
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            plugins: ["transform-remove-strict-mode"]
                        },
                    },
                    {
                        loader: 'remove-strict'
                    }
                ]
            },
            {
                test: /vue.*\.js$/,
                use:  {
                    loader: 'necoo-loader'
                }
            },

            // {
            //     test: /\.riot$/,
            //     exclude: /node_modules/,
            //     use: [{
            //         loader: '@riotjs/webpack-loader',
            //         options: {
            //             hot: false,
            //         }
            //     }]
            // }
        ]
    },
};
module.exports = webpackConfig;
