// const acorn = require('acorn');
const fs = require('fs');
// const walk = require("acorn-walk");
const {babelReturnProcess,
    babelVariableProcess,
    babelAssignProcess, 
    babelZhProcess, 
    babelFunctionProcess    
} = require('./babel');
function astCode(sourceCode) {
    // sourceCode = babelReturnProcess(sourceCode);
    // sourceCode = babelZhProcess(sourceCode);
    // sourceCode = babelVariableProcess(sourceCode);
    // sourceCode = babelAssignProcess(sourceCode);
    sourceCode = babelFunctionProcess(sourceCode);
    return sourceCode;
}
module.exports = astCode;