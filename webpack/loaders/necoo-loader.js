const necoo = require('./necoo/necoo');
// const astCode = require('./necoo/ast');
const fs = require('fs');
module.exports = function(source) {
    // source 为 compiler 传递给 Loader 的一个文件的原内容
    // 该函数需要返回处理后的内容，这里简单起见，直接把原内容返回了，相当于该 Loader 没有做任何转换
    source = necoo.process(source);
    // source = astCode(source);
    fs.writeFile('./react.js', source);
    // console.log(source);
    return source;
};