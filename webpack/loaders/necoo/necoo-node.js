const fs = require('fs');
const RE_FUNC = /(function(\s[\w\$\_]+)?\s*\([\s\S]*?\)\s*\{)/g;
const RE_COMMENT = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\/|(\s+\/\/|(^\/))(.*)/g;
const RE_VAR = /[,{][\$\w]+(?=:)|(^ *|[^\"\-\'$\w\.{])(?!(?:var|JSON|if|for|else|this|switch|break|arguments|console|return|case|function|typeof|true|false|delete|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g;
const RE_VAR_SELF = /(\w+?):\s*([\s\S]*?)\,?\s|(\w*)\s*=\s*([\s\S]*)/;
const RE_NONAME_FUNC = /(([\w\$\_\.]+)\s*=\s*function\s*\([\s\S]*?\)\s*\{)/g;
// 最终版本
const RE_VAR_FIN = /(\b|\'|\"|\\|\/|\.|\-|\[)((?!Error|console|var|function|if|else|for|in|do|while|switch|case|typeof|break|continue|return|throw|try|catch|finally|with|new|delete|void|Object|Array|String|Number|Boolean|Function|RegExp|Date|Math|true|false|null|undefined|NaN))[\w$]+(\b|(\'\")?)/g;
const RE_STRICT = /\'use strict\';/g;
const RE_NO_NAME_FUNC = /function([\s]*)\(/g;
let getVarFunc = `function __GETVAR__(name) {return eval(name);}`;
const nameForNoName = '__helloworld__';
let nameForNoNameIndex = 0;

class NecooNode {
    constructor() {

    }
    process(code) {
        let result = code
            .replace(RE_COMMENT, '')
            .replace(RE_STRICT, '')
            // .replace(RE_FUNC, "$1 console.trace();")
            .replace(RE_FUNC, "$1 "+getVarFunc+" var __VAR__ = SAVE(arguments, __GETVAR__);")
            .replace(RE_NO_NAME_FUNC, function(_, $1) {
                nameForNoNameIndex++;
                return 'function '+ nameForNoName + nameForNoNameIndex + '(';
            });
        result = `
            var RE_VAR_FIN = /(\\b|\\'|\\"|\\\|\\/|\\.|\\-|\\[)((?!__VAR__|SAVE|arguments|Error|console|var|function|if|else|for|in|do|while|switch|case|typeof|break|continue|return|throw|try|catch|finally|with|new|delete|void|Object|Array|String|Number|Boolean|Function|RegExp|Date|Math|true|false|null|undefined|NaN))[\\w$]+(\\b|(\\'\\")?)/g;
            if (typeof global.__DATA__ === 'undefined') {
                global.__DATA__ = [];
            }
            function SAVENAME(args, name) {
                try {
                    if (name) {
                        args.callee.prototype.name = name;
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
            function GET_STACK_PARENT_FUNC(stackStr, funcName) {
                var o = {};
                if (funcName && stackStr) {
                    var stackArr = [];
                    if (stackStr) {
                        stackArr = stackStr.split('  at ');
                    }
                    var flag = false;
                    for (var i = 0; i < stackArr.length; i++) {
                        var nowStack = stackArr[i];
                        if (nowStack.indexOf('<anonymous>') > -1 && flag === false) {
                            flag = true;
                        }
                        else if (nowStack.indexOf('<anonymous>') === -1 && flag === true) {
                            o['type'] = stackArr[i-1].trim().split(' ')[0];
                            o['parentName'] = stackArr[i].trim().split(' ')[0];
                            break;
                        }
                        // if (stackArr[i].indexOf(funcName) > -1) {
                        //     index = i;
                        // }
                        // if (index + 1 === i) {
                        //     o['type'] = stackArr[i].trim().split(' ')[0];
                        // }
                        // if (index + 2 === i) {
                        //     o['parentName'] = stackArr[i].trim().split(' ')[0]; 
                        // }
                    }
                }
                return o;
            }
            function SAVE(args, __GETVAR__) {
                var arguments = args;
                if (global.__INDEX__ >= 0) {
                    if (!__DATA__[global.__INDEX__]) {
                        __DATA__[global.__INDEX__] = [];
                    }
                    var __obj__ = {
                        name: arguments.callee && arguments.callee.name,
                        caller: arguments.callee.caller && arguments.callee.caller.name,
                        func: arguments.callee.toString(),
                        self: this,
                        args: arguments,
                        module: module
                    };
                    if (!__obj__.name) {
                        __obj__.name = args.callee && args.callee.prototype.name;
                        console.error('=====1', __obj__.name, args);
            
                    }
                    if (!__obj__.caller) {
                        __obj__.caller = args.callee.caller && args.callee.caller.prototype.name;
                        if (!__obj__.caller) {
                            try {
                                console.log(iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii);
                            }
                            catch (e) {
                                __obj__.stack = e.stack;
                                var anonymousInfo = GET_STACK_PARENT_FUNC(e.stack, __obj__.name);
                                var __nameArr__ = anonymousInfo.parentName && anonymousInfo.parentName.split('.') || [];
                                
                                __obj__.caller = __nameArr__[__nameArr__.length - 1] || null;
                                __obj__.anonymousInfo = anonymousInfo;
                            }
                        }
                        if (__obj__.caller === 'cre') {
                            console.log(1);
                        }
                        console.error('=====', __obj__.caller, args, __obj__.stack, anonymousInfo);
                    }
                    if (__obj__.caller === 'anonymous') {
                        try {
                            console.log(iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii);
                        }
                        catch (e) {
                            console.log('=====', e.stack);
                            __obj__.stack = e.stack;
                            var anonymousInfo = GET_STACK_PARENT_FUNC(e.stack, __obj__.name);
                            var __nameArr__ = anonymousInfo.parentName && anonymousInfo.parentName.split('.') || [];
            
                            __obj__.caller = __nameArr__[__nameArr__.length - 1] || null;
                            __obj__.anonymousInfo = anonymousInfo;
                        }
                        console.log('1', args.callee.caller, args.callee.caller.name);
                    }
                    __DATA__[global.__INDEX__].push(__obj__);
                    if (__obj__.name || __obj__.caller) {
                    }
                    var f = __obj__.func;
                    __obj__.oldVariable = {};
                    __obj__.newVariable = {};
                    __obj__.__GETVAR__ = __GETVAR__;
                    if (f) {
                        var tempArray = f.match(RE_VAR_FIN);
                        var variableArray = {};
                        tempArray && tempArray.forEach(function(item) {
                            if (/\\'|\\"|\\[|\\||\\(|\\/|\\\\|\\.|\\-/.test(item)) {
                            }
                            else {
                                variableArray[item] = item;
            
                            }
                        });
                        __obj__.variableArray = variableArray;
                        for(var II in variableArray) {
                            try {
                                __obj__.oldVariable[II] = __GETVAR__(II);
                            }
                            catch(e) {
                                console.log(e);
                            }
                        }
                        if (__obj__.caller) {
                            var len = __DATA__.length;
                            for (var i = 0; i < len; i++) {
                                __DATA__[i].forEach(function(item) {
                                    if (item.name === __obj__.caller) {
                                        for(var varName in item.variableArray) {
                                            try {
                                                item.newVariable[varName] = item.__GETVAR__(varName);
                                            }
                                            catch(e) {
                                                console.log(e);
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        else {
                            
                        }
                        console.log(variableArray);
                    }
                }
            }
            function GET_VAR(data) {
                var FUNC_VAR = [];
                data.replace(${RE_VAR}, function(_, $1, $2) {
                    if ($2) {
                        FUNC_VAR.push($2);
                    }
                    return _;
                });
                var names = FUNC_VAR.join(',');
                try {
                    var fun = new Function('FUNC_VAR', "var a = {};FUNC_VAR.forEach(function(item){try{a[item] = eval(item);}catch(e) {console.log(e)}});console.log(a)");
                    console.log(fun);
                    fun(FUNC_VAR);
                }
                catch(e) {
                    console.log(e);
                }
            };;` + result;
        return result;
    }
}

module.exports = new NecooNode();