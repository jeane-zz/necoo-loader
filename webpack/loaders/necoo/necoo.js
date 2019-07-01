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
const nameForNoName = '_anonymous_';
// 匹配函数返回那块
const returnRe = /return /;
let nameForNoNameIndex = 0;

class Necoo {
    constructor() {

    }
    process(code) {
        let result = code
            .replace(RE_COMMENT, '')
            .replace(RE_STRICT, '')
            // .replace(RE_FUNC, "$1 console.trace();")
            .replace(RE_FUNC, "$1 ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);")
            .replace(RE_NO_NAME_FUNC, function(_, $1) {
                nameForNoNameIndex++;
                return 'function '+ nameForNoName + nameForNoNameIndex + '(';
            });
        result = `
            var RE_VAR_FIN = /(\\b|\\'|\\"|\\|\\/|\\.|\\-|\\[)((?!__VAR__|SAVE|arguments|Error|console|var|function|if|else|for|in|do|while|switch|case|typeof|break|continue|return|throw|try|catch|finally|with|new|delete|void|Object|Array|String|Number|Boolean|Function|RegExp|Date|Math|true|false|null|undefined|NaN))[\\w$]+(\\b|(\\'\\")?)/g;
            var __DATA__ = [];
            function __DEEPCLONE__(o) {
                return o;
                // var copy = o;
                // if (typeof o === 'object') {
                //     copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {};
                //     for (var item in o) {
                //         if (o.hasOwnProperty(item)) {
                //             copy[item] = __DEEPCLONE__(o[item]);
                //         }
                //     }
                // }
                // return copy;
            }
            function _ProcessAssign_(value, variable, o) {
                var str = '';
                if (typeof variable === 'object') {
                    for (var name in variable) {
                        if (typeof o === 'object') {
                            if (!o.runVariable) {
                                o.runVariable = {};
                            }
                            o.runVariable[name] = variable[name];
                        }
                        str += name + ',';
                    }
                }
                if (str.length) {
                    str = str.slice(0, str.length - 1);
                }
                var __error__ = new Error();
                var stackInfo = getCaller(window.StackTrace.getSync());
                if (window.__INDEX__ >= 0) {
                    if (!__DATA__[window.__INDEX__]) {
                        __DATA__[window.__INDEX__] = [];
                    }
                    var __obj__ = {
                        name: str,
                        showedName: 'assign: ' + str,
                        isVariable: true,
                        variableType: 'assign',
                        finalValue: value,
                        caller: processName(stackInfo.father.functionName),
                        func: null,
                        args: {
                        },
                        variable: variable,
                        stack: __error__.stack,
                        callLine: stackInfo
                    };
                    __DATA__[window.__INDEX__].push(__obj__);
                }
                return value;
            }
            function getCaller(stackArray) {
              var callerStack = stackArray[1] || {};
              var currentStack = stackArray[1] || {};
              return {
                father: callerStack,
                self: currentStack,
                stackSource: stackArray
              }
            }
            function processName(name) {
                   if (!name) {
                        return '';
                   }
                  var temp = name.split('.');
                  var len = temp.length;
                  return temp[len - 1].replace(/ [\\s\\S]*/, '');
            }
            function _ProcessVariable_(valueObj) {
                var str = '';
                if (valueObj) {
                    for (var key in valueObj) {
                        str += key + ',';
                    }
                }
                if (str.length) {
                    str = str.slice(0, str.length - 1);
                }
                var __error__ = new Error();
                var stackInfo = getCaller(window.StackTrace.getSync());
                if (window.__INDEX__ >= 0) {
                    if (!__DATA__[window.__INDEX__]) {
                        __DATA__[window.__INDEX__] = [];
                    }
                    var __obj__ = {
                        name: str,
                        showedName: 'var: ' + str,
                        isVariable: true,
                        variableType: 'var',
                        caller: processName(stackInfo.father.functionName),
                        func: null,
                        args: {
                        },
                        variable: valueObj,
                        stack: __error__.stack,
                        callLine: stackInfo
                    };
                    __DATA__[window.__INDEX__].push(__obj__);
                }
            }
            function _ProcessReturn_(value, O) {
                if (O) {
                    O.returnValue = value;
                }
                return value;
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
            function TRY_CATCH() {
                var __error__ = {};
                // try {
                //     console.log(iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii);
                // }
                // catch (e) {
                //     __error__ = e;
                // }
                __error__ = new Error();
                __error__.stackArray = window.StackTrace.getSync();
                return __error__;
            }
            // 获取堆栈信息以获取父级调用者
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
                    }
                }
                return o;
            }
            var __flag__ = false;
            function SAVE(args) {
                var arguments = args;
                var __error__ = TRY_CATCH();
                if (window.__INDEX__ >= 0) {
                    if (!__DATA__[window.__INDEX__]) {
                        __DATA__[window.__INDEX__] = [];
                    }
                    if (!__flag__) {
                        __flag__ = true;
                        $.ajax({url: __error__.stackArray[0].fileName, type:'GET', dataType: 'text/plain', contentType: 'text/plain', success: function(response) {
                                window.__SOURCE_CODE__ = response;
                                setTimeout(function() {
                                    $(window).trigger('source-code', response);
                                }, 3000);
                            }});
                    }
                    // @todo: 要实现深度克隆复制参数，个人感觉可以对字符串进行克隆就行
                    // arguments.cloneArgs = __DEEPCLONE__(arguments);
                    var __obj__ = {
                        
                        name: arguments.callee && arguments.callee.name,
                        caller: arguments.callee.caller && arguments.callee.caller.name,
                        func: arguments.callee.toString(),
                        // self: this,
                        args: arguments,
                        callLine: {
                            self: __error__.stackArray[2],
                            father: __error__.stackArray[3],
                            stackSource: __error__
                        }
                    };
                    // console.log(__obj__);
                    // console.log(__obj__.name, __obj__.caller, __error__.stack);
                    if (!__obj__.name) {
                        __obj__.name = args.callee && args.callee.prototype.name;
                    }
                    if (!__obj__.caller) {
                        try {
                            __obj__.caller = args.callee.caller && args.callee.caller.prototype.name;
                        }
                        catch (e) {
                            console.log(e);
                        }
                        if (!__obj__.caller) {
                            __obj__.stack = __error__.stack;
                            var anonymousInfo = GET_STACK_PARENT_FUNC(__error__.stack, __obj__.name);
                            var __nameArr__ = anonymousInfo.parentName && anonymousInfo.parentName.split('.') || [];
                            
                            __obj__.caller = __nameArr__[__nameArr__.length - 1] || null;
                            __obj__.anonymousInfo = anonymousInfo;
                        }
                    }
                    if (__obj__.caller === 'anonymous') {
                        __obj__.stack = __error__.stack;
                        var anonymousInfo = GET_STACK_PARENT_FUNC(__error__.stack, __obj__.name);
                        var __nameArr__ = anonymousInfo.parentName && anonymousInfo.parentName.split('.') || [];
        
                        __obj__.caller = __nameArr__[__nameArr__.length - 1] || null;
                        __obj__.anonymousInfo = anonymousInfo;
                    }
                    __DATA__[window.__INDEX__].push(__obj__);
                    __obj__.returnValue = 'no return yet';
                    if (__obj__.name) {
                        __obj__.showedName = 'function: ' + __obj__.name;
                    }
                    return __obj__;
                }
            }
            window.SAVE = SAVE;
            ;;\n` + result;
        return result;
    }
}

module.exports = new Necoo();