const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var packCSS = new ExtractTextPlugin('necoo.min.css');
const config = {
    mode: 'development',
    entry: {
        inject: './index.js',
        lib: './lib.js',
        // d3: './d3-local.js'
    },
    output: {
        filename: 'necoo-[name].js',
        // path: path.resolve(__dirname, '../dist')
        path: path.resolve(__dirname, '../../dist/necoo-inject')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [packCSS]
};
module.exports = config;