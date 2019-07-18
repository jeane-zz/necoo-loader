const babel = require('@babel/core');
const t = require('babel-types');
const fs = require('fs');
const path = require('path');
// const superagent = require('superagent');

function returnPosStr(code, path) {
    let start = path.node.start;
    let end = path.node.end;
    if (code[end - 1] === ';') {
        end = end - 1;
    }
    let returnStr = code.slice(start, end);
    return returnStr;
}
function babelAssignmentProcess() {
    const visitor = {
        AssignmentExpression(path) {
            let returnStr = returnPosStr(code, path);
        },
    };
}
function babelVariableProcess(code) {
    // code = fs.readFileSync('../test/babel-test.js', 'utf-8');
    const visitor = {
        VariableDeclaration(path) {
            if (!('BlockStatement' === path.parent.type || 'Program' === path.parent.type)) {
                return;
            }
            let returnStr = returnPosStr(code, path);
            if (returnStr.indexOf('cachedBrackets = UNDEF') > -1) {
                console.log(returnStr);
            }
            let declations = path.node.declarations;
            let r = '{';
            declations.forEach(item => {
                r += `${item.id.name}: ${item.id.name},`;
            });
            r = r.slice(0, r.length - 1);
            r += '}';
            returnStr = returnStr.replace(/^ *(var|let) *\n*/g, '');
            let finalStr = `^^@@${returnStr};_ProcessVariable_(${r}, __O__)@@^^`;
            path.node.declarations = [t.valueToNode(finalStr)];
        },
    };
    code = code.replace(/\\n/g, '@@@@n@@@@');
    const result = babel.transform(code, {
        plugins: [{
            visitor: visitor
        }]
    });
    result.code = result.code
        .replace(/\^\^@@([\s\S]*?)@@\^\^/g, (_, $1) => {
            let str = $1
                .replace(/\\n/g, '\n')
                .replace(/\\'/g, '\'')
                .replace(/\\"/g, '\"')
                .replace(/\\\\/g, '\\')
                .replace(/@@@@n@@@@/g, '\\n');
            return `^^@@${str}@@^^`;
        })
        .replace(/(\"|\')\^\^@@|@@\^\^(\'|\")/g, '');
    result.code = result.code.replace(/@@@@n@@@@/g, '\\n').replace(/(_ProcessVariable_\([\s\S]*?, )__O__\)/g, function(_, $1) {
        return $1 + "typeof __O__ !== 'undefined' ? __O__ : {})";
    });
        
    return result.code;
    // fs.writeFileSync('../test/babel-final.js', result.code);
    // let finalCode = fs.readFileSync('../test/babel-final.js', 'utf-8');
}
// babelVariableProcess();
function babelReturnProcess(code) {
    // code = fs.readFileSync('../test/babel-test.js', 'utf-8');
    const visitor = {
        ReturnStatement(path) {
            let returnStr = returnPosStr(code, path);
            let finalStr;
            if (returnStr === 'return') {
                finalStr = returnStr.replace(/return[ \;]?/, '_ProcessReturn_(undefined');
            }
            else {
                finalStr = returnStr.replace(/return[ \;]?/, '_ProcessReturn_(');
            }
            finalStr += ', __O__)';
            let node = t.valueToNode(finalStr);
            path.node.argument = node;
        }
    };
    code = code.replace(/\\n/g, '@@@n1@@@').replace(/([^\\])(\\')/g, (_, $1, $2) => {
        return $1 + '@@@LLL@@@';
    });
    console.log('11', code);
    const result = babel.transform(code, {
        plugins: [{
            // visitor: visitor
        }]
    });
    console.log(result.code);
    result.code = result.code
        .replace(/_ProcessReturn_\(([\s\S]*?)\, __O__\)/g, (_, $1) => {
            let str = $1
                .replace(/\\n/g, '\n')
                .replace(/\\'/g, '\'')
                .replace(/\\"/g, '\"')
                // ReturnStatement会对\转义成2个\导致结果多出一个\
                .replace(/\\\\/g, '\\')
                .replace(/@@@n1@@@/g, '\\n');
            return `_ProcessReturn_(${str}, __O__)`;
        })
        .replace(/return (\'|\")_ProcessReturn_/g, 'return _ProcessReturn_')
        .replace(/, __O__\)(\'|\")/g, ', __O__)');
    result.code = result.code
        .replace(/@@@n1@@@/g, '\\n')
        .replace(/@@@LLL@@@/g, '\\\'')
        // .replace(/(_ProcessReturn_\([\s\S]*?, )__O__\)/g, function(_, $1) {
        //     return $1 + "typeof __O__ !== 'undefined' ? __O__ : {})";
        // });
    return result.code;
}
function babelAssignProcess(code) {
    function processExpr(obj) {
        if (obj.object) {
            let type = obj.object.type;
            if (type === 'ThisExpression') {
                return 'this';
            }
            return processExpr(obj.object);
        }
        else {
            return obj.name;
        }
    }
    const visitor = {
        ExpressionStatement(path) {
            let node = path.node;
            let args = {};
            if (node.expression.type === 'AssignmentExpression') {
                let returnStr = returnPosStr(code, path);
                let left = node.expression.left;
                let right = node.expression.right;
                if (left && right) {
                    let valueLeft = processExpr(left);
                    let valueRight = processExpr(right);
                    if (valueLeft) {
                        args[valueLeft] = valueLeft;
                    }
                    if (valueRight) {
                        args[valueRight] = valueRight;
                    }
                }
                let argstr = JSON.stringify(args);
                argstr = argstr.replace(/\"/g, '');
                path.node.expression = t.valueToNode('_ProcessAssign_('+returnStr+`, ${argstr}, __O__@@@)@@@`);
            }
        }
    };
    code = code.replace(/\\n/g, '@@@n1@@@').replace(/([^\\])(\\')/g, (_, $1, $2) => {
        return $1 + '@@@LLL@@@';
    });
    const result = babel.transform(code, {
        plugins: [{
            visitor: visitor
        }]
    });
    result.code = result.code
        .replace(/_ProcessAssign_\(([\s\S]*?)@@@\)@@@/g, (_, $1) => {
            let str = $1
                .replace(/\\n/g, '\n')
                .replace(/\\'/g, '\'')
                .replace(/\\"/g, '\"')
                // ReturnStatement会对\转义成2个\导致结果多出一个\
                .replace(/\\\\/g, '\\')
                .replace(/@@@n1@@@/g, '\\n');
            return `_ProcessAssign_(${str}@@@\)@@@`;
        })
        .replace(/(\'|\")_ProcessAssign_/g, '_ProcessAssign_')
        .replace(/@@@\)@@@(\'|\")/g, ')')
        .replace(/@@@n1@@@/g, '\\n')
        .replace(/@@@LLL@@@/g, '\\\'')
        .replace(/(_ProcessAssign_\([\s\S]*?, )__O__\)/g, function(_, $1) {
            return $1 + "typeof __O__ !== 'undefined' ? __O__ : {})";
        });
    return result.code;

}
// function babelZhProcess(code) {
//     let translateMap = {};
//     async function asyncForEach(array, callback) {
//         for (let index = 0; index < array.length; index++) {
//             await callback(array[index], index, array)
//         }
//     }
//     async function getZh (arr, callback) {
//         asyncForEach(arr, async (word, index) => {
//             let res = await requestForWord(word);
//             translateMap[word] = res;
//             if (arr.length === index) {
//                 callback && callback(translateMap);
//             }
//             console.log(word, res, arr.length, index);
//         })
//     }
//     async function requestForWord(word) {
//         let result = '';
//         let res = await superagent.get('http://xtk.azurewebsites.net/BingDictService.aspx?Word=' + word);
//         res = JSON.parse(res.text);
//         if (res && res.defs) {
//             let findRes = res.defs.find(item => {
//                 return item.pos === 'n.';
//             });
//             if (findRes) {
//                 result = findRes.def.split('；')[0];
//             }
//             else {
//                 result = res.defs[0].def.split('；')[0];
//             }
//             return result;
//         }
//         else {
//             return word;
//         }
//     }
//     const visitor = {
//         Identifier(path) {
//             let name = path.node.name;
//             // 把pureComponent-element 分割成pure Component element三个单词
//             let words = name.split(/(\_)|(\-)|(?=[A-Z])/);
//             words = words.filter(item => {
//                 if (item) {
//                     return item;
//                 }
//             });
//
//             words = words.join('@');
//             let re = /([A-Z\_]+)@/g;
//             words = words
//                 .replace(re, (_, $1) => {
//                    return $1;
//                 });
//             words = words.split('@');
//             let result = getZh(words, function (translateMap) {
//                 for (let item in translateMap) {
//                     code = code.replace(item, translateMap[item])
//                 }
//                 // console.log(translateMap);
//             });
//             // path.node.name = path.node.name.split('').reverse().join('');
//         }
//     };
//     const result = babel.transform(code, {
//         plugins: [{
//             visitor: visitor
//         }]
//     });
//
//     return code;
// }
function replaceFunction(path, code) {
    const {start, end} = path.node;
    const section = path.getSource();
    if (!section) {
        return;
    }
    const functionBody = path.node.body;
    const {start: bStart, end: bEnd} = functionBody;
    const diffPos = bStart - start;
    let newFunBody;
    try {
        const template = fs.readFileSync(__dirname + '/necoo-body.js', 'utf8');
        newFunBody = section.slice(0, diffPos + 1) + template + section.slice(diffPos + 1, section.length);

        const reSectionStr = section
            // .replace(/(\$|\^)/g, '\\$1')
            // .replace(/(\\')/g, '\'')
            // .replace(/(\\")/g, '\"')
            // .replace(/\\n/g, '\n')
            // .replace(/\\\\/g, '\\')
            // .replace(/\\\\"/g, '\\"')
        ;
        if (section.indexOf('function updateListeners') === 0) {
            console.log(reSectionStr);
        }
        try {
            code = code.replace(reSectionStr, (_) => {

                return newFunBody;
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    catch (e) {
        console.log('sorry fro error', path, section.length);
    }
    return code;
}
function replaceFunctionUseReg(code) {
    const RE_FUNC = /[^\'\"](function(\s[\w\$\_]+)?\s*\([\s\S]*?\)\s*\{)/g;
    const template = fs.readFileSync(__dirname + '/necoo-body.js', 'utf8');
    console.log('=====template', template);
    code = code.replace(RE_FUNC, "$1" + template + '\n');
    return code;
}
function babelFunctionProcess(code) {
    const visitor = {
        FunctionDeclaration(path) {
            code = replaceFunction(path, code);
        },
        FunctionExpression(path) {
            code = replaceFunction(path, code);
        }
    };
    const result = babel.transform(code, {
        plugins: [{
            visitor: visitor
        }]
    });
    code = replaceAnonymousFun(code);
    // code = replaceFunctionUseReg(code);
    // fs.writeFileSync('../dist/source/vue.js', code);
    return code;
}
function replaceAnonymousFun(code) {
    const RE_NO_NAME_FUNC = /function([\s]*)\(/g;
    const nameForNoName = '_anonymous_';
    let nameForNoNameIndex = 0;
    code = code.replace(RE_NO_NAME_FUNC, function(_, $1) {
        nameForNoNameIndex++;
        return 'function '+ nameForNoName + nameForNoNameIndex + '(';
    });
    return code;
}
function babelProgramProcess(code) {
    const visitor = {
        Program(path) {
            const section = path.getSource();
            try {
                const template = fs.readFileSync(__dirname + '/necoo-header.js', 'utf8');
                code = template + section;
            }
            catch (e) {
                console.log('--', e);
            }
        }
    };
    // @todo: 封装成函数
    const result = babel.transform(code, {
        plugins: [{
            visitor: visitor
        }]
    });
    return code;
}
function babelStrictProcess(code) {
    return code.replace(/(\"|\')use strict(\"|\');/gi, '');
}
module.exports = {
    babelReturnProcess,
    babelVariableProcess,
    babelAssignProcess,
    babelFunctionProcess,
    babelProgramProcess,
    babelStrictProcess
};