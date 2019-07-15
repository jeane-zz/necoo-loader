const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const ip = require('internal-ip');
const open = require('opn');
const path = require('path');
const buildPath = '../dist';

let port = process.argv[3] || '8181';
let host = ip.v4.sync();
let server = new WebpackDevServer(webpack(webpackConfig), {
    inline: true,
    contentBase: path.join(__dirname, buildPath),
    hot: true,
    // open: true,
    historyApiFallback: {
        disableDotRule: true,
        rewrites: [
            {
                from: new RegExp('/'),
                to: '/index.html'
            }
        ]
    },
    disableHostCheck: true,
    overlay: true,
    host: '0.0.0.0',
    useLocalIp: true,
    publicPath: '/'
});
server.listen(port, host, err => {
    if (err) {
        throw new Error(err);
    }
    open(`http://${host}:${port}`, {}).catch(() => {
        throw new Error('open browser has been failed');
    });
});