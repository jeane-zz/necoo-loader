// 对d3.js做了修改，所以使用本地的。 @todo: 上传npm包
import * as d3 from "./lib/d3";
import CodeMirror from 'codemirror';
import 'codemirror-formatting';
import $ from 'n-zepto';
import setFireToWindow from './inject-data';
import {injectTpl} from "./inject-tpl";

Zepto(function ($) {
    let button = $('<button class="see-source">源码分析</button>');
    let freshButton = $('<button class="fresh-button">刷新数据</button>');
    let injectElement = $(`<div class="source-panel">${injectTpl}</div>`);
    freshButton.on('click', () => {
        // 先设置数据，再渲染d3
        setFireToWindow();
        renderTree();
    });
    button.on('click', () => {
        setFireToWindow();
        renderTree();
        let boxWrap = $('#necoo-boxWrap');
        boxWrap.toggle();
    });
    $(document.body)
        .append(button)
        .append(freshButton)
        .append(injectElement);
    function setAllCodeMirror(value) {
        const allCodeId = '#necoo-allCode';
        const allCodeEle = $(allCodeId);
        console.log('allcode', allCodeEle);
        window.allCodeEditor =  CodeMirror.fromTextArea(allCodeEle[0], {
            mode: "javascript",
            theme: 'monokai',
            lineNumbers: true,
            lineWrapping: true,
            styleActiveLine: true,
            styleSelectedText: true,
            matchBrackets: true,
            extraKeys: {"Ctrl-Q": function(cm){ CodeMirror.commands.foldAll(cm); },"Alt-F": "findPersistent"},
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        window.allCodeEditor.setValue(value);
        console.log('0---', $(document));
        window.allCodeEditor.setSize('1000px', '600px');
    }
    function setCurrentMirror() {
        const currentCodeId = '#code';
        const currentCodeEl = $(currentCodeId);
        window.currentEditor = CodeMirror.fromTextArea(currentCodeEl[0], {
            mode: "javascript",
            // theme: 'panda-syntax',
            lineNumbers: true,
            lineWrapping: true,
            styleActiveLine: true,
            matchBrackets: true,
            extraKeys: {"Ctrl-Q": function(cm){ CodeMirror.commands.foldAll(cm); },"Alt-F": "findPersistent"},
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        // window.currentEditor.setSize('1000px','300px');
        var input = document.getElementById("select");

        var choice = (location.hash && location.hash.slice(1)) ||
            (document.location.search &&
                decodeURIComponent(document.location.search.slice(1)));
        if (choice) {
            input.value = choice;
            window.currentEditor.setOption("theme", choice);
        }
        window.selectTheme= function () {
            var theme = input.options[input.selectedIndex].textContent;
            window.currentEditor.setOption("theme", theme);
            location.hash = "#" + theme;
        }
        CodeMirror.on(window, "hashchange", function() {
            var theme = location.hash.slice(1);

            if (theme) { input.value = theme; window.selectTheme(); }
        });
        function getSelectedRange() {
            return { from: editor.getCursor(true), to: editor.getCursor(false) };
        }
        var formatBtn = document.getElementById('formatBtn');
        formatBtn.addEventListener('click', function() {
            autoFormatSelection();
        });
        function autoFormatSelection() {
            var range = getSelectedRange();
            window.currentEditor.autoFormatRange(range.from, range.to);
        }
    }
    const url = window.necooData[0][0].callerInfo.stackTrace.stackTrace[0].fileName;
    $.ajax({url: url, type:'GET', dataType: 'text/plain', contentType: 'text/plain', success: function(response) {
        // console.log(response);
        setAllCodeMirror(response);
        setCurrentMirror();
    }});
});

function renderTree() {
    var me = this;
    document.querySelector('.tree-box').innerHTML ='';
    var margin = {top: 30, right: 20, bottom: 30, left: 20},
        width = 960,
        barHeight = 20,
        barWidth = (width - margin.left - margin.right) * 0.2;
    var i = 0,
        duration = 400,
        root;
    var diagonal = d3.linkHorizontal()
        .x(function(d) { return d.y; })
        .y(function(d) { return d.x; });
    var svg = d3.select(".tree-box").append("svg")
        .attr("width", width) // + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    d3.json("treeData.json", function(error, flare) {
        if (error) throw error;
        root = d3.hierarchy(flare);
        root.x0 = 0;
        root.y0 = 0;
        update(root);
    });
    function update(source) {
        // Compute the flattened node list.
        var nodes = root.descendants();
        var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);
        d3.select("svg").transition()
            .duration(duration)
            .attr("height", height);
        var index = -1;
        root.eachBefore(function(n) {
            n.x = ++index * barHeight;
            n.y = n.depth * 20;
        });
        // Update the nodes…
        var node = svg.selectAll(".node")
            .data(nodes, function(d) { return d.id || (d.id = ++i); });
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .style("opacity", 0);
        // Enter any new nodes at the parent's previous position.
        nodeEnter.append("rect")
            .attr("y", -barHeight / 2)
            .attr("height", barHeight)
            .attr("width", barWidth)
            .style("fill", color)
            .on("click", click);
        nodeEnter.append("text")
            .attr("dy", 3.5)
            .attr("dx", 5.5)
            .text(function(d) { console.log(d.data);return d.data && d.data.name; });
        // Transition nodes to their new position.
        var clickEl = nodeEnter.append("rect")
            .attr("y", -barHeight/2)
            .attr("x", barWidth - 30)
            .attr("height", barHeight)
            .attr("width", '30')
            .style("fill", 'green')
        var clickToSource = nodeEnter.append("rect")
            .attr("y", -barHeight/2)
            .attr("x", barWidth)
            .attr("height", barHeight)
            .attr("width", '40')
            .style("fill", 'green')
            .on("click", renderSource.bind(null, 'source'));
        var clickToExec = nodeEnter.append("rect")
            .attr("y", -barHeight/2)
            .attr("x", barWidth + 40)
            .attr("height", barHeight)
            .attr("width", '40')
            .style("fill", 'red')
            .on("click", renderSource.bind(null, 'exec'));
        nodeEnter.append("text")
            .attr("dy", barHeight/2-5)
            .attr("dx", barWidth - 20)
            .text(function(d) { return d.data.index; });
        nodeEnter.append("text")
            .attr("dy", barHeight/2-5)
            .attr("dx", barWidth + 5)
            .text(function(d) { return '定义处'; });
        nodeEnter.append("text")
            .attr("dy", barHeight/2-5)
            .attr("dx", barWidth + 45)
            .text(function(d) { return '调用处'; });


        nodeEnter.transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
            .style("opacity", 1);
        node.transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
            .style("opacity", 1)
            .select("rect")
            .style("fill", color);
        // Transition exiting nodes to the parent's new position.
        node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
            .style("opacity", 0)
            .remove();
        // Update the links…
        var link = svg.selectAll(".link")
            .data(root.links(), function(d) { return d.target.id; });
        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            })
            .transition()
            .duration(duration)
            .attr("d", diagonal);
        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);
        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();
        // Stash the old positions for transition.
        root.each(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
        function renderSource(type, d) {
            console.log(type, d);
            let index = d.data.index;
            let sourceLine = '';
            if (type === 'exec') {
                if (d.data.obj.callerInfo.father) {
                    sourceLine = d.data.obj.callerInfo.father.lineNumber;
                    window.allCodeEditor.scrollIntoView({line: d.data.obj.callerInfo.father.lineNumber, ch: d.data.obj.callerInfo.father.columnNumber});
                    window.allCodeEditor.doc.markText({line:d.data.obj.callerInfo.father.lineNumber-1, ch: 0},{line: d.data.obj.callerInfo.father.lineNumber-1, ch: d.data.obj.callerInfo.father.columnNumber}, {className: "errorHighlight", css: 'animation:mymove 5s;'});
                }
            }
            if (type === 'source') {
                if (d.data.obj.callerInfo.self) {
                    let self = d.data.obj.callerInfo.self;
                    sourceLine = self.lineNumber;
                    window.allCodeEditor.scrollIntoView({line: self.lineNumber, ch: self.columnNumber});
                    window.allCodeEditor.doc.markText({line: self.lineNumber-1, ch: 0},{line: self.lineNumber-1, ch: self.columnNumber}, {className: "errorHighlight", css: 'animation:mymove 5s;'});
                }
            }
            clickEl._groups.forEach(item => {
                item.forEach(list => {
                    list.__data__.isClick = false;
                });
            });
            d.isClick = true;
            clickEl.style('fill', setClickColor);
            if (typeof index !== 'undefined') {
                // let sourceBox = d3.select('#preCode');
                // sourceBox.style("position", 'absolute');
                // sourceBox.style("left", d.y + barWidth + 1200 + 'px');
                // sourceBox.style("top", d.x + 'px');
                renderCode(d.data.obj.func);
            }
            if (d.data.obj.isVariable) {
                console.log('%c变量： ', 'color:red;font-size:20px;', d.data.obj.variable);
                return;
            }
            console.table('%c输入：', 'color:#0f0;;font-size:20px;', d.data.obj.args);
            console.log('%c输出' + sourceLine + '行：', 'color:red;font-size:20px;', d.data.obj.returnValue);
            console.log('%c-----------------------', 'color: #f0f');
            function addClass(obj,cls) {
                var obj_class=obj.className,//获取class的内容；
                    blank = ( obj_class != '' ) ? ' ' : '';//判断获取的class是否为空，如果不为空，则添加空格；
                if (obj_class.indexOf(cls) > -1) {
                    return;
                }
                var added = obj_class + blank + cls;//组合原来的class和需要添加的class，中间加上空格；
                obj.className = added;//替换原来的class；
            }
            update(d);
        }
    }
    // Toggle children on click.
    function click(d) {
        console.log(d);
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }
    function setClickColor(d) {
        return d.isClick ? "red" : "green";
    }
    function color(d) {
        return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
    }
}
function parseCode(code) {
    const __O__ = "typeof __O__ !== 'undefined' ? __O__ : {}";
    const argRe = /\;var __O__ = .*?SAVE\(arguments\)\;/g;
    // var returnRe = /if \(__O__\) \{ __O__\.returnValue = _rExpr_[\d]+\; __O__\.returnIndex = [\d]+\;\}/g;
    const returnRe = /_ProcessReturn_\(|, typeof __O__ \!== \'undefined\' \? __O__ : {}\)/g;
    const vaRe = /_ProcessVariable_\(\{[\s\S]*?\}, typeof __O__ \!== \'undefined\' \? __O__ : {}\)\;/g;
    const assignRe = /_ProcessAssign_\(([\s\S]*?), \{.*?\}, typeof __O__ \!== \'undefined\' \? __O__ : {}\)/g;
    return code
        .replace(assignRe, function(_, $1) {
            return $1;
        })
        .replace(/_ProcessAssign_\(/g, '')
        .replace(argRe, '').replace(vaRe, '').replace(returnRe, '');
}
function renderCode(code) {
    if (!code) {
        return;
    }
    code = parseCode(code);
    window.currentEditor.setValue(code)
}

