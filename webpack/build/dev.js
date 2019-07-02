const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
webpack(webpackConfig, (data) => {
    console.log(data);
});