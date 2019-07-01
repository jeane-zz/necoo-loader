const acorn = require('acorn');
const fs = require('fs');
const walk = require("acorn-walk");
const {babelReturnProcess, babelVariableProcess, babelAssignProcess, babelZhProcess} = require('./babel');
function astCode(sourceCode) {
    // sourceCode = babelReturnProcess(sourceCode);
    sourceCode = babelZhProcess(sourceCode);
    // sourceCode = babelVariableProcess(sourceCode);
    // sourceCode = babelAssignProcess(sourceCode);
    return sourceCode;
}
module.exports = astCode;