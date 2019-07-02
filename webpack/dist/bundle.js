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
/******/ 	return __webpack_require__(__webpack_require__.s = "./webpack/src/string/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/string/lib/_count.js":
/*!*******************************************!*\
  !*** ./node_modules/string/lib/_count.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function count(self, substr) {
  var count = 0;
  var pos = self.indexOf(substr);

  while (pos >= 0) {
    count += 1;
    pos = self.indexOf(substr, pos + 1);
  }

  return count;
}

module.exports = count;

/***/ }),

/***/ "./node_modules/string/lib/_splitLeft.js":
/*!***********************************************!*\
  !*** ./node_modules/string/lib/_splitLeft.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function splitLeft(self, sep, maxSplit, limit) {
  if (typeof maxSplit === 'undefined') {
    var maxSplit = -1;
  }

  var splitResult = self.split(sep);
  var splitPart1 = splitResult.slice(0, maxSplit);
  var splitPart2 = splitResult.slice(maxSplit);

  if (splitPart2.length === 0) {
    splitResult = splitPart1;
  } else {
    splitResult = splitPart1.concat(splitPart2.join(sep));
  }

  if (typeof limit === 'undefined') {
    return splitResult;
  } else if (limit < 0) {
    return splitResult.slice(limit);
  } else {
    return splitResult.slice(0, limit);
  }
}

module.exports = splitLeft;

/***/ }),

/***/ "./node_modules/string/lib/_splitRight.js":
/*!************************************************!*\
  !*** ./node_modules/string/lib/_splitRight.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function splitRight(self, sep, maxSplit, limit) {
  if (typeof maxSplit === 'undefined') {
    var maxSplit = -1;
  }

  if (typeof limit === 'undefined') {
    var limit = 0;
  }

  var splitResult = [self];

  for (var i = self.length - 1; i >= 0; i--) {
    if (splitResult[0].slice(i).indexOf(sep) === 0 && (splitResult.length <= maxSplit || maxSplit === -1)) {
      splitResult.splice(1, 0, splitResult[0].slice(i + sep.length)); // insert

      splitResult[0] = splitResult[0].slice(0, i);
    }
  }

  if (limit >= 0) {
    return splitResult.slice(-limit);
  } else {
    return splitResult.slice(0, -limit);
  }
}

module.exports = splitRight;

/***/ }),

/***/ "./node_modules/string/lib/string.js":
/*!*******************************************!*\
  !*** ./node_modules/string/lib/string.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var RE_VAR_FIN = /(\b|\'|\"|\|\/|\.|\-|\[)((?!__VAR__|SAVE|arguments|Error|console|var|function|if|else|for|in|do|while|switch|case|typeof|break|continue|return|throw|try|catch|finally|with|new|delete|void|Object|Array|String|Number|Boolean|Function|RegExp|Date|Math|true|false|null|undefined|NaN))[\w$]+(\b|(\'\")?)/g;
var __DATA__ = [];

function __DEEPCLONE__(o) {
  return o; // var copy = o;
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

  window.StackTrace = {};

  window.StackTrace.getSync = function () {
    return [];
  };

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
      args: {},
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
  };
}

function processName(name) {
  if (!name) {
    return '';
  }

  var temp = name.split('.');
  var len = temp.length;
  return temp[len - 1].replace(/ [\s\S]*/, '');
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
      args: {},
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
  data.replace(/[,{][\$\w]+(?=:)|(^ *|[^\"\-\'$\w\.{])(?!(?:var|JSON|if|for|else|this|switch|break|arguments|console|return|case|function|typeof|true|false|delete|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g, function (_, $1, $2) {
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
  } catch (e) {
    console.log(e);
  }
}

function SAVENAME(args, name) {
  try {
    if (name) {
      args.callee.prototype.name = name;
    }
  } catch (e) {
    console.log(e);
  }
}

function TRY_CATCH() {
  var __error__ = {}; // try {
  //     console.log(iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii);
  // }
  // catch (e) {
  //     __error__ = e;
  // }

  __error__ = new Error();
  window.StackTrace = {};

  window.StackTrace.getSync = function () {
    return [];
  };

  __error__.stackArray = window.StackTrace.getSync();
  return __error__;
} // 获取堆栈信息以获取父级调用者


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
      } else if (nowStack.indexOf('<anonymous>') === -1 && flag === true) {
        o['type'] = stackArr[i - 1].trim().split(' ')[0];
        o['parentName'] = stackArr[i].trim().split(' ')[0];
        break;
      }
    }
  }

  return o;
}

var __flag__ = false;

function SAVE(args) {
  // var arguments = args;
  var __error__ = TRY_CATCH();

  if (window.__INDEX__ >= 0) {
    if (!__DATA__[window.__INDEX__]) {
      __DATA__[window.__INDEX__] = [];
    }

    if (!__flag__) {
      __flag__ = true;
      $.ajax({
        url: __error__.stackArray[0].fileName,
        type: 'GET',
        dataType: 'text/plain',
        contentType: 'text/plain',
        success: function (response) {
          window.__SOURCE_CODE__ = response;
          setTimeout(function () {
            $(window).trigger('source-code', response);
          }, 3000);
        }
      });
    } // @todo: 要实现深度克隆复制参数，个人感觉可以对字符串进行克隆就行
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
    }; // console.log(__obj__);
    // console.log(__obj__.name, __obj__.caller, __error__.stack);

    if (!__obj__.name) {
      __obj__.name = args.callee && args.callee.prototype.name;
    }

    if (!__obj__.caller) {
      try {
        __obj__.caller = args.callee.caller && args.callee.caller.prototype.name;
      } catch (e) {
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
;
;
!function _anonymous_1() {
  ;

  var __O__ = (this.SAVE ? this : window).SAVE(arguments);

  "use strict";

  var VERSION = '3.3.3';
  var ENTITIES = {};
  var latin_map = {
    "Á": "A",
    "Ă": "A",
    "Ắ": "A",
    "Ặ": "A",
    "Ằ": "A",
    "Ẳ": "A",
    "Ẵ": "A",
    "Ǎ": "A",
    "Â": "A",
    "Ấ": "A",
    "Ậ": "A",
    "Ầ": "A",
    "Ẩ": "A",
    "Ẫ": "A",
    "Ä": "A",
    "Ǟ": "A",
    "Ȧ": "A",
    "Ǡ": "A",
    "Ạ": "A",
    "Ȁ": "A",
    "À": "A",
    "Ả": "A",
    "Ȃ": "A",
    "Ā": "A",
    "Ą": "A",
    "Å": "A",
    "Ǻ": "A",
    "Ḁ": "A",
    "Ⱥ": "A",
    "Ã": "A",
    "Ꜳ": "AA",
    "Æ": "AE",
    "Ǽ": "AE",
    "Ǣ": "AE",
    "Ꜵ": "AO",
    "Ꜷ": "AU",
    "Ꜹ": "AV",
    "Ꜻ": "AV",
    "Ꜽ": "AY",
    "Ḃ": "B",
    "Ḅ": "B",
    "Ɓ": "B",
    "Ḇ": "B",
    "Ƀ": "B",
    "Ƃ": "B",
    "Ć": "C",
    "Č": "C",
    "Ç": "C",
    "Ḉ": "C",
    "Ĉ": "C",
    "Ċ": "C",
    "Ƈ": "C",
    "Ȼ": "C",
    "Ď": "D",
    "Ḑ": "D",
    "Ḓ": "D",
    "Ḋ": "D",
    "Ḍ": "D",
    "Ɗ": "D",
    "Ḏ": "D",
    "ǲ": "D",
    "ǅ": "D",
    "Đ": "D",
    "Ƌ": "D",
    "Ǳ": "DZ",
    "Ǆ": "DZ",
    "É": "E",
    "Ĕ": "E",
    "Ě": "E",
    "Ȩ": "E",
    "Ḝ": "E",
    "Ê": "E",
    "Ế": "E",
    "Ệ": "E",
    "Ề": "E",
    "Ể": "E",
    "Ễ": "E",
    "Ḙ": "E",
    "Ë": "E",
    "Ė": "E",
    "Ẹ": "E",
    "Ȅ": "E",
    "È": "E",
    "Ẻ": "E",
    "Ȇ": "E",
    "Ē": "E",
    "Ḗ": "E",
    "Ḕ": "E",
    "Ę": "E",
    "Ɇ": "E",
    "Ẽ": "E",
    "Ḛ": "E",
    "Ꝫ": "ET",
    "Ḟ": "F",
    "Ƒ": "F",
    "Ǵ": "G",
    "Ğ": "G",
    "Ǧ": "G",
    "Ģ": "G",
    "Ĝ": "G",
    "Ġ": "G",
    "Ɠ": "G",
    "Ḡ": "G",
    "Ǥ": "G",
    "Ḫ": "H",
    "Ȟ": "H",
    "Ḩ": "H",
    "Ĥ": "H",
    "Ⱨ": "H",
    "Ḧ": "H",
    "Ḣ": "H",
    "Ḥ": "H",
    "Ħ": "H",
    "Í": "I",
    "Ĭ": "I",
    "Ǐ": "I",
    "Î": "I",
    "Ï": "I",
    "Ḯ": "I",
    "İ": "I",
    "Ị": "I",
    "Ȉ": "I",
    "Ì": "I",
    "Ỉ": "I",
    "Ȋ": "I",
    "Ī": "I",
    "Į": "I",
    "Ɨ": "I",
    "Ĩ": "I",
    "Ḭ": "I",
    "Ꝺ": "D",
    "Ꝼ": "F",
    "Ᵹ": "G",
    "Ꞃ": "R",
    "Ꞅ": "S",
    "Ꞇ": "T",
    "Ꝭ": "IS",
    "Ĵ": "J",
    "Ɉ": "J",
    "Ḱ": "K",
    "Ǩ": "K",
    "Ķ": "K",
    "Ⱪ": "K",
    "Ꝃ": "K",
    "Ḳ": "K",
    "Ƙ": "K",
    "Ḵ": "K",
    "Ꝁ": "K",
    "Ꝅ": "K",
    "Ĺ": "L",
    "Ƚ": "L",
    "Ľ": "L",
    "Ļ": "L",
    "Ḽ": "L",
    "Ḷ": "L",
    "Ḹ": "L",
    "Ⱡ": "L",
    "Ꝉ": "L",
    "Ḻ": "L",
    "Ŀ": "L",
    "Ɫ": "L",
    "ǈ": "L",
    "Ł": "L",
    "Ǉ": "LJ",
    "Ḿ": "M",
    "Ṁ": "M",
    "Ṃ": "M",
    "Ɱ": "M",
    "Ń": "N",
    "Ň": "N",
    "Ņ": "N",
    "Ṋ": "N",
    "Ṅ": "N",
    "Ṇ": "N",
    "Ǹ": "N",
    "Ɲ": "N",
    "Ṉ": "N",
    "Ƞ": "N",
    "ǋ": "N",
    "Ñ": "N",
    "Ǌ": "NJ",
    "Ó": "O",
    "Ŏ": "O",
    "Ǒ": "O",
    "Ô": "O",
    "Ố": "O",
    "Ộ": "O",
    "Ồ": "O",
    "Ổ": "O",
    "Ỗ": "O",
    "Ö": "O",
    "Ȫ": "O",
    "Ȯ": "O",
    "Ȱ": "O",
    "Ọ": "O",
    "Ő": "O",
    "Ȍ": "O",
    "Ò": "O",
    "Ỏ": "O",
    "Ơ": "O",
    "Ớ": "O",
    "Ợ": "O",
    "Ờ": "O",
    "Ở": "O",
    "Ỡ": "O",
    "Ȏ": "O",
    "Ꝋ": "O",
    "Ꝍ": "O",
    "Ō": "O",
    "Ṓ": "O",
    "Ṑ": "O",
    "Ɵ": "O",
    "Ǫ": "O",
    "Ǭ": "O",
    "Ø": "O",
    "Ǿ": "O",
    "Õ": "O",
    "Ṍ": "O",
    "Ṏ": "O",
    "Ȭ": "O",
    "Ƣ": "OI",
    "Ꝏ": "OO",
    "Ɛ": "E",
    "Ɔ": "O",
    "Ȣ": "OU",
    "Ṕ": "P",
    "Ṗ": "P",
    "Ꝓ": "P",
    "Ƥ": "P",
    "Ꝕ": "P",
    "Ᵽ": "P",
    "Ꝑ": "P",
    "Ꝙ": "Q",
    "Ꝗ": "Q",
    "Ŕ": "R",
    "Ř": "R",
    "Ŗ": "R",
    "Ṙ": "R",
    "Ṛ": "R",
    "Ṝ": "R",
    "Ȑ": "R",
    "Ȓ": "R",
    "Ṟ": "R",
    "Ɍ": "R",
    "Ɽ": "R",
    "Ꜿ": "C",
    "Ǝ": "E",
    "Ś": "S",
    "Ṥ": "S",
    "Š": "S",
    "Ṧ": "S",
    "Ş": "S",
    "Ŝ": "S",
    "Ș": "S",
    "Ṡ": "S",
    "Ṣ": "S",
    "Ṩ": "S",
    "ẞ": "SS",
    "Ť": "T",
    "Ţ": "T",
    "Ṱ": "T",
    "Ț": "T",
    "Ⱦ": "T",
    "Ṫ": "T",
    "Ṭ": "T",
    "Ƭ": "T",
    "Ṯ": "T",
    "Ʈ": "T",
    "Ŧ": "T",
    "Ɐ": "A",
    "Ꞁ": "L",
    "Ɯ": "M",
    "Ʌ": "V",
    "Ꜩ": "TZ",
    "Ú": "U",
    "Ŭ": "U",
    "Ǔ": "U",
    "Û": "U",
    "Ṷ": "U",
    "Ü": "U",
    "Ǘ": "U",
    "Ǚ": "U",
    "Ǜ": "U",
    "Ǖ": "U",
    "Ṳ": "U",
    "Ụ": "U",
    "Ű": "U",
    "Ȕ": "U",
    "Ù": "U",
    "Ủ": "U",
    "Ư": "U",
    "Ứ": "U",
    "Ự": "U",
    "Ừ": "U",
    "Ử": "U",
    "Ữ": "U",
    "Ȗ": "U",
    "Ū": "U",
    "Ṻ": "U",
    "Ų": "U",
    "Ů": "U",
    "Ũ": "U",
    "Ṹ": "U",
    "Ṵ": "U",
    "Ꝟ": "V",
    "Ṿ": "V",
    "Ʋ": "V",
    "Ṽ": "V",
    "Ꝡ": "VY",
    "Ẃ": "W",
    "Ŵ": "W",
    "Ẅ": "W",
    "Ẇ": "W",
    "Ẉ": "W",
    "Ẁ": "W",
    "Ⱳ": "W",
    "Ẍ": "X",
    "Ẋ": "X",
    "Ý": "Y",
    "Ŷ": "Y",
    "Ÿ": "Y",
    "Ẏ": "Y",
    "Ỵ": "Y",
    "Ỳ": "Y",
    "Ƴ": "Y",
    "Ỷ": "Y",
    "Ỿ": "Y",
    "Ȳ": "Y",
    "Ɏ": "Y",
    "Ỹ": "Y",
    "Ź": "Z",
    "Ž": "Z",
    "Ẑ": "Z",
    "Ⱬ": "Z",
    "Ż": "Z",
    "Ẓ": "Z",
    "Ȥ": "Z",
    "Ẕ": "Z",
    "Ƶ": "Z",
    "Ĳ": "IJ",
    "Œ": "OE",
    "ᴀ": "A",
    "ᴁ": "AE",
    "ʙ": "B",
    "ᴃ": "B",
    "ᴄ": "C",
    "ᴅ": "D",
    "ᴇ": "E",
    "ꜰ": "F",
    "ɢ": "G",
    "ʛ": "G",
    "ʜ": "H",
    "ɪ": "I",
    "ʁ": "R",
    "ᴊ": "J",
    "ᴋ": "K",
    "ʟ": "L",
    "ᴌ": "L",
    "ᴍ": "M",
    "ɴ": "N",
    "ᴏ": "O",
    "ɶ": "OE",
    "ᴐ": "O",
    "ᴕ": "OU",
    "ᴘ": "P",
    "ʀ": "R",
    "ᴎ": "N",
    "ᴙ": "R",
    "ꜱ": "S",
    "ᴛ": "T",
    "ⱻ": "E",
    "ᴚ": "R",
    "ᴜ": "U",
    "ᴠ": "V",
    "ᴡ": "W",
    "ʏ": "Y",
    "ᴢ": "Z",
    "á": "a",
    "ă": "a",
    "ắ": "a",
    "ặ": "a",
    "ằ": "a",
    "ẳ": "a",
    "ẵ": "a",
    "ǎ": "a",
    "â": "a",
    "ấ": "a",
    "ậ": "a",
    "ầ": "a",
    "ẩ": "a",
    "ẫ": "a",
    "ä": "a",
    "ǟ": "a",
    "ȧ": "a",
    "ǡ": "a",
    "ạ": "a",
    "ȁ": "a",
    "à": "a",
    "ả": "a",
    "ȃ": "a",
    "ā": "a",
    "ą": "a",
    "ᶏ": "a",
    "ẚ": "a",
    "å": "a",
    "ǻ": "a",
    "ḁ": "a",
    "ⱥ": "a",
    "ã": "a",
    "ꜳ": "aa",
    "æ": "ae",
    "ǽ": "ae",
    "ǣ": "ae",
    "ꜵ": "ao",
    "ꜷ": "au",
    "ꜹ": "av",
    "ꜻ": "av",
    "ꜽ": "ay",
    "ḃ": "b",
    "ḅ": "b",
    "ɓ": "b",
    "ḇ": "b",
    "ᵬ": "b",
    "ᶀ": "b",
    "ƀ": "b",
    "ƃ": "b",
    "ɵ": "o",
    "ć": "c",
    "č": "c",
    "ç": "c",
    "ḉ": "c",
    "ĉ": "c",
    "ɕ": "c",
    "ċ": "c",
    "ƈ": "c",
    "ȼ": "c",
    "ď": "d",
    "ḑ": "d",
    "ḓ": "d",
    "ȡ": "d",
    "ḋ": "d",
    "ḍ": "d",
    "ɗ": "d",
    "ᶑ": "d",
    "ḏ": "d",
    "ᵭ": "d",
    "ᶁ": "d",
    "đ": "d",
    "ɖ": "d",
    "ƌ": "d",
    "ı": "i",
    "ȷ": "j",
    "ɟ": "j",
    "ʄ": "j",
    "ǳ": "dz",
    "ǆ": "dz",
    "é": "e",
    "ĕ": "e",
    "ě": "e",
    "ȩ": "e",
    "ḝ": "e",
    "ê": "e",
    "ế": "e",
    "ệ": "e",
    "ề": "e",
    "ể": "e",
    "ễ": "e",
    "ḙ": "e",
    "ë": "e",
    "ė": "e",
    "ẹ": "e",
    "ȅ": "e",
    "è": "e",
    "ẻ": "e",
    "ȇ": "e",
    "ē": "e",
    "ḗ": "e",
    "ḕ": "e",
    "ⱸ": "e",
    "ę": "e",
    "ᶒ": "e",
    "ɇ": "e",
    "ẽ": "e",
    "ḛ": "e",
    "ꝫ": "et",
    "ḟ": "f",
    "ƒ": "f",
    "ᵮ": "f",
    "ᶂ": "f",
    "ǵ": "g",
    "ğ": "g",
    "ǧ": "g",
    "ģ": "g",
    "ĝ": "g",
    "ġ": "g",
    "ɠ": "g",
    "ḡ": "g",
    "ᶃ": "g",
    "ǥ": "g",
    "ḫ": "h",
    "ȟ": "h",
    "ḩ": "h",
    "ĥ": "h",
    "ⱨ": "h",
    "ḧ": "h",
    "ḣ": "h",
    "ḥ": "h",
    "ɦ": "h",
    "ẖ": "h",
    "ħ": "h",
    "ƕ": "hv",
    "í": "i",
    "ĭ": "i",
    "ǐ": "i",
    "î": "i",
    "ï": "i",
    "ḯ": "i",
    "ị": "i",
    "ȉ": "i",
    "ì": "i",
    "ỉ": "i",
    "ȋ": "i",
    "ī": "i",
    "į": "i",
    "ᶖ": "i",
    "ɨ": "i",
    "ĩ": "i",
    "ḭ": "i",
    "ꝺ": "d",
    "ꝼ": "f",
    "ᵹ": "g",
    "ꞃ": "r",
    "ꞅ": "s",
    "ꞇ": "t",
    "ꝭ": "is",
    "ǰ": "j",
    "ĵ": "j",
    "ʝ": "j",
    "ɉ": "j",
    "ḱ": "k",
    "ǩ": "k",
    "ķ": "k",
    "ⱪ": "k",
    "ꝃ": "k",
    "ḳ": "k",
    "ƙ": "k",
    "ḵ": "k",
    "ᶄ": "k",
    "ꝁ": "k",
    "ꝅ": "k",
    "ĺ": "l",
    "ƚ": "l",
    "ɬ": "l",
    "ľ": "l",
    "ļ": "l",
    "ḽ": "l",
    "ȴ": "l",
    "ḷ": "l",
    "ḹ": "l",
    "ⱡ": "l",
    "ꝉ": "l",
    "ḻ": "l",
    "ŀ": "l",
    "ɫ": "l",
    "ᶅ": "l",
    "ɭ": "l",
    "ł": "l",
    "ǉ": "lj",
    "ſ": "s",
    "ẜ": "s",
    "ẛ": "s",
    "ẝ": "s",
    "ḿ": "m",
    "ṁ": "m",
    "ṃ": "m",
    "ɱ": "m",
    "ᵯ": "m",
    "ᶆ": "m",
    "ń": "n",
    "ň": "n",
    "ņ": "n",
    "ṋ": "n",
    "ȵ": "n",
    "ṅ": "n",
    "ṇ": "n",
    "ǹ": "n",
    "ɲ": "n",
    "ṉ": "n",
    "ƞ": "n",
    "ᵰ": "n",
    "ᶇ": "n",
    "ɳ": "n",
    "ñ": "n",
    "ǌ": "nj",
    "ó": "o",
    "ŏ": "o",
    "ǒ": "o",
    "ô": "o",
    "ố": "o",
    "ộ": "o",
    "ồ": "o",
    "ổ": "o",
    "ỗ": "o",
    "ö": "o",
    "ȫ": "o",
    "ȯ": "o",
    "ȱ": "o",
    "ọ": "o",
    "ő": "o",
    "ȍ": "o",
    "ò": "o",
    "ỏ": "o",
    "ơ": "o",
    "ớ": "o",
    "ợ": "o",
    "ờ": "o",
    "ở": "o",
    "ỡ": "o",
    "ȏ": "o",
    "ꝋ": "o",
    "ꝍ": "o",
    "ⱺ": "o",
    "ō": "o",
    "ṓ": "o",
    "ṑ": "o",
    "ǫ": "o",
    "ǭ": "o",
    "ø": "o",
    "ǿ": "o",
    "õ": "o",
    "ṍ": "o",
    "ṏ": "o",
    "ȭ": "o",
    "ƣ": "oi",
    "ꝏ": "oo",
    "ɛ": "e",
    "ᶓ": "e",
    "ɔ": "o",
    "ᶗ": "o",
    "ȣ": "ou",
    "ṕ": "p",
    "ṗ": "p",
    "ꝓ": "p",
    "ƥ": "p",
    "ᵱ": "p",
    "ᶈ": "p",
    "ꝕ": "p",
    "ᵽ": "p",
    "ꝑ": "p",
    "ꝙ": "q",
    "ʠ": "q",
    "ɋ": "q",
    "ꝗ": "q",
    "ŕ": "r",
    "ř": "r",
    "ŗ": "r",
    "ṙ": "r",
    "ṛ": "r",
    "ṝ": "r",
    "ȑ": "r",
    "ɾ": "r",
    "ᵳ": "r",
    "ȓ": "r",
    "ṟ": "r",
    "ɼ": "r",
    "ᵲ": "r",
    "ᶉ": "r",
    "ɍ": "r",
    "ɽ": "r",
    "ↄ": "c",
    "ꜿ": "c",
    "ɘ": "e",
    "ɿ": "r",
    "ś": "s",
    "ṥ": "s",
    "š": "s",
    "ṧ": "s",
    "ş": "s",
    "ŝ": "s",
    "ș": "s",
    "ṡ": "s",
    "ṣ": "s",
    "ṩ": "s",
    "ʂ": "s",
    "ᵴ": "s",
    "ᶊ": "s",
    "ȿ": "s",
    "ɡ": "g",
    "ß": "ss",
    "ᴑ": "o",
    "ᴓ": "o",
    "ᴝ": "u",
    "ť": "t",
    "ţ": "t",
    "ṱ": "t",
    "ț": "t",
    "ȶ": "t",
    "ẗ": "t",
    "ⱦ": "t",
    "ṫ": "t",
    "ṭ": "t",
    "ƭ": "t",
    "ṯ": "t",
    "ᵵ": "t",
    "ƫ": "t",
    "ʈ": "t",
    "ŧ": "t",
    "ᵺ": "th",
    "ɐ": "a",
    "ᴂ": "ae",
    "ǝ": "e",
    "ᵷ": "g",
    "ɥ": "h",
    "ʮ": "h",
    "ʯ": "h",
    "ᴉ": "i",
    "ʞ": "k",
    "ꞁ": "l",
    "ɯ": "m",
    "ɰ": "m",
    "ᴔ": "oe",
    "ɹ": "r",
    "ɻ": "r",
    "ɺ": "r",
    "ⱹ": "r",
    "ʇ": "t",
    "ʌ": "v",
    "ʍ": "w",
    "ʎ": "y",
    "ꜩ": "tz",
    "ú": "u",
    "ŭ": "u",
    "ǔ": "u",
    "û": "u",
    "ṷ": "u",
    "ü": "u",
    "ǘ": "u",
    "ǚ": "u",
    "ǜ": "u",
    "ǖ": "u",
    "ṳ": "u",
    "ụ": "u",
    "ű": "u",
    "ȕ": "u",
    "ù": "u",
    "ủ": "u",
    "ư": "u",
    "ứ": "u",
    "ự": "u",
    "ừ": "u",
    "ử": "u",
    "ữ": "u",
    "ȗ": "u",
    "ū": "u",
    "ṻ": "u",
    "ų": "u",
    "ᶙ": "u",
    "ů": "u",
    "ũ": "u",
    "ṹ": "u",
    "ṵ": "u",
    "ᵫ": "ue",
    "ꝸ": "um",
    "ⱴ": "v",
    "ꝟ": "v",
    "ṿ": "v",
    "ʋ": "v",
    "ᶌ": "v",
    "ⱱ": "v",
    "ṽ": "v",
    "ꝡ": "vy",
    "ẃ": "w",
    "ŵ": "w",
    "ẅ": "w",
    "ẇ": "w",
    "ẉ": "w",
    "ẁ": "w",
    "ⱳ": "w",
    "ẘ": "w",
    "ẍ": "x",
    "ẋ": "x",
    "ᶍ": "x",
    "ý": "y",
    "ŷ": "y",
    "ÿ": "y",
    "ẏ": "y",
    "ỵ": "y",
    "ỳ": "y",
    "ƴ": "y",
    "ỷ": "y",
    "ỿ": "y",
    "ȳ": "y",
    "ẙ": "y",
    "ɏ": "y",
    "ỹ": "y",
    "ź": "z",
    "ž": "z",
    "ẑ": "z",
    "ʑ": "z",
    "ⱬ": "z",
    "ż": "z",
    "ẓ": "z",
    "ȥ": "z",
    "ẕ": "z",
    "ᵶ": "z",
    "ᶎ": "z",
    "ʐ": "z",
    "ƶ": "z",
    "ɀ": "z",
    "ﬀ": "ff",
    "ﬃ": "ffi",
    "ﬄ": "ffl",
    "ﬁ": "fi",
    "ﬂ": "fl",
    "ĳ": "ij",
    "œ": "oe",
    "ﬆ": "st",
    "ₐ": "a",
    "ₑ": "e",
    "ᵢ": "i",
    "ⱼ": "j",
    "ₒ": "o",
    "ᵣ": "r",
    "ᵤ": "u",
    "ᵥ": "v",
    "ₓ": "x"
  };

  function initialize(object, s) {
    ;

    var __O__ = (this.SAVE ? this : window).SAVE(arguments);

    if (s !== null && s !== undefined) {
      if (typeof s === 'string') object.s = s;else object.s = s.toString();
    } else {
      object.s = s;
    }

    object.orig = s;

    if (s !== null && s !== undefined) {
      if (object.__defineGetter__) {
        object.__defineGetter__('length', function _anonymous_2() {
          ;

          var __O__ = (this.SAVE ? this : window).SAVE(arguments);

          return object.s.length;
        });
      } else {
        object.length = s.length;
      }
    } else {
      object.length = -1;
    }
  }

  function S(s) {
    ;

    var __O__ = (this.SAVE ? this : window).SAVE(arguments);

    initialize(this, s);
  }

  var __nsp = String.prototype;

  var __sp = S.prototype = {
    between: function _anonymous_3(left, right) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.s;
      var startPos = s.indexOf(left);
      var endPos = s.indexOf(right, startPos + left.length);
      if (endPos == -1 && right != null) return new this.constructor('');else if (endPos == -1 && right == null) return new this.constructor(s.substring(startPos + left.length));else return new this.constructor(s.slice(startPos + left.length, endPos));
    },
    camelize: function _anonymous_4() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.trim().s.replace(/(\-|_|\s)+(.)?/g, function _anonymous_5(mathc, sep, c) {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        return c ? c.toUpperCase() : '';
      });
      return new this.constructor(s);
    },
    capitalize: function _anonymous_6() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return new this.constructor(this.s.substr(0, 1).toUpperCase() + this.s.substring(1).toLowerCase());
    },
    charAt: function _anonymous_7(index) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return this.s.charAt(index);
    },
    chompLeft: function _anonymous_8(prefix) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.s;

      if (s.indexOf(prefix) === 0) {
        s = s.slice(prefix.length);
        return new this.constructor(s);
      } else {
        return this;
      }
    },
    chompRight: function _anonymous_9(suffix) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      if (this.endsWith(suffix)) {
        var s = this.s;
        s = s.slice(0, s.length - suffix.length);
        return new this.constructor(s);
      } else {
        return this;
      }
    },
    collapseWhitespace: function _anonymous_10() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
      return new this.constructor(s);
    },
    contains: function _anonymous_11(ss) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return this.s.indexOf(ss) >= 0;
    },
    count: function _anonymous_12(ss) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return __webpack_require__(/*! ./_count */ "./node_modules/string/lib/_count.js")(this.s, ss);
    },
    dasherize: function _anonymous_13() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.trim().s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
      return new this.constructor(s);
    },
    equalsIgnoreCase: function _anonymous_14(prefix) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.s;
      return s.toLowerCase() == prefix.toLowerCase();
    },
    latinise: function _anonymous_15() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.replace(/[^A-Za-z0-9\[\] ]/g, function _anonymous_16(x) {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        return latin_map[x] || x;
      });
      return new this.constructor(s);
    },
    decodeHtmlEntities: function _anonymous_17() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.s;
      s = s.replace(/&#(\d+);?/g, function _anonymous_18(_, code) {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        return String.fromCharCode(code);
      }).replace(/&#[xX]([A-Fa-f0-9]+);?/g, function _anonymous_19(_, hex) {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        return String.fromCharCode(parseInt(hex, 16));
      }).replace(/&([^;\W]+;?)/g, function _anonymous_20(m, e) {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        var ee = e.replace(/;$/, '');
        var target = ENTITIES[e] || e.match(/;$/) && ENTITIES[ee];

        if (typeof target === 'number') {
          return String.fromCharCode(target);
        } else if (typeof target === 'string') {
          return target;
        } else {
          return m;
        }
      });
      return new this.constructor(s);
    },
    endsWith: function _anonymous_21() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var suffixes = Array.prototype.slice.call(arguments, 0);

      for (var i = 0; i < suffixes.length; ++i) {
        var l = this.s.length - suffixes[i].length;
        if (l >= 0 && this.s.indexOf(suffixes[i], l) === l) return true;
      }

      return false;
    },
    escapeHTML: function _anonymous_22() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return new this.constructor(this.s.replace(/[&<>"']/g, function _anonymous_23(m) {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        return '&' + reversedEscapeChars[m] + ';';
      }));
    },
    ensureLeft: function _anonymous_24(prefix) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.s;

      if (s.indexOf(prefix) === 0) {
        return this;
      } else {
        return new this.constructor(prefix + s);
      }
    },
    ensureRight: function _anonymous_25(suffix) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.s;

      if (this.endsWith(suffix)) {
        return this;
      } else {
        return new this.constructor(s + suffix);
      }
    },
    humanize: function _anonymous_26() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      if (this.s === null || this.s === undefined) return new this.constructor('');
      var s = this.underscore().replace(/_id$/, '').replace(/_/g, ' ').trim().capitalize();
      return new this.constructor(s);
    },
    isAlpha: function _anonymous_27() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return !/[^a-z\xDF-\xFF]|^$/.test(this.s.toLowerCase());
    },
    isAlphaNumeric: function _anonymous_28() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return !/[^0-9a-z\xDF-\xFF]/.test(this.s.toLowerCase());
    },
    isEmpty: function _anonymous_29() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return this.s === null || this.s === undefined ? true : /^[\s\xa0]*$/.test(this.s);
    },
    isLower: function _anonymous_30() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return this.isAlpha() && this.s.toLowerCase() === this.s;
    },
    isNumeric: function _anonymous_31() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return !/[^0-9]/.test(this.s);
    },
    isUpper: function _anonymous_32() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return this.isAlpha() && this.s.toUpperCase() === this.s;
    },
    left: function _anonymous_33(N) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      if (N >= 0) {
        var s = this.s.substr(0, N);
        return new this.constructor(s);
      } else {
        return this.right(-N);
      }
    },
    lines: function _anonymous_34() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return this.replaceAll('\r\n', '\n').s.split('\n');
    },
    pad: function _anonymous_35(len, ch) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      if (ch == null) ch = ' ';
      if (this.s.length >= len) return new this.constructor(this.s);
      len = len - this.s.length;
      var left = Array(Math.ceil(len / 2) + 1).join(ch);
      var right = Array(Math.floor(len / 2) + 1).join(ch);
      return new this.constructor(left + this.s + right);
    },
    padLeft: function _anonymous_36(len, ch) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      if (ch == null) ch = ' ';
      if (this.s.length >= len) return new this.constructor(this.s);
      return new this.constructor(Array(len - this.s.length + 1).join(ch) + this.s);
    },
    padRight: function _anonymous_37(len, ch) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      if (ch == null) ch = ' ';
      if (this.s.length >= len) return new this.constructor(this.s);
      return new this.constructor(this.s + Array(len - this.s.length + 1).join(ch));
    },
    parseCSV: function _anonymous_38(delimiter, qualifier, escape, lineDelimiter) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      delimiter = delimiter || ',';
      escape = escape || '\\';
      if (typeof qualifier == 'undefined') qualifier = '"';
      var i = 0,
          fieldBuffer = [],
          fields = [],
          len = this.s.length,
          inField = false,
          inUnqualifiedString = false,
          self = this;

      var ca = function _anonymous_39(i) {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        return self.s.charAt(i);
      };

      if (typeof lineDelimiter !== 'undefined') var rows = [];
      if (!qualifier) inField = true;

      while (i < len) {
        var current = ca(i);

        switch (current) {
          case escape:
            if (inField && (escape !== qualifier || ca(i + 1) === qualifier)) {
              i += 1;
              fieldBuffer.push(ca(i));
              break;
            }

            if (escape !== qualifier) break;

          case qualifier:
            inField = !inField;
            break;

          case delimiter:
            if (inUnqualifiedString) {
              inField = false;
              inUnqualifiedString = false;
            }

            if (inField && qualifier) fieldBuffer.push(current);else {
              fields.push(fieldBuffer.join(''));
              fieldBuffer.length = 0;
            }
            break;

          case lineDelimiter:
            if (inUnqualifiedString) {
              inField = false;
              inUnqualifiedString = false;
              fields.push(fieldBuffer.join(''));
              rows.push(fields);
              fields = [];
              fieldBuffer.length = 0;
            } else if (inField) {
              fieldBuffer.push(current);
            } else {
              if (rows) {
                fields.push(fieldBuffer.join(''));
                rows.push(fields);
                fields = [];
                fieldBuffer.length = 0;
              }
            }

            break;

          case ' ':
            if (inField) fieldBuffer.push(current);
            break;

          default:
            if (inField) fieldBuffer.push(current);else if (current !== qualifier) {
              fieldBuffer.push(current);
              inField = true;
              inUnqualifiedString = true;
            }
            break;
        }

        i += 1;
      }

      fields.push(fieldBuffer.join(''));

      if (rows) {
        rows.push(fields);
        return rows;
      }

      return fields;
    },
    replaceAll: function _anonymous_40(ss, r) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.s.split(ss).join(r);
      return new this.constructor(s);
    },
    splitLeft: function _anonymous_41(sep, maxSplit, limit) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return __webpack_require__(/*! ./_splitLeft */ "./node_modules/string/lib/_splitLeft.js")(this.s, sep, maxSplit, limit);
    },
    splitRight: function _anonymous_42(sep, maxSplit, limit) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return __webpack_require__(/*! ./_splitRight */ "./node_modules/string/lib/_splitRight.js")(this.s, sep, maxSplit, limit);
    },
    strip: function _anonymous_43() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var ss = this.s;

      for (var i = 0, n = arguments.length; i < n; i++) {
        ss = ss.split(arguments[i]).join('');
      }

      return new this.constructor(ss);
    },
    stripLeft: function _anonymous_44(chars) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var regex;
      var pattern;
      var ss = ensureString(this.s);

      if (chars === undefined) {
        pattern = /^\s+/g;
      } else {
        regex = escapeRegExp(chars);
        pattern = new RegExp("^[" + regex + "]+", "g");
      }

      return new this.constructor(ss.replace(pattern, ""));
    },
    stripRight: function _anonymous_45(chars) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var regex;
      var pattern;
      var ss = ensureString(this.s);

      if (chars === undefined) {
        pattern = /\s+$/g;
      } else {
        regex = escapeRegExp(chars);
        pattern = new RegExp("[" + regex + "]+$", "g");
      }

      return new this.constructor(ss.replace(pattern, ""));
    },
    right: function _anonymous_46(N) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      if (N >= 0) {
        var s = this.s.substr(this.s.length - N, N);
        return new this.constructor(s);
      } else {
        return this.left(-N);
      }
    },
    setValue: function _anonymous_47(s) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      initialize(this, s);
      return this;
    },
    slugify: function _anonymous_48() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var sl = new S(new S(this.s).latinise().s.replace(/[^\w\s-]/g, '').toLowerCase()).dasherize().s;
      if (sl.charAt(0) === '-') sl = sl.substr(1);
      return new this.constructor(sl);
    },
    startsWith: function _anonymous_49() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var prefixes = Array.prototype.slice.call(arguments, 0);

      for (var i = 0; i < prefixes.length; ++i) {
        if (this.s.lastIndexOf(prefixes[i], 0) === 0) return true;
      }

      return false;
    },
    stripPunctuation: function _anonymous_50() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return new this.constructor(this.s.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "));
    },
    stripTags: function _anonymous_51() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.s,
          args = arguments.length > 0 ? arguments : [''];
      multiArgs(args, function _anonymous_52(tag) {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        s = s.replace(RegExp('<\/?' + tag + '[^<>]*>', 'gi'), '');
      });
      return new this.constructor(s);
    },
    template: function _anonymous_53(values, opening, closing) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.s;
      var opening = opening || Export.TMPL_OPEN;
      var closing = closing || Export.TMPL_CLOSE;
      var open = opening.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$');
      var close = closing.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$');
      var r = new RegExp(open + '(.+?)' + close, 'g');
      var matches = s.match(r) || [];
      matches.forEach(function _anonymous_54(match) {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        var key = match.substring(opening.length, match.length - closing.length).trim(); //chop {{ and }}

        var value = typeof values[key] == 'undefined' ? '' : values[key];
        s = s.replace(match, value);
      });
      return new this.constructor(s);
    },
    times: function _anonymous_55(n) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return new this.constructor(new Array(n + 1).join(this.s));
    },
    titleCase: function _anonymous_56() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.s;

      if (s) {
        s = s.replace(/(^[a-z]| [a-z]|-[a-z]|_[a-z])/g, function _anonymous_57($1) {
          ;

          var __O__ = (this.SAVE ? this : window).SAVE(arguments);

          return $1.toUpperCase();
        });
      }

      return new this.constructor(s);
    },
    toBoolean: function _anonymous_58() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      if (typeof this.orig === 'string') {
        var s = this.s.toLowerCase();
        return s === 'true' || s === 'yes' || s === 'on' || s === '1';
      } else return this.orig === true || this.orig === 1;
    },
    toFloat: function _anonymous_59(precision) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var num = parseFloat(this.s);
      if (precision) return parseFloat(num.toFixed(precision));else return num;
    },
    toInt: function _anonymous_60() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return /^\s*-?0x/i.test(this.s) ? parseInt(this.s, 16) : parseInt(this.s, 10);
    },
    trim: function _anonymous_61() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s;
      if (typeof __nsp.trim === 'undefined') s = this.s.replace(/(^\s*|\s*$)/g, '');else s = this.s.trim();
      return new this.constructor(s);
    },
    trimLeft: function _anonymous_62() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s;
      if (__nsp.trimLeft) s = this.s.trimLeft();else s = this.s.replace(/(^\s*)/g, '');
      return new this.constructor(s);
    },
    trimRight: function _anonymous_63() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s;
      if (__nsp.trimRight) s = this.s.trimRight();else s = this.s.replace(/\s+$/, '');
      return new this.constructor(s);
    },
    truncate: function _anonymous_64(length, pruneStr) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var str = this.s;
      length = ~~length;
      pruneStr = pruneStr || '...';
      if (str.length <= length) return new this.constructor(str);

      var tmpl = function _anonymous_65(c) {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' ';
      },
          template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl);

      if (template.slice(template.length - 2).match(/\w\w/)) template = template.replace(/\s*\S+$/, '');else template = new S(template.slice(0, template.length - 1)).trimRight().s;
      return (template + pruneStr).length > str.length ? new S(str) : new S(str.slice(0, template.length) + pruneStr);
    },
    toCSV: function _anonymous_66() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var delim = ',',
          qualifier = '"',
          escape = '\\',
          encloseNumbers = true,
          keys = false;
      var dataArray = [];

      function hasVal(it) {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        return it !== null && it !== '';
      }

      if (typeof arguments[0] === 'object') {
        delim = arguments[0].delimiter || delim;
        delim = arguments[0].separator || delim;
        qualifier = arguments[0].qualifier || qualifier;
        encloseNumbers = !!arguments[0].encloseNumbers;
        escape = arguments[0].escape || escape;
        keys = !!arguments[0].keys;
      } else if (typeof arguments[0] === 'string') {
        delim = arguments[0];
      }

      if (typeof arguments[1] === 'string') qualifier = arguments[1];
      if (arguments[1] === null) qualifier = null;
      if (this.orig instanceof Array) dataArray = this.orig;else {
        for (var key in this.orig) if (this.orig.hasOwnProperty(key)) if (keys) dataArray.push(key);else dataArray.push(this.orig[key]);
      }
      var rep = escape + qualifier;
      var buildString = [];

      for (var i = 0; i < dataArray.length; ++i) {
        var shouldQualify = hasVal(qualifier);
        if (typeof dataArray[i] == 'number') shouldQualify &= encloseNumbers;
        if (shouldQualify) buildString.push(qualifier);

        if (dataArray[i] !== null && dataArray[i] !== undefined) {
          var d = new S(dataArray[i]).replaceAll(qualifier, rep).s;
          buildString.push(d);
        } else buildString.push('');

        if (shouldQualify) buildString.push(qualifier);
        if (delim) buildString.push(delim);
      }

      buildString.length = buildString.length - 1;
      return new this.constructor(buildString.join(''));
    },
    toString: function _anonymous_67() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return this.s;
    },
    underscore: function _anonymous_68() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.trim().s.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
      return new this.constructor(s);
    },
    unescapeHTML: function _anonymous_69() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return new this.constructor(this.s.replace(/\&([^;]+);/g, function _anonymous_70(entity, entityCode) {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        var match;

        if (entityCode in escapeChars) {
          return escapeChars[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
        } else {
          return entity;
        }
      }));
    },
    valueOf: function _anonymous_71() {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      return this.s.valueOf();
    },
    wrapHTML: function _anonymous_72(tagName, tagAttrs) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var s = this.s,
          el = tagName == null ? 'span' : tagName,
          elAttr = '',
          wrapped = '';
      if (typeof tagAttrs == 'object') for (var prop in tagAttrs) elAttr += ' ' + prop + '="' + new this.constructor(tagAttrs[prop]).escapeHTML() + '"';
      s = wrapped.concat('<', el, elAttr, '>', this, '</', el, '>');
      return new this.constructor(s);
    }
  };

  var methodsAdded = [];

  function extendPrototype() {
    ;

    var __O__ = (this.SAVE ? this : window).SAVE(arguments);

    for (var name in __sp) {
      (function _anonymous_73(name) {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        var func = __sp[name];

        if (!__nsp.hasOwnProperty(name)) {
          methodsAdded.push(name);

          __nsp[name] = function _anonymous_74() {
            ;

            var __O__ = (this.SAVE ? this : window).SAVE(arguments);

            String.prototype.s = this;
            return func.apply(this, arguments);
          };
        }
      })(name);
    }
  }

  function restorePrototype() {
    ;

    var __O__ = (this.SAVE ? this : window).SAVE(arguments);

    for (var i = 0; i < methodsAdded.length; ++i) delete String.prototype[methodsAdded[i]];

    methodsAdded.length = 0;
  }

  var nativeProperties = getNativeStringProperties();

  for (var name in nativeProperties) {
    (function _anonymous_75(name) {
      ;

      var __O__ = (this.SAVE ? this : window).SAVE(arguments);

      var stringProp = __nsp[name];

      if (typeof stringProp == 'function') {
        if (!__sp[name]) {
          if (nativeProperties[name] === 'string') {
            __sp[name] = function _anonymous_76() {
              ;

              var __O__ = (this.SAVE ? this : window).SAVE(arguments);

              return new this.constructor(stringProp.apply(this, arguments));
            };
          } else {
            __sp[name] = stringProp;
          }
        }
      }
    })(name);
  }

  __sp.repeat = __sp.times;
  __sp.include = __sp.contains;
  __sp.toInteger = __sp.toInt;
  __sp.toBool = __sp.toBoolean;
  __sp.decodeHTMLEntities = __sp.decodeHtmlEntities;
  __sp.constructor = S;

  function getNativeStringProperties() {
    ;

    var __O__ = (this.SAVE ? this : window).SAVE(arguments);

    var names = getNativeStringPropertyNames();
    var retObj = {};

    for (var i = 0; i < names.length; ++i) {
      var name = names[i];
      if (name === 'to' || name === 'toEnd') continue;
      var func = __nsp[name];

      try {
        var type = typeof func.apply('teststring');
        retObj[name] = type;
      } catch (e) {}
    }

    return retObj;
  }

  function getNativeStringPropertyNames() {
    ;

    var __O__ = (this.SAVE ? this : window).SAVE(arguments);

    var results = [];

    if (Object.getOwnPropertyNames) {
      results = Object.getOwnPropertyNames(__nsp);
      results.splice(results.indexOf('valueOf'), 1);
      results.splice(results.indexOf('toString'), 1);
      return results;
    } else {
      var stringNames = {};
      var objectNames = [];

      for (var name in String.prototype) stringNames[name] = name;

      for (var name in Object.prototype) delete stringNames[name];

      for (var name in stringNames) {
        results.push(name);
      }

      return results;
    }
  }

  function Export(str) {
    ;

    var __O__ = (this.SAVE ? this : window).SAVE(arguments);

    return new S(str);
  }

  ;
  Export.extendPrototype = extendPrototype;
  Export.restorePrototype = restorePrototype;
  Export.VERSION = VERSION;
  Export.TMPL_OPEN = '{{';
  Export.TMPL_CLOSE = '}}';
  Export.ENTITIES = ENTITIES;

  if ( true && typeof module.exports !== 'undefined') {
    module.exports = Export;
  } else {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function _anonymous_77() {
        ;

        var __O__ = (this.SAVE ? this : window).SAVE(arguments);

        return Export;
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  }

  function multiArgs(args, fn) {
    ;

    var __O__ = (this.SAVE ? this : window).SAVE(arguments);

    var result = [],
        i;

    for (i = 0; i < args.length; i++) {
      result.push(args[i]);
      if (fn) fn.call(args, args[i], i);
    }

    return result;
  }

  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    amp: '&'
  };

  function escapeRegExp(s) {
    ;

    var __O__ = (this.SAVE ? this : window).SAVE(arguments);

    var c;
    var i;
    var ret = [];
    var re = /^[A-Za-z0-9]+$/;
    s = ensureString(s);

    for (i = 0; i < s.length; ++i) {
      c = s.charAt(i);

      if (re.test(c)) {
        ret.push(c);
      } else {
        if (c === "\\000") {
          ret.push("\\000");
        } else {
          ret.push("\\" + c);
        }
      }
    }

    return ret.join("");
  }

  function ensureString(string) {
    ;

    var __O__ = (this.SAVE ? this : window).SAVE(arguments);

    return string == null ? '' : '' + string;
  }

  var reversedEscapeChars = {};

  for (var key in escapeChars) {
    reversedEscapeChars[escapeChars[key]] = key;
  }

  ENTITIES = {
    "amp": "&",
    "gt": ">",
    "lt": "<",
    "quot": "\"",
    "apos": "'",
    "AElig": 198,
    "Aacute": 193,
    "Acirc": 194,
    "Agrave": 192,
    "Aring": 197,
    "Atilde": 195,
    "Auml": 196,
    "Ccedil": 199,
    "ETH": 208,
    "Eacute": 201,
    "Ecirc": 202,
    "Egrave": 200,
    "Euml": 203,
    "Iacute": 205,
    "Icirc": 206,
    "Igrave": 204,
    "Iuml": 207,
    "Ntilde": 209,
    "Oacute": 211,
    "Ocirc": 212,
    "Ograve": 210,
    "Oslash": 216,
    "Otilde": 213,
    "Ouml": 214,
    "THORN": 222,
    "Uacute": 218,
    "Ucirc": 219,
    "Ugrave": 217,
    "Uuml": 220,
    "Yacute": 221,
    "aacute": 225,
    "acirc": 226,
    "aelig": 230,
    "agrave": 224,
    "aring": 229,
    "atilde": 227,
    "auml": 228,
    "ccedil": 231,
    "eacute": 233,
    "ecirc": 234,
    "egrave": 232,
    "eth": 240,
    "euml": 235,
    "iacute": 237,
    "icirc": 238,
    "igrave": 236,
    "iuml": 239,
    "ntilde": 241,
    "oacute": 243,
    "ocirc": 244,
    "ograve": 242,
    "oslash": 248,
    "otilde": 245,
    "ouml": 246,
    "szlig": 223,
    "thorn": 254,
    "uacute": 250,
    "ucirc": 251,
    "ugrave": 249,
    "uuml": 252,
    "yacute": 253,
    "yuml": 255,
    "copy": 169,
    "reg": 174,
    "nbsp": 160,
    "iexcl": 161,
    "cent": 162,
    "pound": 163,
    "curren": 164,
    "yen": 165,
    "brvbar": 166,
    "sect": 167,
    "uml": 168,
    "ordf": 170,
    "laquo": 171,
    "not": 172,
    "shy": 173,
    "macr": 175,
    "deg": 176,
    "plusmn": 177,
    "sup1": 185,
    "sup2": 178,
    "sup3": 179,
    "acute": 180,
    "micro": 181,
    "para": 182,
    "middot": 183,
    "cedil": 184,
    "ordm": 186,
    "raquo": 187,
    "frac14": 188,
    "frac12": 189,
    "frac34": 190,
    "iquest": 191,
    "times": 215,
    "divide": 247,
    "OElig;": 338,
    "oelig;": 339,
    "Scaron;": 352,
    "scaron;": 353,
    "Yuml;": 376,
    "fnof;": 402,
    "circ;": 710,
    "tilde;": 732,
    "Alpha;": 913,
    "Beta;": 914,
    "Gamma;": 915,
    "Delta;": 916,
    "Epsilon;": 917,
    "Zeta;": 918,
    "Eta;": 919,
    "Theta;": 920,
    "Iota;": 921,
    "Kappa;": 922,
    "Lambda;": 923,
    "Mu;": 924,
    "Nu;": 925,
    "Xi;": 926,
    "Omicron;": 927,
    "Pi;": 928,
    "Rho;": 929,
    "Sigma;": 931,
    "Tau;": 932,
    "Upsilon;": 933,
    "Phi;": 934,
    "Chi;": 935,
    "Psi;": 936,
    "Omega;": 937,
    "alpha;": 945,
    "beta;": 946,
    "gamma;": 947,
    "delta;": 948,
    "epsilon;": 949,
    "zeta;": 950,
    "eta;": 951,
    "theta;": 952,
    "iota;": 953,
    "kappa;": 954,
    "lambda;": 955,
    "mu;": 956,
    "nu;": 957,
    "xi;": 958,
    "omicron;": 959,
    "pi;": 960,
    "rho;": 961,
    "sigmaf;": 962,
    "sigma;": 963,
    "tau;": 964,
    "upsilon;": 965,
    "phi;": 966,
    "chi;": 967,
    "psi;": 968,
    "omega;": 969,
    "thetasym;": 977,
    "upsih;": 978,
    "piv;": 982,
    "ensp;": 8194,
    "emsp;": 8195,
    "thinsp;": 8201,
    "zwnj;": 8204,
    "zwj;": 8205,
    "lrm;": 8206,
    "rlm;": 8207,
    "ndash;": 8211,
    "mdash;": 8212,
    "lsquo;": 8216,
    "rsquo;": 8217,
    "sbquo;": 8218,
    "ldquo;": 8220,
    "rdquo;": 8221,
    "bdquo;": 8222,
    "dagger;": 8224,
    "Dagger;": 8225,
    "bull;": 8226,
    "hellip;": 8230,
    "permil;": 8240,
    "prime;": 8242,
    "Prime;": 8243,
    "lsaquo;": 8249,
    "rsaquo;": 8250,
    "oline;": 8254,
    "frasl;": 8260,
    "euro;": 8364,
    "image;": 8465,
    "weierp;": 8472,
    "real;": 8476,
    "trade;": 8482,
    "alefsym;": 8501,
    "larr;": 8592,
    "uarr;": 8593,
    "rarr;": 8594,
    "darr;": 8595,
    "harr;": 8596,
    "crarr;": 8629,
    "lArr;": 8656,
    "uArr;": 8657,
    "rArr;": 8658,
    "dArr;": 8659,
    "hArr;": 8660,
    "forall;": 8704,
    "part;": 8706,
    "exist;": 8707,
    "empty;": 8709,
    "nabla;": 8711,
    "isin;": 8712,
    "notin;": 8713,
    "ni;": 8715,
    "prod;": 8719,
    "sum;": 8721,
    "minus;": 8722,
    "lowast;": 8727,
    "radic;": 8730,
    "prop;": 8733,
    "infin;": 8734,
    "ang;": 8736,
    "and;": 8743,
    "or;": 8744,
    "cap;": 8745,
    "cup;": 8746,
    "int;": 8747,
    "there4;": 8756,
    "sim;": 8764,
    "cong;": 8773,
    "asymp;": 8776,
    "ne;": 8800,
    "equiv;": 8801,
    "le;": 8804,
    "ge;": 8805,
    "sub;": 8834,
    "sup;": 8835,
    "nsub;": 8836,
    "sube;": 8838,
    "supe;": 8839,
    "oplus;": 8853,
    "otimes;": 8855,
    "perp;": 8869,
    "sdot;": 8901,
    "lceil;": 8968,
    "rceil;": 8969,
    "lfloor;": 8970,
    "rfloor;": 8971,
    "lang;": 9001,
    "rang;": 9002,
    "loz;": 9674,
    "spades;": 9824,
    "clubs;": 9827,
    "hearts;": 9829,
    "diams;": 9830
  };
}.call(this);

/***/ }),

/***/ "./webpack/src/string/index.js":
/*!*************************************!*\
  !*** ./webpack/src/string/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! string */ "./node_modules/string/lib/string.js");
/* harmony import */ var string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(string__WEBPACK_IMPORTED_MODULE_0__);

console.log(string__WEBPACK_IMPORTED_MODULE_0___default.a);
window.__INDEX__ = 0;
string__WEBPACK_IMPORTED_MODULE_0___default()('hello').s;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map