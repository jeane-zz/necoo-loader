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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/riot/riot.esm.js":
/*!****************************************!*\
  !*** ../node_modules/riot/riot.esm.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Binding arguments in strict mode (177:20)\\nFile was processed with these loaders:\\n * ./loaders/remove-strict.js\\n * ./loaders/necoo-loader.js\\nYou may need an additional loader to handle the result of these loaders.\\n|             var __flag__ = false;\\n|             function SAVE(args) {\\n>                 var arguments = args;\\n|                 var __error__ = TRY_CATCH();\\n|                 if (window.__INDEX__ >= 0) {\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvcmlvdC5lc20uanMuanMiLCJzb3VyY2VzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../node_modules/riot/riot.esm.js\n");

/***/ }),

/***/ "./src/app.riot":
/*!**********************!*\
  !*** ./src/app.riot ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  'css': null,\n  'exports': null,\n\n  'template': function(template, expressionTypes, bindingTypes, getComponent) {\n    return template('<p expr0><!----></p>', [{\n      'redundantAttribute': 'expr0',\n      'selector': '[expr0]',\n\n      'expressions': [{\n        'type': expressionTypes.TEXT,\n        'childNodeIndex': 0,\n\n        'evaluate': function(scope) {\n          return scope.props.message;\n        }\n      }]\n    }]);\n  },\n\n  'name': 'app'\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLnJpb3QuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLnJpb3Q/NTZlYSJdLCJzb3VyY2VzQ29udGVudCI6WyI8YXBwPlxuICA8cD57IHByb3BzLm1lc3NhZ2UgfTwvcD5cbjwvYXBwPiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/app.riot\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var riot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! riot */ \"../node_modules/riot/riot.esm.js\");\n/* harmony import */ var riot__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(riot__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_riot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.riot */ \"./src/app.riot\");\n\n\n\nconst mountApp = riot__WEBPACK_IMPORTED_MODULE_0__[\"component\"](_app_riot__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\nconst app = mountApp(\n    document.getElementById('app'),\n    { message: 'Hello World' }\n);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/MGJjOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyByaW90IGZyb20gJ3Jpb3QnO1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcC5yaW90J1xuXG5jb25zdCBtb3VudEFwcCA9IHJpb3QuY29tcG9uZW50KEFwcCk7XG5cbmNvbnN0IGFwcCA9IG1vdW50QXBwKFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSxcbiAgICB7IG1lc3NhZ2U6ICdIZWxsbyBXb3JsZCcgfVxuKTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });