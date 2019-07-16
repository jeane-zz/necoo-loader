/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../src/mobx/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/_error-stack-parser@2.0.2@error-stack-parser/error-stack-parser.js":
/*!***************************************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_error-stack-parser@2.0.2@error-stack-parser/error-stack-parser.js ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

  /* istanbul ignore next */
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! stackframe */ "../../node_modules/_stackframe@1.0.4@stackframe/stackframe.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function ErrorStackParser(StackFrame) {
  var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
  var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
  var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;
  return {
    /**
     * Given an Error object, extract the most information from it.
     *
     * @param {Error} error object
     * @return {Array} of StackFrames
     */
    parse: function ErrorStackParser$$parse(error) {
      if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
        return this.parseOpera(error);
      } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
        return this.parseV8OrIE(error);
      } else if (error.stack) {
        return this.parseFFOrSafari(error);
      } else {
        throw new Error('Cannot parse given Error object');
      }
    },
    // Separate line and column numbers from a string of the form: (URI:Line:Column)
    extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
      // Fail-fast but return locations like "(native)"
      if (urlLike.indexOf(':') === -1) {
        return [urlLike];
      }

      var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
      var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
      return [parts[1], parts[2] || undefined, parts[3] || undefined];
    },
    parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
      var filtered = error.stack.split('\n').filter(function (line) {
        return !!line.match(CHROME_IE_STACK_REGEXP);
      }, this);
      return filtered.map(function (line) {
        if (line.indexOf('(eval ') > -1) {
          // Throw away eval information until we implement stacktrace.js/stackframe#8
          line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
        }

        var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
        var locationParts = this.extractLocation(tokens.pop());
        var functionName = tokens.join(' ') || undefined;
        var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];
        return new StackFrame({
          functionName: functionName,
          fileName: fileName,
          lineNumber: locationParts[1],
          columnNumber: locationParts[2],
          source: line
        });
      }, this);
    },
    parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
      var filtered = error.stack.split('\n').filter(function (line) {
        return !line.match(SAFARI_NATIVE_CODE_REGEXP);
      }, this);
      return filtered.map(function (line) {
        // Throw away eval information until we implement stacktrace.js/stackframe#8
        if (line.indexOf(' > eval') > -1) {
          line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
        }

        if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
          // Safari eval frames only have function names and nothing else
          return new StackFrame({
            functionName: line
          });
        } else {
          var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
          var matches = line.match(functionNameRegex);
          var functionName = matches && matches[1] ? matches[1] : undefined;
          var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));
          return new StackFrame({
            functionName: functionName,
            fileName: locationParts[0],
            lineNumber: locationParts[1],
            columnNumber: locationParts[2],
            source: line
          });
        }
      }, this);
    },
    parseOpera: function ErrorStackParser$$parseOpera(e) {
      if (!e.stacktrace || e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
        return this.parseOpera9(e);
      } else if (!e.stack) {
        return this.parseOpera10(e);
      } else {
        return this.parseOpera11(e);
      }
    },
    parseOpera9: function ErrorStackParser$$parseOpera9(e) {
      var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
      var lines = e.message.split('\n');
      var result = [];

      for (var i = 2, len = lines.length; i < len; i += 2) {
        var match = lineRE.exec(lines[i]);

        if (match) {
          result.push(new StackFrame({
            fileName: match[2],
            lineNumber: match[1],
            source: lines[i]
          }));
        }
      }

      return result;
    },
    parseOpera10: function ErrorStackParser$$parseOpera10(e) {
      var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
      var lines = e.stacktrace.split('\n');
      var result = [];

      for (var i = 0, len = lines.length; i < len; i += 2) {
        var match = lineRE.exec(lines[i]);

        if (match) {
          result.push(new StackFrame({
            functionName: match[3] || undefined,
            fileName: match[2],
            lineNumber: match[1],
            source: lines[i]
          }));
        }
      }

      return result;
    },
    // Opera 10.65+ Error.stack very similar to FF/Safari
    parseOpera11: function ErrorStackParser$$parseOpera11(error) {
      var filtered = error.stack.split('\n').filter(function (line) {
        return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
      }, this);
      return filtered.map(function (line) {
        var tokens = line.split('@');
        var locationParts = this.extractLocation(tokens.pop());
        var functionCall = tokens.shift() || '';
        var functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, '$2').replace(/\([^\)]*\)/g, '') || undefined;
        var argsRaw;

        if (functionCall.match(/\(([^\)]*)\)/)) {
          argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
        }

        var args = argsRaw === undefined || argsRaw === '[arguments not available]' ? undefined : argsRaw.split(',');
        return new StackFrame({
          functionName: functionName,
          args: args,
          fileName: locationParts[0],
          lineNumber: locationParts[1],
          columnNumber: locationParts[2],
          source: line
        });
      }, this);
    }
  };
});

/***/ }),

/***/ "../../node_modules/_mobx@5.11.0@mobx/lib/mobx.module.js":
/*!*********************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_mobx@5.11.0@mobx/lib/mobx.module.js ***!
  \*********************************************************************************************************/
/*! exports provided: $mobx, IDerivationState, ObservableMap, ObservableSet, Reaction, _allowStateChanges, _allowStateChangesInsideComputed, _getAdministration, _getGlobalState, _interceptReads, _isComputingDerivation, _resetGlobalState, action, autorun, comparer, computed, configure, createAtom, decorate, entries, extendObservable, flow, get, getAtom, getDebugName, getDependencyTree, getObserverTree, has, intercept, isAction, isArrayLike, isBoxedObservable, isComputed, isComputedProp, isObservable, isObservableArray, isObservableMap, isObservableObject, isObservableProp, isObservableSet, keys, observable, observe, onBecomeObserved, onBecomeUnobserved, onReactionError, reaction, remove, runInAction, set, spy, toJS, trace, transaction, untracked, values, when */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process, global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$mobx", function() { return $mobx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IDerivationState", function() { return IDerivationState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableMap", function() { return ObservableMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableSet", function() { return ObservableSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reaction", function() { return Reaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_allowStateChanges", function() { return allowStateChanges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_allowStateChangesInsideComputed", function() { return allowStateChangesInsideComputed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getAdministration", function() { return getAdministration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getGlobalState", function() { return getGlobalState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_interceptReads", function() { return interceptReads; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_isComputingDerivation", function() { return isComputingDerivation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_resetGlobalState", function() { return resetGlobalState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "action", function() { return action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autorun", function() { return autorun; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comparer", function() { return comparer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computed", function() { return computed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configure", function() { return configure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAtom", function() { return createAtom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decorate", function() { return decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "entries", function() { return entries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendObservable", function() { return extendObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flow", function() { return flow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAtom", function() { return getAtom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDebugName", function() { return getDebugName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDependencyTree", function() { return getDependencyTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getObserverTree", function() { return getObserverTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has", function() { return has; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intercept", function() { return intercept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAction", function() { return isAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArrayLike", function() { return isArrayLike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoxedObservable", function() { return isObservableValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isComputed", function() { return isComputed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isComputedProp", function() { return isComputedProp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservable", function() { return isObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableArray", function() { return isObservableArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableMap", function() { return isObservableMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableObject", function() { return isObservableObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableProp", function() { return isObservableProp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableSet", function() { return isObservableSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observable", function() { return observable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observe", function() { return observe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onBecomeObserved", function() { return onBecomeObserved; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onBecomeUnobserved", function() { return onBecomeUnobserved; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onReactionError", function() { return onReactionError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reaction", function() { return reaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runInAction", function() { return runInAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spy", function() { return spy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toJS", function() { return toJS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trace", function() { return trace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transaction", function() { return transaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "untracked", function() { return untracked; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "values", function() { return values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "when", function() { return when; });
const stacktrace = __webpack_require__(/*! stacktrace-js */ "../../node_modules/_stacktrace-js@2.0.0@stacktrace-js/stacktrace.js");

window.StackTrace = stacktrace;

(function (global, factory) {
  console.log('0000', typeof exports === 'object' && typeof module !== 'undefined');
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && __webpack_require__(/*! !webpack amd options */ "../../node_modules/_webpack@4.35.3@webpack/buildin/amd-options.js") ? define(['exports'], factory) : (global = global || self, factory(global.necoo = {}));
})(undefined, function (exports) {
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
    var callerName = null;

    if (sourceStack) {
      var stackArr = [];

      if (sourceStack) {
        stackArr = sourceStack.split('  at ');

        if (stackArr[4]) {
          try {
            callerName = stackArr[4].split('eval at ')[1].split(' ')[0];
          } catch (e) {}
        }
      } // for (var i = 0; i < stackArr.length; i++) {
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

  function necooPushCallStack(args) {
    if (!initNecooData()) {
      return;
    }

    var callStack;

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
          callerName = args.callee.caller && args.callee.caller.prototype.name;

          if (!callerName) {
            var caller = getCallerFromSourceStack(stackTrace.sourceStack) || stackTrace.stackTrace[3].functionName;

            if (caller) {
              callerName = caller;
            }

            console.log('------', callerName, caller, stackTrace); // get callerName from stackTrace
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

        callStack = {
          name: calleeName,
          showName: 'function: ' + calleeName,
          caller: callerName,
          body: args.callee.toString(),
          arguments: args,
          callerInfo: {
            stackTrace: stackTrace,
            father: stackTrace && typeof stackTrace.stackTrace[3] !== 'undefined' ? stackTrace.stackTrace[3] : null,
            self: stackTrace && typeof stackTrace.stackTrace[2] !== 'undefined' ? stackTrace.stackTrace[2] : null
          }
        };
        window.necooData[window.necooIndex].push(callStack);
      } catch (e) {
        console.log('sorry for error', e);
      }
    }

    return callStack || {};
  }

  exports.necooPushCallStack = necooPushCallStack;

  if (window) {
    window.necooPushCallStack = necooPushCallStack;
  }
});
/** MobX - (c) Michel Weststrate 2015 - 2019 - MIT Licensed */

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */


var extendStatics = function _anonymous_1(d, b) {
  var necooData = window.necooPushCallStack(arguments);

  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function _anonymous_2(d, b) {
    var necooData = window.necooPushCallStack(arguments);
    d.__proto__ = b;
  } || function _anonymous_3(d, b) {
    var necooData = window.necooPushCallStack(arguments);

    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  var necooData = window.necooPushCallStack(arguments);
  extendStatics(d, b);

  function __() {
    var necooData = window.necooPushCallStack(arguments);
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function _anonymous_4() {
  var necooData = window.necooPushCallStack(arguments);

  __assign = Object.assign || function __assign(t) {
    var necooData = window.necooPushCallStack(arguments);

    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function __values(o) {
  var necooData = window.necooPushCallStack(arguments);
  var m = typeof Symbol === "function" && o[Symbol.iterator],
      i = 0;
  if (m) return m.call(o);
  return {
    next: function _anonymous_5() {
      var necooData = window.necooPushCallStack(arguments);
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
}

function __read(o, n) {
  var necooData = window.necooPushCallStack(arguments);
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}

function __spread() {
  var necooData = window.necooPushCallStack(arguments);

  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}

var OBFUSCATED_ERROR = "An invariant failed, however the error is obfuscated because this is an production build.";
var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
var EMPTY_OBJECT = {};
Object.freeze(EMPTY_OBJECT);

function getNextId() {
  var necooData = window.necooPushCallStack(arguments);
  return ++globalState.mobxGuid;
}

function fail(message) {
  var necooData = window.necooPushCallStack(arguments);
  invariant(false, message);
  throw "X"; // unreachable
}

function invariant(check, message) {
  var necooData = window.necooPushCallStack(arguments);
  if (!check) throw new Error("[mobx] " + (message || OBFUSCATED_ERROR));
}
/**
 * Prints a deprecation message, but only one time.
 * Returns false if the deprecated message was already printed before
 */


var deprecatedMessages = [];

function deprecated(msg, thing) {
  var necooData = window.necooPushCallStack(arguments);
  if (false) {}

  if (thing) {
    return deprecated("'" + msg + "', use '" + thing + "' instead.");
  }

  if (deprecatedMessages.indexOf(msg) !== -1) return false;
  deprecatedMessages.push(msg);
  console.error("[mobx] Deprecated: " + msg);
  return true;
}
/**
 * Makes sure that the provided function is invoked at most once.
 */


function once(func) {
  var necooData = window.necooPushCallStack(arguments);
  var invoked = false;
  return function _anonymous_6() {
    var necooData = window.necooPushCallStack(arguments);
    if (invoked) return;
    invoked = true;
    return func.apply(this, arguments);
  };
}

var noop = function _anonymous_7() {
  var necooData = window.necooPushCallStack(arguments);
};

function unique(list) {
  var necooData = window.necooPushCallStack(arguments);
  var res = [];
  list.forEach(function _anonymous_8(item) {
    var necooData = window.necooPushCallStack(arguments);
    if (res.indexOf(item) === -1) res.push(item);
  });
  return res;
}

function isObject(value) {
  var necooData = window.necooPushCallStack(arguments);
  return value !== null && typeof value === "object";
}

function isPlainObject(value) {
  var necooData = window.necooPushCallStack(arguments);
  if (value === null || typeof value !== "object") return false;
  var proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function addHiddenProp(object, propName, value) {
  var necooData = window.necooPushCallStack(arguments);
  Object.defineProperty(object, propName, {
    enumerable: false,
    writable: true,
    configurable: true,
    value: value
  });
}

function addHiddenFinalProp(object, propName, value) {
  var necooData = window.necooPushCallStack(arguments);
  Object.defineProperty(object, propName, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: value
  });
}

function isPropertyConfigurable(object, prop) {
  var necooData = window.necooPushCallStack(arguments);
  var descriptor = Object.getOwnPropertyDescriptor(object, prop);
  return !descriptor || descriptor.configurable !== false && descriptor.writable !== false;
}

function assertPropertyConfigurable(object, prop) {
  var necooData = window.necooPushCallStack(arguments);
  if ( true && !isPropertyConfigurable(object, prop)) fail("Cannot make property '" + prop.toString() + "' observable, it is not configurable and writable in the target object");
}

function createInstanceofPredicate(name, clazz) {
  var necooData = window.necooPushCallStack(arguments);
  var propName = "isMobX" + name;
  clazz.prototype[propName] = true;
  return function _anonymous_9(x) {
    var necooData = window.necooPushCallStack(arguments);
    return isObject(x) && x[propName] === true;
  };
}
/**
 * Returns whether the argument is an array, disregarding observability.
 */


function isArrayLike(x) {
  var necooData = window.necooPushCallStack(arguments);
  return Array.isArray(x) || isObservableArray(x);
}

function isES6Map(thing) {
  var necooData = window.necooPushCallStack(arguments);
  return thing instanceof Map;
}

function isES6Set(thing) {
  var necooData = window.necooPushCallStack(arguments);
  return thing instanceof Set;
}
/**
 * Returns the following: own keys, prototype keys & own symbol keys, if they are enumerable.
 */


function getPlainObjectKeys(object) {
  var necooData = window.necooPushCallStack(arguments);
  var enumerables = new Set();

  for (var key in object) enumerables.add(key); // *all* enumerables


  Object.getOwnPropertySymbols(object).forEach(function _anonymous_10(k) {
    var necooData = window.necooPushCallStack(arguments);
    if (Object.getOwnPropertyDescriptor(object, k).enumerable) enumerables.add(k);
  }); // *own* symbols
  // Note: this implementation is missing enumerable, inherited, symbolic property names! That would however pretty expensive to add,
  // as there is no efficient iterator that returns *all* properties

  return Array.from(enumerables);
}

function stringifyKey(key) {
  var necooData = window.necooPushCallStack(arguments);
  if (key && key.toString) return key.toString();else return new String(key).toString();
}

function getMapLikeKeys(map) {
  var necooData = window.necooPushCallStack(arguments);
  if (isPlainObject(map)) return Object.keys(map);
  if (Array.isArray(map)) return map.map(function _anonymous_11(_a) {
    var necooData = window.necooPushCallStack(arguments);

    var _b = __read(_a, 1),
        key = _b[0];

    return key;
  });
  if (isES6Map(map) || isObservableMap(map)) return Array.from(map.keys());
  return fail("Cannot get keys from '" + map + "'");
}

function toPrimitive(value) {
  var necooData = window.necooPushCallStack(arguments);
  return value === null ? null : typeof value === "object" ? "" + value : value;
}

var $mobx = Symbol("mobx administration");

var Atom =
/** @class */
function _anonymous_12() {
  var necooData = window.necooPushCallStack(arguments);
  /**
   * Create a new atom. For debugging purposes it is recommended to give it a name.
   * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
   */

  function Atom(name) {
    var necooData = window.necooPushCallStack(arguments);

    if (name === void 0) {
      name = "Atom@" + getNextId();
    }

    this.name = name;
    this.isPendingUnobservation = false; // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed

    this.isBeingObserved = false;
    this.observers = new Set();
    this.diffValue = 0;
    this.lastAccessedBy = 0;
    this.lowestObserverState = IDerivationState.NOT_TRACKING;
  }

  Atom.prototype.onBecomeObserved = function _anonymous_13() {
    var necooData = window.necooPushCallStack(arguments);

    if (this.onBecomeObservedListeners) {
      this.onBecomeObservedListeners.forEach(function _anonymous_14(listener) {
        var necooData = window.necooPushCallStack(arguments);
        return listener();
      });
    }
  };

  Atom.prototype.onBecomeUnobserved = function _anonymous_15() {
    var necooData = window.necooPushCallStack(arguments);

    if (this.onBecomeUnobservedListeners) {
      this.onBecomeUnobservedListeners.forEach(function _anonymous_16(listener) {
        var necooData = window.necooPushCallStack(arguments);
        return listener();
      });
    }
  };
  /**
   * Invoke this method to notify mobx that your atom has been used somehow.
   * Returns true if there is currently a reactive context.
   */


  Atom.prototype.reportObserved = function _anonymous_17() {
    var necooData = window.necooPushCallStack(arguments);
    return reportObserved(this);
  };
  /**
   * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
   */


  Atom.prototype.reportChanged = function _anonymous_18() {
    var necooData = window.necooPushCallStack(arguments);
    startBatch();
    propagateChanged(this);
    endBatch();
  };

  Atom.prototype.toString = function _anonymous_19() {
    var necooData = window.necooPushCallStack(arguments);
    return this.name;
  };

  return Atom;
}();

var isAtom = createInstanceofPredicate("Atom", Atom);

function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
  var necooData = window.necooPushCallStack(arguments);

  if (onBecomeObservedHandler === void 0) {
    onBecomeObservedHandler = noop;
  }

  if (onBecomeUnobservedHandler === void 0) {
    onBecomeUnobservedHandler = noop;
  }

  var atom = new Atom(name); // default `noop` listener will not initialize the hook Set

  if (onBecomeObservedHandler !== noop) {
    onBecomeObserved(atom, onBecomeObservedHandler);
  }

  if (onBecomeUnobservedHandler !== noop) {
    onBecomeUnobserved(atom, onBecomeUnobservedHandler);
  }

  return atom;
}

function identityComparer(a, b) {
  var necooData = window.necooPushCallStack(arguments);
  return a === b;
}

function structuralComparer(a, b) {
  var necooData = window.necooPushCallStack(arguments);
  return deepEqual(a, b);
}

function defaultComparer(a, b) {
  var necooData = window.necooPushCallStack(arguments);
  return Object.is(a, b);
}

var comparer = {
  identity: identityComparer,
  structural: structuralComparer,
  default: defaultComparer
};
var mobxDidRunLazyInitializersSymbol = Symbol("mobx did run lazy initializers");
var mobxPendingDecorators = Symbol("mobx pending decorators");
var enumerableDescriptorCache = {};
var nonEnumerableDescriptorCache = {};

function createPropertyInitializerDescriptor(prop, enumerable) {
  var necooData = window.necooPushCallStack(arguments);
  var cache = enumerable ? enumerableDescriptorCache : nonEnumerableDescriptorCache;
  return cache[prop] || (cache[prop] = {
    configurable: true,
    enumerable: enumerable,
    get: function _anonymous_20() {
      var necooData = window.necooPushCallStack(arguments);
      initializeInstance(this);
      return this[prop];
    },
    set: function _anonymous_21(value) {
      var necooData = window.necooPushCallStack(arguments);
      initializeInstance(this);
      this[prop] = value;
    }
  });
}

function initializeInstance(target) {
  var necooData = window.necooPushCallStack(arguments);
  if (target[mobxDidRunLazyInitializersSymbol] === true) return;
  var decorators = target[mobxPendingDecorators];

  if (decorators) {
    addHiddenProp(target, mobxDidRunLazyInitializersSymbol, true);

    for (var key in decorators) {
      var d = decorators[key];
      d.propertyCreator(target, d.prop, d.descriptor, d.decoratorTarget, d.decoratorArguments);
    }
  }
}

function createPropDecorator(propertyInitiallyEnumerable, propertyCreator) {
  var necooData = window.necooPushCallStack(arguments);
  return function decoratorFactory() {
    var necooData = window.necooPushCallStack(arguments);
    var decoratorArguments;

    var decorator = function decorate(target, prop, descriptor, applyImmediately // This is a special parameter to signal the direct application of a decorator, allow extendObservable to skip the entire type decoration part,
    // as the instance to apply the decorator to equals the target
    ) {
      var necooData = window.necooPushCallStack(arguments);

      if (applyImmediately === true) {
        propertyCreator(target, prop, descriptor, target, decoratorArguments);
        return null;
      }

      if ( true && !quacksLikeADecorator(arguments)) fail("This function is a decorator, but it wasn't invoked like a decorator");

      if (!Object.prototype.hasOwnProperty.call(target, mobxPendingDecorators)) {
        var inheritedDecorators = target[mobxPendingDecorators];
        addHiddenProp(target, mobxPendingDecorators, __assign({}, inheritedDecorators));
      }

      target[mobxPendingDecorators][prop] = {
        prop: prop,
        propertyCreator: propertyCreator,
        descriptor: descriptor,
        decoratorTarget: target,
        decoratorArguments: decoratorArguments
      };
      return createPropertyInitializerDescriptor(prop, propertyInitiallyEnumerable);
    };

    if (quacksLikeADecorator(arguments)) {
      // @decorator
      decoratorArguments = EMPTY_ARRAY;
      return decorator.apply(null, arguments);
    } else {
      // @decorator(args)
      decoratorArguments = Array.prototype.slice.call(arguments);
      return decorator;
    }
  };
}

function quacksLikeADecorator(args) {
  var necooData = window.necooPushCallStack(arguments);
  return (args.length === 2 || args.length === 3) && typeof args[1] === "string" || args.length === 4 && args[3] === true;
}

function deepEnhancer(v, _, name) {
  var necooData = window.necooPushCallStack(arguments); // it is an observable already, done

  if (isObservable(v)) return v; // something that can be converted and mutated?

  if (Array.isArray(v)) return observable.array(v, {
    name: name
  });
  if (isPlainObject(v)) return observable.object(v, undefined, {
    name: name
  });
  if (isES6Map(v)) return observable.map(v, {
    name: name
  });
  if (isES6Set(v)) return observable.set(v, {
    name: name
  });
  return v;
}

function shallowEnhancer(v, _, name) {
  var necooData = window.necooPushCallStack(arguments);
  if (v === undefined || v === null) return v;
  if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v) || isObservableSet(v)) return v;
  if (Array.isArray(v)) return observable.array(v, {
    name: name,
    deep: false
  });
  if (isPlainObject(v)) return observable.object(v, undefined, {
    name: name,
    deep: false
  });
  if (isES6Map(v)) return observable.map(v, {
    name: name,
    deep: false
  });
  if (isES6Set(v)) return observable.set(v, {
    name: name,
    deep: false
  });
  return fail( true && "The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
}

function referenceEnhancer(newValue) {
  var necooData = window.necooPushCallStack(arguments); // never turn into an observable

  return newValue;
}

function refStructEnhancer(v, oldValue, name) {
  var necooData = window.necooPushCallStack(arguments);
  if ( true && isObservable(v)) throw "observable.struct should not be used with observable values";
  if (deepEqual(v, oldValue)) return oldValue;
  return v;
}

function createDecoratorForEnhancer(enhancer) {
  var necooData = window.necooPushCallStack(arguments);
  invariant(enhancer);
  var decorator = createPropDecorator(true, function _anonymous_22(target, propertyName, descriptor, _decoratorTarget, decoratorArgs) {
    var necooData = window.necooPushCallStack(arguments);

    if (true) {
      invariant(!descriptor || !descriptor.get, "@observable cannot be used on getter (property \"" + stringifyKey(propertyName) + "\"), use @computed instead.");
    }

    var initialValue = descriptor ? descriptor.initializer ? descriptor.initializer.call(target) : descriptor.value : undefined;
    asObservableObject(target).addObservableProp(propertyName, initialValue, enhancer);
  });
  var res = // Extra process checks, as this happens during module initialization
  typeof process !== "undefined" && process.env && "development" !== "production" ? function observableDecorator() {
    var necooData = window.necooPushCallStack(arguments); // This wrapper function is just to detect illegal decorator invocations, deprecate in a next version
    // and simply return the created prop decorator

    if (arguments.length < 2) return fail("Incorrect decorator invocation. @observable decorator doesn't expect any arguments");
    return decorator.apply(null, arguments);
  } : decorator;
  res.enhancer = enhancer;
  return res;
} // Predefined bags of create observable options, to avoid allocating temporarily option objects
// in the majority of cases


var defaultCreateObservableOptions = {
  deep: true,
  name: undefined,
  defaultDecorator: undefined,
  proxy: true
};
Object.freeze(defaultCreateObservableOptions);

function assertValidOption(key) {
  var necooData = window.necooPushCallStack(arguments);
  if (!/^(deep|name|equals|defaultDecorator|proxy)$/.test(key)) fail("invalid option for (extend)observable: " + key);
}

function asCreateObservableOptions(thing) {
  var necooData = window.necooPushCallStack(arguments);
  if (thing === null || thing === undefined) return defaultCreateObservableOptions;
  if (typeof thing === "string") return {
    name: thing,
    deep: true,
    proxy: true
  };

  if (true) {
    if (typeof thing !== "object") return fail("expected options object");
    Object.keys(thing).forEach(assertValidOption);
  }

  return thing;
}

var deepDecorator = createDecoratorForEnhancer(deepEnhancer);
var shallowDecorator = createDecoratorForEnhancer(shallowEnhancer);
var refDecorator = createDecoratorForEnhancer(referenceEnhancer);
var refStructDecorator = createDecoratorForEnhancer(refStructEnhancer);

function getEnhancerFromOptions(options) {
  var necooData = window.necooPushCallStack(arguments);
  return options.defaultDecorator ? options.defaultDecorator.enhancer : options.deep === false ? referenceEnhancer : deepEnhancer;
}
/**
 * Turns an object, array or function into a reactive structure.
 * @param v the value which should become observable.
 */


function createObservable(v, arg2, arg3) {
  var necooData = window.necooPushCallStack(arguments); // @observable someProp;

  if (typeof arguments[1] === "string") {
    return deepDecorator.apply(null, arguments);
  } // it is an observable already, done


  if (isObservable(v)) return v; // something that can be converted and mutated?

  var res = isPlainObject(v) ? observable.object(v, arg2, arg3) : Array.isArray(v) ? observable.array(v, arg2) : isES6Map(v) ? observable.map(v, arg2) : isES6Set(v) ? observable.set(v, arg2) : v; // this value could be converted to a new observable data structure, return it

  if (res !== v) return res; // otherwise, just box it

  fail( true && "The provided value could not be converted into an observable. If you want just create an observable reference to the object use 'observable.box(value)'");
}

var observableFactories = {
  box: function _anonymous_23(value, options) {
    var necooData = window.necooPushCallStack(arguments);
    if (arguments.length > 2) incorrectlyUsedAsDecorator("box");
    var o = asCreateObservableOptions(options);
    return new ObservableValue(value, getEnhancerFromOptions(o), o.name, true, o.equals);
  },
  array: function _anonymous_24(initialValues, options) {
    var necooData = window.necooPushCallStack(arguments);
    if (arguments.length > 2) incorrectlyUsedAsDecorator("array");
    var o = asCreateObservableOptions(options);
    return createObservableArray(initialValues, getEnhancerFromOptions(o), o.name);
  },
  map: function _anonymous_25(initialValues, options) {
    var necooData = window.necooPushCallStack(arguments);
    if (arguments.length > 2) incorrectlyUsedAsDecorator("map");
    var o = asCreateObservableOptions(options);
    return new ObservableMap(initialValues, getEnhancerFromOptions(o), o.name);
  },
  set: function _anonymous_26(initialValues, options) {
    var necooData = window.necooPushCallStack(arguments);
    if (arguments.length > 2) incorrectlyUsedAsDecorator("set");
    var o = asCreateObservableOptions(options);
    return new ObservableSet(initialValues, getEnhancerFromOptions(o), o.name);
  },
  object: function _anonymous_27(props, decorators, options) {
    var necooData = window.necooPushCallStack(arguments);
    if (typeof arguments[1] === "string") incorrectlyUsedAsDecorator("object");
    var o = asCreateObservableOptions(options);

    if (o.proxy === false) {
      return extendObservable({}, props, decorators, o);
    } else {
      var defaultDecorator = getDefaultDecoratorFromObjectOptions(o);
      var base = extendObservable({}, undefined, undefined, o);
      var proxy = createDynamicObservableObject(base);
      extendObservableObjectWithProperties(proxy, props, decorators, defaultDecorator);
      return proxy;
    }
  },
  ref: refDecorator,
  shallow: shallowDecorator,
  deep: deepDecorator,
  struct: refStructDecorator
};
var observable = createObservable; // weird trick to keep our typings nicely with our funcs, and still extend the observable function

Object.keys(observableFactories).forEach(function _anonymous_28(name) {
  var necooData = window.necooPushCallStack(arguments);
  return observable[name] = observableFactories[name];
});

function incorrectlyUsedAsDecorator(methodName) {
  var necooData = window.necooPushCallStack(arguments);
  fail( // process.env.NODE_ENV !== "production" &&
  "Expected one or two arguments to observable." + methodName + ". Did you accidentally try to use observable." + methodName + " as decorator?");
}

var computedDecorator = createPropDecorator(false, function _anonymous_29(instance, propertyName, descriptor, decoratorTarget, decoratorArgs) {
  var necooData = window.necooPushCallStack(arguments);
  var get = descriptor.get,
      set = descriptor.set; // initialValue is the descriptor for get / set props
  // Optimization: faster on decorator target or instance? Assuming target
  // Optimization: find out if declaring on instance isn't just faster. (also makes the property descriptor simpler). But, more memory usage..
  // Forcing instance now, fixes hot reloadig issues on React Native:

  var options = decoratorArgs[0] || {};
  asObservableObject(instance).addComputedProp(instance, propertyName, __assign({
    get: get,
    set: set,
    context: instance
  }, options));
});
var computedStructDecorator = computedDecorator({
  equals: comparer.structural
});
/**
 * Decorator for class properties: @computed get value() { return expr; }.
 * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
 */

var computed = function computed(arg1, arg2, arg3) {
  var necooData = window.necooPushCallStack(arguments);

  if (typeof arg2 === "string") {
    // @computed
    return computedDecorator.apply(null, arguments);
  }

  if (arg1 !== null && typeof arg1 === "object" && arguments.length === 1) {
    // @computed({ options })
    return computedDecorator.apply(null, arguments);
  } // computed(expr, options?)


  if (true) {
    invariant(typeof arg1 === "function", "First argument to `computed` should be an expression.");
    invariant(arguments.length < 3, "Computed takes one or two arguments if used as function");
  }

  var opts = typeof arg2 === "object" ? arg2 : {};
  opts.get = arg1;
  opts.set = typeof arg2 === "function" ? arg2 : opts.set;
  opts.name = opts.name || arg1.name || "";
  /* for generated name */

  return new ComputedValue(opts);
};

computed.struct = computedStructDecorator;

function createAction(actionName, fn, ref) {
  var necooData = window.necooPushCallStack(arguments);

  if (true) {
    invariant(typeof fn === "function", "`action` can only be invoked on functions");
    if (typeof actionName !== "string" || !actionName) fail("actions should have valid names, got: '" + actionName + "'");
  }

  var res = function _anonymous_30() {
    var necooData = window.necooPushCallStack(arguments);
    return executeAction(actionName, fn, ref || this, arguments);
  };

  res.isMobxAction = true;
  return res;
}

function executeAction(actionName, fn, scope, args) {
  var necooData = window.necooPushCallStack(arguments);
  var runInfo = startAction(actionName, fn, scope, args);
  var shouldSupressReactionError = true;

  try {
    var res = fn.apply(scope, args);
    shouldSupressReactionError = false;
    return res;
  } finally {
    if (shouldSupressReactionError) {
      globalState.suppressReactionErrors = shouldSupressReactionError;
      endAction(runInfo);
      globalState.suppressReactionErrors = false;
    } else {
      endAction(runInfo);
    }
  }
}

function startAction(actionName, fn, scope, args) {
  var necooData = window.necooPushCallStack(arguments);
  var notifySpy = isSpyEnabled() && !!actionName;
  var startTime = 0;

  if (notifySpy && "development" !== "production") {
    startTime = Date.now();
    var l = args && args.length || 0;
    var flattendArgs = new Array(l);
    if (l > 0) for (var i = 0; i < l; i++) flattendArgs[i] = args[i];
    spyReportStart({
      type: "action",
      name: actionName,
      object: scope,
      arguments: flattendArgs
    });
  }

  var prevDerivation = untrackedStart();
  startBatch();
  var prevAllowStateChanges = allowStateChangesStart(true);
  return {
    prevDerivation: prevDerivation,
    prevAllowStateChanges: prevAllowStateChanges,
    notifySpy: notifySpy,
    startTime: startTime
  };
}

function endAction(runInfo) {
  var necooData = window.necooPushCallStack(arguments);
  allowStateChangesEnd(runInfo.prevAllowStateChanges);
  endBatch();
  untrackedEnd(runInfo.prevDerivation);
  if (runInfo.notifySpy && "development" !== "production") spyReportEnd({
    time: Date.now() - runInfo.startTime
  });
}

function allowStateChanges(allowStateChanges, func) {
  var necooData = window.necooPushCallStack(arguments);
  var prev = allowStateChangesStart(allowStateChanges);
  var res;

  try {
    res = func();
  } finally {
    allowStateChangesEnd(prev);
  }

  return res;
}

function allowStateChangesStart(allowStateChanges) {
  var necooData = window.necooPushCallStack(arguments);
  var prev = globalState.allowStateChanges;
  globalState.allowStateChanges = allowStateChanges;
  return prev;
}

function allowStateChangesEnd(prev) {
  var necooData = window.necooPushCallStack(arguments);
  globalState.allowStateChanges = prev;
}

function allowStateChangesInsideComputed(func) {
  var necooData = window.necooPushCallStack(arguments);
  var prev = globalState.computationDepth;
  globalState.computationDepth = 0;
  var res;

  try {
    res = func();
  } finally {
    globalState.computationDepth = prev;
  }

  return res;
}

var ObservableValue =
/** @class */
function _anonymous_31(_super) {
  var necooData = window.necooPushCallStack(arguments);

  __extends(ObservableValue, _super);

  function ObservableValue(value, enhancer, name, notifySpy, equals) {
    var necooData = window.necooPushCallStack(arguments);

    if (name === void 0) {
      name = "ObservableValue@" + getNextId();
    }

    if (notifySpy === void 0) {
      notifySpy = true;
    }

    if (equals === void 0) {
      equals = comparer.default;
    }

    var _this = _super.call(this, name) || this;

    _this.enhancer = enhancer;
    _this.name = name;
    _this.equals = equals;
    _this.hasUnreportedChange = false;
    _this.value = enhancer(value, undefined, name);

    if (notifySpy && isSpyEnabled() && "development" !== "production") {
      // only notify spy if this is a stand-alone observable
      spyReport({
        type: "create",
        name: _this.name,
        newValue: "" + _this.value
      });
    }

    return _this;
  }

  ObservableValue.prototype.dehanceValue = function _anonymous_32(value) {
    var necooData = window.necooPushCallStack(arguments);
    if (this.dehancer !== undefined) return this.dehancer(value);
    return value;
  };

  ObservableValue.prototype.set = function _anonymous_33(newValue) {
    var necooData = window.necooPushCallStack(arguments);
    var oldValue = this.value;
    newValue = this.prepareNewValue(newValue);

    if (newValue !== globalState.UNCHANGED) {
      var notifySpy = isSpyEnabled();

      if (notifySpy && "development" !== "production") {
        spyReportStart({
          type: "update",
          name: this.name,
          newValue: newValue,
          oldValue: oldValue
        });
      }

      this.setNewValue(newValue);
      if (notifySpy && "development" !== "production") spyReportEnd();
    }
  };

  ObservableValue.prototype.prepareNewValue = function _anonymous_34(newValue) {
    var necooData = window.necooPushCallStack(arguments);
    checkIfStateModificationsAreAllowed(this);

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this,
        type: "update",
        newValue: newValue
      });
      if (!change) return globalState.UNCHANGED;
      newValue = change.newValue;
    } // apply modifier


    newValue = this.enhancer(newValue, this.value, this.name);
    return this.equals(this.value, newValue) ? globalState.UNCHANGED : newValue;
  };

  ObservableValue.prototype.setNewValue = function _anonymous_35(newValue) {
    var necooData = window.necooPushCallStack(arguments);
    var oldValue = this.value;
    this.value = newValue;
    this.reportChanged();

    if (hasListeners(this)) {
      notifyListeners(this, {
        type: "update",
        object: this,
        newValue: newValue,
        oldValue: oldValue
      });
    }
  };

  ObservableValue.prototype.get = function _anonymous_36() {
    var necooData = window.necooPushCallStack(arguments);
    this.reportObserved();
    return this.dehanceValue(this.value);
  };

  ObservableValue.prototype.intercept = function _anonymous_37(handler) {
    var necooData = window.necooPushCallStack(arguments);
    return registerInterceptor(this, handler);
  };

  ObservableValue.prototype.observe = function _anonymous_38(listener, fireImmediately) {
    var necooData = window.necooPushCallStack(arguments);
    if (fireImmediately) listener({
      object: this,
      type: "update",
      newValue: this.value,
      oldValue: undefined
    });
    return registerListener(this, listener);
  };

  ObservableValue.prototype.toJSON = function _anonymous_39() {
    var necooData = window.necooPushCallStack(arguments);
    return this.get();
  };

  ObservableValue.prototype.toString = function _anonymous_40() {
    var necooData = window.necooPushCallStack(arguments);
    return this.name + "[" + this.value + "]";
  };

  ObservableValue.prototype.valueOf = function _anonymous_41() {
    var necooData = window.necooPushCallStack(arguments);
    return toPrimitive(this.get());
  };

  ObservableValue.prototype[Symbol.toPrimitive] = function _anonymous_42() {
    var necooData = window.necooPushCallStack(arguments);
    return this.valueOf();
  };

  return ObservableValue;
}(Atom);

var isObservableValue = createInstanceofPredicate("ObservableValue", ObservableValue);
/**
 * A node in the state dependency root that observes other nodes, and can be observed itself.
 *
 * ComputedValue will remember the result of the computation for the duration of the batch, or
 * while being observed.
 *
 * During this time it will recompute only when one of its direct dependencies changed,
 * but only when it is being accessed with `ComputedValue.get()`.
 *
 * Implementation description:
 * 1. First time it's being accessed it will compute and remember result
 *    give back remembered result until 2. happens
 * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
 * 3. When it's being accessed, recompute if any shallow dependency changed.
 *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
 *    go to step 2. either way
 *
 * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
 */

var ComputedValue =
/** @class */
function _anonymous_43() {
  var necooData = window.necooPushCallStack(arguments);
  /**
   * Create a new computed value based on a function expression.
   *
   * The `name` property is for debug purposes only.
   *
   * The `equals` property specifies the comparer function to use to determine if a newly produced
   * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
   * compares based on identity comparison (===), and `structualComparer` deeply compares the structure.
   * Structural comparison can be convenient if you always produce a new aggregated object and
   * don't want to notify observers if it is structurally the same.
   * This is useful for working with vectors, mouse coordinates etc.
   */

  function ComputedValue(options) {
    var necooData = window.necooPushCallStack(arguments);
    this.dependenciesState = IDerivationState.NOT_TRACKING;
    this.observing = []; // nodes we are looking at. Our value depends on these nodes

    this.newObserving = null; // during tracking it's an array with new observed observers

    this.isBeingObserved = false;
    this.isPendingUnobservation = false;
    this.observers = new Set();
    this.diffValue = 0;
    this.runId = 0;
    this.lastAccessedBy = 0;
    this.lowestObserverState = IDerivationState.UP_TO_DATE;
    this.unboundDepsCount = 0;
    this.__mapid = "#" + getNextId();
    this.value = new CaughtException(null);
    this.isComputing = false; // to check for cycles

    this.isRunningSetter = false;
    this.isTracing = TraceMode.NONE;
    if ( true && !options.get) throw "[mobx] missing option for computed: get";
    this.derivation = options.get;
    this.name = options.name || "ComputedValue@" + getNextId();
    if (options.set) this.setter = createAction(this.name + "-setter", options.set);
    this.equals = options.equals || (options.compareStructural || options.struct ? comparer.structural : comparer.default);
    this.scope = options.context;
    this.requiresReaction = !!options.requiresReaction;
    this.keepAlive = !!options.keepAlive;
  }

  ComputedValue.prototype.onBecomeStale = function _anonymous_44() {
    var necooData = window.necooPushCallStack(arguments);
    propagateMaybeChanged(this);
  };

  ComputedValue.prototype.onBecomeObserved = function _anonymous_45() {
    var necooData = window.necooPushCallStack(arguments);

    if (this.onBecomeObservedListeners) {
      this.onBecomeObservedListeners.forEach(function _anonymous_46(listener) {
        var necooData = window.necooPushCallStack(arguments);
        return listener();
      });
    }
  };

  ComputedValue.prototype.onBecomeUnobserved = function _anonymous_47() {
    var necooData = window.necooPushCallStack(arguments);

    if (this.onBecomeUnobservedListeners) {
      this.onBecomeUnobservedListeners.forEach(function _anonymous_48(listener) {
        var necooData = window.necooPushCallStack(arguments);
        return listener();
      });
    }
  };
  /**
   * Returns the current value of this computed value.
   * Will evaluate its computation first if needed.
   */


  ComputedValue.prototype.get = function _anonymous_49() {
    var necooData = window.necooPushCallStack(arguments);
    if (this.isComputing) fail("Cycle detected in computation " + this.name + ": " + this.derivation);

    if (globalState.inBatch === 0 && this.observers.size === 0 && !this.keepAlive) {
      if (shouldCompute(this)) {
        this.warnAboutUntrackedRead();
        startBatch(); // See perf test 'computed memoization'

        this.value = this.computeValue(false);
        endBatch();
      }
    } else {
      reportObserved(this);
      if (shouldCompute(this)) if (this.trackAndCompute()) propagateChangeConfirmed(this);
    }

    var result = this.value;
    if (isCaughtException(result)) throw result.cause;
    return result;
  };

  ComputedValue.prototype.peek = function _anonymous_50() {
    var necooData = window.necooPushCallStack(arguments);
    var res = this.computeValue(false);
    if (isCaughtException(res)) throw res.cause;
    return res;
  };

  ComputedValue.prototype.set = function _anonymous_51(value) {
    var necooData = window.necooPushCallStack(arguments);

    if (this.setter) {
      invariant(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
      this.isRunningSetter = true;

      try {
        this.setter.call(this.scope, value);
      } finally {
        this.isRunningSetter = false;
      }
    } else invariant(false,  true && "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
  };

  ComputedValue.prototype.trackAndCompute = function _anonymous_52() {
    var necooData = window.necooPushCallStack(arguments);

    if (isSpyEnabled() && "development" !== "production") {
      spyReport({
        object: this.scope,
        type: "compute",
        name: this.name
      });
    }

    var oldValue = this.value;
    var wasSuspended =
    /* see #1208 */
    this.dependenciesState === IDerivationState.NOT_TRACKING;
    var newValue = this.computeValue(true);
    var changed = wasSuspended || isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals(oldValue, newValue);

    if (changed) {
      this.value = newValue;
    }

    return changed;
  };

  ComputedValue.prototype.computeValue = function _anonymous_53(track) {
    var necooData = window.necooPushCallStack(arguments);
    this.isComputing = true;
    globalState.computationDepth++;
    var res;

    if (track) {
      res = trackDerivedFunction(this, this.derivation, this.scope);
    } else {
      if (globalState.disableErrorBoundaries === true) {
        res = this.derivation.call(this.scope);
      } else {
        try {
          res = this.derivation.call(this.scope);
        } catch (e) {
          res = new CaughtException(e);
        }
      }
    }

    globalState.computationDepth--;
    this.isComputing = false;
    return res;
  };

  ComputedValue.prototype.suspend = function _anonymous_54() {
    var necooData = window.necooPushCallStack(arguments);

    if (!this.keepAlive) {
      clearObserving(this);
      this.value = undefined; // don't hold on to computed value!
    }
  };

  ComputedValue.prototype.observe = function _anonymous_55(listener, fireImmediately) {
    var necooData = window.necooPushCallStack(arguments);

    var _this = this;

    var firstTime = true;
    var prevValue = undefined;
    return autorun(function _anonymous_56() {
      var necooData = window.necooPushCallStack(arguments);

      var newValue = _this.get();

      if (!firstTime || fireImmediately) {
        var prevU = untrackedStart();
        listener({
          type: "update",
          object: _this,
          newValue: newValue,
          oldValue: prevValue
        });
        untrackedEnd(prevU);
      }

      firstTime = false;
      prevValue = newValue;
    });
  };

  ComputedValue.prototype.warnAboutUntrackedRead = function _anonymous_57() {
    var necooData = window.necooPushCallStack(arguments);
    if (false) {}

    if (this.requiresReaction === true) {
      fail("[mobx] Computed value " + this.name + " is read outside a reactive context");
    }

    if (this.isTracing !== TraceMode.NONE) {
      console.log("[mobx.trace] '" + this.name + "' is being read outside a reactive context. Doing a full recompute");
    }

    if (globalState.computedRequiresReaction) {
      console.warn("[mobx] Computed value " + this.name + " is being read outside a reactive context. Doing a full recompute");
    }
  };

  ComputedValue.prototype.toJSON = function _anonymous_58() {
    var necooData = window.necooPushCallStack(arguments);
    return this.get();
  };

  ComputedValue.prototype.toString = function _anonymous_59() {
    var necooData = window.necooPushCallStack(arguments);
    return this.name + "[" + this.derivation.toString() + "]";
  };

  ComputedValue.prototype.valueOf = function _anonymous_60() {
    var necooData = window.necooPushCallStack(arguments);
    return toPrimitive(this.get());
  };

  ComputedValue.prototype[Symbol.toPrimitive] = function _anonymous_61() {
    var necooData = window.necooPushCallStack(arguments);
    return this.valueOf();
  };

  return ComputedValue;
}();

var isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);
var IDerivationState;

(function _anonymous_62(IDerivationState) {
  var necooData = window.necooPushCallStack(arguments); // before being run or (outside batch and not being observed)
  // at this point derivation is not holding any data about dependency tree

  IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING"; // no shallow dependency changed since last computation
  // won't recalculate derivation
  // this is what makes mobx fast

  IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE"; // some deep dependency changed, but don't know if shallow dependency changed
  // will require to check first if UP_TO_DATE or POSSIBLY_STALE
  // currently only ComputedValue will propagate POSSIBLY_STALE
  //
  // having this state is second big optimization:
  // don't have to recompute on every dependency change, but only when it's needed

  IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE"; // A shallow dependency has changed since last computation and the derivation
  // will need to recompute when it's needed next.

  IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
})(IDerivationState || (IDerivationState = {}));

var TraceMode;

(function _anonymous_63(TraceMode) {
  var necooData = window.necooPushCallStack(arguments);
  TraceMode[TraceMode["NONE"] = 0] = "NONE";
  TraceMode[TraceMode["LOG"] = 1] = "LOG";
  TraceMode[TraceMode["BREAK"] = 2] = "BREAK";
})(TraceMode || (TraceMode = {}));

var CaughtException =
/** @class */
function _anonymous_64() {
  var necooData = window.necooPushCallStack(arguments);

  function CaughtException(cause) {
    var necooData = window.necooPushCallStack(arguments);
    this.cause = cause; // Empty
  }

  return CaughtException;
}();

function isCaughtException(e) {
  var necooData = window.necooPushCallStack(arguments);
  return e instanceof CaughtException;
}
/**
 * Finds out whether any dependency of the derivation has actually changed.
 * If dependenciesState is 1 then it will recalculate dependencies,
 * if any dependency changed it will propagate it by changing dependenciesState to 2.
 *
 * By iterating over the dependencies in the same order that they were reported and
 * stopping on the first change, all the recalculations are only called for ComputedValues
 * that will be tracked by derivation. That is because we assume that if the first x
 * dependencies of the derivation doesn't change then the derivation should run the same way
 * up until accessing x-th dependency.
 */


function shouldCompute(derivation) {
  var necooData = window.necooPushCallStack(arguments);

  switch (derivation.dependenciesState) {
    case IDerivationState.UP_TO_DATE:
      return false;

    case IDerivationState.NOT_TRACKING:
    case IDerivationState.STALE:
      return true;

    case IDerivationState.POSSIBLY_STALE:
      {
        var prevUntracked = untrackedStart(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.

        var obs = derivation.observing,
            l = obs.length;

        for (var i = 0; i < l; i++) {
          var obj = obs[i];

          if (isComputedValue(obj)) {
            if (globalState.disableErrorBoundaries) {
              obj.get();
            } else {
              try {
                obj.get();
              } catch (e) {
                // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                untrackedEnd(prevUntracked);
                return true;
              }
            } // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
            // and `derivation` is an observer of `obj`
            // invariantShouldCompute(derivation)


            if (derivation.dependenciesState === IDerivationState.STALE) {
              untrackedEnd(prevUntracked);
              return true;
            }
          }
        }

        changeDependenciesStateTo0(derivation);
        untrackedEnd(prevUntracked);
        return false;
      }
  }
} // function invariantShouldCompute(derivation: IDerivation) {
//     const newDepState = (derivation as any).dependenciesState
//     if (
//         process.env.NODE_ENV === "production" &&
//         (newDepState === IDerivationState.POSSIBLY_STALE ||
//             newDepState === IDerivationState.NOT_TRACKING)
//     )
//         fail("Illegal dependency state")
// }


function isComputingDerivation() {
  var necooData = window.necooPushCallStack(arguments);
  return globalState.trackingDerivation !== null; // filter out actions inside computations
}

function checkIfStateModificationsAreAllowed(atom) {
  var necooData = window.necooPushCallStack(arguments);
  var hasObservers = atom.observers.size > 0; // Should never be possible to change an observed observable from inside computed, see #798

  if (globalState.computationDepth > 0 && hasObservers) fail( true && "Computed values are not allowed to cause side effects by changing observables that are already being observed. Tried to modify: " + atom.name); // Should not be possible to change observed state outside strict mode, except during initialization, see #563

  if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === "strict")) fail( true && (globalState.enforceActions ? "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ") + atom.name);
}
/**
 * Executes the provided function `f` and tracks which observables are being accessed.
 * The tracking information is stored on the `derivation` object and the derivation is registered
 * as observer of any of the accessed observables.
 */


function trackDerivedFunction(derivation, f, context) {
  var necooData = window.necooPushCallStack(arguments); // pre allocate array allocation + room for variation in deps
  // array will be trimmed by bindDependencies

  changeDependenciesStateTo0(derivation);
  derivation.newObserving = new Array(derivation.observing.length + 100);
  derivation.unboundDepsCount = 0;
  derivation.runId = ++globalState.runId;
  var prevTracking = globalState.trackingDerivation;
  globalState.trackingDerivation = derivation;
  var result;

  if (globalState.disableErrorBoundaries === true) {
    result = f.call(context);
  } else {
    try {
      result = f.call(context);
    } catch (e) {
      result = new CaughtException(e);
    }
  }

  globalState.trackingDerivation = prevTracking;
  bindDependencies(derivation);
  return result;
}
/**
 * diffs newObserving with observing.
 * update observing to be newObserving with unique observables
 * notify observers that become observed/unobserved
 */


function bindDependencies(derivation) {
  var necooData = window.necooPushCallStack(arguments); // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");

  var prevObserving = derivation.observing;
  var observing = derivation.observing = derivation.newObserving;
  var lowestNewObservingDerivationState = IDerivationState.UP_TO_DATE; // Go through all new observables and check diffValue: (this list can contain duplicates):
  //   0: first occurrence, change to 1 and keep it
  //   1: extra occurrence, drop it

  var i0 = 0,
      l = derivation.unboundDepsCount;

  for (var i = 0; i < l; i++) {
    var dep = observing[i];

    if (dep.diffValue === 0) {
      dep.diffValue = 1;
      if (i0 !== i) observing[i0] = dep;
      i0++;
    } // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
    // not hitting the condition


    if (dep.dependenciesState > lowestNewObservingDerivationState) {
      lowestNewObservingDerivationState = dep.dependenciesState;
    }
  }

  observing.length = i0;
  derivation.newObserving = null; // newObserving shouldn't be needed outside tracking (statement moved down to work around FF bug, see #614)
  // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
  //   0: it's not in new observables, unobserve it
  //   1: it keeps being observed, don't want to notify it. change to 0

  l = prevObserving.length;

  while (l--) {
    var dep = prevObserving[l];

    if (dep.diffValue === 0) {
      removeObserver(dep, derivation);
    }

    dep.diffValue = 0;
  } // Go through all new observables and check diffValue: (now it should be unique)
  //   0: it was set to 0 in last loop. don't need to do anything.
  //   1: it wasn't observed, let's observe it. set back to 0


  while (i0--) {
    var dep = observing[i0];

    if (dep.diffValue === 1) {
      dep.diffValue = 0;
      addObserver(dep, derivation);
    }
  } // Some new observed derivations may become stale during this derivation computation
  // so they have had no chance to propagate staleness (#916)


  if (lowestNewObservingDerivationState !== IDerivationState.UP_TO_DATE) {
    derivation.dependenciesState = lowestNewObservingDerivationState;
    derivation.onBecomeStale();
  }
}

function clearObserving(derivation) {
  var necooData = window.necooPushCallStack(arguments); // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");

  var obs = derivation.observing;
  derivation.observing = [];
  var i = obs.length;

  while (i--) removeObserver(obs[i], derivation);

  derivation.dependenciesState = IDerivationState.NOT_TRACKING;
}

function untracked(action) {
  var necooData = window.necooPushCallStack(arguments);
  var prev = untrackedStart();

  try {
    return action();
  } finally {
    untrackedEnd(prev);
  }
}

function untrackedStart() {
  var necooData = window.necooPushCallStack(arguments);
  var prev = globalState.trackingDerivation;
  globalState.trackingDerivation = null;
  return prev;
}

function untrackedEnd(prev) {
  var necooData = window.necooPushCallStack(arguments);
  globalState.trackingDerivation = prev;
}
/**
 * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
 *
 */


function changeDependenciesStateTo0(derivation) {
  var necooData = window.necooPushCallStack(arguments);
  if (derivation.dependenciesState === IDerivationState.UP_TO_DATE) return;
  derivation.dependenciesState = IDerivationState.UP_TO_DATE;
  var obs = derivation.observing;
  var i = obs.length;

  while (i--) obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
}
/**
 * These values will persist if global state is reset
 */


var persistentKeys = ["mobxGuid", "spyListeners", "enforceActions", "computedRequiresReaction", "disableErrorBoundaries", "runId", "UNCHANGED"];

var MobXGlobals =
/** @class */
function _anonymous_65() {
  var necooData = window.necooPushCallStack(arguments);

  function MobXGlobals() {
    var necooData = window.necooPushCallStack(arguments);
    /**
     * MobXGlobals version.
     * MobX compatiblity with other versions loaded in memory as long as this version matches.
     * It indicates that the global state still stores similar information
     *
     * N.B: this version is unrelated to the package version of MobX, and is only the version of the
     * internal state storage of MobX, and can be the same across many different package versions
     */

    this.version = 5;
    /**
     * globally unique token to signal unchanged
     */

    this.UNCHANGED = {};
    /**
     * Currently running derivation
     */

    this.trackingDerivation = null;
    /**
     * Are we running a computation currently? (not a reaction)
     */

    this.computationDepth = 0;
    /**
     * Each time a derivation is tracked, it is assigned a unique run-id
     */

    this.runId = 0;
    /**
     * 'guid' for general purpose. Will be persisted amongst resets.
     */

    this.mobxGuid = 0;
    /**
     * Are we in a batch block? (and how many of them)
     */

    this.inBatch = 0;
    /**
     * Observables that don't have observers anymore, and are about to be
     * suspended, unless somebody else accesses it in the same batch
     *
     * @type {IObservable[]}
     */

    this.pendingUnobservations = [];
    /**
     * List of scheduled, not yet executed, reactions.
     */

    this.pendingReactions = [];
    /**
     * Are we currently processing reactions?
     */

    this.isRunningReactions = false;
    /**
     * Is it allowed to change observables at this point?
     * In general, MobX doesn't allow that when running computations and React.render.
     * To ensure that those functions stay pure.
     */

    this.allowStateChanges = true;
    /**
     * If strict mode is enabled, state changes are by default not allowed
     */

    this.enforceActions = false;
    /**
     * Spy callbacks
     */

    this.spyListeners = [];
    /**
     * Globally attached error handlers that react specifically to errors in reactions
     */

    this.globalReactionErrorHandlers = [];
    /**
     * Warn if computed values are accessed outside a reactive context
     */

    this.computedRequiresReaction = false;
    /**
     * Allows overwriting of computed properties, useful in tests but not prod as it can cause
     * memory leaks. See https://github.com/mobxjs/mobx/issues/1867
     */

    this.computedConfigurable = false;
    /*
     * Don't catch and rethrow exceptions. This is useful for inspecting the state of
     * the stack when an exception occurs while debugging.
     */

    this.disableErrorBoundaries = false;
    /*
     * If true, we are already handling an exception in an action. Any errors in reactions should be supressed, as
     * they are not the cause, see: https://github.com/mobxjs/mobx/issues/1836
     */

    this.suppressReactionErrors = false;
  }

  return MobXGlobals;
}();

var canMergeGlobalState = true;
var isolateCalled = false;

var globalState = function _anonymous_66() {
  var necooData = window.necooPushCallStack(arguments);
  var global = getGlobal();
  if (global.__mobxInstanceCount > 0 && !global.__mobxGlobals) canMergeGlobalState = false;
  if (global.__mobxGlobals && global.__mobxGlobals.version !== new MobXGlobals().version) canMergeGlobalState = false;

  if (!canMergeGlobalState) {
    setTimeout(function _anonymous_67() {
      var necooData = window.necooPushCallStack(arguments);

      if (!isolateCalled) {
        fail("There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`");
      }
    }, 1);
    return new MobXGlobals();
  } else if (global.__mobxGlobals) {
    global.__mobxInstanceCount += 1;
    if (!global.__mobxGlobals.UNCHANGED) global.__mobxGlobals.UNCHANGED = {}; // make merge backward compatible

    return global.__mobxGlobals;
  } else {
    global.__mobxInstanceCount = 1;
    return global.__mobxGlobals = new MobXGlobals();
  }
}();

function isolateGlobalState() {
  var necooData = window.necooPushCallStack(arguments);
  if (globalState.pendingReactions.length || globalState.inBatch || globalState.isRunningReactions) fail("isolateGlobalState should be called before MobX is running any reactions");
  isolateCalled = true;

  if (canMergeGlobalState) {
    if (--getGlobal().__mobxInstanceCount === 0) getGlobal().__mobxGlobals = undefined;
    globalState = new MobXGlobals();
  }
}

function getGlobalState() {
  var necooData = window.necooPushCallStack(arguments);
  return globalState;
}
/**
 * For testing purposes only; this will break the internal state of existing observables,
 * but can be used to get back at a stable state after throwing errors
 */


function resetGlobalState() {
  var necooData = window.necooPushCallStack(arguments);
  var defaultGlobals = new MobXGlobals();

  for (var key in defaultGlobals) if (persistentKeys.indexOf(key) === -1) globalState[key] = defaultGlobals[key];

  globalState.allowStateChanges = !globalState.enforceActions;
}

function getGlobal() {
  var necooData = window.necooPushCallStack(arguments);
  return typeof window !== "undefined" ? window : global;
}

function hasObservers(observable) {
  var necooData = window.necooPushCallStack(arguments);
  return observable.observers && observable.observers.size > 0;
}

function getObservers(observable) {
  var necooData = window.necooPushCallStack(arguments);
  return observable.observers;
} // function invariantObservers(observable: IObservable) {
//     const list = observable.observers
//     const map = observable.observersIndexes
//     const l = list.length
//     for (let i = 0; i < l; i++) {
//         const id = list[i].__mapid
//         if (i) {
//             invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list") // for performance
//         } else {
//             invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldn't be held in map.") // for performance
//         }
//     }
//     invariant(
//         list.length === 0 || Object.keys(map).length === list.length - 1,
//         "INTERNAL ERROR there is no junk in map"
//     )
// }


function addObserver(observable, node) {
  var necooData = window.necooPushCallStack(arguments); // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
  // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
  // invariantObservers(observable);

  observable.observers.add(node);
  if (observable.lowestObserverState > node.dependenciesState) observable.lowestObserverState = node.dependenciesState; // invariantObservers(observable);
  // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
}

function removeObserver(observable, node) {
  var necooData = window.necooPushCallStack(arguments); // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
  // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
  // invariantObservers(observable);

  observable.observers.delete(node);

  if (observable.observers.size === 0) {
    // deleting last observer
    queueForUnobservation(observable);
  } // invariantObservers(observable);
  // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");

}

function queueForUnobservation(observable) {
  var necooData = window.necooPushCallStack(arguments);

  if (observable.isPendingUnobservation === false) {
    // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
    observable.isPendingUnobservation = true;
    globalState.pendingUnobservations.push(observable);
  }
}
/**
 * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
 * During a batch `onBecomeUnobserved` will be called at most once per observable.
 * Avoids unnecessary recalculations.
 */


function startBatch() {
  var necooData = window.necooPushCallStack(arguments);
  globalState.inBatch++;
}

function endBatch() {
  var necooData = window.necooPushCallStack(arguments);

  if (--globalState.inBatch === 0) {
    runReactions(); // the batch is actually about to finish, all unobserving should happen here.

    var list = globalState.pendingUnobservations;

    for (var i = 0; i < list.length; i++) {
      var observable = list[i];
      observable.isPendingUnobservation = false;

      if (observable.observers.size === 0) {
        if (observable.isBeingObserved) {
          // if this observable had reactive observers, trigger the hooks
          observable.isBeingObserved = false;
          observable.onBecomeUnobserved();
        }

        if (observable instanceof ComputedValue) {
          // computed values are automatically teared down when the last observer leaves
          // this process happens recursively, this computed might be the last observabe of another, etc..
          observable.suspend();
        }
      }
    }

    globalState.pendingUnobservations = [];
  }
}

function reportObserved(observable) {
  var necooData = window.necooPushCallStack(arguments);
  var derivation = globalState.trackingDerivation;

  if (derivation !== null) {
    /**
     * Simple optimization, give each derivation run an unique id (runId)
     * Check if last time this observable was accessed the same runId is used
     * if this is the case, the relation is already known
     */
    if (derivation.runId !== observable.lastAccessedBy) {
      observable.lastAccessedBy = derivation.runId; // Tried storing newObserving, or observing, or both as Set, but performance didn't come close...

      derivation.newObserving[derivation.unboundDepsCount++] = observable;

      if (!observable.isBeingObserved) {
        observable.isBeingObserved = true;
        observable.onBecomeObserved();
      }
    }

    return true;
  } else if (observable.observers.size === 0 && globalState.inBatch > 0) {
    queueForUnobservation(observable);
  }

  return false;
} // function invariantLOS(observable: IObservable, msg: string) {
//     // it's expensive so better not run it in produciton. but temporarily helpful for testing
//     const min = getObservers(observable).reduce((a, b) => Math.min(a, b.dependenciesState), 2)
//     if (min >= observable.lowestObserverState) return // <- the only assumption about `lowestObserverState`
//     throw new Error(
//         "lowestObserverState is wrong for " +
//             msg +
//             " because " +
//             min +
//             " < " +
//             observable.lowestObserverState
//     )
// }

/**
 * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
 * It will propagate changes to observers from previous run
 * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
 * Hopefully self reruning autoruns aren't a feature people should depend on
 * Also most basic use cases should be ok
 */
// Called by Atom when its value changes


function propagateChanged(observable) {
  var necooData = window.necooPushCallStack(arguments); // invariantLOS(observable, "changed start");

  if (observable.lowestObserverState === IDerivationState.STALE) return;
  observable.lowestObserverState = IDerivationState.STALE; // Ideally we use for..of here, but the downcompiled version is really slow...

  observable.observers.forEach(function _anonymous_68(d) {
    var necooData = window.necooPushCallStack(arguments);

    if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
      if (d.isTracing !== TraceMode.NONE) {
        logTraceInfo(d, observable);
      }

      d.onBecomeStale();
    }

    d.dependenciesState = IDerivationState.STALE;
  }); // invariantLOS(observable, "changed end");
} // Called by ComputedValue when it recalculate and its value changed


function propagateChangeConfirmed(observable) {
  var necooData = window.necooPushCallStack(arguments); // invariantLOS(observable, "confirmed start");

  if (observable.lowestObserverState === IDerivationState.STALE) return;
  observable.lowestObserverState = IDerivationState.STALE;
  observable.observers.forEach(function _anonymous_69(d) {
    var necooData = window.necooPushCallStack(arguments);
    if (d.dependenciesState === IDerivationState.POSSIBLY_STALE) d.dependenciesState = IDerivationState.STALE;else if (d.dependenciesState === IDerivationState.UP_TO_DATE // this happens during computing of `d`, just keep lowestObserverState up to date.
    ) observable.lowestObserverState = IDerivationState.UP_TO_DATE;
  }); // invariantLOS(observable, "confirmed end");
} // Used by computed when its dependency changed, but we don't wan't to immediately recompute.


function propagateMaybeChanged(observable) {
  var necooData = window.necooPushCallStack(arguments); // invariantLOS(observable, "maybe start");

  if (observable.lowestObserverState !== IDerivationState.UP_TO_DATE) return;
  observable.lowestObserverState = IDerivationState.POSSIBLY_STALE;
  observable.observers.forEach(function _anonymous_70(d) {
    var necooData = window.necooPushCallStack(arguments);

    if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
      d.dependenciesState = IDerivationState.POSSIBLY_STALE;

      if (d.isTracing !== TraceMode.NONE) {
        logTraceInfo(d, observable);
      }

      d.onBecomeStale();
    }
  }); // invariantLOS(observable, "maybe end");
}

function logTraceInfo(derivation, observable) {
  var necooData = window.necooPushCallStack(arguments);
  console.log("[mobx.trace] '" + derivation.name + "' is invalidated due to a change in: '" + observable.name + "'");

  if (derivation.isTracing === TraceMode.BREAK) {
    var lines = [];
    printDepTree(getDependencyTree(derivation), lines, 1); // prettier-ignore

    new Function("debugger;\n/*\nTracing '" + derivation.name + "'\n\nYou are entering this break point because derivation '" + derivation.name + "' is being traced and '" + observable.name + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
  }
}

function printDepTree(tree, lines, depth) {
  var necooData = window.necooPushCallStack(arguments);

  if (lines.length >= 1000) {
    lines.push("(and many more)");
    return;
  }

  lines.push("" + new Array(depth).join("\t") + tree.name); // MWE: not the fastest, but the easiest way :)

  if (tree.dependencies) tree.dependencies.forEach(function _anonymous_71(child) {
    var necooData = window.necooPushCallStack(arguments);
    return printDepTree(child, lines, depth + 1);
  });
}

var Reaction =
/** @class */
function _anonymous_72() {
  var necooData = window.necooPushCallStack(arguments);

  function Reaction(name, onInvalidate, errorHandler) {
    var necooData = window.necooPushCallStack(arguments);

    if (name === void 0) {
      name = "Reaction@" + getNextId();
    }

    this.name = name;
    this.onInvalidate = onInvalidate;
    this.errorHandler = errorHandler;
    this.observing = []; // nodes we are looking at. Our value depends on these nodes

    this.newObserving = [];
    this.dependenciesState = IDerivationState.NOT_TRACKING;
    this.diffValue = 0;
    this.runId = 0;
    this.unboundDepsCount = 0;
    this.__mapid = "#" + getNextId();
    this.isDisposed = false;
    this._isScheduled = false;
    this._isTrackPending = false;
    this._isRunning = false;
    this.isTracing = TraceMode.NONE;
  }

  Reaction.prototype.onBecomeStale = function _anonymous_73() {
    var necooData = window.necooPushCallStack(arguments);
    this.schedule();
  };

  Reaction.prototype.schedule = function _anonymous_74() {
    var necooData = window.necooPushCallStack(arguments);

    if (!this._isScheduled) {
      this._isScheduled = true;
      globalState.pendingReactions.push(this);
      runReactions();
    }
  };

  Reaction.prototype.isScheduled = function _anonymous_75() {
    var necooData = window.necooPushCallStack(arguments);
    return this._isScheduled;
  };
  /**
   * internal, use schedule() if you intend to kick off a reaction
   */


  Reaction.prototype.runReaction = function _anonymous_76() {
    var necooData = window.necooPushCallStack(arguments);

    if (!this.isDisposed) {
      startBatch();
      this._isScheduled = false;

      if (shouldCompute(this)) {
        this._isTrackPending = true;

        try {
          this.onInvalidate();

          if (this._isTrackPending && isSpyEnabled() && "development" !== "production") {
            // onInvalidate didn't trigger track right away..
            spyReport({
              name: this.name,
              type: "scheduled-reaction"
            });
          }
        } catch (e) {
          this.reportExceptionInDerivation(e);
        }
      }

      endBatch();
    }
  };

  Reaction.prototype.track = function _anonymous_77(fn) {
    var necooData = window.necooPushCallStack(arguments);

    if (this.isDisposed) {
      return; // console.warn("Reaction already disposed") // Note: Not a warning / error in mobx 4 either
    }

    startBatch();
    var notify = isSpyEnabled();
    var startTime;

    if (notify && "development" !== "production") {
      startTime = Date.now();
      spyReportStart({
        name: this.name,
        type: "reaction"
      });
    }

    this._isRunning = true;
    var result = trackDerivedFunction(this, fn, undefined);
    this._isRunning = false;
    this._isTrackPending = false;

    if (this.isDisposed) {
      // disposed during last run. Clean up everything that was bound after the dispose call.
      clearObserving(this);
    }

    if (isCaughtException(result)) this.reportExceptionInDerivation(result.cause);

    if (notify && "development" !== "production") {
      spyReportEnd({
        time: Date.now() - startTime
      });
    }

    endBatch();
  };

  Reaction.prototype.reportExceptionInDerivation = function _anonymous_78(error) {
    var necooData = window.necooPushCallStack(arguments);

    var _this = this;

    if (this.errorHandler) {
      this.errorHandler(error, this);
      return;
    }

    if (globalState.disableErrorBoundaries) throw error;
    var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'";

    if (globalState.suppressReactionErrors) {
      console.warn("[mobx] (error in reaction '" + this.name + "' suppressed, fix error of causing action below)"); // prettier-ignore
    } else {
      console.error(message, error);
      /** If debugging brought you here, please, read the above message :-). Tnx! */
    }

    if (isSpyEnabled()) {
      spyReport({
        type: "error",
        name: this.name,
        message: message,
        error: "" + error
      });
    }

    globalState.globalReactionErrorHandlers.forEach(function _anonymous_79(f) {
      var necooData = window.necooPushCallStack(arguments);
      return f(error, _this);
    });
  };

  Reaction.prototype.dispose = function _anonymous_80() {
    var necooData = window.necooPushCallStack(arguments);

    if (!this.isDisposed) {
      this.isDisposed = true;

      if (!this._isRunning) {
        // if disposed while running, clean up later. Maybe not optimal, but rare case
        startBatch();
        clearObserving(this);
        endBatch();
      }
    }
  };

  Reaction.prototype.getDisposer = function _anonymous_81() {
    var necooData = window.necooPushCallStack(arguments);
    var r = this.dispose.bind(this);
    r[$mobx] = this;
    return r;
  };

  Reaction.prototype.toString = function _anonymous_82() {
    var necooData = window.necooPushCallStack(arguments);
    return "Reaction[" + this.name + "]";
  };

  Reaction.prototype.trace = function _anonymous_83(enterBreakPoint) {
    var necooData = window.necooPushCallStack(arguments);

    if (enterBreakPoint === void 0) {
      enterBreakPoint = false;
    }

    trace(this, enterBreakPoint);
  };

  return Reaction;
}();

function onReactionError(handler) {
  var necooData = window.necooPushCallStack(arguments);
  globalState.globalReactionErrorHandlers.push(handler);
  return function _anonymous_84() {
    var necooData = window.necooPushCallStack(arguments);
    var idx = globalState.globalReactionErrorHandlers.indexOf(handler);
    if (idx >= 0) globalState.globalReactionErrorHandlers.splice(idx, 1);
  };
}
/**
 * Magic number alert!
 * Defines within how many times a reaction is allowed to re-trigger itself
 * until it is assumed that this is gonna be a never ending loop...
 */


var MAX_REACTION_ITERATIONS = 100;

var reactionScheduler = function _anonymous_85(f) {
  var necooData = window.necooPushCallStack(arguments);
  return f();
};

function runReactions() {
  var necooData = window.necooPushCallStack(arguments); // Trampolining, if runReactions are already running, new reactions will be picked up

  if (globalState.inBatch > 0 || globalState.isRunningReactions) return;
  reactionScheduler(runReactionsHelper);
}

function runReactionsHelper() {
  var necooData = window.necooPushCallStack(arguments);
  globalState.isRunningReactions = true;
  var allReactions = globalState.pendingReactions;
  var iterations = 0; // While running reactions, new reactions might be triggered.
  // Hence we work with two variables and check whether
  // we converge to no remaining reactions after a while.

  while (allReactions.length > 0) {
    if (++iterations === MAX_REACTION_ITERATIONS) {
      console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]));
      allReactions.splice(0); // clear reactions
    }

    var remainingReactions = allReactions.splice(0);

    for (var i = 0, l = remainingReactions.length; i < l; i++) remainingReactions[i].runReaction();
  }

  globalState.isRunningReactions = false;
}

var isReaction = createInstanceofPredicate("Reaction", Reaction);

function setReactionScheduler(fn) {
  var necooData = window.necooPushCallStack(arguments);
  var baseScheduler = reactionScheduler;

  reactionScheduler = function _anonymous_86(f) {
    var necooData = window.necooPushCallStack(arguments);
    return fn(function _anonymous_87() {
      var necooData = window.necooPushCallStack(arguments);
      return baseScheduler(f);
    });
  };
}

function isSpyEnabled() {
  var necooData = window.necooPushCallStack(arguments);
  return  true && !!globalState.spyListeners.length;
}

function spyReport(event) {
  var necooData = window.necooPushCallStack(arguments);
  if (false) {} // dead code elimination can do the rest

  if (!globalState.spyListeners.length) return;
  var listeners = globalState.spyListeners;

  for (var i = 0, l = listeners.length; i < l; i++) listeners[i](event);
}

function spyReportStart(event) {
  var necooData = window.necooPushCallStack(arguments);
  if (false) {}

  var change = __assign({}, event, {
    spyReportStart: true
  });

  spyReport(change);
}

var END_EVENT = {
  spyReportEnd: true
};

function spyReportEnd(change) {
  var necooData = window.necooPushCallStack(arguments);
  if (false) {}
  if (change) spyReport(__assign({}, change, {
    spyReportEnd: true
  }));else spyReport(END_EVENT);
}

function spy(listener) {
  var necooData = window.necooPushCallStack(arguments);

  if (false) {} else {
    globalState.spyListeners.push(listener);
    return once(function _anonymous_89() {
      var necooData = window.necooPushCallStack(arguments);
      globalState.spyListeners = globalState.spyListeners.filter(function _anonymous_90(l) {
        var necooData = window.necooPushCallStack(arguments);
        return l !== listener;
      });
    });
  }
}

function dontReassignFields() {
  var necooData = window.necooPushCallStack(arguments);
  fail( true && "@action fields are not reassignable");
}

function namedActionDecorator(name) {
  var necooData = window.necooPushCallStack(arguments);
  return function _anonymous_91(target, prop, descriptor) {
    var necooData = window.necooPushCallStack(arguments);

    if (descriptor) {
      if ( true && descriptor.get !== undefined) {
        return fail("@action cannot be used with getters");
      } // babel / typescript
      // @action method() { }


      if (descriptor.value) {
        // typescript
        return {
          value: createAction(name, descriptor.value),
          enumerable: false,
          configurable: true,
          writable: true // for typescript, this must be writable, otherwise it cannot inherit :/ (see inheritable actions test)

        };
      } // babel only: @action method = () => {}


      var initializer_1 = descriptor.initializer;
      return {
        enumerable: false,
        configurable: true,
        writable: true,
        initializer: function _anonymous_92() {
          var necooData = window.necooPushCallStack(arguments); // N.B: we can't immediately invoke initializer; this would be wrong

          return createAction(name, initializer_1.call(this));
        }
      };
    } // bound instance methods


    return actionFieldDecorator(name).apply(this, arguments);
  };
}

function actionFieldDecorator(name) {
  var necooData = window.necooPushCallStack(arguments); // Simple property that writes on first invocation to the current instance

  return function _anonymous_93(target, prop, descriptor) {
    var necooData = window.necooPushCallStack(arguments);
    Object.defineProperty(target, prop, {
      configurable: true,
      enumerable: false,
      get: function _anonymous_94() {
        var necooData = window.necooPushCallStack(arguments);
        return undefined;
      },
      set: function _anonymous_95(value) {
        var necooData = window.necooPushCallStack(arguments);
        addHiddenProp(this, prop, action(name, value));
      }
    });
  };
}

function boundActionDecorator(target, propertyName, descriptor, applyToInstance) {
  var necooData = window.necooPushCallStack(arguments);

  if (applyToInstance === true) {
    defineBoundAction(target, propertyName, descriptor.value);
    return null;
  }

  if (descriptor) {
    // if (descriptor.value)
    // Typescript / Babel: @action.bound method() { }
    // also: babel @action.bound method = () => {}
    return {
      configurable: true,
      enumerable: false,
      get: function _anonymous_96() {
        var necooData = window.necooPushCallStack(arguments);
        defineBoundAction(this, propertyName, descriptor.value || descriptor.initializer.call(this));
        return this[propertyName];
      },
      set: dontReassignFields
    };
  } // field decorator Typescript @action.bound method = () => {}


  return {
    enumerable: false,
    configurable: true,
    set: function _anonymous_97(v) {
      var necooData = window.necooPushCallStack(arguments);
      defineBoundAction(this, propertyName, v);
    },
    get: function _anonymous_98() {
      var necooData = window.necooPushCallStack(arguments);
      return undefined;
    }
  };
}

var action = function action(arg1, arg2, arg3, arg4) {
  var necooData = window.necooPushCallStack(arguments); // action(fn() {})

  if (arguments.length === 1 && typeof arg1 === "function") return createAction(arg1.name || "<unnamed action>", arg1); // action("name", fn() {})

  if (arguments.length === 2 && typeof arg2 === "function") return createAction(arg1, arg2); // @action("name") fn() {}

  if (arguments.length === 1 && typeof arg1 === "string") return namedActionDecorator(arg1); // @action fn() {}

  if (arg4 === true) {
    // apply to instance immediately
    addHiddenProp(arg1, arg2, createAction(arg1.name || arg2, arg3.value, this));
  } else {
    return namedActionDecorator(arg2).apply(null, arguments);
  }
};

action.bound = boundActionDecorator;

function runInAction(arg1, arg2) {
  var necooData = window.necooPushCallStack(arguments);
  var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
  var fn = typeof arg1 === "function" ? arg1 : arg2;

  if (true) {
    invariant(typeof fn === "function" && fn.length === 0, "`runInAction` expects a function without arguments");
    if (typeof actionName !== "string" || !actionName) fail("actions should have valid names, got: '" + actionName + "'");
  }

  return executeAction(actionName, fn, this, undefined);
}

function isAction(thing) {
  var necooData = window.necooPushCallStack(arguments);
  return typeof thing === "function" && thing.isMobxAction === true;
}

function defineBoundAction(target, propertyName, fn) {
  var necooData = window.necooPushCallStack(arguments);
  addHiddenProp(target, propertyName, createAction(propertyName, fn.bind(target)));
}
/**
 * Creates a named reactive view and keeps it alive, so that the view is always
 * updated if one of the dependencies changes, even when the view is not further used by something else.
 * @param view The reactive view
 * @returns disposer function, which can be used to stop the view from being updated in the future.
 */


function autorun(view, opts) {
  var necooData = window.necooPushCallStack(arguments);

  if (opts === void 0) {
    opts = EMPTY_OBJECT;
  }

  if (true) {
    invariant(typeof view === "function", "Autorun expects a function as first argument");
    invariant(isAction(view) === false, "Autorun does not accept actions since actions are untrackable");
  }

  var name = opts && opts.name || view.name || "Autorun@" + getNextId();
  var runSync = !opts.scheduler && !opts.delay;
  var reaction;

  if (runSync) {
    // normal autorun
    reaction = new Reaction(name, function _anonymous_99() {
      var necooData = window.necooPushCallStack(arguments);
      this.track(reactionRunner);
    }, opts.onError);
  } else {
    var scheduler_1 = createSchedulerFromOptions(opts); // debounced autorun

    var isScheduled_1 = false;
    reaction = new Reaction(name, function _anonymous_100() {
      var necooData = window.necooPushCallStack(arguments);

      if (!isScheduled_1) {
        isScheduled_1 = true;
        scheduler_1(function _anonymous_101() {
          var necooData = window.necooPushCallStack(arguments);
          isScheduled_1 = false;
          if (!reaction.isDisposed) reaction.track(reactionRunner);
        });
      }
    }, opts.onError);
  }

  function reactionRunner() {
    var necooData = window.necooPushCallStack(arguments);
    view(reaction);
  }

  reaction.schedule();
  return reaction.getDisposer();
}

var run = function _anonymous_102(f) {
  var necooData = window.necooPushCallStack(arguments);
  return f();
};

function createSchedulerFromOptions(opts) {
  var necooData = window.necooPushCallStack(arguments);
  return opts.scheduler ? opts.scheduler : opts.delay ? function _anonymous_103(f) {
    var necooData = window.necooPushCallStack(arguments);
    return setTimeout(f, opts.delay);
  } : run;
}

function reaction(expression, effect, opts) {
  var necooData = window.necooPushCallStack(arguments);

  if (opts === void 0) {
    opts = EMPTY_OBJECT;
  }

  if (true) {
    invariant(typeof expression === "function", "First argument to reaction should be a function");
    invariant(typeof opts === "object", "Third argument of reactions should be an object");
  }

  var name = opts.name || "Reaction@" + getNextId();
  var effectAction = action(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
  var runSync = !opts.scheduler && !opts.delay;
  var scheduler = createSchedulerFromOptions(opts);
  var firstTime = true;
  var isScheduled = false;
  var value;
  var equals = opts.compareStructural ? comparer.structural : opts.equals || comparer.default;
  var r = new Reaction(name, function _anonymous_104() {
    var necooData = window.necooPushCallStack(arguments);

    if (firstTime || runSync) {
      reactionRunner();
    } else if (!isScheduled) {
      isScheduled = true;
      scheduler(reactionRunner);
    }
  }, opts.onError);

  function reactionRunner() {
    var necooData = window.necooPushCallStack(arguments);
    isScheduled = false; // Q: move into reaction runner?

    if (r.isDisposed) return;
    var changed = false;
    r.track(function _anonymous_105() {
      var necooData = window.necooPushCallStack(arguments);
      var nextValue = expression(r);
      changed = firstTime || !equals(value, nextValue);
      value = nextValue;
    });
    if (firstTime && opts.fireImmediately) effectAction(value, r);
    if (!firstTime && changed === true) effectAction(value, r);
    if (firstTime) firstTime = false;
  }

  r.schedule();
  return r.getDisposer();
}

function wrapErrorHandler(errorHandler, baseFn) {
  var necooData = window.necooPushCallStack(arguments);
  return function _anonymous_106() {
    var necooData = window.necooPushCallStack(arguments);

    try {
      return baseFn.apply(this, arguments);
    } catch (e) {
      errorHandler.call(this, e);
    }
  };
}

function onBecomeObserved(thing, arg2, arg3) {
  var necooData = window.necooPushCallStack(arguments);
  return interceptHook("onBecomeObserved", thing, arg2, arg3);
}

function onBecomeUnobserved(thing, arg2, arg3) {
  var necooData = window.necooPushCallStack(arguments);
  return interceptHook("onBecomeUnobserved", thing, arg2, arg3);
}

function interceptHook(hook, thing, arg2, arg3) {
  var necooData = window.necooPushCallStack(arguments);
  var atom = typeof arg2 === "string" ? getAtom(thing, arg2) : getAtom(thing);
  var cb = typeof arg2 === "string" ? arg3 : arg2;
  var listenersKey = hook + "Listeners";

  if (atom[listenersKey]) {
    atom[listenersKey].add(cb);
  } else {
    atom[listenersKey] = new Set([cb]);
  }

  var orig = atom[hook];
  if (typeof orig !== "function") return fail( true && "Not an atom that can be (un)observed");
  return function _anonymous_107() {
    var necooData = window.necooPushCallStack(arguments);
    var hookListeners = atom[listenersKey];

    if (hookListeners) {
      hookListeners.delete(cb);

      if (hookListeners.size === 0) {
        delete atom[listenersKey];
      }
    }
  };
}

function configure(options) {
  var necooData = window.necooPushCallStack(arguments);
  var enforceActions = options.enforceActions,
      computedRequiresReaction = options.computedRequiresReaction,
      computedConfigurable = options.computedConfigurable,
      disableErrorBoundaries = options.disableErrorBoundaries,
      reactionScheduler = options.reactionScheduler;

  if (options.isolateGlobalState === true) {
    isolateGlobalState();
  }

  if (enforceActions !== undefined) {
    if (typeof enforceActions === "boolean" || enforceActions === "strict") deprecated("Deprecated value for 'enforceActions', use 'false' => '\"never\"', 'true' => '\"observed\"', '\"strict\"' => \"'always'\" instead");
    var ea = void 0;

    switch (enforceActions) {
      case true:
      case "observed":
        ea = true;
        break;

      case false:
      case "never":
        ea = false;
        break;

      case "strict":
      case "always":
        ea = "strict";
        break;

      default:
        fail("Invalid value for 'enforceActions': '" + enforceActions + "', expected 'never', 'always' or 'observed'");
    }

    globalState.enforceActions = ea;
    globalState.allowStateChanges = ea === true || ea === "strict" ? false : true;
  }

  if (computedRequiresReaction !== undefined) {
    globalState.computedRequiresReaction = !!computedRequiresReaction;
  }

  if (computedConfigurable !== undefined) {
    globalState.computedConfigurable = !!computedConfigurable;
  }

  if (disableErrorBoundaries !== undefined) {
    if (disableErrorBoundaries === true) console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled.");
    globalState.disableErrorBoundaries = !!disableErrorBoundaries;
  }

  if (reactionScheduler) {
    setReactionScheduler(reactionScheduler);
  }
}

function decorate(thing, decorators) {
  var necooData = window.necooPushCallStack(arguments);
   true && invariant(isPlainObject(decorators), "Decorators should be a key value map");
  var target = typeof thing === "function" ? thing.prototype : thing;

  var _loop_1 = function _anonymous_108(prop) {
    var necooData = window.necooPushCallStack(arguments);
    var propertyDecorators = decorators[prop];

    if (!Array.isArray(propertyDecorators)) {
      propertyDecorators = [propertyDecorators];
    }

     true && invariant(propertyDecorators.every(function _anonymous_109(decorator) {
      var necooData = window.necooPushCallStack(arguments);
      return typeof decorator === "function";
    }), "Decorate: expected a decorator function or array of decorator functions for '" + prop + "'");
    var descriptor = Object.getOwnPropertyDescriptor(target, prop);
    var newDescriptor = propertyDecorators.reduce(function _anonymous_110(accDescriptor, decorator) {
      var necooData = window.necooPushCallStack(arguments);
      return decorator(target, prop, accDescriptor);
    }, descriptor);
    if (newDescriptor) Object.defineProperty(target, prop, newDescriptor);
  };

  for (var prop in decorators) {
    _loop_1(prop);
  }

  return thing;
}

function extendObservable(target, properties, decorators, options) {
  var necooData = window.necooPushCallStack(arguments);

  if (true) {
    invariant(arguments.length >= 2 && arguments.length <= 4, "'extendObservable' expected 2-4 arguments");
    invariant(typeof target === "object", "'extendObservable' expects an object as first argument");
    invariant(!isObservableMap(target), "'extendObservable' should not be used on maps, use map.merge instead");
  }

  options = asCreateObservableOptions(options);
  var defaultDecorator = getDefaultDecoratorFromObjectOptions(options);
  initializeInstance(target); // Fixes #1740

  asObservableObject(target, options.name, defaultDecorator.enhancer); // make sure object is observable, even without initial props

  if (properties) extendObservableObjectWithProperties(target, properties, decorators, defaultDecorator);
  return target;
}

function getDefaultDecoratorFromObjectOptions(options) {
  var necooData = window.necooPushCallStack(arguments);
  return options.defaultDecorator || (options.deep === false ? refDecorator : deepDecorator);
}

function extendObservableObjectWithProperties(target, properties, decorators, defaultDecorator) {
  var necooData = window.necooPushCallStack(arguments);

  var e_1, _a, e_2, _b;

  if (true) {
    invariant(!isObservable(properties), "Extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540");

    if (decorators) {
      var keys = getPlainObjectKeys(decorators);

      try {
        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
          var key = keys_1_1.value;
          if (!(key in properties)) fail("Trying to declare a decorator for unspecified property '" + stringifyKey(key) + "'");
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }
  }

  startBatch();

  try {
    var keys = getPlainObjectKeys(properties);

    try {
      for (var keys_2 = __values(keys), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
        var key = keys_2_1.value;
        var descriptor = Object.getOwnPropertyDescriptor(properties, key);

        if (true) {
          if (Object.getOwnPropertyDescriptor(target, key)) fail("'extendObservable' can only be used to introduce new properties. Use 'set' or 'decorate' instead. The property '" + stringifyKey(key) + "' already exists on '" + target + "'");
          if (isComputed(descriptor.value)) fail("Passing a 'computed' as initial property value is no longer supported by extendObservable. Use a getter or decorator instead");
        }

        var decorator = decorators && key in decorators ? decorators[key] : descriptor.get ? computedDecorator : defaultDecorator;
        if ( true && typeof decorator !== "function") fail("Not a valid decorator for '" + stringifyKey(key) + "', got: " + decorator);
        var resultDescriptor = decorator(target, key, descriptor, true);
        if (resultDescriptor // otherwise, assume already applied, due to `applyToInstance`
        ) Object.defineProperty(target, key, resultDescriptor);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (keys_2_1 && !keys_2_1.done && (_b = keys_2.return)) _b.call(keys_2);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  } finally {
    endBatch();
  }
}

function getDependencyTree(thing, property) {
  var necooData = window.necooPushCallStack(arguments);
  return nodeToDependencyTree(getAtom(thing, property));
}

function nodeToDependencyTree(node) {
  var necooData = window.necooPushCallStack(arguments);
  var result = {
    name: node.name
  };
  if (node.observing && node.observing.length > 0) result.dependencies = unique(node.observing).map(nodeToDependencyTree);
  return result;
}

function getObserverTree(thing, property) {
  var necooData = window.necooPushCallStack(arguments);
  return nodeToObserverTree(getAtom(thing, property));
}

function nodeToObserverTree(node) {
  var necooData = window.necooPushCallStack(arguments);
  var result = {
    name: node.name
  };
  if (hasObservers(node)) result.observers = Array.from(getObservers(node)).map(nodeToObserverTree);
  return result;
}

var generatorId = 0;

function flow(generator) {
  var necooData = window.necooPushCallStack(arguments);
  if (arguments.length !== 1) fail( true && "Flow expects one 1 argument and cannot be used as decorator");
  var name = generator.name || "<unnamed flow>"; // Implementation based on https://github.com/tj/co/blob/master/index.js

  return function _anonymous_111() {
    var necooData = window.necooPushCallStack(arguments);
    var ctx = this;
    var args = arguments;
    var runId = ++generatorId;
    var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
    var rejector;
    var pendingPromise = undefined;
    var promise = new Promise(function _anonymous_112(resolve, reject) {
      var necooData = window.necooPushCallStack(arguments);
      var stepId = 0;
      rejector = reject;

      function onFulfilled(res) {
        var necooData = window.necooPushCallStack(arguments);
        pendingPromise = undefined;
        var ret;

        try {
          ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res);
        } catch (e) {
          return reject(e);
        }

        next(ret);
      }

      function onRejected(err) {
        var necooData = window.necooPushCallStack(arguments);
        pendingPromise = undefined;
        var ret;

        try {
          ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.throw).call(gen, err);
        } catch (e) {
          return reject(e);
        }

        next(ret);
      }

      function next(ret) {
        var necooData = window.necooPushCallStack(arguments);

        if (ret && typeof ret.then === "function") {
          // an async iterator
          ret.then(next, reject);
          return;
        }

        if (ret.done) return resolve(ret.value);
        pendingPromise = Promise.resolve(ret.value);
        return pendingPromise.then(onFulfilled, onRejected);
      }

      onFulfilled(undefined); // kick off the process
    });
    promise.cancel = action(name + " - runid: " + runId + " - cancel", function _anonymous_113() {
      var necooData = window.necooPushCallStack(arguments);

      try {
        if (pendingPromise) cancelPromise(pendingPromise); // Finally block can return (or yield) stuff..

        var res = gen.return(); // eat anything that promise would do, it's cancelled!

        var yieldedPromise = Promise.resolve(res.value);
        yieldedPromise.then(noop, noop);
        cancelPromise(yieldedPromise); // maybe it can be cancelled :)
        // reject our original promise

        rejector(new Error("FLOW_CANCELLED"));
      } catch (e) {
        rejector(e); // there could be a throwing finally block
      }
    });
    return promise;
  };
}

function cancelPromise(promise) {
  var necooData = window.necooPushCallStack(arguments);
  if (typeof promise.cancel === "function") promise.cancel();
}

function interceptReads(thing, propOrHandler, handler) {
  var necooData = window.necooPushCallStack(arguments);
  var target;

  if (isObservableMap(thing) || isObservableArray(thing) || isObservableValue(thing)) {
    target = getAdministration(thing);
  } else if (isObservableObject(thing)) {
    if (typeof propOrHandler !== "string") return fail( true && "InterceptReads can only be used with a specific property, not with an object in general");
    target = getAdministration(thing, propOrHandler);
  } else {
    return fail( true && "Expected observable map, object or array as first array");
  }

  if (target.dehancer !== undefined) return fail( true && "An intercept reader was already established");
  target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
  return function _anonymous_114() {
    var necooData = window.necooPushCallStack(arguments);
    target.dehancer = undefined;
  };
}

function intercept(thing, propOrHandler, handler) {
  var necooData = window.necooPushCallStack(arguments);
  if (typeof handler === "function") return interceptProperty(thing, propOrHandler, handler);else return interceptInterceptable(thing, propOrHandler);
}

function interceptInterceptable(thing, handler) {
  var necooData = window.necooPushCallStack(arguments);
  return getAdministration(thing).intercept(handler);
}

function interceptProperty(thing, property, handler) {
  var necooData = window.necooPushCallStack(arguments);
  return getAdministration(thing, property).intercept(handler);
}

function _isComputed(value, property) {
  var necooData = window.necooPushCallStack(arguments);
  if (value === null || value === undefined) return false;

  if (property !== undefined) {
    if (isObservableObject(value) === false) return false;
    if (!value[$mobx].values.has(property)) return false;
    var atom = getAtom(value, property);
    return isComputedValue(atom);
  }

  return isComputedValue(value);
}

function isComputed(value) {
  var necooData = window.necooPushCallStack(arguments);
  if (arguments.length > 1) return fail( true && "isComputed expects only 1 argument. Use isObservableProp to inspect the observability of a property");
  return _isComputed(value);
}

function isComputedProp(value, propName) {
  var necooData = window.necooPushCallStack(arguments);
  if (typeof propName !== "string") return fail( true && "isComputed expected a property name as second argument");
  return _isComputed(value, propName);
}

function _isObservable(value, property) {
  var necooData = window.necooPushCallStack(arguments);
  if (value === null || value === undefined) return false;

  if (property !== undefined) {
    if ( true && (isObservableMap(value) || isObservableArray(value))) return fail("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");

    if (isObservableObject(value)) {
      return value[$mobx].values.has(property);
    }

    return false;
  } // For first check, see #701


  return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
}

function isObservable(value) {
  var necooData = window.necooPushCallStack(arguments);
  if (arguments.length !== 1) fail( true && "isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
  return _isObservable(value);
}

function isObservableProp(value, propName) {
  var necooData = window.necooPushCallStack(arguments);
  if (typeof propName !== "string") return fail( true && "expected a property name as second argument");
  return _isObservable(value, propName);
}

function keys(obj) {
  var necooData = window.necooPushCallStack(arguments);

  if (isObservableObject(obj)) {
    return obj[$mobx].getKeys();
  }

  if (isObservableMap(obj)) {
    return Array.from(obj.keys());
  }

  if (isObservableSet(obj)) {
    return Array.from(obj.keys());
  }

  if (isObservableArray(obj)) {
    return obj.map(function _anonymous_115(_, index) {
      var necooData = window.necooPushCallStack(arguments);
      return index;
    });
  }

  return fail( true && "'keys()' can only be used on observable objects, arrays, sets and maps");
}

function values(obj) {
  var necooData = window.necooPushCallStack(arguments);

  if (isObservableObject(obj)) {
    return keys(obj).map(function _anonymous_116(key) {
      var necooData = window.necooPushCallStack(arguments);
      return obj[key];
    });
  }

  if (isObservableMap(obj)) {
    return keys(obj).map(function _anonymous_117(key) {
      var necooData = window.necooPushCallStack(arguments);
      return obj.get(key);
    });
  }

  if (isObservableSet(obj)) {
    return Array.from(obj.values());
  }

  if (isObservableArray(obj)) {
    return obj.slice();
  }

  return fail( true && "'values()' can only be used on observable objects, arrays, sets and maps");
}

function entries(obj) {
  var necooData = window.necooPushCallStack(arguments);

  if (isObservableObject(obj)) {
    return keys(obj).map(function _anonymous_118(key) {
      var necooData = window.necooPushCallStack(arguments);
      return [key, obj[key]];
    });
  }

  if (isObservableMap(obj)) {
    return keys(obj).map(function _anonymous_119(key) {
      var necooData = window.necooPushCallStack(arguments);
      return [key, obj.get(key)];
    });
  }

  if (isObservableSet(obj)) {
    return Array.from(obj.entries());
  }

  if (isObservableArray(obj)) {
    return obj.map(function _anonymous_120(key, index) {
      var necooData = window.necooPushCallStack(arguments);
      return [index, key];
    });
  }

  return fail( true && "'entries()' can only be used on observable objects, arrays and maps");
}

function set(obj, key, value) {
  var necooData = window.necooPushCallStack(arguments);

  if (arguments.length === 2 && !isObservableSet(obj)) {
    startBatch();
    var values_1 = key;

    try {
      for (var key_1 in values_1) set(obj, key_1, values_1[key_1]);
    } finally {
      endBatch();
    }

    return;
  }

  if (isObservableObject(obj)) {
    var adm = obj[$mobx];
    var existingObservable = adm.values.get(key);

    if (existingObservable) {
      adm.write(key, value);
    } else {
      adm.addObservableProp(key, value, adm.defaultEnhancer);
    }
  } else if (isObservableMap(obj)) {
    obj.set(key, value);
  } else if (isObservableSet(obj)) {
    obj.add(key);
  } else if (isObservableArray(obj)) {
    if (typeof key !== "number") key = parseInt(key, 10);
    invariant(key >= 0, "Not a valid index: '" + key + "'");
    startBatch();
    if (key >= obj.length) obj.length = key + 1;
    obj[key] = value;
    endBatch();
  } else {
    return fail( true && "'set()' can only be used on observable objects, arrays and maps");
  }
}

function remove(obj, key) {
  var necooData = window.necooPushCallStack(arguments);

  if (isObservableObject(obj)) {
    obj[$mobx].remove(key);
  } else if (isObservableMap(obj)) {
    obj.delete(key);
  } else if (isObservableSet(obj)) {
    obj.delete(key);
  } else if (isObservableArray(obj)) {
    if (typeof key !== "number") key = parseInt(key, 10);
    invariant(key >= 0, "Not a valid index: '" + key + "'");
    obj.splice(key, 1);
  } else {
    return fail( true && "'remove()' can only be used on observable objects, arrays and maps");
  }
}

function has(obj, key) {
  var necooData = window.necooPushCallStack(arguments);

  if (isObservableObject(obj)) {
    // return keys(obj).indexOf(key) >= 0
    var adm = getAdministration(obj);
    return adm.has(key);
  } else if (isObservableMap(obj)) {
    return obj.has(key);
  } else if (isObservableSet(obj)) {
    return obj.has(key);
  } else if (isObservableArray(obj)) {
    return key >= 0 && key < obj.length;
  } else {
    return fail( true && "'has()' can only be used on observable objects, arrays and maps");
  }
}

function get(obj, key) {
  var necooData = window.necooPushCallStack(arguments);
  if (!has(obj, key)) return undefined;

  if (isObservableObject(obj)) {
    return obj[key];
  } else if (isObservableMap(obj)) {
    return obj.get(key);
  } else if (isObservableArray(obj)) {
    return obj[key];
  } else {
    return fail( true && "'get()' can only be used on observable objects, arrays and maps");
  }
}

function observe(thing, propOrCb, cbOrFire, fireImmediately) {
  var necooData = window.necooPushCallStack(arguments);
  if (typeof cbOrFire === "function") return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);else return observeObservable(thing, propOrCb, cbOrFire);
}

function observeObservable(thing, listener, fireImmediately) {
  var necooData = window.necooPushCallStack(arguments);
  return getAdministration(thing).observe(listener, fireImmediately);
}

function observeObservableProperty(thing, property, listener, fireImmediately) {
  var necooData = window.necooPushCallStack(arguments);
  return getAdministration(thing, property).observe(listener, fireImmediately);
}

var defaultOptions = {
  detectCycles: true,
  exportMapsAsObjects: true,
  recurseEverything: false
};

function cache(map, key, value, options) {
  var necooData = window.necooPushCallStack(arguments);
  if (options.detectCycles) map.set(key, value);
  return value;
}

function toJSHelper(source, options, __alreadySeen) {
  var necooData = window.necooPushCallStack(arguments);
  if (!options.recurseEverything && !isObservable(source)) return source;
  if (typeof source !== "object") return source; // Directly return null if source is null

  if (source === null) return null; // Directly return the Date object itself if contained in the observable

  if (source instanceof Date) return source;
  if (isObservableValue(source)) return toJSHelper(source.get(), options, __alreadySeen); // make sure we track the keys of the object

  if (isObservable(source)) keys(source);
  var detectCycles = options.detectCycles === true;

  if (detectCycles && source !== null && __alreadySeen.has(source)) {
    return __alreadySeen.get(source);
  }

  if (isObservableArray(source) || Array.isArray(source)) {
    var res_1 = cache(__alreadySeen, source, [], options);
    var toAdd = source.map(function _anonymous_121(value) {
      var necooData = window.necooPushCallStack(arguments);
      return toJSHelper(value, options, __alreadySeen);
    });
    res_1.length = toAdd.length;

    for (var i = 0, l = toAdd.length; i < l; i++) res_1[i] = toAdd[i];

    return res_1;
  }

  if (isObservableSet(source) || Object.getPrototypeOf(source) === Set.prototype) {
    if (options.exportMapsAsObjects === false) {
      var res_2 = cache(__alreadySeen, source, new Set(), options);
      source.forEach(function _anonymous_122(value) {
        var necooData = window.necooPushCallStack(arguments);
        res_2.add(toJSHelper(value, options, __alreadySeen));
      });
      return res_2;
    } else {
      var res_3 = cache(__alreadySeen, source, [], options);
      source.forEach(function _anonymous_123(value) {
        var necooData = window.necooPushCallStack(arguments);
        res_3.push(toJSHelper(value, options, __alreadySeen));
      });
      return res_3;
    }
  }

  if (isObservableMap(source) || Object.getPrototypeOf(source) === Map.prototype) {
    if (options.exportMapsAsObjects === false) {
      var res_4 = cache(__alreadySeen, source, new Map(), options);
      source.forEach(function _anonymous_124(value, key) {
        var necooData = window.necooPushCallStack(arguments);
        res_4.set(key, toJSHelper(value, options, __alreadySeen));
      });
      return res_4;
    } else {
      var res_5 = cache(__alreadySeen, source, {}, options);
      source.forEach(function _anonymous_125(value, key) {
        var necooData = window.necooPushCallStack(arguments);
        res_5[key] = toJSHelper(value, options, __alreadySeen);
      });
      return res_5;
    }
  } // Fallback to the situation that source is an ObservableObject or a plain object


  var res = cache(__alreadySeen, source, {}, options);
  getPlainObjectKeys(source).forEach(function _anonymous_126(key) {
    var necooData = window.necooPushCallStack(arguments);
    res[key] = toJSHelper(source[key], options, __alreadySeen);
  });
  return res;
}

function toJS(source, options) {
  var necooData = window.necooPushCallStack(arguments); // backward compatibility

  if (typeof options === "boolean") options = {
    detectCycles: options
  };
  if (!options) options = defaultOptions;
  options.detectCycles = options.detectCycles === undefined ? options.recurseEverything === true : options.detectCycles === true;

  var __alreadySeen;

  if (options.detectCycles) __alreadySeen = new Map();
  return toJSHelper(source, options, __alreadySeen);
}

function trace() {
  var necooData = window.necooPushCallStack(arguments);
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var enterBreakPoint = false;
  if (typeof args[args.length - 1] === "boolean") enterBreakPoint = args.pop();
  var derivation = getAtomFromArgs(args);

  if (!derivation) {
    return fail( true && "'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
  }

  if (derivation.isTracing === TraceMode.NONE) {
    console.log("[mobx.trace] '" + derivation.name + "' tracing enabled");
  }

  derivation.isTracing = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
}

function getAtomFromArgs(args) {
  var necooData = window.necooPushCallStack(arguments);

  switch (args.length) {
    case 0:
      return globalState.trackingDerivation;

    case 1:
      return getAtom(args[0]);

    case 2:
      return getAtom(args[0], args[1]);
  }
}
/**
 * During a transaction no views are updated until the end of the transaction.
 * The transaction will be run synchronously nonetheless.
 *
 * @param action a function that updates some reactive state
 * @returns any value that was returned by the 'action' parameter.
 */


function transaction(action, thisArg) {
  var necooData = window.necooPushCallStack(arguments);

  if (thisArg === void 0) {
    thisArg = undefined;
  }

  startBatch();

  try {
    return action.apply(thisArg);
  } finally {
    endBatch();
  }
}

function when(predicate, arg1, arg2) {
  var necooData = window.necooPushCallStack(arguments);
  if (arguments.length === 1 || arg1 && typeof arg1 === "object") return whenPromise(predicate, arg1);
  return _when(predicate, arg1, arg2 || {});
}

function _when(predicate, effect, opts) {
  var necooData = window.necooPushCallStack(arguments);
  var timeoutHandle;

  if (typeof opts.timeout === "number") {
    timeoutHandle = setTimeout(function _anonymous_127() {
      var necooData = window.necooPushCallStack(arguments);

      if (!disposer[$mobx].isDisposed) {
        disposer();
        var error = new Error("WHEN_TIMEOUT");
        if (opts.onError) opts.onError(error);else throw error;
      }
    }, opts.timeout);
  }

  opts.name = opts.name || "When@" + getNextId();
  var effectAction = createAction(opts.name + "-effect", effect);
  var disposer = autorun(function _anonymous_128(r) {
    var necooData = window.necooPushCallStack(arguments);

    if (predicate()) {
      r.dispose();
      if (timeoutHandle) clearTimeout(timeoutHandle);
      effectAction();
    }
  }, opts);
  return disposer;
}

function whenPromise(predicate, opts) {
  var necooData = window.necooPushCallStack(arguments);
  if ( true && opts && opts.onError) return fail("the options 'onError' and 'promise' cannot be combined");
  var cancel;
  var res = new Promise(function _anonymous_129(resolve, reject) {
    var necooData = window.necooPushCallStack(arguments);

    var disposer = _when(predicate, resolve, __assign({}, opts, {
      onError: reject
    }));

    cancel = function _anonymous_130() {
      var necooData = window.necooPushCallStack(arguments);
      disposer();
      reject("WHEN_CANCELLED");
    };
  });
  res.cancel = cancel;
  return res;
}

function getAdm(target) {
  var necooData = window.necooPushCallStack(arguments);
  return target[$mobx];
}

function isPropertyKey(val) {
  var necooData = window.necooPushCallStack(arguments);
  return typeof val === "string" || typeof val === "number" || typeof val === "symbol";
} // Optimization: we don't need the intermediate objects and could have a completely custom administration for DynamicObjects,
// and skip either the internal values map, or the base object with its property descriptors!


var objectProxyTraps = {
  has: function _anonymous_131(target, name) {
    var necooData = window.necooPushCallStack(arguments);
    if (name === $mobx || name === "constructor" || name === mobxDidRunLazyInitializersSymbol) return true;
    var adm = getAdm(target); // MWE: should `in` operator be reactive? If not, below code path will be faster / more memory efficient
    // TODO: check performance stats!
    // if (adm.values.get(name as string)) return true

    if (isPropertyKey(name)) return adm.has(name);
    return name in target;
  },
  get: function _anonymous_132(target, name) {
    var necooData = window.necooPushCallStack(arguments);
    if (name === $mobx || name === "constructor" || name === mobxDidRunLazyInitializersSymbol) return target[name];
    var adm = getAdm(target);
    var observable = adm.values.get(name);

    if (observable instanceof Atom) {
      var result = observable.get();

      if (result === undefined) {
        // This fixes #1796, because deleting a prop that has an
        // undefined value won't retrigger a observer (no visible effect),
        // the autorun wouldn't subscribe to future key changes (see also next comment)
        adm.has(name);
      }

      return result;
    } // make sure we start listening to future keys
    // note that we only do this here for optimization


    if (isPropertyKey(name)) adm.has(name);
    return target[name];
  },
  set: function _anonymous_133(target, name, value) {
    var necooData = window.necooPushCallStack(arguments);
    if (!isPropertyKey(name)) return false;
    set(target, name, value);
    return true;
  },
  deleteProperty: function _anonymous_134(target, name) {
    var necooData = window.necooPushCallStack(arguments);
    if (!isPropertyKey(name)) return false;
    var adm = getAdm(target);
    adm.remove(name);
    return true;
  },
  ownKeys: function _anonymous_135(target) {
    var necooData = window.necooPushCallStack(arguments);
    var adm = getAdm(target);
    adm.keysAtom.reportObserved();
    return Reflect.ownKeys(target);
  },
  preventExtensions: function _anonymous_136(target) {
    var necooData = window.necooPushCallStack(arguments);
    fail("Dynamic observable objects cannot be frozen");
    return false;
  }
};

function createDynamicObservableObject(base) {
  var necooData = window.necooPushCallStack(arguments);
  var proxy = new Proxy(base, objectProxyTraps);
  base[$mobx].proxy = proxy;
  return proxy;
}

function hasInterceptors(interceptable) {
  var necooData = window.necooPushCallStack(arguments);
  return interceptable.interceptors !== undefined && interceptable.interceptors.length > 0;
}

function registerInterceptor(interceptable, handler) {
  var necooData = window.necooPushCallStack(arguments);
  var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
  interceptors.push(handler);
  return once(function _anonymous_137() {
    var necooData = window.necooPushCallStack(arguments);
    var idx = interceptors.indexOf(handler);
    if (idx !== -1) interceptors.splice(idx, 1);
  });
}

function interceptChange(interceptable, change) {
  var necooData = window.necooPushCallStack(arguments);
  var prevU = untrackedStart();

  try {
    var interceptors = interceptable.interceptors;
    if (interceptors) for (var i = 0, l = interceptors.length; i < l; i++) {
      change = interceptors[i](change);
      invariant(!change || change.type, "Intercept handlers should return nothing or a change object");
      if (!change) break;
    }
    return change;
  } finally {
    untrackedEnd(prevU);
  }
}

function hasListeners(listenable) {
  var necooData = window.necooPushCallStack(arguments);
  return listenable.changeListeners !== undefined && listenable.changeListeners.length > 0;
}

function registerListener(listenable, handler) {
  var necooData = window.necooPushCallStack(arguments);
  var listeners = listenable.changeListeners || (listenable.changeListeners = []);
  listeners.push(handler);
  return once(function _anonymous_138() {
    var necooData = window.necooPushCallStack(arguments);
    var idx = listeners.indexOf(handler);
    if (idx !== -1) listeners.splice(idx, 1);
  });
}

function notifyListeners(listenable, change) {
  var necooData = window.necooPushCallStack(arguments);
  var prevU = untrackedStart();
  var listeners = listenable.changeListeners;
  if (!listeners) return;
  listeners = listeners.slice();

  for (var i = 0, l = listeners.length; i < l; i++) {
    listeners[i](change);
  }

  untrackedEnd(prevU);
}

var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859

var arrayTraps = {
  get: function _anonymous_139(target, name) {
    var necooData = window.necooPushCallStack(arguments);
    if (name === $mobx) return target[$mobx];
    if (name === "length") return target[$mobx].getArrayLength();

    if (typeof name === "number") {
      return arrayExtensions.get.call(target, name);
    }

    if (typeof name === "string" && !isNaN(name)) {
      return arrayExtensions.get.call(target, parseInt(name));
    }

    if (arrayExtensions.hasOwnProperty(name)) {
      return arrayExtensions[name];
    }

    return target[name];
  },
  set: function _anonymous_140(target, name, value) {
    var necooData = window.necooPushCallStack(arguments);

    if (name === "length") {
      target[$mobx].setArrayLength(value);
      return true;
    }

    if (typeof name === "number") {
      arrayExtensions.set.call(target, name, value);
      return true;
    }

    if (!isNaN(name)) {
      arrayExtensions.set.call(target, parseInt(name), value);
      return true;
    }

    return false;
  },
  preventExtensions: function _anonymous_141(target) {
    var necooData = window.necooPushCallStack(arguments);
    fail("Observable arrays cannot be frozen");
    return false;
  }
};

function createObservableArray(initialValues, enhancer, name, owned) {
  var necooData = window.necooPushCallStack(arguments);

  if (name === void 0) {
    name = "ObservableArray@" + getNextId();
  }

  if (owned === void 0) {
    owned = false;
  }

  var adm = new ObservableArrayAdministration(name, enhancer, owned);
  addHiddenFinalProp(adm.values, $mobx, adm);
  var proxy = new Proxy(adm.values, arrayTraps);
  adm.proxy = proxy;

  if (initialValues && initialValues.length) {
    var prev = allowStateChangesStart(true);
    adm.spliceWithArray(0, 0, initialValues);
    allowStateChangesEnd(prev);
  }

  return proxy;
}

var ObservableArrayAdministration =
/** @class */
function _anonymous_142() {
  var necooData = window.necooPushCallStack(arguments);

  function ObservableArrayAdministration(name, enhancer, owned) {
    var necooData = window.necooPushCallStack(arguments);
    this.owned = owned;
    this.values = [];
    this.proxy = undefined;
    this.lastKnownLength = 0;
    this.atom = new Atom(name || "ObservableArray@" + getNextId());

    this.enhancer = function _anonymous_143(newV, oldV) {
      var necooData = window.necooPushCallStack(arguments);
      return enhancer(newV, oldV, name + "[..]");
    };
  }

  ObservableArrayAdministration.prototype.dehanceValue = function _anonymous_144(value) {
    var necooData = window.necooPushCallStack(arguments);
    if (this.dehancer !== undefined) return this.dehancer(value);
    return value;
  };

  ObservableArrayAdministration.prototype.dehanceValues = function _anonymous_145(values) {
    var necooData = window.necooPushCallStack(arguments);
    if (this.dehancer !== undefined && values.length > 0) return values.map(this.dehancer);
    return values;
  };

  ObservableArrayAdministration.prototype.intercept = function _anonymous_146(handler) {
    var necooData = window.necooPushCallStack(arguments);
    return registerInterceptor(this, handler);
  };

  ObservableArrayAdministration.prototype.observe = function _anonymous_147(listener, fireImmediately) {
    var necooData = window.necooPushCallStack(arguments);

    if (fireImmediately === void 0) {
      fireImmediately = false;
    }

    if (fireImmediately) {
      listener({
        object: this.proxy,
        type: "splice",
        index: 0,
        added: this.values.slice(),
        addedCount: this.values.length,
        removed: [],
        removedCount: 0
      });
    }

    return registerListener(this, listener);
  };

  ObservableArrayAdministration.prototype.getArrayLength = function _anonymous_148() {
    var necooData = window.necooPushCallStack(arguments);
    this.atom.reportObserved();
    return this.values.length;
  };

  ObservableArrayAdministration.prototype.setArrayLength = function _anonymous_149(newLength) {
    var necooData = window.necooPushCallStack(arguments);
    if (typeof newLength !== "number" || newLength < 0) throw new Error("[mobx.array] Out of range: " + newLength);
    var currentLength = this.values.length;
    if (newLength === currentLength) return;else if (newLength > currentLength) {
      var newItems = new Array(newLength - currentLength);

      for (var i = 0; i < newLength - currentLength; i++) newItems[i] = undefined; // No Array.fill everywhere...


      this.spliceWithArray(currentLength, 0, newItems);
    } else this.spliceWithArray(newLength, currentLength - newLength);
  };

  ObservableArrayAdministration.prototype.updateArrayLength = function _anonymous_150(oldLength, delta) {
    var necooData = window.necooPushCallStack(arguments);
    if (oldLength !== this.lastKnownLength) throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed.");
    this.lastKnownLength += delta;
  };

  ObservableArrayAdministration.prototype.spliceWithArray = function _anonymous_151(index, deleteCount, newItems) {
    var necooData = window.necooPushCallStack(arguments);

    var _this = this;

    checkIfStateModificationsAreAllowed(this.atom);
    var length = this.values.length;
    if (index === undefined) index = 0;else if (index > length) index = length;else if (index < 0) index = Math.max(0, length + index);
    if (arguments.length === 1) deleteCount = length - index;else if (deleteCount === undefined || deleteCount === null) deleteCount = 0;else deleteCount = Math.max(0, Math.min(deleteCount, length - index));
    if (newItems === undefined) newItems = EMPTY_ARRAY;

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy,
        type: "splice",
        index: index,
        removedCount: deleteCount,
        added: newItems
      });
      if (!change) return EMPTY_ARRAY;
      deleteCount = change.removedCount;
      newItems = change.added;
    }

    newItems = newItems.length === 0 ? newItems : newItems.map(function _anonymous_152(v) {
      var necooData = window.necooPushCallStack(arguments);
      return _this.enhancer(v, undefined);
    });

    if (true) {
      var lengthDelta = newItems.length - deleteCount;
      this.updateArrayLength(length, lengthDelta); // checks if internal array wasn't modified
    }

    var res = this.spliceItemsIntoValues(index, deleteCount, newItems);
    if (deleteCount !== 0 || newItems.length !== 0) this.notifyArraySplice(index, newItems, res);
    return this.dehanceValues(res);
  };

  ObservableArrayAdministration.prototype.spliceItemsIntoValues = function _anonymous_153(index, deleteCount, newItems) {
    var necooData = window.necooPushCallStack(arguments);

    var _a;

    if (newItems.length < MAX_SPLICE_SIZE) {
      return (_a = this.values).splice.apply(_a, __spread([index, deleteCount], newItems));
    } else {
      var res = this.values.slice(index, index + deleteCount);
      this.values = this.values.slice(0, index).concat(newItems, this.values.slice(index + deleteCount));
      return res;
    }
  };

  ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function _anonymous_154(index, newValue, oldValue) {
    var necooData = window.necooPushCallStack(arguments);
    var notifySpy = !this.owned && isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      object: this.proxy,
      type: "update",
      index: index,
      newValue: newValue,
      oldValue: oldValue
    } : null; // The reason why this is on right hand side here (and not above), is this way the uglifier will drop it, but it won't
    // cause any runtime overhead in development mode without NODE_ENV set, unless spying is enabled

    if (notifySpy && "development" !== "production") spyReportStart(__assign({}, change, {
      name: this.atom.name
    }));
    this.atom.reportChanged();
    if (notify) notifyListeners(this, change);
    if (notifySpy && "development" !== "production") spyReportEnd();
  };

  ObservableArrayAdministration.prototype.notifyArraySplice = function _anonymous_155(index, added, removed) {
    var necooData = window.necooPushCallStack(arguments);
    var notifySpy = !this.owned && isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      object: this.proxy,
      type: "splice",
      index: index,
      removed: removed,
      added: added,
      removedCount: removed.length,
      addedCount: added.length
    } : null;
    if (notifySpy && "development" !== "production") spyReportStart(__assign({}, change, {
      name: this.atom.name
    }));
    this.atom.reportChanged(); // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe

    if (notify) notifyListeners(this, change);
    if (notifySpy && "development" !== "production") spyReportEnd();
  };

  return ObservableArrayAdministration;
}();

var arrayExtensions = {
  intercept: function _anonymous_156(handler) {
    var necooData = window.necooPushCallStack(arguments);
    return this[$mobx].intercept(handler);
  },
  observe: function _anonymous_157(listener, fireImmediately) {
    var necooData = window.necooPushCallStack(arguments);

    if (fireImmediately === void 0) {
      fireImmediately = false;
    }

    var adm = this[$mobx];
    return adm.observe(listener, fireImmediately);
  },
  clear: function _anonymous_158() {
    var necooData = window.necooPushCallStack(arguments);
    return this.splice(0);
  },
  replace: function _anonymous_159(newItems) {
    var necooData = window.necooPushCallStack(arguments);
    var adm = this[$mobx];
    return adm.spliceWithArray(0, adm.values.length, newItems);
  },

  /**
   * Converts this array back to a (shallow) javascript structure.
   * For a deep clone use mobx.toJS
   */
  toJS: function _anonymous_160() {
    var necooData = window.necooPushCallStack(arguments);
    return this.slice();
  },
  toJSON: function _anonymous_161() {
    var necooData = window.necooPushCallStack(arguments); // Used by JSON.stringify

    return this.toJS();
  },

  /*
   * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
   * since these functions alter the inner structure of the array, the have side effects.
   * Because the have side effects, they should not be used in computed function,
   * and for that reason the do not call dependencyState.notifyObserved
   */
  splice: function _anonymous_162(index, deleteCount) {
    var necooData = window.necooPushCallStack(arguments);
    var newItems = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      newItems[_i - 2] = arguments[_i];
    }

    var adm = this[$mobx];

    switch (arguments.length) {
      case 0:
        return [];

      case 1:
        return adm.spliceWithArray(index);

      case 2:
        return adm.spliceWithArray(index, deleteCount);
    }

    return adm.spliceWithArray(index, deleteCount, newItems);
  },
  spliceWithArray: function _anonymous_163(index, deleteCount, newItems) {
    var necooData = window.necooPushCallStack(arguments);
    var adm = this[$mobx];
    return adm.spliceWithArray(index, deleteCount, newItems);
  },
  push: function _anonymous_164() {
    var necooData = window.necooPushCallStack(arguments);
    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    var adm = this[$mobx];
    adm.spliceWithArray(adm.values.length, 0, items);
    return adm.values.length;
  },
  pop: function _anonymous_165() {
    var necooData = window.necooPushCallStack(arguments);
    return this.splice(Math.max(this[$mobx].values.length - 1, 0), 1)[0];
  },
  shift: function _anonymous_166() {
    var necooData = window.necooPushCallStack(arguments);
    return this.splice(0, 1)[0];
  },
  unshift: function _anonymous_167() {
    var necooData = window.necooPushCallStack(arguments);
    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    var adm = this[$mobx];
    adm.spliceWithArray(0, 0, items);
    return adm.values.length;
  },
  reverse: function _anonymous_168() {
    var necooData = window.necooPushCallStack(arguments); // reverse by default mutates in place before returning the result
    // which makes it both a 'derivation' and a 'mutation'.
    // so we deviate from the default and just make it an dervitation

    if (true) {
      console.warn("[mobx] `observableArray.reverse()` will not update the array in place. Use `observableArray.slice().reverse()` to supress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().reverse())` to reverse & update in place");
    }

    var clone = this.slice();
    return clone.reverse.apply(clone, arguments);
  },
  sort: function _anonymous_169(compareFn) {
    var necooData = window.necooPushCallStack(arguments); // sort by default mutates in place before returning the result
    // which goes against all good practices. Let's not change the array in place!

    if (true) {
      console.warn("[mobx] `observableArray.sort()` will not update the array in place. Use `observableArray.slice().sort()` to supress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().sort())` to sort & update in place");
    }

    var clone = this.slice();
    return clone.sort.apply(clone, arguments);
  },
  remove: function _anonymous_170(value) {
    var necooData = window.necooPushCallStack(arguments);
    var adm = this[$mobx];
    var idx = adm.dehanceValues(adm.values).indexOf(value);

    if (idx > -1) {
      this.splice(idx, 1);
      return true;
    }

    return false;
  },
  get: function _anonymous_171(index) {
    var necooData = window.necooPushCallStack(arguments);
    var adm = this[$mobx];

    if (adm) {
      if (index < adm.values.length) {
        adm.atom.reportObserved();
        return adm.dehanceValue(adm.values[index]);
      }

      console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + adm.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
    }

    return undefined;
  },
  set: function _anonymous_172(index, newValue) {
    var necooData = window.necooPushCallStack(arguments);
    var adm = this[$mobx];
    var values = adm.values;

    if (index < values.length) {
      // update at index in range
      checkIfStateModificationsAreAllowed(adm.atom);
      var oldValue = values[index];

      if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
          type: "update",
          object: adm.proxy,
          index: index,
          newValue: newValue
        });
        if (!change) return;
        newValue = change.newValue;
      }

      newValue = adm.enhancer(newValue, oldValue);
      var changed = newValue !== oldValue;

      if (changed) {
        values[index] = newValue;
        adm.notifyArrayChildUpdate(index, newValue, oldValue);
      }
    } else if (index === values.length) {
      // add a new item
      adm.spliceWithArray(index, 0, [newValue]);
    } else {
      // out of bounds
      throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values.length);
    }
  }
};
["concat", "every", "filter", "forEach", "indexOf", "join", "lastIndexOf", "map", "reduce", "reduceRight", "slice", "some", "toString", "toLocaleString"].forEach(function _anonymous_173(funcName) {
  var necooData = window.necooPushCallStack(arguments);

  arrayExtensions[funcName] = function _anonymous_174() {
    var necooData = window.necooPushCallStack(arguments);
    var adm = this[$mobx];
    adm.atom.reportObserved();
    var res = adm.dehanceValues(adm.values);
    return res[funcName].apply(res, arguments);
  };
});
var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);

function isObservableArray(thing) {
  var necooData = window.necooPushCallStack(arguments);
  return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
}

var _a;

var ObservableMapMarker = {}; // just extend Map? See also https://gist.github.com/nestharus/13b4d74f2ef4a2f4357dbd3fc23c1e54
// But: https://github.com/mobxjs/mobx/issues/1556

var ObservableMap =
/** @class */
function _anonymous_175() {
  var necooData = window.necooPushCallStack(arguments);

  function ObservableMap(initialData, enhancer, name) {
    var necooData = window.necooPushCallStack(arguments);

    if (enhancer === void 0) {
      enhancer = deepEnhancer;
    }

    if (name === void 0) {
      name = "ObservableMap@" + getNextId();
    }

    this.enhancer = enhancer;
    this.name = name;
    this[_a] = ObservableMapMarker;
    this._keysAtom = createAtom(this.name + ".keys()");
    this[Symbol.toStringTag] = "Map";

    if (typeof Map !== "function") {
      throw new Error("mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js");
    }

    this._data = new Map();
    this._hasMap = new Map();
    this.merge(initialData);
  }

  ObservableMap.prototype._has = function _anonymous_176(key) {
    var necooData = window.necooPushCallStack(arguments);
    return this._data.has(key);
  };

  ObservableMap.prototype.has = function _anonymous_177(key) {
    var necooData = window.necooPushCallStack(arguments);
    if (this._hasMap.has(key)) return this._hasMap.get(key).get();
    return this._updateHasMapEntry(key, false).get();
  };

  ObservableMap.prototype.set = function _anonymous_178(key, value) {
    var necooData = window.necooPushCallStack(arguments);

    var hasKey = this._has(key);

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: hasKey ? "update" : "add",
        object: this,
        newValue: value,
        name: key
      });
      if (!change) return this;
      value = change.newValue;
    }

    if (hasKey) {
      this._updateValue(key, value);
    } else {
      this._addValue(key, value);
    }

    return this;
  };

  ObservableMap.prototype.delete = function _anonymous_179(key) {
    var necooData = window.necooPushCallStack(arguments);

    var _this = this;

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: "delete",
        object: this,
        name: key
      });
      if (!change) return false;
    }

    if (this._has(key)) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        type: "delete",
        object: this,
        oldValue: this._data.get(key).value,
        name: key
      } : null;
      if (notifySpy && "development" !== "production") spyReportStart(__assign({}, change, {
        name: this.name,
        key: key
      }));
      transaction(function _anonymous_180() {
        var necooData = window.necooPushCallStack(arguments);

        _this._keysAtom.reportChanged();

        _this._updateHasMapEntry(key, false);

        var observable = _this._data.get(key);

        observable.setNewValue(undefined);

        _this._data.delete(key);
      });
      if (notify) notifyListeners(this, change);
      if (notifySpy && "development" !== "production") spyReportEnd();
      return true;
    }

    return false;
  };

  ObservableMap.prototype._updateHasMapEntry = function _anonymous_181(key, value) {
    var necooData = window.necooPushCallStack(arguments); // optimization; don't fill the hasMap if we are not observing, or remove entry if there are no observers anymore

    var entry = this._hasMap.get(key);

    if (entry) {
      entry.setNewValue(value);
    } else {
      entry = new ObservableValue(value, referenceEnhancer, this.name + "." + stringifyKey(key) + "?", false);

      this._hasMap.set(key, entry);
    }

    return entry;
  };

  ObservableMap.prototype._updateValue = function _anonymous_182(key, newValue) {
    var necooData = window.necooPushCallStack(arguments);

    var observable = this._data.get(key);

    newValue = observable.prepareNewValue(newValue);

    if (newValue !== globalState.UNCHANGED) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        type: "update",
        object: this,
        oldValue: observable.value,
        name: key,
        newValue: newValue
      } : null;
      if (notifySpy && "development" !== "production") spyReportStart(__assign({}, change, {
        name: this.name,
        key: key
      }));
      observable.setNewValue(newValue);
      if (notify) notifyListeners(this, change);
      if (notifySpy && "development" !== "production") spyReportEnd();
    }
  };

  ObservableMap.prototype._addValue = function _anonymous_183(key, newValue) {
    var necooData = window.necooPushCallStack(arguments);

    var _this = this;

    checkIfStateModificationsAreAllowed(this._keysAtom);
    transaction(function _anonymous_184() {
      var necooData = window.necooPushCallStack(arguments);
      var observable = new ObservableValue(newValue, _this.enhancer, _this.name + "." + stringifyKey(key), false);

      _this._data.set(key, observable);

      newValue = observable.value; // value might have been changed

      _this._updateHasMapEntry(key, true);

      _this._keysAtom.reportChanged();
    });
    var notifySpy = isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      type: "add",
      object: this,
      name: key,
      newValue: newValue
    } : null;
    if (notifySpy && "development" !== "production") spyReportStart(__assign({}, change, {
      name: this.name,
      key: key
    }));
    if (notify) notifyListeners(this, change);
    if (notifySpy && "development" !== "production") spyReportEnd();
  };

  ObservableMap.prototype.get = function _anonymous_185(key) {
    var necooData = window.necooPushCallStack(arguments);
    if (this.has(key)) return this.dehanceValue(this._data.get(key).get());
    return this.dehanceValue(undefined);
  };

  ObservableMap.prototype.dehanceValue = function _anonymous_186(value) {
    var necooData = window.necooPushCallStack(arguments);

    if (this.dehancer !== undefined) {
      return this.dehancer(value);
    }

    return value;
  };

  ObservableMap.prototype.keys = function _anonymous_187() {
    var necooData = window.necooPushCallStack(arguments);

    this._keysAtom.reportObserved();

    return this._data.keys();
  };

  ObservableMap.prototype.values = function _anonymous_188() {
    var necooData = window.necooPushCallStack(arguments);
    var self = this;
    var nextIndex = 0;
    var keys = Array.from(this.keys());
    return makeIterable({
      next: function _anonymous_189() {
        var necooData = window.necooPushCallStack(arguments);
        return nextIndex < keys.length ? {
          value: self.get(keys[nextIndex++]),
          done: false
        } : {
          done: true
        };
      }
    });
  };

  ObservableMap.prototype.entries = function _anonymous_190() {
    var necooData = window.necooPushCallStack(arguments);
    var self = this;
    var nextIndex = 0;
    var keys = Array.from(this.keys());
    return makeIterable({
      next: function _anonymous_191() {
        var necooData = window.necooPushCallStack(arguments);

        if (nextIndex < keys.length) {
          var key = keys[nextIndex++];
          return {
            value: [key, self.get(key)],
            done: false
          };
        }

        return {
          done: true
        };
      }
    });
  };

  ObservableMap.prototype[(_a = $mobx, Symbol.iterator)] = function _anonymous_192() {
    var necooData = window.necooPushCallStack(arguments);
    return this.entries();
  };

  ObservableMap.prototype.forEach = function _anonymous_193(callback, thisArg) {
    var necooData = window.necooPushCallStack(arguments);

    var e_1, _a;

    try {
      for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
        var _d = __read(_c.value, 2),
            key = _d[0],
            value = _d[1];

        callback.call(thisArg, value, key, this);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };
  /** Merge another object into this object, returns this. */


  ObservableMap.prototype.merge = function _anonymous_194(other) {
    var necooData = window.necooPushCallStack(arguments);

    var _this = this;

    if (isObservableMap(other)) {
      other = other.toJS();
    }

    transaction(function _anonymous_195() {
      var necooData = window.necooPushCallStack(arguments);
      if (isPlainObject(other)) getPlainObjectKeys(other).forEach(function _anonymous_196(key) {
        var necooData = window.necooPushCallStack(arguments);
        return _this.set(key, other[key]);
      });else if (Array.isArray(other)) other.forEach(function _anonymous_197(_a) {
        var necooData = window.necooPushCallStack(arguments);

        var _b = __read(_a, 2),
            key = _b[0],
            value = _b[1];

        return _this.set(key, value);
      });else if (isES6Map(other)) {
        if (other.constructor !== Map) fail("Cannot initialize from classes that inherit from Map: " + other.constructor.name); // prettier-ignore

        other.forEach(function _anonymous_198(value, key) {
          var necooData = window.necooPushCallStack(arguments);
          return _this.set(key, value);
        });
      } else if (other !== null && other !== undefined) fail("Cannot initialize map from " + other);
    });
    return this;
  };

  ObservableMap.prototype.clear = function _anonymous_199() {
    var necooData = window.necooPushCallStack(arguments);

    var _this = this;

    transaction(function _anonymous_200() {
      var necooData = window.necooPushCallStack(arguments);
      untracked(function _anonymous_201() {
        var necooData = window.necooPushCallStack(arguments);

        var e_2, _a;

        try {
          for (var _b = __values(_this.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;

            _this.delete(key);
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      });
    });
  };

  ObservableMap.prototype.replace = function _anonymous_202(values) {
    var necooData = window.necooPushCallStack(arguments);

    var _this = this;

    transaction(function _anonymous_203() {
      var necooData = window.necooPushCallStack(arguments); // grab all the keys that are present in the new map but not present in the current map
      // and delete them from the map, then merge the new map
      // this will cause reactions only on changed values

      var newKeys = getMapLikeKeys(values);
      var oldKeys = Array.from(_this.keys());
      var missingKeys = oldKeys.filter(function _anonymous_204(k) {
        var necooData = window.necooPushCallStack(arguments);
        return newKeys.indexOf(k) === -1;
      });
      missingKeys.forEach(function _anonymous_205(k) {
        var necooData = window.necooPushCallStack(arguments);
        return _this.delete(k);
      });

      _this.merge(values);
    });
    return this;
  };

  Object.defineProperty(ObservableMap.prototype, "size", {
    get: function _anonymous_206() {
      var necooData = window.necooPushCallStack(arguments);

      this._keysAtom.reportObserved();

      return this._data.size;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Returns a plain object that represents this map.
   * Note that all the keys being stringified.
   * If there are duplicating keys after converting them to strings, behaviour is undetermined.
   */

  ObservableMap.prototype.toPOJO = function _anonymous_207() {
    var necooData = window.necooPushCallStack(arguments);

    var e_3, _a;

    var res = {};

    try {
      for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
        var _d = __read(_c.value, 2),
            key = _d[0],
            value = _d[1]; // We lie about symbol key types due to https://github.com/Microsoft/TypeScript/issues/1863


        res[typeof key === "symbol" ? key : stringifyKey(key)] = value;
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_3) throw e_3.error;
      }
    }

    return res;
  };
  /**
   * Returns a shallow non observable object clone of this map.
   * Note that the values migth still be observable. For a deep clone use mobx.toJS.
   */


  ObservableMap.prototype.toJS = function _anonymous_208() {
    var necooData = window.necooPushCallStack(arguments);
    return new Map(this);
  };

  ObservableMap.prototype.toJSON = function _anonymous_209() {
    var necooData = window.necooPushCallStack(arguments); // Used by JSON.stringify

    return this.toPOJO();
  };

  ObservableMap.prototype.toString = function _anonymous_210() {
    var necooData = window.necooPushCallStack(arguments);

    var _this = this;

    return this.name + "[{ " + Array.from(this.keys()).map(function _anonymous_211(key) {
      var necooData = window.necooPushCallStack(arguments);
      return stringifyKey(key) + ": " + ("" + _this.get(key));
    }).join(", ") + " }]";
  };
  /**
   * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
   * for callback details
   */


  ObservableMap.prototype.observe = function _anonymous_212(listener, fireImmediately) {
    var necooData = window.necooPushCallStack(arguments);
     true && invariant(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with maps.");
    return registerListener(this, listener);
  };

  ObservableMap.prototype.intercept = function _anonymous_213(handler) {
    var necooData = window.necooPushCallStack(arguments);
    return registerInterceptor(this, handler);
  };

  return ObservableMap;
}();
/* 'var' fixes small-build issue */


var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);

var _a$1;

var ObservableSetMarker = {};

var ObservableSet =
/** @class */
function _anonymous_214() {
  var necooData = window.necooPushCallStack(arguments);

  function ObservableSet(initialData, enhancer, name) {
    var necooData = window.necooPushCallStack(arguments);

    if (enhancer === void 0) {
      enhancer = deepEnhancer;
    }

    if (name === void 0) {
      name = "ObservableSet@" + getNextId();
    }

    this.name = name;
    this[_a$1] = ObservableSetMarker;
    this._data = new Set();
    this._atom = createAtom(this.name);
    this[Symbol.toStringTag] = "Set";

    if (typeof Set !== "function") {
      throw new Error("mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js");
    }

    this.enhancer = function _anonymous_215(newV, oldV) {
      var necooData = window.necooPushCallStack(arguments);
      return enhancer(newV, oldV, name);
    };

    if (initialData) {
      this.replace(initialData);
    }
  }

  ObservableSet.prototype.dehanceValue = function _anonymous_216(value) {
    var necooData = window.necooPushCallStack(arguments);

    if (this.dehancer !== undefined) {
      return this.dehancer(value);
    }

    return value;
  };

  ObservableSet.prototype.clear = function _anonymous_217() {
    var necooData = window.necooPushCallStack(arguments);

    var _this = this;

    transaction(function _anonymous_218() {
      var necooData = window.necooPushCallStack(arguments);
      untracked(function _anonymous_219() {
        var necooData = window.necooPushCallStack(arguments);

        var e_1, _a;

        try {
          for (var _b = __values(_this._data.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var value = _c.value;

            _this.delete(value);
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      });
    });
  };

  ObservableSet.prototype.forEach = function _anonymous_220(callbackFn, thisArg) {
    var necooData = window.necooPushCallStack(arguments);

    var e_2, _a;

    try {
      for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
        var value = _c.value;
        callbackFn.call(thisArg, value, value, this);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  };

  Object.defineProperty(ObservableSet.prototype, "size", {
    get: function _anonymous_221() {
      var necooData = window.necooPushCallStack(arguments);

      this._atom.reportObserved();

      return this._data.size;
    },
    enumerable: true,
    configurable: true
  });

  ObservableSet.prototype.add = function _anonymous_222(value) {
    var necooData = window.necooPushCallStack(arguments);

    var _this = this;

    checkIfStateModificationsAreAllowed(this._atom);

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: "add",
        object: this,
        newValue: value
      });
      if (!change) return this; // TODO: ideally, value = change.value would be done here, so that values can be
      // changed by interceptor. Same applies for other Set and Map api's.
    }

    if (!this.has(value)) {
      transaction(function _anonymous_223() {
        var necooData = window.necooPushCallStack(arguments);

        _this._data.add(_this.enhancer(value, undefined));

        _this._atom.reportChanged();
      });
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        type: "add",
        object: this,
        newValue: value
      } : null;
      if (notifySpy && "development" !== "production") spyReportStart(change);
      if (notify) notifyListeners(this, change);
      if (notifySpy && "development" !== "production") spyReportEnd();
    }

    return this;
  };

  ObservableSet.prototype.delete = function _anonymous_224(value) {
    var necooData = window.necooPushCallStack(arguments);

    var _this = this;

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: "delete",
        object: this,
        oldValue: value
      });
      if (!change) return false;
    }

    if (this.has(value)) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        type: "delete",
        object: this,
        oldValue: value
      } : null;
      if (notifySpy && "development" !== "production") spyReportStart(__assign({}, change, {
        name: this.name
      }));
      transaction(function _anonymous_225() {
        var necooData = window.necooPushCallStack(arguments);

        _this._atom.reportChanged();

        _this._data.delete(value);
      });
      if (notify) notifyListeners(this, change);
      if (notifySpy && "development" !== "production") spyReportEnd();
      return true;
    }

    return false;
  };

  ObservableSet.prototype.has = function _anonymous_226(value) {
    var necooData = window.necooPushCallStack(arguments);

    this._atom.reportObserved();

    return this._data.has(this.dehanceValue(value));
  };

  ObservableSet.prototype.entries = function _anonymous_227() {
    var necooData = window.necooPushCallStack(arguments);
    var nextIndex = 0;
    var keys = Array.from(this.keys());
    var values = Array.from(this.values());
    return makeIterable({
      next: function _anonymous_228() {
        var necooData = window.necooPushCallStack(arguments);
        var index = nextIndex;
        nextIndex += 1;
        return index < values.length ? {
          value: [keys[index], values[index]],
          done: false
        } : {
          done: true
        };
      }
    });
  };

  ObservableSet.prototype.keys = function _anonymous_229() {
    var necooData = window.necooPushCallStack(arguments);
    return this.values();
  };

  ObservableSet.prototype.values = function _anonymous_230() {
    var necooData = window.necooPushCallStack(arguments);

    this._atom.reportObserved();

    var self = this;
    var nextIndex = 0;
    var observableValues = Array.from(this._data.values());
    return makeIterable({
      next: function _anonymous_231() {
        var necooData = window.necooPushCallStack(arguments);
        return nextIndex < observableValues.length ? {
          value: self.dehanceValue(observableValues[nextIndex++]),
          done: false
        } : {
          done: true
        };
      }
    });
  };

  ObservableSet.prototype.replace = function _anonymous_232(other) {
    var necooData = window.necooPushCallStack(arguments);

    var _this = this;

    if (isObservableSet(other)) {
      other = other.toJS();
    }

    transaction(function _anonymous_233() {
      var necooData = window.necooPushCallStack(arguments);

      if (Array.isArray(other)) {
        _this.clear();

        other.forEach(function _anonymous_234(value) {
          var necooData = window.necooPushCallStack(arguments);
          return _this.add(value);
        });
      } else if (isES6Set(other)) {
        _this.clear();

        other.forEach(function _anonymous_235(value) {
          var necooData = window.necooPushCallStack(arguments);
          return _this.add(value);
        });
      } else if (other !== null && other !== undefined) {
        fail("Cannot initialize set from " + other);
      }
    });
    return this;
  };

  ObservableSet.prototype.observe = function _anonymous_236(listener, fireImmediately) {
    var necooData = window.necooPushCallStack(arguments); // TODO 'fireImmediately' can be true?

     true && invariant(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with sets.");
    return registerListener(this, listener);
  };

  ObservableSet.prototype.intercept = function _anonymous_237(handler) {
    var necooData = window.necooPushCallStack(arguments);
    return registerInterceptor(this, handler);
  };

  ObservableSet.prototype.toJS = function _anonymous_238() {
    var necooData = window.necooPushCallStack(arguments);
    return new Set(this);
  };

  ObservableSet.prototype.toString = function _anonymous_239() {
    var necooData = window.necooPushCallStack(arguments);
    return this.name + "[ " + Array.from(this).join(", ") + " ]";
  };

  ObservableSet.prototype[(_a$1 = $mobx, Symbol.iterator)] = function _anonymous_240() {
    var necooData = window.necooPushCallStack(arguments);
    return this.values();
  };

  return ObservableSet;
}();

var isObservableSet = createInstanceofPredicate("ObservableSet", ObservableSet);

var ObservableObjectAdministration =
/** @class */
function _anonymous_241() {
  var necooData = window.necooPushCallStack(arguments);

  function ObservableObjectAdministration(target, values, name, defaultEnhancer) {
    var necooData = window.necooPushCallStack(arguments);

    if (values === void 0) {
      values = new Map();
    }

    this.target = target;
    this.values = values;
    this.name = name;
    this.defaultEnhancer = defaultEnhancer;
    this.keysAtom = new Atom(name + ".keys");
  }

  ObservableObjectAdministration.prototype.read = function _anonymous_242(key) {
    var necooData = window.necooPushCallStack(arguments);
    return this.values.get(key).get();
  };

  ObservableObjectAdministration.prototype.write = function _anonymous_243(key, newValue) {
    var necooData = window.necooPushCallStack(arguments);
    var instance = this.target;
    var observable = this.values.get(key);

    if (observable instanceof ComputedValue) {
      observable.set(newValue);
      return;
    } // intercept


    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: "update",
        object: this.proxy || instance,
        name: key,
        newValue: newValue
      });
      if (!change) return;
      newValue = change.newValue;
    }

    newValue = observable.prepareNewValue(newValue); // notify spy & observers

    if (newValue !== globalState.UNCHANGED) {
      var notify = hasListeners(this);
      var notifySpy = isSpyEnabled();
      var change = notify || notifySpy ? {
        type: "update",
        object: this.proxy || instance,
        oldValue: observable.value,
        name: key,
        newValue: newValue
      } : null;
      if (notifySpy && "development" !== "production") spyReportStart(__assign({}, change, {
        name: this.name,
        key: key
      }));
      observable.setNewValue(newValue);
      if (notify) notifyListeners(this, change);
      if (notifySpy && "development" !== "production") spyReportEnd();
    }
  };

  ObservableObjectAdministration.prototype.has = function _anonymous_244(key) {
    var necooData = window.necooPushCallStack(arguments);
    var map = this.pendingKeys || (this.pendingKeys = new Map());
    var entry = map.get(key);
    if (entry) return entry.get();else {
      var exists = !!this.values.get(key); // Possible optimization: Don't have a separate map for non existing keys,
      // but store them in the values map instead, using a special symbol to denote "not existing"

      entry = new ObservableValue(exists, referenceEnhancer, this.name + "." + stringifyKey(key) + "?", false);
      map.set(key, entry);
      return entry.get(); // read to subscribe
    }
  };

  ObservableObjectAdministration.prototype.addObservableProp = function _anonymous_245(propName, newValue, enhancer) {
    var necooData = window.necooPushCallStack(arguments);

    if (enhancer === void 0) {
      enhancer = this.defaultEnhancer;
    }

    var target = this.target;
    assertPropertyConfigurable(target, propName);

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy || target,
        name: propName,
        type: "add",
        newValue: newValue
      });
      if (!change) return;
      newValue = change.newValue;
    }

    var observable = new ObservableValue(newValue, enhancer, this.name + "." + stringifyKey(propName), false);
    this.values.set(propName, observable);
    newValue = observable.value; // observableValue might have changed it

    Object.defineProperty(target, propName, generateObservablePropConfig(propName));
    this.notifyPropertyAddition(propName, newValue);
  };

  ObservableObjectAdministration.prototype.addComputedProp = function _anonymous_246(propertyOwner, // where is the property declared?
  propName, options) {
    var necooData = window.necooPushCallStack(arguments);
    var target = this.target;
    options.name = options.name || this.name + "." + stringifyKey(propName);
    this.values.set(propName, new ComputedValue(options));
    if (propertyOwner === target || isPropertyConfigurable(propertyOwner, propName)) Object.defineProperty(propertyOwner, propName, generateComputedPropConfig(propName));
  };

  ObservableObjectAdministration.prototype.remove = function _anonymous_247(key) {
    var necooData = window.necooPushCallStack(arguments);
    if (!this.values.has(key)) return;
    var target = this.target;

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy || target,
        name: key,
        type: "remove"
      });
      if (!change) return;
    }

    try {
      startBatch();
      var notify = hasListeners(this);
      var notifySpy = isSpyEnabled();
      var oldObservable = this.values.get(key);
      var oldValue = oldObservable && oldObservable.get();
      oldObservable && oldObservable.set(undefined); // notify key and keyset listeners

      this.keysAtom.reportChanged();
      this.values.delete(key);

      if (this.pendingKeys) {
        var entry = this.pendingKeys.get(key);
        if (entry) entry.set(false);
      } // delete the prop


      delete this.target[key];
      var change = notify || notifySpy ? {
        type: "remove",
        object: this.proxy || target,
        oldValue: oldValue,
        name: key
      } : null;
      if (notifySpy && "development" !== "production") spyReportStart(__assign({}, change, {
        name: this.name,
        key: key
      }));
      if (notify) notifyListeners(this, change);
      if (notifySpy && "development" !== "production") spyReportEnd();
    } finally {
      endBatch();
    }
  };

  ObservableObjectAdministration.prototype.illegalAccess = function _anonymous_248(owner, propName) {
    var necooData = window.necooPushCallStack(arguments);
    /**
     * This happens if a property is accessed through the prototype chain, but the property was
     * declared directly as own property on the prototype.
     *
     * E.g.:
     * class A {
     * }
     * extendObservable(A.prototype, { x: 1 })
     *
     * classB extens A {
     * }
     * console.log(new B().x)
     *
     * It is unclear whether the property should be considered 'static' or inherited.
     * Either use `console.log(A.x)`
     * or: decorate(A, { x: observable })
     *
     * When using decorate, the property will always be redeclared as own property on the actual instance
     */

    console.warn("Property '" + propName + "' of '" + owner + "' was accessed through the prototype chain. Use 'decorate' instead to declare the prop or access it statically through it's owner");
  };
  /**
   * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
   * for callback details
   */


  ObservableObjectAdministration.prototype.observe = function _anonymous_249(callback, fireImmediately) {
    var necooData = window.necooPushCallStack(arguments);
     true && invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
    return registerListener(this, callback);
  };

  ObservableObjectAdministration.prototype.intercept = function _anonymous_250(handler) {
    var necooData = window.necooPushCallStack(arguments);
    return registerInterceptor(this, handler);
  };

  ObservableObjectAdministration.prototype.notifyPropertyAddition = function _anonymous_251(key, newValue) {
    var necooData = window.necooPushCallStack(arguments);
    var notify = hasListeners(this);
    var notifySpy = isSpyEnabled();
    var change = notify || notifySpy ? {
      type: "add",
      object: this.proxy || this.target,
      name: key,
      newValue: newValue
    } : null;
    if (notifySpy && "development" !== "production") spyReportStart(__assign({}, change, {
      name: this.name,
      key: key
    }));
    if (notify) notifyListeners(this, change);
    if (notifySpy && "development" !== "production") spyReportEnd();

    if (this.pendingKeys) {
      var entry = this.pendingKeys.get(key);
      if (entry) entry.set(true);
    }

    this.keysAtom.reportChanged();
  };

  ObservableObjectAdministration.prototype.getKeys = function _anonymous_252() {
    var necooData = window.necooPushCallStack(arguments);

    var e_1, _a;

    this.keysAtom.reportObserved(); // return Reflect.ownKeys(this.values) as any

    var res = [];

    try {
      for (var _b = __values(this.values), _c = _b.next(); !_c.done; _c = _b.next()) {
        var _d = __read(_c.value, 2),
            key = _d[0],
            value = _d[1];

        if (value instanceof ObservableValue) res.push(key);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    return res;
  };

  return ObservableObjectAdministration;
}();

function asObservableObject(target, name, defaultEnhancer) {
  var necooData = window.necooPushCallStack(arguments);

  if (name === void 0) {
    name = "";
  }

  if (defaultEnhancer === void 0) {
    defaultEnhancer = deepEnhancer;
  }

  if (Object.prototype.hasOwnProperty.call(target, $mobx)) return target[$mobx];
   true && invariant(Object.isExtensible(target), "Cannot make the designated object observable; it is not extensible");
  if (!isPlainObject(target)) name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
  if (!name) name = "ObservableObject@" + getNextId();
  var adm = new ObservableObjectAdministration(target, new Map(), stringifyKey(name), defaultEnhancer);
  addHiddenProp(target, $mobx, adm);
  return adm;
}

var observablePropertyConfigs = Object.create(null);
var computedPropertyConfigs = Object.create(null);

function generateObservablePropConfig(propName) {
  var necooData = window.necooPushCallStack(arguments);
  return observablePropertyConfigs[propName] || (observablePropertyConfigs[propName] = {
    configurable: true,
    enumerable: true,
    get: function _anonymous_253() {
      var necooData = window.necooPushCallStack(arguments);
      return this[$mobx].read(propName);
    },
    set: function _anonymous_254(v) {
      var necooData = window.necooPushCallStack(arguments);
      this[$mobx].write(propName, v);
    }
  });
}

function getAdministrationForComputedPropOwner(owner) {
  var necooData = window.necooPushCallStack(arguments);
  var adm = owner[$mobx];

  if (!adm) {
    // because computed props are declared on proty,
    // the current instance might not have been initialized yet
    initializeInstance(owner);
    return owner[$mobx];
  }

  return adm;
}

function generateComputedPropConfig(propName) {
  var necooData = window.necooPushCallStack(arguments);
  return computedPropertyConfigs[propName] || (computedPropertyConfigs[propName] = {
    configurable: globalState.computedConfigurable,
    enumerable: false,
    get: function _anonymous_255() {
      var necooData = window.necooPushCallStack(arguments);
      return getAdministrationForComputedPropOwner(this).read(propName);
    },
    set: function _anonymous_256(v) {
      var necooData = window.necooPushCallStack(arguments);
      getAdministrationForComputedPropOwner(this).write(propName, v);
    }
  });
}

var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);

function isObservableObject(thing) {
  var necooData = window.necooPushCallStack(arguments);

  if (isObject(thing)) {
    // Initializers run lazily when transpiling to babel, so make sure they are run...
    initializeInstance(thing);
    return isObservableObjectAdministration(thing[$mobx]);
  }

  return false;
}

function getAtom(thing, property) {
  var necooData = window.necooPushCallStack(arguments);

  if (typeof thing === "object" && thing !== null) {
    if (isObservableArray(thing)) {
      if (property !== undefined) fail( true && "It is not possible to get index atoms from arrays");
      return thing[$mobx].atom;
    }

    if (isObservableSet(thing)) {
      return thing[$mobx];
    }

    if (isObservableMap(thing)) {
      var anyThing = thing;
      if (property === undefined) return anyThing._keysAtom;

      var observable = anyThing._data.get(property) || anyThing._hasMap.get(property);

      if (!observable) fail( true && "the entry '" + property + "' does not exist in the observable map '" + getDebugName(thing) + "'");
      return observable;
    } // Initializers run lazily when transpiling to babel, so make sure they are run...


    initializeInstance(thing);
    if (property && !thing[$mobx]) thing[property]; // See #1072

    if (isObservableObject(thing)) {
      if (!property) return fail( true && "please specify a property");
      var observable = thing[$mobx].values.get(property);
      if (!observable) fail( true && "no observable property '" + property + "' found on the observable object '" + getDebugName(thing) + "'");
      return observable;
    }

    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
      return thing;
    }
  } else if (typeof thing === "function") {
    if (isReaction(thing[$mobx])) {
      // disposer function
      return thing[$mobx];
    }
  }

  return fail( true && "Cannot obtain atom from " + thing);
}

function getAdministration(thing, property) {
  var necooData = window.necooPushCallStack(arguments);
  if (!thing) fail("Expecting some object");
  if (property !== undefined) return getAdministration(getAtom(thing, property));
  if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) return thing;
  if (isObservableMap(thing) || isObservableSet(thing)) return thing; // Initializers run lazily when transpiling to babel, so make sure they are run...

  initializeInstance(thing);
  if (thing[$mobx]) return thing[$mobx];
  fail( true && "Cannot obtain administration from " + thing);
}

function getDebugName(thing, property) {
  var necooData = window.necooPushCallStack(arguments);
  var named;
  if (property !== undefined) named = getAtom(thing, property);else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing)) named = getAdministration(thing);else named = getAtom(thing); // valid for arrays as well

  return named.name;
}

var toString = Object.prototype.toString;

function deepEqual(a, b) {
  var necooData = window.necooPushCallStack(arguments);
  return eq(a, b);
} // Copied from https://github.com/jashkenas/underscore/blob/5c237a7c682fb68fd5378203f0bf22dce1624854/underscore.js#L1186-L1289
// Internal recursive comparison function for `isEqual`.


function eq(a, b, aStack, bStack) {
  var necooData = window.necooPushCallStack(arguments); // Identical objects are equal. `0 === -0`, but they aren't identical.
  // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).

  if (a === b) return a !== 0 || 1 / a === 1 / b; // `null` or `undefined` only equal to itself (strict comparison).

  if (a == null || b == null) return false; // `NaN`s are equivalent, but non-reflexive.

  if (a !== a) return b !== b; // Exhaust primitive checks

  var type = typeof a;
  if (type !== "function" && type !== "object" && typeof b != "object") return false;
  return deepEq(a, b, aStack, bStack);
} // Internal recursive comparison function for `isEqual`.


function deepEq(a, b, aStack, bStack) {
  var necooData = window.necooPushCallStack(arguments); // Unwrap any wrapped objects.

  a = unwrap(a);
  b = unwrap(b); // Compare `[[Class]]` names.

  var className = toString.call(a);
  if (className !== toString.call(b)) return false;

  switch (className) {
    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
    case "[object RegExp]": // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')

    case "[object String]":
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return "" + a === "" + b;

    case "[object Number]":
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN.
      if (+a !== +a) return +b !== +b; // An `egal` comparison is performed for other numeric values.

      return +a === 0 ? 1 / +a === 1 / b : +a === +b;

    case "[object Date]":
    case "[object Boolean]":
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b;

    case "[object Symbol]":
      return typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b);
  }

  var areArrays = className === "[object Array]";

  if (!areArrays) {
    if (typeof a != "object" || typeof b != "object") return false; // Objects with different constructors are not equivalent, but `Object`s or `Array`s
    // from different frames are.

    var aCtor = a.constructor,
        bCtor = b.constructor;

    if (aCtor !== bCtor && !(typeof aCtor === "function" && aCtor instanceof aCtor && typeof bCtor === "function" && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) {
      return false;
    }
  } // Assume equality for cyclic structures. The algorithm for detecting cyclic
  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
  // Initializing stack of traversed objects.
  // It's done here since we only need them for objects and arrays comparison.


  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;

  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    if (aStack[length] === a) return bStack[length] === b;
  } // Add the first object to the stack of traversed objects.


  aStack.push(a);
  bStack.push(b); // Recursively compare objects and arrays.

  if (areArrays) {
    // Compare array lengths to determine if a deep comparison is necessary.
    length = a.length;
    if (length !== b.length) return false; // Deep compare the contents, ignoring non-numeric properties.

    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  } else {
    // Deep compare objects.
    var keys = Object.keys(a);
    var key = void 0;
    length = keys.length; // Ensure that both objects contain the same number of properties before comparing deep equality.

    if (Object.keys(b).length !== length) return false;

    while (length--) {
      // Deep compare each member
      key = keys[length];
      if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  } // Remove the first object from the stack of traversed objects.


  aStack.pop();
  bStack.pop();
  return true;
}

function unwrap(a) {
  var necooData = window.necooPushCallStack(arguments);
  if (isObservableArray(a)) return a.slice();
  if (isES6Map(a) || isObservableMap(a)) return Array.from(a.entries());
  if (isES6Set(a) || isObservableSet(a)) return Array.from(a.entries());
  return a;
}

function has$1(a, key) {
  var necooData = window.necooPushCallStack(arguments);
  return Object.prototype.hasOwnProperty.call(a, key);
}

function makeIterable(iterator) {
  var necooData = window.necooPushCallStack(arguments);
  iterator[Symbol.iterator] = self;
  return iterator;
}

function self() {
  var necooData = window.necooPushCallStack(arguments);
  return this;
}
/*
The only reason for this file to exist is pure horror:
Without it rollup can make the bundling fail at any point in time; when it rolls up the files in the wrong order
it will cause undefined errors (for example because super classes or local variables not being hosted).
With this file that will still happen,
but at least in this file we can magically reorder the imports with trial and error until the build succeeds again.
*/

/**
 * (c) Michel Weststrate 2015 - 2018
 * MIT Licensed
 *
 * Welcome to the mobx sources! To get an global overview of how MobX internally works,
 * this is a good place to start:
 * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
 *
 * Source folders:
 * ===============
 *
 * - api/     Most of the public static methods exposed by the module can be found here.
 * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
 * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
 * - utils/   Utility stuff.
 *
 */


if (typeof Proxy === "undefined" || typeof Symbol === "undefined") {
  throw new Error("[mobx] MobX 5+ requires Proxy and Symbol objects. If your environment doesn't support Symbol or Proxy objects, please downgrade to MobX 4. For React Native Android, consider upgrading JSCore.");
}

try {
  // define process.env if needed
  // if this is not a production build in the first place
  // (in which case the expression below would be substituted with 'production')
  "development";
} catch (e) {
  var g = typeof window !== "undefined" ? window : global;
  if (typeof process === "undefined") g.process = {};
  g.process.env = {};
}

(function _anonymous_257() {
  var necooData = window.necooPushCallStack(arguments);

  function testCodeMinification() {
    var necooData = window.necooPushCallStack(arguments);
  }

  if (testCodeMinification.name !== "testCodeMinification" && "development" !== "production" && process.env.IGNORE_MOBX_MINIFY_WARNING !== "true") {
    // trick so it doesn't get replaced
    var varName = ["process", "env", "NODE_ENV"].join(".");
    console.warn("[mobx] you are running a minified build, but '" + varName + "' was not set to 'production' in your bundler. This results in an unnecessarily large and slow bundle");
  }
})();

if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
  // See: https://github.com/andykog/mobx-devtools/
  __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
    spy: spy,
    extras: {
      getDebugName: getDebugName
    },
    $mobx: $mobx
  });
}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../_process@0.11.10@process/browser.js */ "../../node_modules/_process@0.11.10@process/browser.js"), __webpack_require__(/*! ./../../_webpack@4.35.3@webpack/buildin/global.js */ "../../node_modules/_webpack@4.35.3@webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/_process@0.11.10@process/browser.js":
/*!********************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_process@0.11.10@process/browser.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "../../node_modules/_source-map@0.5.6@source-map/lib/array-set.js":
/*!******************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_source-map@0.5.6@source-map/lib/array-set.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
var util = __webpack_require__(/*! ./util */ "../../node_modules/_source-map@0.5.6@source-map/lib/util.js");

var has = Object.prototype.hasOwnProperty;
/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */

function ArraySet() {
  this._array = [];
  this._set = Object.create(null);
}
/**
 * Static method for creating ArraySet instances from an existing array.
 */


ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();

  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }

  return set;
};
/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */


ArraySet.prototype.size = function ArraySet_size() {
  return Object.getOwnPropertyNames(this._set).length;
};
/**
 * Add the given string to this set.
 *
 * @param String aStr
 */


ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = util.toSetString(aStr);
  var isDuplicate = has.call(this._set, sStr);
  var idx = this._array.length;

  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }

  if (!isDuplicate) {
    this._set[sStr] = idx;
  }
};
/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */


ArraySet.prototype.has = function ArraySet_has(aStr) {
  var sStr = util.toSetString(aStr);
  return has.call(this._set, sStr);
};
/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */


ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  var sStr = util.toSetString(aStr);

  if (has.call(this._set, sStr)) {
    return this._set[sStr];
  }

  throw new Error('"' + aStr + '" is not in the set.');
};
/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */


ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }

  throw new Error('No element indexed by ' + aIdx);
};
/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */


ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.ArraySet = ArraySet;

/***/ }),

/***/ "../../node_modules/_source-map@0.5.6@source-map/lib/base64-vlq.js":
/*!*******************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_source-map@0.5.6@source-map/lib/base64-vlq.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var base64 = __webpack_require__(/*! ./base64 */ "../../node_modules/_source-map@0.5.6@source-map/lib/base64.js"); // A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011


var VLQ_BASE_SHIFT = 5; // binary: 100000

var VLQ_BASE = 1 << VLQ_BASE_SHIFT; // binary: 011111

var VLQ_BASE_MASK = VLQ_BASE - 1; // binary: 100000

var VLQ_CONTINUATION_BIT = VLQ_BASE;
/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */

function toVLQSigned(aValue) {
  return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
}
/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */


function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative ? -shifted : shifted;
}
/**
 * Returns the base 64 VLQ encoded value.
 */


exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;
  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;

    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }

    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};
/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */


exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));

    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

/***/ }),

/***/ "../../node_modules/_source-map@0.5.6@source-map/lib/base64.js":
/*!***************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_source-map@0.5.6@source-map/lib/base64.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */

exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }

  throw new TypeError("Must be between 0 and 63: " + number);
};
/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */


exports.decode = function (charCode) {
  var bigA = 65; // 'A'

  var bigZ = 90; // 'Z'

  var littleA = 97; // 'a'

  var littleZ = 122; // 'z'

  var zero = 48; // '0'

  var nine = 57; // '9'

  var plus = 43; // '+'

  var slash = 47; // '/'

  var littleOffset = 26;
  var numberOffset = 52; // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ

  if (bigA <= charCode && charCode <= bigZ) {
    return charCode - bigA;
  } // 26 - 51: abcdefghijklmnopqrstuvwxyz


  if (littleA <= charCode && charCode <= littleZ) {
    return charCode - littleA + littleOffset;
  } // 52 - 61: 0123456789


  if (zero <= charCode && charCode <= nine) {
    return charCode - zero + numberOffset;
  } // 62: +


  if (charCode == plus) {
    return 62;
  } // 63: /


  if (charCode == slash) {
    return 63;
  } // Invalid base64 digit.


  return -1;
};

/***/ }),

/***/ "../../node_modules/_source-map@0.5.6@source-map/lib/binary-search.js":
/*!**********************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_source-map@0.5.6@source-map/lib/binary-search.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;
/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */

function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);

  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  } else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    } // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.


    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  } else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    } // we are in termination case (3) or (2) and return the appropriate thing.


    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}
/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */


exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);

  if (index < 0) {
    return -1;
  } // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.


  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }

    --index;
  }

  return index;
};

/***/ }),

/***/ "../../node_modules/_source-map@0.5.6@source-map/lib/mapping-list.js":
/*!*********************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_source-map@0.5.6@source-map/lib/mapping-list.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
var util = __webpack_require__(/*! ./util */ "../../node_modules/_source-map@0.5.6@source-map/lib/util.js");
/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */


function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}
/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */


function MappingList() {
  this._array = [];
  this._sorted = true; // Serves as infimum

  this._last = {
    generatedLine: -1,
    generatedColumn: 0
  };
}
/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */


MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
  this._array.forEach(aCallback, aThisArg);
};
/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */


MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;

    this._array.push(aMapping);
  } else {
    this._sorted = false;

    this._array.push(aMapping);
  }
};
/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */


MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);

    this._sorted = true;
  }

  return this._array;
};

exports.MappingList = MappingList;

/***/ }),

/***/ "../../node_modules/_source-map@0.5.6@source-map/lib/quick-sort.js":
/*!*******************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_source-map@0.5.6@source-map/lib/quick-sort.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}
/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */


function randomIntInRange(low, high) {
  return Math.round(low + Math.random() * (high - low));
}
/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */


function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.
  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.
    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;
    swap(ary, pivotIndex, r);
    var pivot = ary[r]; // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.

    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1; // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}
/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */


exports.quickSort = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};

/***/ }),

/***/ "../../node_modules/_source-map@0.5.6@source-map/lib/source-map-consumer.js":
/*!****************************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_source-map@0.5.6@source-map/lib/source-map-consumer.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
var util = __webpack_require__(/*! ./util */ "../../node_modules/_source-map@0.5.6@source-map/lib/util.js");

var binarySearch = __webpack_require__(/*! ./binary-search */ "../../node_modules/_source-map@0.5.6@source-map/lib/binary-search.js");

var ArraySet = __webpack_require__(/*! ./array-set */ "../../node_modules/_source-map@0.5.6@source-map/lib/array-set.js").ArraySet;

var base64VLQ = __webpack_require__(/*! ./base64-vlq */ "../../node_modules/_source-map@0.5.6@source-map/lib/base64-vlq.js");

var quickSort = __webpack_require__(/*! ./quick-sort */ "../../node_modules/_source-map@0.5.6@source-map/lib/quick-sort.js").quickSort;

function SourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;

  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap) : new BasicSourceMapConsumer(sourceMap);
}

SourceMapConsumer.fromSourceMap = function (aSourceMap) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
};
/**
 * The version of the source mapping spec that we are consuming.
 */


SourceMapConsumer.prototype._version = 3; // `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});
SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
  var c = aStr.charAt(index);
  return c === ";" || c === ",";
};
/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */


SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
  throw new Error("Subclasses must implement _parseMappings");
};

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;
SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;
/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */

SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
  var context = aContext || null;
  var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
  var mappings;

  switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;

    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;

    default:
      throw new Error("Unknown order of iteration.");
  }

  var sourceRoot = this.sourceRoot;
  mappings.map(function (mapping) {
    var source = mapping.source === null ? null : this._sources.at(mapping.source);

    if (source != null && sourceRoot != null) {
      source = util.join(sourceRoot, source);
    }

    return {
      source: source,
      generatedLine: mapping.generatedLine,
      generatedColumn: mapping.generatedColumn,
      originalLine: mapping.originalLine,
      originalColumn: mapping.originalColumn,
      name: mapping.name === null ? null : this._names.at(mapping.name)
    };
  }, this).forEach(aCallback, context);
};
/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: Optional. the column number in the original source.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */


SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
  var line = util.getArg(aArgs, 'line'); // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
  // returns the index of the closest mapping less than the needle. By
  // setting needle.originalColumn to 0, we thus find the last mapping for
  // the given line, provided such a mapping exists.

  var needle = {
    source: util.getArg(aArgs, 'source'),
    originalLine: line,
    originalColumn: util.getArg(aArgs, 'column', 0)
  };

  if (this.sourceRoot != null) {
    needle.source = util.relative(this.sourceRoot, needle.source);
  }

  if (!this._sources.has(needle.source)) {
    return [];
  }

  needle.source = this._sources.indexOf(needle.source);
  var mappings = [];

  var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);

  if (index >= 0) {
    var mapping = this._originalMappings[index];

    if (aArgs.column === undefined) {
      var originalLine = mapping.originalLine; // Iterate until either we run out of mappings, or we run into
      // a mapping for a different line than the one we found. Since
      // mappings are sorted, this is guaranteed to find all mappings for
      // the line we found.

      while (mapping && mapping.originalLine === originalLine) {
        mappings.push({
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        });
        mapping = this._originalMappings[++index];
      }
    } else {
      var originalColumn = mapping.originalColumn; // Iterate until either we run out of mappings, or we run into
      // a mapping for a different line than the one we were searching for.
      // Since mappings are sorted, this is guaranteed to find all mappings for
      // the line we are searching for.

      while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
        mappings.push({
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        });
        mapping = this._originalMappings[++index];
      }
    }
  }

  return mappings;
};

exports.SourceMapConsumer = SourceMapConsumer;
/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The only parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */

function BasicSourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;

  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources'); // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.

  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null); // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  sources = sources.map(String) // Some source maps produce relative source paths like "./foo.js" instead of
  // "foo.js".  Normalize these first so that future comparisons will succeed.
  // See bugzil.la/1090768.
  .map(util.normalize) // Always ensure that absolute sources are internally stored relative to
  // the source root, if the source root is absolute. Not doing this would
  // be particularly problematic when the source root is a prefix of the
  // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
  .map(function (source) {
    return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
  }); // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.

  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);
  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @returns BasicSourceMapConsumer
 */

BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap) {
  var smc = Object.create(BasicSourceMapConsumer.prototype);
  var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
  var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
  smc.sourceRoot = aSourceMap._sourceRoot;
  smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
  smc.file = aSourceMap._file; // Because we are modifying the entries (by converting string sources and
  // names to indices into the sources and names ArraySets), we have to make
  // a copy of the entry or else bad things happen. Shared mutable state
  // strikes again! See github issue #191.

  var generatedMappings = aSourceMap._mappings.toArray().slice();

  var destGeneratedMappings = smc.__generatedMappings = [];
  var destOriginalMappings = smc.__originalMappings = [];

  for (var i = 0, length = generatedMappings.length; i < length; i++) {
    var srcMapping = generatedMappings[i];
    var destMapping = new Mapping();
    destMapping.generatedLine = srcMapping.generatedLine;
    destMapping.generatedColumn = srcMapping.generatedColumn;

    if (srcMapping.source) {
      destMapping.source = sources.indexOf(srcMapping.source);
      destMapping.originalLine = srcMapping.originalLine;
      destMapping.originalColumn = srcMapping.originalColumn;

      if (srcMapping.name) {
        destMapping.name = names.indexOf(srcMapping.name);
      }

      destOriginalMappings.push(destMapping);
    }

    destGeneratedMappings.push(destMapping);
  }

  quickSort(smc.__originalMappings, util.compareByOriginalPositions);
  return smc;
};
/**
 * The version of the source mapping spec that we are consuming.
 */


BasicSourceMapConsumer.prototype._version = 3;
/**
 * The list of original sources.
 */

Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._sources.toArray().map(function (s) {
      return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
    }, this);
  }
});
/**
 * Provide the JIT with a nice shape / hidden class.
 */

function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}
/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */


BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
  var generatedLine = 1;
  var previousGeneratedColumn = 0;
  var previousOriginalLine = 0;
  var previousOriginalColumn = 0;
  var previousSource = 0;
  var previousName = 0;
  var length = aStr.length;
  var index = 0;
  var cachedSegments = {};
  var temp = {};
  var originalMappings = [];
  var generatedMappings = [];
  var mapping, str, segment, end, value;

  while (index < length) {
    if (aStr.charAt(index) === ';') {
      generatedLine++;
      index++;
      previousGeneratedColumn = 0;
    } else if (aStr.charAt(index) === ',') {
      index++;
    } else {
      mapping = new Mapping();
      mapping.generatedLine = generatedLine; // Because each offset is encoded relative to the previous one,
      // many segments often have the same encoding. We can exploit this
      // fact by caching the parsed variable length fields of each segment,
      // allowing us to avoid a second parse if we encounter the same
      // segment again.

      for (end = index; end < length; end++) {
        if (this._charIsMappingSeparator(aStr, end)) {
          break;
        }
      }

      str = aStr.slice(index, end);
      segment = cachedSegments[str];

      if (segment) {
        index += str.length;
      } else {
        segment = [];

        while (index < end) {
          base64VLQ.decode(aStr, index, temp);
          value = temp.value;
          index = temp.rest;
          segment.push(value);
        }

        if (segment.length === 2) {
          throw new Error('Found a source, but no line and column');
        }

        if (segment.length === 3) {
          throw new Error('Found a source and line, but no column');
        }

        cachedSegments[str] = segment;
      } // Generated column.


      mapping.generatedColumn = previousGeneratedColumn + segment[0];
      previousGeneratedColumn = mapping.generatedColumn;

      if (segment.length > 1) {
        // Original source.
        mapping.source = previousSource + segment[1];
        previousSource += segment[1]; // Original line.

        mapping.originalLine = previousOriginalLine + segment[2];
        previousOriginalLine = mapping.originalLine; // Lines are stored 0-based

        mapping.originalLine += 1; // Original column.

        mapping.originalColumn = previousOriginalColumn + segment[3];
        previousOriginalColumn = mapping.originalColumn;

        if (segment.length > 4) {
          // Original name.
          mapping.name = previousName + segment[4];
          previousName += segment[4];
        }
      }

      generatedMappings.push(mapping);

      if (typeof mapping.originalLine === 'number') {
        originalMappings.push(mapping);
      }
    }
  }

  quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
  this.__generatedMappings = generatedMappings;
  quickSort(originalMappings, util.compareByOriginalPositions);
  this.__originalMappings = originalMappings;
};
/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */


BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
  // To return the position we are searching for, we must first find the
  // mapping for the given position and then return the opposite position it
  // points to. Because the mappings are sorted, we can use binary search to
  // find the best mapping.
  if (aNeedle[aLineName] <= 0) {
    throw new TypeError('Line must be greater than or equal to 1, got ' + aNeedle[aLineName]);
  }

  if (aNeedle[aColumnName] < 0) {
    throw new TypeError('Column must be greater than or equal to 0, got ' + aNeedle[aColumnName]);
  }

  return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
};
/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */


BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
  for (var index = 0; index < this._generatedMappings.length; ++index) {
    var mapping = this._generatedMappings[index]; // Mappings do not contain a field for the last generated columnt. We
    // can come up with an optimistic estimate, however, by assuming that
    // mappings are contiguous (i.e. given two consecutive mappings, the
    // first mapping ends where the second one starts).

    if (index + 1 < this._generatedMappings.length) {
      var nextMapping = this._generatedMappings[index + 1];

      if (mapping.generatedLine === nextMapping.generatedLine) {
        mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
        continue;
      }
    } // The last mapping for each line spans the entire line.


    mapping.lastGeneratedColumn = Infinity;
  }
};
/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.
 *   - column: The column number in the generated source.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.
 *   - column: The column number in the original source, or null.
 *   - name: The original identifier, or null.
 */


BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
  var needle = {
    generatedLine: util.getArg(aArgs, 'line'),
    generatedColumn: util.getArg(aArgs, 'column')
  };

  var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND));

  if (index >= 0) {
    var mapping = this._generatedMappings[index];

    if (mapping.generatedLine === needle.generatedLine) {
      var source = util.getArg(mapping, 'source', null);

      if (source !== null) {
        source = this._sources.at(source);

        if (this.sourceRoot != null) {
          source = util.join(this.sourceRoot, source);
        }
      }

      var name = util.getArg(mapping, 'name', null);

      if (name !== null) {
        name = this._names.at(name);
      }

      return {
        source: source,
        line: util.getArg(mapping, 'originalLine', null),
        column: util.getArg(mapping, 'originalColumn', null),
        name: name
      };
    }
  }

  return {
    source: null,
    line: null,
    column: null,
    name: null
  };
};
/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */


BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
  if (!this.sourcesContent) {
    return false;
  }

  return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function (sc) {
    return sc == null;
  });
};
/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */


BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
  if (!this.sourcesContent) {
    return null;
  }

  if (this.sourceRoot != null) {
    aSource = util.relative(this.sourceRoot, aSource);
  }

  if (this._sources.has(aSource)) {
    return this.sourcesContent[this._sources.indexOf(aSource)];
  }

  var url;

  if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
    // XXX: file:// URIs and absolute paths lead to unexpected behavior for
    // many users. We can help them out when they expect file:// URIs to
    // behave like it would if they were running a local HTTP server. See
    // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
    var fileUriAbsPath = aSource.replace(/^file:\/\//, "");

    if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
      return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
    }

    if ((!url.path || url.path == "/") && this._sources.has("/" + aSource)) {
      return this.sourcesContent[this._sources.indexOf("/" + aSource)];
    }
  } // This function is used recursively from
  // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
  // don't want to throw if we can't find the source - we just want to
  // return null, so we provide a flag to exit gracefully.


  if (nullOnMissing) {
    return null;
  } else {
    throw new Error('"' + aSource + '" is not in the SourceMap.');
  }
};
/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: The column number in the original source.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */


BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
  var source = util.getArg(aArgs, 'source');

  if (this.sourceRoot != null) {
    source = util.relative(this.sourceRoot, source);
  }

  if (!this._sources.has(source)) {
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  }

  source = this._sources.indexOf(source);
  var needle = {
    source: source,
    originalLine: util.getArg(aArgs, 'line'),
    originalColumn: util.getArg(aArgs, 'column')
  };

  var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND));

  if (index >= 0) {
    var mapping = this._originalMappings[index];

    if (mapping.source === needle.source) {
      return {
        line: util.getArg(mapping, 'generatedLine', null),
        column: util.getArg(mapping, 'generatedColumn', null),
        lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
      };
    }
  }

  return {
    line: null,
    column: null,
    lastColumn: null
  };
};

exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The only parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */

function IndexedSourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;

  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();
  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }

    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }

    lastOffset = offset;
    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'))
    };
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
/**
 * The version of the source mapping spec that we are consuming.
 */

IndexedSourceMapConsumer.prototype._version = 3;
/**
 * The list of original sources.
 */

Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];

    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }

    return sources;
  }
});
/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.
 *   - column: The column number in the generated source.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.
 *   - column: The column number in the original source, or null.
 *   - name: The original identifier, or null.
 */

IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
  var needle = {
    generatedLine: util.getArg(aArgs, 'line'),
    generatedColumn: util.getArg(aArgs, 'column')
  }; // Find the section containing the generated position we're trying to map
  // to an original position.

  var sectionIndex = binarySearch.search(needle, this._sections, function (needle, section) {
    var cmp = needle.generatedLine - section.generatedOffset.generatedLine;

    if (cmp) {
      return cmp;
    }

    return needle.generatedColumn - section.generatedOffset.generatedColumn;
  });
  var section = this._sections[sectionIndex];

  if (!section) {
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }

  return section.consumer.originalPositionFor({
    line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
    column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
    bias: aArgs.bias
  });
};
/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */


IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
  return this._sections.every(function (s) {
    return s.consumer.hasContentsOfAllSources();
  });
};
/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */


IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
  for (var i = 0; i < this._sections.length; i++) {
    var section = this._sections[i];
    var content = section.consumer.sourceContentFor(aSource, true);

    if (content) {
      return content;
    }
  }

  if (nullOnMissing) {
    return null;
  } else {
    throw new Error('"' + aSource + '" is not in the SourceMap.');
  }
};
/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: The column number in the original source.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */


IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
  for (var i = 0; i < this._sections.length; i++) {
    var section = this._sections[i]; // Only consider this section if the requested source is in the list of
    // sources of the consumer.

    if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
      continue;
    }

    var generatedPosition = section.consumer.generatedPositionFor(aArgs);

    if (generatedPosition) {
      var ret = {
        line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
        column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
      };
      return ret;
    }
  }

  return {
    line: null,
    column: null
  };
};
/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */


IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
  this.__generatedMappings = [];
  this.__originalMappings = [];

  for (var i = 0; i < this._sections.length; i++) {
    var section = this._sections[i];
    var sectionMappings = section.consumer._generatedMappings;

    for (var j = 0; j < sectionMappings.length; j++) {
      var mapping = sectionMappings[j];

      var source = section.consumer._sources.at(mapping.source);

      if (section.consumer.sourceRoot !== null) {
        source = util.join(section.consumer.sourceRoot, source);
      }

      this._sources.add(source);

      source = this._sources.indexOf(source);

      var name = section.consumer._names.at(mapping.name);

      this._names.add(name);

      name = this._names.indexOf(name); // The mappings coming from the consumer for the section have
      // generated positions relative to the start of the section, so we
      // need to offset them to be relative to the start of the concatenated
      // generated file.

      var adjustedMapping = {
        source: source,
        generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
        generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: name
      };

      this.__generatedMappings.push(adjustedMapping);

      if (typeof adjustedMapping.originalLine === 'number') {
        this.__originalMappings.push(adjustedMapping);
      }
    }
  }

  quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
  quickSort(this.__originalMappings, util.compareByOriginalPositions);
};

exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;

/***/ }),

/***/ "../../node_modules/_source-map@0.5.6@source-map/lib/source-map-generator.js":
/*!*****************************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_source-map@0.5.6@source-map/lib/source-map-generator.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
var base64VLQ = __webpack_require__(/*! ./base64-vlq */ "../../node_modules/_source-map@0.5.6@source-map/lib/base64-vlq.js");

var util = __webpack_require__(/*! ./util */ "../../node_modules/_source-map@0.5.6@source-map/lib/util.js");

var ArraySet = __webpack_require__(/*! ./array-set */ "../../node_modules/_source-map@0.5.6@source-map/lib/array-set.js").ArraySet;

var MappingList = __webpack_require__(/*! ./mapping-list */ "../../node_modules/_source-map@0.5.6@source-map/lib/mapping-list.js").MappingList;
/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */


function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }

  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;
/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */

SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
  var sourceRoot = aSourceMapConsumer.sourceRoot;
  var generator = new SourceMapGenerator({
    file: aSourceMapConsumer.file,
    sourceRoot: sourceRoot
  });
  aSourceMapConsumer.eachMapping(function (mapping) {
    var newMapping = {
      generated: {
        line: mapping.generatedLine,
        column: mapping.generatedColumn
      }
    };

    if (mapping.source != null) {
      newMapping.source = mapping.source;

      if (sourceRoot != null) {
        newMapping.source = util.relative(sourceRoot, newMapping.source);
      }

      newMapping.original = {
        line: mapping.originalLine,
        column: mapping.originalColumn
      };

      if (mapping.name != null) {
        newMapping.name = mapping.name;
      }
    }

    generator.addMapping(newMapping);
  });
  aSourceMapConsumer.sources.forEach(function (sourceFile) {
    var content = aSourceMapConsumer.sourceContentFor(sourceFile);

    if (content != null) {
      generator.setSourceContent(sourceFile, content);
    }
  });
  return generator;
};
/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */


SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
  var generated = util.getArg(aArgs, 'generated');
  var original = util.getArg(aArgs, 'original', null);
  var source = util.getArg(aArgs, 'source', null);
  var name = util.getArg(aArgs, 'name', null);

  if (!this._skipValidation) {
    this._validateMapping(generated, original, source, name);
  }

  if (source != null) {
    source = String(source);

    if (!this._sources.has(source)) {
      this._sources.add(source);
    }
  }

  if (name != null) {
    name = String(name);

    if (!this._names.has(name)) {
      this._names.add(name);
    }
  }

  this._mappings.add({
    generatedLine: generated.line,
    generatedColumn: generated.column,
    originalLine: original != null && original.line,
    originalColumn: original != null && original.column,
    source: source,
    name: name
  });
};
/**
 * Set the source content for a source file.
 */


SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
  var source = aSourceFile;

  if (this._sourceRoot != null) {
    source = util.relative(this._sourceRoot, source);
  }

  if (aSourceContent != null) {
    // Add the source content to the _sourcesContents map.
    // Create a new _sourcesContents map if the property is null.
    if (!this._sourcesContents) {
      this._sourcesContents = Object.create(null);
    }

    this._sourcesContents[util.toSetString(source)] = aSourceContent;
  } else if (this._sourcesContents) {
    // Remove the source file from the _sourcesContents map.
    // If the _sourcesContents map is empty, set the property to null.
    delete this._sourcesContents[util.toSetString(source)];

    if (Object.keys(this._sourcesContents).length === 0) {
      this._sourcesContents = null;
    }
  }
};
/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */


SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
  var sourceFile = aSourceFile; // If aSourceFile is omitted, we will use the file property of the SourceMap

  if (aSourceFile == null) {
    if (aSourceMapConsumer.file == null) {
      throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' + 'or the source map\'s "file" property. Both were omitted.');
    }

    sourceFile = aSourceMapConsumer.file;
  }

  var sourceRoot = this._sourceRoot; // Make "sourceFile" relative if an absolute Url is passed.

  if (sourceRoot != null) {
    sourceFile = util.relative(sourceRoot, sourceFile);
  } // Applying the SourceMap can add and remove items from the sources and
  // the names array.


  var newSources = new ArraySet();
  var newNames = new ArraySet(); // Find mappings for the "sourceFile"

  this._mappings.unsortedForEach(function (mapping) {
    if (mapping.source === sourceFile && mapping.originalLine != null) {
      // Check if it can be mapped by the source map, then update the mapping.
      var original = aSourceMapConsumer.originalPositionFor({
        line: mapping.originalLine,
        column: mapping.originalColumn
      });

      if (original.source != null) {
        // Copy mapping
        mapping.source = original.source;

        if (aSourceMapPath != null) {
          mapping.source = util.join(aSourceMapPath, mapping.source);
        }

        if (sourceRoot != null) {
          mapping.source = util.relative(sourceRoot, mapping.source);
        }

        mapping.originalLine = original.line;
        mapping.originalColumn = original.column;

        if (original.name != null) {
          mapping.name = original.name;
        }
      }
    }

    var source = mapping.source;

    if (source != null && !newSources.has(source)) {
      newSources.add(source);
    }

    var name = mapping.name;

    if (name != null && !newNames.has(name)) {
      newNames.add(name);
    }
  }, this);

  this._sources = newSources;
  this._names = newNames; // Copy sourcesContents of applied map.

  aSourceMapConsumer.sources.forEach(function (sourceFile) {
    var content = aSourceMapConsumer.sourceContentFor(sourceFile);

    if (content != null) {
      if (aSourceMapPath != null) {
        sourceFile = util.join(aSourceMapPath, sourceFile);
      }

      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }

      this.setSourceContent(sourceFile, content);
    }
  }, this);
};
/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */


SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
  if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
    // Case 1.
    return;
  } else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aOriginal && 'line' in aOriginal && 'column' in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
    // Cases 2 and 3.
    return;
  } else {
    throw new Error('Invalid mapping: ' + JSON.stringify({
      generated: aGenerated,
      source: aSource,
      original: aOriginal,
      name: aName
    }));
  }
};
/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */


SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
  var previousGeneratedColumn = 0;
  var previousGeneratedLine = 1;
  var previousOriginalColumn = 0;
  var previousOriginalLine = 0;
  var previousName = 0;
  var previousSource = 0;
  var result = '';
  var next;
  var mapping;
  var nameIdx;
  var sourceIdx;

  var mappings = this._mappings.toArray();

  for (var i = 0, len = mappings.length; i < len; i++) {
    mapping = mappings[i];
    next = '';

    if (mapping.generatedLine !== previousGeneratedLine) {
      previousGeneratedColumn = 0;

      while (mapping.generatedLine !== previousGeneratedLine) {
        next += ';';
        previousGeneratedLine++;
      }
    } else {
      if (i > 0) {
        if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
          continue;
        }

        next += ',';
      }
    }

    next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
    previousGeneratedColumn = mapping.generatedColumn;

    if (mapping.source != null) {
      sourceIdx = this._sources.indexOf(mapping.source);
      next += base64VLQ.encode(sourceIdx - previousSource);
      previousSource = sourceIdx; // lines are stored 0-based in SourceMap spec version 3

      next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
      previousOriginalLine = mapping.originalLine - 1;
      next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
      previousOriginalColumn = mapping.originalColumn;

      if (mapping.name != null) {
        nameIdx = this._names.indexOf(mapping.name);
        next += base64VLQ.encode(nameIdx - previousName);
        previousName = nameIdx;
      }
    }

    result += next;
  }

  return result;
};

SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
  return aSources.map(function (source) {
    if (!this._sourcesContents) {
      return null;
    }

    if (aSourceRoot != null) {
      source = util.relative(aSourceRoot, source);
    }

    var key = util.toSetString(source);
    return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
  }, this);
};
/**
 * Externalize the source map.
 */


SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
  var map = {
    version: this._version,
    sources: this._sources.toArray(),
    names: this._names.toArray(),
    mappings: this._serializeMappings()
  };

  if (this._file != null) {
    map.file = this._file;
  }

  if (this._sourceRoot != null) {
    map.sourceRoot = this._sourceRoot;
  }

  if (this._sourcesContents) {
    map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
  }

  return map;
};
/**
 * Render the source map being generated to a string.
 */


SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
  return JSON.stringify(this.toJSON());
};

exports.SourceMapGenerator = SourceMapGenerator;

/***/ }),

/***/ "../../node_modules/_source-map@0.5.6@source-map/lib/source-node.js":
/*!********************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_source-map@0.5.6@source-map/lib/source-node.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
var SourceMapGenerator = __webpack_require__(/*! ./source-map-generator */ "../../node_modules/_source-map@0.5.6@source-map/lib/source-map-generator.js").SourceMapGenerator;

var util = __webpack_require__(/*! ./util */ "../../node_modules/_source-map@0.5.6@source-map/lib/util.js"); // Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).


var REGEX_NEWLINE = /(\r?\n)/; // Newline character code for charCodeAt() comparisons

var NEWLINE_CODE = 10; // Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!

var isSourceNode = "$$$isSourceNode$$$";
/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */

function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}
/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */


SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
  // The SourceNode we want to fill with the generated code
  // and the SourceMap
  var node = new SourceNode(); // All even indices of this array are one line of the generated code,
  // while all odd indices are the newlines between two adjacent lines
  // (since `REGEX_NEWLINE` captures its match).
  // Processed fragments are removed from this array, by calling `shiftNextLine`.

  var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);

  var shiftNextLine = function () {
    var lineContents = remainingLines.shift(); // The last line of a file might not have a newline.

    var newLine = remainingLines.shift() || "";
    return lineContents + newLine;
  }; // We need to remember the position of "remainingLines"


  var lastGeneratedLine = 1,
      lastGeneratedColumn = 0; // The generate SourceNodes we need a code range.
  // To extract it current and last mapping is used.
  // Here we store the last mapping.

  var lastMapping = null;
  aSourceMapConsumer.eachMapping(function (mapping) {
    if (lastMapping !== null) {
      // We add the code from "lastMapping" to "mapping":
      // First check if there is a new line in between.
      if (lastGeneratedLine < mapping.generatedLine) {
        // Associate first line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
        lastGeneratedLine++;
        lastGeneratedColumn = 0; // The remaining code is added without mapping
      } else {
        // There is no new line in between.
        // Associate the code between "lastGeneratedColumn" and
        // "mapping.generatedColumn" with "lastMapping"
        var nextLine = remainingLines[0];
        var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
        remainingLines[0] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
        addMappingWithCode(lastMapping, code); // No more remaining code, continue

        lastMapping = mapping;
        return;
      }
    } // We add the generated code until the first mapping
    // to the SourceNode without any mapping.
    // Each line is added as separate string.


    while (lastGeneratedLine < mapping.generatedLine) {
      node.add(shiftNextLine());
      lastGeneratedLine++;
    }

    if (lastGeneratedColumn < mapping.generatedColumn) {
      var nextLine = remainingLines[0];
      node.add(nextLine.substr(0, mapping.generatedColumn));
      remainingLines[0] = nextLine.substr(mapping.generatedColumn);
      lastGeneratedColumn = mapping.generatedColumn;
    }

    lastMapping = mapping;
  }, this); // We have processed all mappings.

  if (remainingLines.length > 0) {
    if (lastMapping) {
      // Associate the remaining code in the current line with "lastMapping"
      addMappingWithCode(lastMapping, shiftNextLine());
    } // and add the remaining lines without any mapping


    node.add(remainingLines.join(""));
  } // Copy sourcesContent into SourceNode


  aSourceMapConsumer.sources.forEach(function (sourceFile) {
    var content = aSourceMapConsumer.sourceContentFor(sourceFile);

    if (content != null) {
      if (aRelativePath != null) {
        sourceFile = util.join(aRelativePath, sourceFile);
      }

      node.setSourceContent(sourceFile, content);
    }
  });
  return node;

  function addMappingWithCode(mapping, code) {
    if (mapping === null || mapping.source === undefined) {
      node.add(code);
    } else {
      var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
      node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
    }
  }
};
/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */


SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  } else {
    throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
  }

  return this;
};
/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */


SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length - 1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  } else {
    throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
  }

  return this;
};
/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */


SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;

  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];

    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    } else {
      if (chunk !== '') {
        aFn(chunk, {
          source: this.source,
          line: this.line,
          column: this.column,
          name: this.name
        });
      }
    }
  }
};
/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */


SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;

  if (len > 0) {
    newChildren = [];

    for (i = 0; i < len - 1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }

    newChildren.push(this.children[i]);
    this.children = newChildren;
  }

  return this;
};
/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */


SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];

  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  } else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  } else {
    this.children.push(''.replace(aPattern, aReplacement));
  }

  return this;
};
/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */


SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
  this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
};
/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */


SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
  for (var i = 0, len = this.children.length; i < len; i++) {
    if (this.children[i][isSourceNode]) {
      this.children[i].walkSourceContents(aFn);
    }
  }

  var sources = Object.keys(this.sourceContents);

  for (var i = 0, len = sources.length; i < len; i++) {
    aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
  }
};
/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */


SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};
/**
 * Returns the string representation of this source node along with a source
 * map.
 */


SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;

    if (original.source !== null && original.line !== null && original.column !== null) {
      if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }

      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }

    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0; // Mappings end at eol

        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });
  return {
    code: generated.code,
    map: map
  };
};

exports.SourceNode = SourceNode;

/***/ }),

/***/ "../../node_modules/_source-map@0.5.6@source-map/lib/util.js":
/*!*************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_source-map@0.5.6@source-map/lib/util.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}

exports.getArg = getArg;
var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);

  if (!match) {
    return null;
  }

  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}

exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';

  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }

  url += '//';

  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }

  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }

  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port;
  }

  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }

  return url;
}

exports.urlGenerate = urlGenerate;
/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */

function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);

  if (url) {
    if (!url.path) {
      return aPath;
    }

    path = url.path;
  }

  var isAbsolute = exports.isAbsolute(path);
  var parts = path.split(/\/+/);

  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];

    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }

  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }

  return path;
}

exports.normalize = normalize;
/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */

function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  if (aPath === "") {
    aPath = ".";
  }

  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);

  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  } // `join(foo, '//www.example.org')`


  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }

    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  } // `join('http://', 'www.example.com')`


  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/' ? aPath : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }

  return joined;
}

exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
};
/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */


function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, ''); // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.

  var level = 0;

  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");

    if (index < 0) {
      return aPath;
    } // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.


    aRoot = aRoot.slice(0, index);

    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  } // Make sure we add a "../" for each component we removed from the root.


  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}

exports.relative = relative;

var supportsNullProto = function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}();

function identity(s) {
  return s;
}
/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */


function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}

exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}

exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9
  /* "__proto__".length */
  ) {
      return false;
    }

  if (s.charCodeAt(length - 1) !== 95
  /* '_' */
  || s.charCodeAt(length - 2) !== 95
  /* '_' */
  || s.charCodeAt(length - 3) !== 111
  /* 'o' */
  || s.charCodeAt(length - 4) !== 116
  /* 't' */
  || s.charCodeAt(length - 5) !== 111
  /* 'o' */
  || s.charCodeAt(length - 6) !== 114
  /* 'r' */
  || s.charCodeAt(length - 7) !== 112
  /* 'p' */
  || s.charCodeAt(length - 8) !== 95
  /* '_' */
  || s.charCodeAt(length - 9) !== 95
  /* '_' */
  ) {
      return false;
    }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36
    /* '$' */
    ) {
        return false;
      }
  }

  return true;
}
/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */


function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = mappingA.source - mappingB.source;

  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;

  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;

  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;

  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;

  if (cmp !== 0) {
    return cmp;
  }

  return mappingA.name - mappingB.name;
}

exports.compareByOriginalPositions = compareByOriginalPositions;
/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */

function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;

  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;

  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = mappingA.source - mappingB.source;

  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;

  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;

  if (cmp !== 0) {
    return cmp;
  }

  return mappingA.name - mappingB.name;
}

exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}
/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */


function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;

  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;

  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);

  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;

  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;

  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}

exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/***/ }),

/***/ "../../node_modules/_source-map@0.5.6@source-map/source-map.js":
/*!***************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_source-map@0.5.6@source-map/source-map.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(/*! ./lib/source-map-generator */ "../../node_modules/_source-map@0.5.6@source-map/lib/source-map-generator.js").SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(/*! ./lib/source-map-consumer */ "../../node_modules/_source-map@0.5.6@source-map/lib/source-map-consumer.js").SourceMapConsumer;
exports.SourceNode = __webpack_require__(/*! ./lib/source-node */ "../../node_modules/_source-map@0.5.6@source-map/lib/source-node.js").SourceNode;

/***/ }),

/***/ "../../node_modules/_stack-generator@2.0.3@stack-generator/stack-generator.js":
/*!******************************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_stack-generator@2.0.3@stack-generator/stack-generator.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

  /* istanbul ignore next */
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! stackframe */ "../../node_modules/_stackframe@1.0.4@stackframe/stackframe.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (StackFrame) {
  return {
    backtrace: function StackGenerator$$backtrace(opts) {
      var stack = [];
      var maxStackSize = 10;

      if (typeof opts === 'object' && typeof opts.maxStackSize === 'number') {
        maxStackSize = opts.maxStackSize;
      }

      var curr = arguments.callee;

      while (curr && stack.length < maxStackSize && curr['arguments']) {
        // Allow V8 optimizations
        var args = new Array(curr['arguments'].length);

        for (var i = 0; i < args.length; ++i) {
          args[i] = curr['arguments'][i];
        }

        if (/function(?:\s+([\w$]+))+\s*\(/.test(curr.toString())) {
          stack.push(new StackFrame({
            functionName: RegExp.$1 || undefined,
            args: args
          }));
        } else {
          stack.push(new StackFrame({
            args: args
          }));
        }

        try {
          curr = curr.caller;
        } catch (e) {
          break;
        }
      }

      return stack;
    }
  };
});

/***/ }),

/***/ "../../node_modules/_stackframe@1.0.4@stackframe/stackframe.js":
/*!***************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_stackframe@1.0.4@stackframe/stackframe.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

  /* istanbul ignore next */
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function () {
  function _isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function _capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  function _getter(p) {
    return function () {
      return this[p];
    };
  }

  var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
  var numericProps = ['columnNumber', 'lineNumber'];
  var stringProps = ['fileName', 'functionName', 'source'];
  var arrayProps = ['args'];
  var props = booleanProps.concat(numericProps, stringProps, arrayProps);

  function StackFrame(obj) {
    if (obj instanceof Object) {
      for (var i = 0; i < props.length; i++) {
        if (obj.hasOwnProperty(props[i]) && obj[props[i]] !== undefined) {
          this['set' + _capitalize(props[i])](obj[props[i]]);
        }
      }
    }
  }

  StackFrame.prototype = {
    getArgs: function () {
      return this.args;
    },
    setArgs: function (v) {
      if (Object.prototype.toString.call(v) !== '[object Array]') {
        throw new TypeError('Args must be an Array');
      }

      this.args = v;
    },
    getEvalOrigin: function () {
      return this.evalOrigin;
    },
    setEvalOrigin: function (v) {
      if (v instanceof StackFrame) {
        this.evalOrigin = v;
      } else if (v instanceof Object) {
        this.evalOrigin = new StackFrame(v);
      } else {
        throw new TypeError('Eval Origin must be an Object or StackFrame');
      }
    },
    toString: function () {
      var functionName = this.getFunctionName() || '{anonymous}';
      var args = '(' + (this.getArgs() || []).join(',') + ')';
      var fileName = this.getFileName() ? '@' + this.getFileName() : '';
      var lineNumber = _isNumber(this.getLineNumber()) ? ':' + this.getLineNumber() : '';
      var columnNumber = _isNumber(this.getColumnNumber()) ? ':' + this.getColumnNumber() : '';
      return functionName + args + fileName + lineNumber + columnNumber;
    }
  };

  for (var i = 0; i < booleanProps.length; i++) {
    StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);

    StackFrame.prototype['set' + _capitalize(booleanProps[i])] = function (p) {
      return function (v) {
        this[p] = Boolean(v);
      };
    }(booleanProps[i]);
  }

  for (var j = 0; j < numericProps.length; j++) {
    StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);

    StackFrame.prototype['set' + _capitalize(numericProps[j])] = function (p) {
      return function (v) {
        if (!_isNumber(v)) {
          throw new TypeError(p + ' must be a Number');
        }

        this[p] = Number(v);
      };
    }(numericProps[j]);
  }

  for (var k = 0; k < stringProps.length; k++) {
    StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);

    StackFrame.prototype['set' + _capitalize(stringProps[k])] = function (p) {
      return function (v) {
        this[p] = String(v);
      };
    }(stringProps[k]);
  }

  return StackFrame;
});

/***/ }),

/***/ "../../node_modules/_stacktrace-gps@3.0.2@stacktrace-gps/stacktrace-gps.js":
/*!***************************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_stacktrace-gps@3.0.2@stacktrace-gps/stacktrace-gps.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

  /* istanbul ignore next */
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! source-map */ "../../node_modules/_source-map@0.5.6@source-map/source-map.js"), __webpack_require__(/*! stackframe */ "../../node_modules/_stackframe@1.0.4@stackframe/stackframe.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (SourceMap, StackFrame) {
  /**
   * Make a X-Domain request to url and callback.
   *
   * @param {String} url
   * @returns {Promise} with response text if fulfilled
   */
  function _xdr(url) {
    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('get', url);
      req.onerror = reject;

      req.onreadystatechange = function onreadystatechange() {
        if (req.readyState === 4) {
          if (req.status >= 200 && req.status < 300 || url.substr(0, 7) === 'file://' && req.responseText) {
            resolve(req.responseText);
          } else {
            reject(new Error('HTTP status: ' + req.status + ' retrieving ' + url));
          }
        }
      };

      req.send();
    });
  }
  /**
   * Convert a Base64-encoded string into its original representation.
   * Used for inline sourcemaps.
   *
   * @param {String} b64str Base-64 encoded string
   * @returns {String} original representation of the base64-encoded string.
   */


  function _atob(b64str) {
    if (typeof window !== 'undefined' && window.atob) {
      return window.atob(b64str);
    } else {
      throw new Error('You must supply a polyfill for window.atob in this environment');
    }
  }

  function _parseJson(string) {
    if (typeof JSON !== 'undefined' && JSON.parse) {
      return JSON.parse(string);
    } else {
      throw new Error('You must supply a polyfill for JSON.parse in this environment');
    }
  }

  function _findFunctionName(source, lineNumber
  /*, columnNumber*/
  ) {
    var syntaxes = [// {name} = function ({args}) TODO args capture
    /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/, // function {name}({args}) m[1]=name m[2]=args
    /function\s+([^('"`]*?)\s*\(([^)]*)\)/, // {name} = eval()
    /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/, // fn_name() {
    /\b(?!(?:if|for|switch|while|with|catch)\b)(?:(?:static)\s+)?(\S+)\s*\(.*?\)\s*\{/, // {name} = () => {
    /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*\(.*?\)\s*=>/];
    var lines = source.split('\n'); // Walk backwards in the source lines until we find the line which matches one of the patterns above

    var code = '';
    var maxLines = Math.min(lineNumber, 20);

    for (var i = 0; i < maxLines; ++i) {
      // lineNo is 1-based, source[] is 0-based
      var line = lines[lineNumber - i - 1];
      var commentPos = line.indexOf('//');

      if (commentPos >= 0) {
        line = line.substr(0, commentPos);
      }

      if (line) {
        code = line + code;
        var len = syntaxes.length;

        for (var index = 0; index < len; index++) {
          var m = syntaxes[index].exec(code);

          if (m && m[1]) {
            return m[1];
          }
        }
      }
    }

    return undefined;
  }

  function _ensureSupportedEnvironment() {
    if (typeof Object.defineProperty !== 'function' || typeof Object.create !== 'function') {
      throw new Error('Unable to consume source maps in older browsers');
    }
  }

  function _ensureStackFrameIsLegit(stackframe) {
    if (typeof stackframe !== 'object') {
      throw new TypeError('Given StackFrame is not an object');
    } else if (typeof stackframe.fileName !== 'string') {
      throw new TypeError('Given file name is not a String');
    } else if (typeof stackframe.lineNumber !== 'number' || stackframe.lineNumber % 1 !== 0 || stackframe.lineNumber < 1) {
      throw new TypeError('Given line number must be a positive integer');
    } else if (typeof stackframe.columnNumber !== 'number' || stackframe.columnNumber % 1 !== 0 || stackframe.columnNumber < 0) {
      throw new TypeError('Given column number must be a non-negative integer');
    }

    return true;
  }

  function _findSourceMappingURL(source) {
    var sourceMappingUrlRegExp = /\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/mg;
    var lastSourceMappingUrl;
    var matchSourceMappingUrl;

    while (matchSourceMappingUrl = sourceMappingUrlRegExp.exec(source)) {
      // jshint ignore:line
      lastSourceMappingUrl = matchSourceMappingUrl[1];
    }

    if (lastSourceMappingUrl) {
      return lastSourceMappingUrl;
    } else {
      throw new Error('sourceMappingURL not found');
    }
  }

  function _extractLocationInfoFromSourceMapSource(stackframe, sourceMapConsumer, sourceCache) {
    return new Promise(function (resolve, reject) {
      var loc = sourceMapConsumer.originalPositionFor({
        line: stackframe.lineNumber,
        column: stackframe.columnNumber
      });

      if (loc.source) {
        // cache mapped sources
        var mappedSource = sourceMapConsumer.sourceContentFor(loc.source);

        if (mappedSource) {
          sourceCache[loc.source] = mappedSource;
        }

        resolve( // given stackframe and source location, update stackframe
        new StackFrame({
          functionName: loc.name || stackframe.functionName,
          args: stackframe.args,
          fileName: loc.source,
          lineNumber: loc.line,
          columnNumber: loc.column
        }));
      } else {
        reject(new Error('Could not get original source for given stackframe and source map'));
      }
    });
  }
  /**
   * @constructor
   * @param {Object} opts
   *      opts.sourceCache = {url: "Source String"} => preload source cache
   *      opts.sourceMapConsumerCache = {/path/file.js.map: SourceMapConsumer}
   *      opts.offline = True to prevent network requests.
   *              Best effort without sources or source maps.
   *      opts.ajax = Promise returning function to make X-Domain requests
   */


  return function StackTraceGPS(opts) {
    if (!(this instanceof StackTraceGPS)) {
      return new StackTraceGPS(opts);
    }

    opts = opts || {};
    this.sourceCache = opts.sourceCache || {};
    this.sourceMapConsumerCache = opts.sourceMapConsumerCache || {};
    this.ajax = opts.ajax || _xdr;
    this._atob = opts.atob || _atob;

    this._get = function _get(location) {
      return new Promise(function (resolve, reject) {
        var isDataUrl = location.substr(0, 5) === 'data:';

        if (this.sourceCache[location]) {
          resolve(this.sourceCache[location]);
        } else if (opts.offline && !isDataUrl) {
          reject(new Error('Cannot make network requests in offline mode'));
        } else {
          if (isDataUrl) {
            // data URLs can have parameters.
            // see http://tools.ietf.org/html/rfc2397
            var supportedEncodingRegexp = /^data:application\/json;([\w=:"-]+;)*base64,/;
            var match = location.match(supportedEncodingRegexp);

            if (match) {
              var sourceMapStart = match[0].length;
              var encodedSource = location.substr(sourceMapStart);

              var source = this._atob(encodedSource);

              this.sourceCache[location] = source;
              resolve(source);
            } else {
              reject(new Error('The encoding of the inline sourcemap is not supported'));
            }
          } else {
            var xhrPromise = this.ajax(location, {
              method: 'get'
            }); // Cache the Promise to prevent duplicate in-flight requests

            this.sourceCache[location] = xhrPromise;
            xhrPromise.then(resolve, reject);
          }
        }
      }.bind(this));
    };
    /**
     * Creating SourceMapConsumers is expensive, so this wraps the creation of a
     * SourceMapConsumer in a per-instance cache.
     *
     * @param {String} sourceMappingURL = URL to fetch source map from
     * @param {String} defaultSourceRoot = Default source root for source map if undefined
     * @returns {Promise} that resolves a SourceMapConsumer
     */


    this._getSourceMapConsumer = function _getSourceMapConsumer(sourceMappingURL, defaultSourceRoot) {
      return new Promise(function (resolve, reject) {
        if (this.sourceMapConsumerCache[sourceMappingURL]) {
          resolve(this.sourceMapConsumerCache[sourceMappingURL]);
        } else {
          var sourceMapConsumerPromise = new Promise(function (resolve, reject) {
            return this._get(sourceMappingURL).then(function (sourceMapSource) {
              if (typeof sourceMapSource === 'string') {
                sourceMapSource = _parseJson(sourceMapSource.replace(/^\)\]\}'/, ''));
              }

              if (typeof sourceMapSource.sourceRoot === 'undefined') {
                sourceMapSource.sourceRoot = defaultSourceRoot;
              }

              resolve(new SourceMap.SourceMapConsumer(sourceMapSource));
            }, reject);
          }.bind(this));
          this.sourceMapConsumerCache[sourceMappingURL] = sourceMapConsumerPromise;
          resolve(sourceMapConsumerPromise);
        }
      }.bind(this));
    };
    /**
     * Given a StackFrame, enhance function name and use source maps for a
     * better StackFrame.
     *
     * @param {StackFrame} stackframe object
     * @returns {Promise} that resolves with with source-mapped StackFrame
     */


    this.pinpoint = function StackTraceGPS$$pinpoint(stackframe) {
      return new Promise(function (resolve, reject) {
        this.getMappedLocation(stackframe).then(function (mappedStackFrame) {
          function resolveMappedStackFrame() {
            resolve(mappedStackFrame);
          }

          this.findFunctionName(mappedStackFrame).then(resolve, resolveMappedStackFrame)['catch'](resolveMappedStackFrame);
        }.bind(this), reject);
      }.bind(this));
    };
    /**
     * Given a StackFrame, guess function name from location information.
     *
     * @param {StackFrame} stackframe
     * @returns {Promise} that resolves with enhanced StackFrame.
     */


    this.findFunctionName = function StackTraceGPS$$findFunctionName(stackframe) {
      return new Promise(function (resolve, reject) {
        _ensureStackFrameIsLegit(stackframe);

        this._get(stackframe.fileName).then(function getSourceCallback(source) {
          var lineNumber = stackframe.lineNumber;
          var columnNumber = stackframe.columnNumber;

          var guessedFunctionName = _findFunctionName(source, lineNumber, columnNumber); // Only replace functionName if we found something


          if (guessedFunctionName) {
            resolve(new StackFrame({
              functionName: guessedFunctionName,
              args: stackframe.args,
              fileName: stackframe.fileName,
              lineNumber: lineNumber,
              columnNumber: columnNumber
            }));
          } else {
            resolve(stackframe);
          }
        }, reject)['catch'](reject);
      }.bind(this));
    };
    /**
     * Given a StackFrame, seek source-mapped location and return new enhanced StackFrame.
     *
     * @param {StackFrame} stackframe
     * @returns {Promise} that resolves with enhanced StackFrame.
     */


    this.getMappedLocation = function StackTraceGPS$$getMappedLocation(stackframe) {
      return new Promise(function (resolve, reject) {
        _ensureSupportedEnvironment();

        _ensureStackFrameIsLegit(stackframe);

        var sourceCache = this.sourceCache;
        var fileName = stackframe.fileName;

        this._get(fileName).then(function (source) {
          var sourceMappingURL = _findSourceMappingURL(source);

          var isDataUrl = sourceMappingURL.substr(0, 5) === 'data:';
          var defaultSourceRoot = fileName.substring(0, fileName.lastIndexOf('/') + 1);

          if (sourceMappingURL[0] !== '/' && !isDataUrl && !/^https?:\/\/|^\/\//i.test(sourceMappingURL)) {
            sourceMappingURL = defaultSourceRoot + sourceMappingURL;
          }

          return this._getSourceMapConsumer(sourceMappingURL, defaultSourceRoot).then(function (sourceMapConsumer) {
            return _extractLocationInfoFromSourceMapSource(stackframe, sourceMapConsumer, sourceCache).then(resolve)['catch'](function () {
              resolve(stackframe);
            });
          });
        }.bind(this), reject)['catch'](reject);
      }.bind(this));
    };
  };
});

/***/ }),

/***/ "../../node_modules/_stacktrace-js@2.0.0@stacktrace-js/stacktrace.js":
/*!*********************************************************************************************************************!*\
  !*** /Users/hongrunhui/Documents/mydoc/necoo-webpack/node_modules/_stacktrace-js@2.0.0@stacktrace-js/stacktrace.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

  /* istanbul ignore next */
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! error-stack-parser */ "../../node_modules/_error-stack-parser@2.0.2@error-stack-parser/error-stack-parser.js"), __webpack_require__(/*! stack-generator */ "../../node_modules/_stack-generator@2.0.3@stack-generator/stack-generator.js"), __webpack_require__(/*! stacktrace-gps */ "../../node_modules/_stacktrace-gps@3.0.2@stacktrace-gps/stacktrace-gps.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function StackTrace(ErrorStackParser, StackGenerator, StackTraceGPS) {
  var _options = {
    filter: function (stackframe) {
      // Filter out stackframes for this library by default
      return (stackframe.functionName || '').indexOf('StackTrace$$') === -1 && (stackframe.functionName || '').indexOf('ErrorStackParser$$') === -1 && (stackframe.functionName || '').indexOf('StackTraceGPS$$') === -1 && (stackframe.functionName || '').indexOf('StackGenerator$$') === -1;
    },
    sourceCache: {}
  };

  var _generateError = function StackTrace$$GenerateError() {
    try {
      // Error must be thrown to get stack in IE
      throw new Error();
    } catch (err) {
      return err;
    }
  };
  /**
   * Merge 2 given Objects. If a conflict occurs the second object wins.
   * Does not do deep merges.
   *
   * @param {Object} first base object
   * @param {Object} second overrides
   * @returns {Object} merged first and second
   * @private
   */


  function _merge(first, second) {
    var target = {};
    [first, second].forEach(function (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          target[prop] = obj[prop];
        }
      }

      return target;
    });
    return target;
  }

  function _isShapedLikeParsableError(err) {
    return err.stack || err['opera#sourceloc'];
  }

  function _filtered(stackframes, filter) {
    if (typeof filter === 'function') {
      return stackframes.filter(filter);
    }

    return stackframes;
  }

  return {
    /**
     * Get a backtrace from invocation point.
     *
     * @param {Object} opts
     * @returns {Array} of StackFrame
     */
    get: function StackTrace$$get(opts) {
      var err = _generateError();

      return _isShapedLikeParsableError(err) ? this.fromError(err, opts) : this.generateArtificially(opts);
    },

    /**
     * Get a backtrace from invocation point.
     * IMPORTANT: Does not handle source maps or guess function names!
     *
     * @param {Object} opts
     * @returns {Array} of StackFrame
     */
    getSync: function StackTrace$$getSync(opts) {
      opts = _merge(_options, opts);

      var err = _generateError();

      var stack = _isShapedLikeParsableError(err) ? ErrorStackParser.parse(err) : StackGenerator.backtrace(opts);
      return _filtered(stack, opts.filter);
    },

    /**
     * Given an error object, parse it.
     *
     * @param {Error} error object
     * @param {Object} opts
     * @returns {Promise} for Array[StackFrame}
     */
    fromError: function StackTrace$$fromError(error, opts) {
      opts = _merge(_options, opts);
      var gps = new StackTraceGPS(opts);
      return new Promise(function (resolve) {
        var stackframes = _filtered(ErrorStackParser.parse(error), opts.filter);

        resolve(Promise.all(stackframes.map(function (sf) {
          return new Promise(function (resolve) {
            function resolveOriginal() {
              resolve(sf);
            }

            gps.pinpoint(sf).then(resolve, resolveOriginal)['catch'](resolveOriginal);
          });
        })));
      }.bind(this));
    },

    /**
     * Use StackGenerator to generate a backtrace.
     *
     * @param {Object} opts
     * @returns {Promise} of Array[StackFrame]
     */
    generateArtificially: function StackTrace$$generateArtificially(opts) {
      opts = _merge(_options, opts);
      var stackFrames = StackGenerator.backtrace(opts);

      if (typeof opts.filter === 'function') {
        stackFrames = stackFrames.filter(opts.filter);
      }

      return Promise.resolve(stackFrames);
    },

    /**
     * Given a function, wrap it such that invocations trigger a callback that
     * is called with a stack trace.
     *
     * @param {Function} fn to be instrumented
     * @param {Function} callback function to call with a stack trace on invocation
     * @param {Function} errback optional function to call with error if unable to get stack trace.
     * @param {Object} thisArg optional context object (e.g. window)
     */
    instrument: function StackTrace$$instrument(fn, callback, errback, thisArg) {
      if (typeof fn !== 'function') {
        throw new Error('Cannot instrument non-function object');
      } else if (typeof fn.__stacktraceOriginalFn === 'function') {
        // Already instrumented, return given Function
        return fn;
      }

      var instrumented = function StackTrace$$instrumented() {
        try {
          this.get().then(callback, errback)['catch'](errback);
          return fn.apply(thisArg || this, arguments);
        } catch (e) {
          if (_isShapedLikeParsableError(e)) {
            this.fromError(e).then(callback, errback)['catch'](errback);
          }

          throw e;
        }
      }.bind(this);

      instrumented.__stacktraceOriginalFn = fn;
      return instrumented;
    },

    /**
     * Given a function that has been instrumented,
     * revert the function to it's original (non-instrumented) state.
     *
     * @param {Function} fn to de-instrument
     */
    deinstrument: function StackTrace$$deinstrument(fn) {
      if (typeof fn !== 'function') {
        throw new Error('Cannot de-instrument non-function object');
      } else if (typeof fn.__stacktraceOriginalFn === 'function') {
        return fn.__stacktraceOriginalFn;
      } else {
        // Function not instrumented, return original
        return fn;
      }
    },

    /**
     * Given an error message and Array of StackFrames, serialize and POST to given URL.
     *
     * @param {Array} stackframes
     * @param {String} url
     * @param {String} errorMsg
     * @param {Object} requestOptions
     */
    report: function StackTrace$$report(stackframes, url, errorMsg, requestOptions) {
      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.onerror = reject;

        req.onreadystatechange = function onreadystatechange() {
          if (req.readyState === 4) {
            if (req.status >= 200 && req.status < 400) {
              resolve(req.responseText);
            } else {
              reject(new Error('POST to ' + url + ' failed with status: ' + req.status));
            }
          }
        };

        req.open('post', url); // Set request headers

        req.setRequestHeader('Content-Type', 'application/json');

        if (requestOptions && typeof requestOptions.headers === 'object') {
          var headers = requestOptions.headers;

          for (var header in headers) {
            if (headers.hasOwnProperty(header)) {
              req.setRequestHeader(header, headers[header]);
            }
          }
        }

        var reportPayload = {
          stack: stackframes
        };

        if (errorMsg !== undefined && errorMsg !== null) {
          reportPayload.message = errorMsg;
        }

        req.send(JSON.stringify(reportPayload));
      });
    }
  };
});

/***/ }),

/***/ "../../node_modules/_webpack@4.35.3@webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "../../node_modules/_webpack@4.35.3@webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "../src/mobx/index.js":
/*!****************************!*\
  !*** ../src/mobx/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "../../node_modules/_mobx@5.11.0@mobx/lib/mobx.module.js");
const stacktrace = __webpack_require__(/*! stacktrace-js */ "../../node_modules/_stacktrace-js@2.0.0@stacktrace-js/stacktrace.js");

window.StackTrace = stacktrace;

(function (global, factory) {
  console.log('0000', typeof exports === 'object' && typeof module !== 'undefined');
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && __webpack_require__(/*! !webpack amd options */ "../../node_modules/_webpack@4.35.3@webpack/buildin/amd-options.js") ? define(['exports'], factory) : (global = global || self, factory(global.necoo = {}));
})(undefined, function (exports) {
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
    var callerName = null;

    if (sourceStack) {
      var stackArr = [];

      if (sourceStack) {
        stackArr = sourceStack.split('  at ');

        if (stackArr[4]) {
          try {
            callerName = stackArr[4].split('eval at ')[1].split(' ')[0];
          } catch (e) {}
        }
      } // for (var i = 0; i < stackArr.length; i++) {
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

  function necooPushCallStack(args) {
    if (!initNecooData()) {
      return;
    }

    var callStack;

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
          callerName = args.callee.caller && args.callee.caller.prototype.name;

          if (!callerName) {
            var caller = getCallerFromSourceStack(stackTrace.sourceStack) || stackTrace.stackTrace[3].functionName;

            if (caller) {
              callerName = caller;
            }

            console.log('------', callerName, caller, stackTrace); // get callerName from stackTrace
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

        callStack = {
          name: calleeName,
          showName: 'function: ' + calleeName,
          caller: callerName,
          body: args.callee.toString(),
          arguments: args,
          callerInfo: {
            stackTrace: stackTrace,
            father: stackTrace && typeof stackTrace.stackTrace[3] !== 'undefined' ? stackTrace.stackTrace[3] : null,
            self: stackTrace && typeof stackTrace.stackTrace[2] !== 'undefined' ? stackTrace.stackTrace[2] : null
          }
        };
        window.necooData[window.necooIndex].push(callStack);
      } catch (e) {
        console.log('sorry for error', e);
      }
    }

    return callStack || {};
  }

  exports.necooPushCallStack = necooPushCallStack;

  if (window) {
    window.necooPushCallStack = necooPushCallStack;
  }
});


window.necooIndex = 0;
let t = {
  d: {
    e: {
      f: 2
    }
  }
};
let b = Object(mobx__WEBPACK_IMPORTED_MODULE_0__["observable"])(t); // autorun(() => {
//     console.log('b', b.d);
// });

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map