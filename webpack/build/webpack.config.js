const path = require('path');
const webpack = require('webpack');
const webpackConfig =  {
    mode: 'development',
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
    entry: {
        app: path.resolve(__dirname, '../src/riot/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        inline: true,
        hot: true,
        port: 7070,
        disableHostCheck: true,
        overlay: true,
        host: '0.0.0.0',
        useLocalIp: true,
        publicPath: '/'
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
                test: /riot.*\.js$/,
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
            // },
            {
                test: /\.tag$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'riot-tag-loader',
                    options: {
                        hot: true, // set it to true if you are using hmr
                        // add here all the other riot-compiler options riot.js.org/guide/compiler/
                        // template: 'pug' for example
                    }
                }]
            }
        ]
    },
};
module.exports = webpackConfig;
