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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dependence/inject.js":
/*!******************************!*\
  !*** ./dependence/inject.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction setFire(data) {\n    let fire = {};\n    let point = null;\n    let lastCaller = {};\n    let fisrstCaller = {};\n    data.forEach((item, index) => {\n        if (index === 0) {\n            fire.name = item.name;\n            fire.value = item.name;\n            fire.obj = item;\n            fire.children = [];\n            fire.index = index;\n            fisrstCaller = fire;\n            point = fire;\n        }\n        else if (item.caller === data[index - 1].name) {\n            var o = {};\n            o.name = item.name;\n            o.value = item.name;\n            o.obj = item;\n            o.children = [];\n            o.parent = point;\n            o.index = index;\n            point.children.push(o);\n            lastCaller.caller = item.caller;\n            lastCaller.point = point;\n            point = o;\n        }\n        else if (item.caller === lastCaller.caller) {\n            var o = {};\n            o.name = item.name;\n            o.value = item.name;\n            o.index = index;\n            o.obj = item;\n            o.children = [];\n            lastCaller.point.children.push(o);\n            o.parent = lastCaller.point;\n            point = o;\n        }\n        else if (item.caller === null && item.name) {\n            var o = {};\n            o.name = item.name;\n            o.value = item.name;\n            o.obj = item;\n            o.children = [];\n            o.index = index;\n            o.parent = fisrstCaller;\n            fisrstCaller.children.push(o);\n            point = o;\n        }\n        else {\n            var o = {};\n            o.name = item.name;\n            o.value = item.name;\n            o.index = index;\n            o.obj = item;\n            o.children = [];\n            let parent = findParent(point, item.caller);\n            // lastCaller.caller = item.caller;\n            // lastCaller.point = point;\n            o.parent = parent;\n            point = o;\n            if (parent && parent.children) {\n                parent.children.push(o);\n            }\n        }\n    });\n    window.__FIRE__.push(fire);\n}\nfunction findParent(data, name) {\n    if (data.parent) {\n        if (data.parent.name === name) {\n            return data.parent;\n        }\n        else {\n            return findParent(data.parent, name);\n        }\n    }\n    return null;\n}\nfunction setFireToWindow() {\n    window.__FIRE__ = [];\n    for(var item in window.necooData) {\n        setFire(window.necooData[item]);\n    }\n    var __parent__ = {\n        children: [],\n        name: '开始',\n        value: '开始'\n    };\n    window.__FIRE__.forEach(function(item) {\n        __parent__.children.push(item);\n    });\n    window.__FIRE__ = __parent__;\n}\n\nwindow.onload = function() {\n    var button = document.createElement('button');\n    var freshButton = document.createElement('button');\n    freshButton.className = 'fresh-button';\n    button.className = 'see-source';\n    button.innerText = '源码分析';\n    freshButton.innerText = '刷新数据';\n    freshButton.onclick = function() {\n        setFireToWindow();\n        renderTree();\n    };\n    var __FLAG__ = 1;\n    button.onclick = function() {\n        var boxWrap = document.getElementById('boxWrap');\n        if (__FLAG__) {\n            __FLAG__ = 0;\n            boxWrap.style = 'display: block';\n        }\n        else {\n            __FLAG__ = 1;\n            boxWrap.style = 'display: none';\n        }\n    };\n    document.body.appendChild(button);\n    document.body.appendChild(freshButton);\n\n    var divEl = document.createElement('div');\n    divEl.className = 'source-panel';\n    divEl.innerHTML = '<div id=\"boxWrap\" style=\"display: none;\"><div id=\"allCodeBox\"><div id=\"allCodePos\"><textarea id=\"allCode\" style=\"display: none;\"></textarea></div></div><div class=\"tree-box\"></div><div id=\"preCode\" style=\"max-width: 50em; margin-bottom: 1em\">JavaScript:<br>\\n' +\n        '    <textarea id=\"code\" name=\"code\"></textarea><p>Select a theme: <select onchange=\"selectTheme()\" id=select>\\n' +\n        '    <option selected>default</option>\\n' +\n        '    <option>3024-day</option>\\n' +\n        '    <option>3024-night</option>\\n' +\n        '    <option>abcdef</option>\\n' +\n        '    <option>ambiance</option>\\n' +\n        '    <option>base16-dark</option>\\n' +\n        '    <option>base16-light</option>\\n' +\n        '    <option>bespin</option>\\n' +\n        '    <option>blackboard</option>\\n' +\n        '    <option>cobalt</option>\\n' +\n        '    <option>colorforth</option>\\n' +\n        '    <option>darcula</option>\\n' +\n        '    <option>dracula</option>\\n' +\n        '    <option>duotone-dark</option>\\n' +\n        '    <option>duotone-light</option>\\n' +\n        '    <option>eclipse</option>\\n' +\n        '    <option>elegant</option>\\n' +\n        '    <option>erlang-dark</option>\\n' +\n        '    <option>gruvbox-dark</option>\\n' +\n        '    <option>hopscotch</option>\\n' +\n        '    <option>icecoder</option>\\n' +\n        '    <option>idea</option>\\n' +\n        '    <option>isotope</option>\\n' +\n        '    <option>lesser-dark</option>\\n' +\n        '    <option>liquibyte</option>\\n' +\n        '    <option>lucario</option>\\n' +\n        '    <option>material</option>\\n' +\n        '    <option>mbo</option>\\n' +\n        '    <option>mdn-like</option>\\n' +\n        '    <option>midnight</option>\\n' +\n        '    <option>monokai</option>\\n' +\n        '    <option>neat</option>\\n' +\n        '    <option>neo</option>\\n' +\n        '    <option>night</option>\\n' +\n        '    <option>nord</option>\\n' +\n        '    <option>oceanic-next</option>\\n' +\n        '    <option>panda-syntax</option>\\n' +\n        '    <option>paraiso-dark</option>\\n' +\n        '    <option>paraiso-light</option>\\n' +\n        '    <option>pastel-on-dark</option>\\n' +\n        '    <option>railscasts</option>\\n' +\n        '    <option>rubyblue</option>\\n' +\n        '    <option>seti</option>\\n' +\n        '    <option>shadowfox</option>\\n' +\n        '    <option>solarized dark</option>\\n' +\n        '    <option>solarized light</option>\\n' +\n        '    <option>the-matrix</option>\\n' +\n        '    <option>tomorrow-night-bright</option>\\n' +\n        '    <option>tomorrow-night-eighties</option>\\n' +\n        '    <option>ttcn</option>\\n' +\n        '    <option>twilight</option>\\n' +\n        '    <option>vibrant-ink</option>\\n' +\n        '    <option>xq-dark</option>\\n' +\n        '    <option>xq-light</option>\\n' +\n        '    <option>yeti</option>\\n' +\n        '    <option>zenburn</option>\\n' +\n        '</select>\\n' +\n        '</p><button id=\"formatBtn\">格式化代码</button></div></div>';\n    document.body.appendChild(divEl);\n    var sc = document.getElementById(\"code\");\n    // window.editor = window.CodeMirror.fromTextArea(sc, {\n    //     mode: \"javascript\",\n    //     lineNumbers: true,\n    //     lineWrapping: true,\n    //     extraKeys: {\"Ctrl-Q\": function(cm){ cm.foldCode(cm.getCursor()); }},\n    //     foldGutter: true,\n    //     gutters: [\"CodeMirror-linenumbers\", \"CodeMirror-foldgutter\"],\n    //     theme: \"monokai\",\n    // });\n    var allCode = document.getElementById('allCode')\n    var url = window.necooData[0][0].callerInfo.stackTrace.stackTrace[0].fileName;\n    console.log('===' , url);\n    $.ajax({url: url, type:'GET', dataType: 'text/plain', contentType: 'text/plain', success: function(response) {\n            console.log(response);\n            window.SET_ALL_CODE(response);\n    }});\n    // $(window).on('source-code', function(e, from, to){\n    //     from = parseCode(from);\n    //     from = from.replace(/__helloworld__/g, '');\n    //     window.SET_ALL_CODE(from);\n    // });\n    window.SET_ALL_CODE = function(value, from) {\n        window.allCodeEditor =  CodeMirror.fromTextArea(allCode, {\n            mode: \"javascript\",\n            theme: 'panda-syntax',\n            lineNumbers: true,\n            lineWrapping: true,\n            styleActiveLine: true,\n            styleSelectedText: true,\n            matchBrackets: true,\n            extraKeys: {\"Ctrl-Q\": function(cm){ CodeMirror.commands.foldAll(cm); },\"Alt-F\": \"findPersistent\"},\n            foldGutter: true,\n            gutters: [\"CodeMirror-linenumbers\", \"CodeMirror-foldgutter\"]\n        });\n        window.allCodeEditor.setValue(value);\n        window.allCodeEditor.setSize('1000px','460px');\n    }\n    window.editor = CodeMirror.fromTextArea(sc, {\n        mode: \"javascript\",\n        theme: 'panda-syntax',\n        lineNumbers: true,\n        lineWrapping: true,\n        styleActiveLine: true,\n        matchBrackets: true,\n        extraKeys: {\"Ctrl-Q\": function(cm){ CodeMirror.commands.foldAll(cm); },\"Alt-F\": \"findPersistent\"},\n        foldGutter: true,\n        gutters: [\"CodeMirror-linenumbers\", \"CodeMirror-foldgutter\"]\n    });\n    window.editor.setSize('1000px','300px');\n    var input = document.getElementById(\"select\");\n\n    var choice = (location.hash && location.hash.slice(1)) ||\n        (document.location.search &&\n            decodeURIComponent(document.location.search.slice(1)));\n    if (choice) {\n        input.value = choice;\n        editor.setOption(\"theme\", choice);\n    }\n    window.selectTheme= function () {\n        var theme = input.options[input.selectedIndex].textContent;\n        editor.setOption(\"theme\", theme);\n        location.hash = \"#\" + theme;\n    }\n    CodeMirror.on(window, \"hashchange\", function() {\n        var theme = location.hash.slice(1);\n\n        if (theme) { input.value = theme; window.selectTheme(); }\n    });\n    function getSelectedRange() {\n        return { from: editor.getCursor(true), to: editor.getCursor(false) };\n    }\n    var formatBtn = document.getElementById('formatBtn');\n    formatBtn.addEventListener('click', function() {\n        autoFormatSelection();\n    });\n    function autoFormatSelection() {\n        var range = getSelectedRange();\n        editor.autoFormatRange(range.from, range.to);\n    }\n    setTimeout(function() {\n        setFireToWindow();\n        renderTree();\n    }, 1000);\n};\n\nfunction renderTree() {\n    var me = this;\n    var d3 = window.d3;\n    document.querySelector('.tree-box').innerHTML ='';\n    var margin = {top: 30, right: 20, bottom: 30, left: 20},\n        width = 960,\n        barHeight = 20,\n        barWidth = (width - margin.left - margin.right) * 0.2;\n    var i = 0,\n        duration = 400,\n        root;\n    var diagonal = d3.linkHorizontal()\n        .x(function(d) { return d.y; })\n        .y(function(d) { return d.x; });\n    var svg = d3.select(\".tree-box\").append(\"svg\")\n        .attr(\"width\", width) // + margin.left + margin.right)\n        .append(\"g\")\n        .attr(\"transform\", \"translate(\" + margin.left + \",\" + margin.top + \")\");\n    d3.json(\"treeData.json\", function(error, flare) {\n        if (error) throw error;\n        root = d3.hierarchy(flare);\n        root.x0 = 0;\n        root.y0 = 0;\n        update(root);\n    });\n    function update(source) {\n        // Compute the flattened node list.\n        var nodes = root.descendants();\n        var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);\n        d3.select(\"svg\").transition()\n            .duration(duration)\n            .attr(\"height\", height);\n        // d3.select(self.frameElement).transition()\n        //     .duration(duration)\n        //     .style(\"height\", height + \"px\");\n        // Compute the \"layout\". TODO https://github.com/d3/d3-hierarchy/issues/67\n        var index = -1;\n        root.eachBefore(function(n) {\n            n.x = ++index * barHeight;\n            n.y = n.depth * 20;\n        });\n        // Update the nodes…\n        var node = svg.selectAll(\".node\")\n            .data(nodes, function(d) { return d.id || (d.id = ++i); });\n        var nodeEnter = node.enter().append(\"g\")\n            .attr(\"class\", \"node\")\n            .attr(\"transform\", function(d) { return \"translate(\" + source.y0 + \",\" + source.x0 + \")\"; })\n            .style(\"opacity\", 0);\n        // Enter any new nodes at the parent's previous position.\n        nodeEnter.append(\"rect\")\n            .attr(\"y\", -barHeight / 2)\n            .attr(\"height\", barHeight)\n            .attr(\"width\", barWidth)\n            .style(\"fill\", color)\n            .on(\"click\", click);\n        nodeEnter.append(\"text\")\n            .attr(\"dy\", 3.5)\n            .attr(\"dx\", 5.5)\n            .text(function(d) { console.log(d.data);return d.data && d.data.name; });\n        // Transition nodes to their new position.\n        var clickEl = nodeEnter.append(\"rect\")\n            .attr(\"y\", -barHeight/2)\n            .attr(\"x\", barWidth - 30)\n            .attr(\"height\", barHeight)\n            .attr(\"width\", '30')\n            .style(\"fill\", 'green')\n        var clickToSource = nodeEnter.append(\"rect\")\n            .attr(\"y\", -barHeight/2)\n            .attr(\"x\", barWidth)\n            .attr(\"height\", barHeight)\n            .attr(\"width\", '40')\n            .style(\"fill\", 'green')\n            .on(\"click\", renderSource.bind(null, 'source'));\n        var clickToExec = nodeEnter.append(\"rect\")\n            .attr(\"y\", -barHeight/2)\n            .attr(\"x\", barWidth + 40)\n            .attr(\"height\", barHeight)\n            .attr(\"width\", '40')\n            .style(\"fill\", 'red')\n            .on(\"click\", renderSource.bind(null, 'exec'));\n        nodeEnter.append(\"text\")\n            .attr(\"dy\", barHeight/2-5)\n            .attr(\"dx\", barWidth - 20)\n            .text(function(d) { return d.data.index; });\n        nodeEnter.append(\"text\")\n            .attr(\"dy\", barHeight/2-5)\n            .attr(\"dx\", barWidth + 5)\n            .text(function(d) { return '定义处'; });\n        nodeEnter.append(\"text\")\n            .attr(\"dy\", barHeight/2-5)\n            .attr(\"dx\", barWidth + 45)\n            .text(function(d) { return '调用处'; });\n\n\n        nodeEnter.transition()\n            .duration(duration)\n            .attr(\"transform\", function(d) { return \"translate(\" + d.y + \",\" + d.x + \")\"; })\n            .style(\"opacity\", 1);\n        node.transition()\n            .duration(duration)\n            .attr(\"transform\", function(d) { return \"translate(\" + d.y + \",\" + d.x + \")\"; })\n            .style(\"opacity\", 1)\n            .select(\"rect\")\n            .style(\"fill\", color);\n        // Transition exiting nodes to the parent's new position.\n        node.exit().transition()\n            .duration(duration)\n            .attr(\"transform\", function(d) { return \"translate(\" + source.y + \",\" + source.x + \")\"; })\n            .style(\"opacity\", 0)\n            .remove();\n        // Update the links…\n        var link = svg.selectAll(\".link\")\n            .data(root.links(), function(d) { return d.target.id; });\n        // Enter any new links at the parent's previous position.\n        link.enter().insert(\"path\", \"g\")\n            .attr(\"class\", \"link\")\n            .attr(\"d\", function(d) {\n                var o = {x: source.x0, y: source.y0};\n                return diagonal({source: o, target: o});\n            })\n            .transition()\n            .duration(duration)\n            .attr(\"d\", diagonal);\n        // Transition links to their new position.\n        link.transition()\n            .duration(duration)\n            .attr(\"d\", diagonal);\n        // Transition exiting nodes to the parent's new position.\n        link.exit().transition()\n            .duration(duration)\n            .attr(\"d\", function(d) {\n                var o = {x: source.x, y: source.y};\n                return diagonal({source: o, target: o});\n            })\n            .remove();\n        // Stash the old positions for transition.\n        root.each(function(d) {\n            d.x0 = d.x;\n            d.y0 = d.y;\n        });\n        function renderSource(type, d) {\n            console.log(type, d);\n            let index = d.data.index;\n            let sourceLine = '';\n            if (type === 'exec') {\n                if (d.data.obj.callerInfo.father) {\n                    sourceLine = d.data.obj.callerInfo.father.lineNumber;\n                    window.allCodeEditor.scrollIntoView({line: d.data.obj.callerInfo.father.lineNumber, ch: d.data.obj.callerInfo.father.columnNumber});\n                    window.allCodeEditor.doc.markText({line:d.data.obj.callerInfo.father.lineNumber-1, ch: 0},{line: d.data.obj.callerInfo.father.lineNumber-1, ch: d.data.obj.callerInfo.father.columnNumber}, {className: \"errorHighlight\", css: 'animation:mymove 5s;'});\n                }\n            }\n            if (type === 'source') {\n                if (d.data.obj.callerInfo.self) {\n                    let self = d.data.obj.callerInfo.self;\n                    sourceLine = self.lineNumber;\n                    window.allCodeEditor.scrollIntoView({line: self.lineNumber, ch: self.columnNumber});\n                    window.allCodeEditor.doc.markText({line: self.lineNumber-1, ch: 0},{line: self.lineNumber-1, ch: self.columnNumber}, {className: \"errorHighlight\", css: 'animation:mymove 5s;'});\n                }\n            }\n            clickEl._groups.forEach(item => {\n                item.forEach(list => {\n                    list.__data__.isClick = false;\n                });\n            });\n            d.isClick = true;\n            clickEl.style('fill', setClickColor);\n            if (typeof index !== 'undefined') {\n                // let sourceBox = d3.select('#preCode');\n                // sourceBox.style(\"position\", 'absolute');\n                // sourceBox.style(\"left\", d.y + barWidth + 1200 + 'px');\n                // sourceBox.style(\"top\", d.x + 'px');\n                renderCode(d.data.obj.func);\n            }\n            if (d.data.obj.isVariable) {\n                console.log('%c变量： ', 'color:red;font-size:20px;', d.data.obj.variable);\n                return;\n            }\n            console.table('%c输入：', 'color:#0f0;;font-size:20px;', d.data.obj.args);\n            console.log('%c输出' + sourceLine + '行：', 'color:red;font-size:20px;', d.data.obj.returnValue);\n            console.log('%c-----------------------', 'color: #f0f');\n            function addClass(obj,cls) {\n                var obj_class=obj.className,//获取class的内容；\n                    blank = ( obj_class != '' ) ? ' ' : '';//判断获取的class是否为空，如果不为空，则添加空格；\n                if (obj_class.indexOf(cls) > -1) {\n                    return;\n                }\n                var added = obj_class + blank + cls;//组合原来的class和需要添加的class，中间加上空格；\n                obj.className = added;//替换原来的class；\n            }\n\n            update(d);\n        }\n    }\n    // Toggle children on click.\n    function click(d) {\n        console.log(d);\n        if (d.children) {\n            d._children = d.children;\n            d.children = null;\n        } else {\n            d.children = d._children;\n            d._children = null;\n        }\n        update(d);\n    }\n    function setClickColor(d) {\n        return d.isClick ? \"red\" : \"green\";\n    }\n    function color(d) {\n        return d._children ? \"#3182bd\" : d.children ? \"#c6dbef\" : \"#fd8d3c\";\n    }\n}\nfunction parseCode(code) {\n    var __O__ = \"typeof __O__ !== 'undefined' ? __O__ : {}\";\n    var argRe = /\\;var __O__ = .*?SAVE\\(arguments\\)\\;/g;\n    // var returnRe = /if \\(__O__\\) \\{ __O__\\.returnValue = _rExpr_[\\d]+\\; __O__\\.returnIndex = [\\d]+\\;\\}/g;\n    var returnRe = /_ProcessReturn_\\(|, typeof __O__ \\!== \\'undefined\\' \\? __O__ : {}\\)/g;\n    var vaRe = /_ProcessVariable_\\(\\{[\\s\\S]*?\\}, typeof __O__ \\!== \\'undefined\\' \\? __O__ : {}\\)\\;/g;\n    var assignRe = /_ProcessAssign_\\(([\\s\\S]*?), \\{.*?\\}, typeof __O__ \\!== \\'undefined\\' \\? __O__ : {}\\)/g;\n    return code\n        .replace(assignRe, function(_, $1) {\n            return $1;\n        })\n        .replace(/_ProcessAssign_\\(/g, '')\n        .replace(argRe, '').replace(vaRe, '').replace(returnRe, '');\n}\nfunction renderCode(code) {\n    if (!code) {\n        return;\n    }\n    code = parseCode(code);\n    // var pre = document.getElementById('preCode');\n    // pre.textContent = code;\n    // pre.className = 'pre prettyprint linenums';\n    addPrettyClass(code);\n}\nfunction addPrettyClass(code) {\n    // PR.prettyPrint();\n    var sc = document.getElementById(\"code\");\n\n    // sc.textContent = code;\n    // console.log(code);\n    // console.log(editor);\n    window.editor.setValue(code)\n}\n\n\n//# sourceURL=webpack:///./dependence/inject.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dependence_inject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dependence/inject */ \"./dependence/inject.js\");\n/* harmony import */ var _dependence_inject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dependence_inject__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });