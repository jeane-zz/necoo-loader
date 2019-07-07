const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var packCSS = new ExtractTextPlugin('necoo.min.css');
const config = {
    mode: 'development',
    entry: {
        inject: './index.js'
    },
    output: {
        filename: 'necoo-[name].js',
        // path: path.resolve(__dirname, '../dist')
        path: path.resolve(__dirname, '../../dist/necoo-inject')
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            }
        ]
    },
    plugins: [packCSS]
};
module.exports = config;