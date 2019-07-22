const stacktrace  = require('stacktrace-js');
window.StackTrace = stacktrace;
(function (global, factory) {
    console.log('0000', typeof exports === 'object' && typeof module !== 'undefined');
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.necoo = {}));
}(this, function (exports) {
    function initNecooData() {
        if (typeof window.necooData === 'undefined') {
            window.necooData = [];
        }
        if (!window.necooData[window.necooIndex] && window.necooIndex >= 0) {
            window.necooData[window.necooIndex] = [];
        }
        return window.necooIndex >= 0;
    }

    /**
     * 通过StackTrace获取报错堆栈
     */
    function getStackTrace() {
        var stack = {};
        var error = new Error();
        stack.sourceStack = error.stack;
        stack.stackTrace = window.StackTrace ? window.StackTrace.getSync() : [];
        return stack;
    }

    function getCallerFromSourceStack(sourceStack) {
        // 为什么不用stackTrace.stackTrace呢？好像stackTrace.stackTrace会丢信息
        var callerName = null;
        if (sourceStack) {
            var stackArr = [];
            stackArr = sourceStack.split('  at ');
            if (stackArr[4]) {
                try {
                    callerName = stackArr[4].split('eval at ')[1].split(' ')[0];
                }
                catch (e) {
                }
            }
            // for (var i = 0; i < stackArr.length; i++) {
            //     var nowStack = stackArr[i];
            //
            //     // if (nowStack.indexOf('<anonymous>') > -1 && flag === false) {
            //     //     flag = true;
            //     // }
            //     // else if (nowStack.indexOf('<anonymous>') === -1 && flag === true) {
            //     //     o['type'] = stackArr[i-1].trim().split(' ')[0];
            //     //     o['parentName'] = stackArr[i].trim().split(' ')[0];
            //     //     break;
            //     // }
            // }
        }
        return callerName;
    }
    function getCallerFromTrace(trace) {
        // 数字根据层级来定
        if (trace && trace.length > 3) {
            var calleeTrace = trace[3];

        }
    }
    function necooPush(args) {
        var callStack = {};
        callStack.pushReturn = (returnVal) => {
            callStack.returnVal = returnVal;
            return returnVal;
        };
        if (!initNecooData()) {
            return callStack;
        }
        if (window.necooIndex >= 0) {
            var stackTrace = getStackTrace();
            var calleeName = null;
            var callerName = null;
            try {
                calleeName = args.callee && args.callee.name;
                callerName = args.callee.caller && args.callee.caller.name;
                if (!calleeName) {
                    calleeName = args.callee && args.callee.prototype.name;
                }
                if (!callerName) {
                    callerName = args.callee.caller && args.callee.caller.prototype && args.callee.caller.prototype.name;
                    if (!callerName) {
                        var caller = getCallerFromSourceStack(stackTrace.sourceStack) || stackTrace.stackTrace[3].functionName;
                        if (caller) {
                            callerName = caller;
                        }
                        console.log('------', callerName, caller, stackTrace);
                        // get callerName from stackTrace
                    }
                }
                if (callerName === 'anonymous') {
                    // get callerName from stackTrace
                    var caller = getCallerFromSourceStack(stackTrace.sourceStack) || stackTrace.stackTrace[3].functionName;
                    if (caller) {
                        callerName = caller;
                    }
                    console.log('anonymous', callerName, caller, stackTrace);
                }
                if (callerName === 'Object.<anonymous>') {
                    callerName = stackTrace.stackTrace[4].functionName;
                }
                if (callerName && /\./.test(callerName)) {
                    callerName = callerName.split('.').reverse() && callerName.split('.').reverse()[0]
                }
                callStack = {
                    name: calleeName,
                    showName: 'function: ' + calleeName,
                    caller: callerName,
                    body: args.callee.toString(),
                    arguments: args,
                    callerInfo: {
                        stackTrace: stackTrace,
                        father: stackTrace && typeof stackTrace.stackTrace[3] !== 'undefined' ? stackTrace.stackTrace[3] : null,
                        self: stackTrace && typeof stackTrace.stackTrace[2] !== 'undefined' ? stackTrace.stackTrace[2] : null,
                    }
                };
                callStack.pushReturn = (returnVal) => {
                    callStack.returnVal = returnVal;
                    return returnVal;
                };
                window.necooData[window.necooIndex].push(callStack);
            }
            catch (e) {
                console.log('sorry for error', e);
            }
        }
        return callStack;
    }
    exports.necooPush = necooPush;
    if (window) {
        window.necooPush = necooPush;
    }
}));

