const fs = require('fs');
const {
    babelStrictProcess
} = require('./necoo/necoo-babel');
module.exports = function(source) {
    // source 为 compiler 传递给 Loader 的一个文件的原内容
    source = babelStrictProcess(source);
    return source;
};