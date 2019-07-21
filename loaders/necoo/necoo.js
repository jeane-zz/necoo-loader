// const acorn = require('acorn');
const fs = require('fs');
// const walk = require("acorn-walk");
const {babelReturnProcess,
    babelVariableProcess,
    babelAssignProcess,
    babelFunctionProcess,
    babelProgramProcess,
    babelStrictProcess,
    babelReplaceReturn
} = require('./necoo-babel');
function astCode(sourceCode) {
    // sourceCode = babelReturnProcess(sourceCode);
    // sourceCode = babelZhProcess(sourceCode);
    // sourceCode = babelVariableProcess(sourceCode);
    // sourceCode = babelAssignProcess(sourceCode);
    // @todo: 改成链式
    sourceCode = babelStrictProcess(sourceCode);
    sourceCode = babelReplaceReturn(sourceCode);
    sourceCode = babelFunctionProcess(sourceCode);
    sourceCode = babelProgramProcess(sourceCode);
    // console.log(sourceCode);
    return sourceCode;
}
module.exports = astCode;