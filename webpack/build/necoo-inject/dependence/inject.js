
function setFire(data) {
    let fire = {};
    let point = null;
    let lastCaller = {};
    let fisrstCaller = {};
    data.forEach((item, index) => {
        if (index === 0) {
            fire.name = item.name;
            fire.value = item.name;
            fire.obj = item;
            fire.children = [];
            fire.index = index;
            fisrstCaller = fire;
            point = fire;
        }
        else if (item.caller === data[index - 1].name) {
            var o = {};
            o.name = item.name;
            o.value = item.name;
            o.obj = item;
            o.children = [];
            o.parent = point;
            o.index = index;
            point.children.push(o);
            lastCaller.caller = item.caller;
            lastCaller.point = point;
            point = o;
        }
        else if (item.caller === lastCaller.caller) {
            var o = {};
            o.name = item.name;
            o.value = item.name;
            o.index = index;
            o.obj = item;
            o.children = [];
            lastCaller.point.children.push(o);
            o.parent = lastCaller.point;
            point = o;
        }
        else if (item.caller === null && item.name) {
            var o = {};
            o.name = item.name;
            o.value = item.name;
            o.obj = item;
            o.children = [];
            o.index = index;
            o.parent = fisrstCaller;
            fisrstCaller.children.push(o);
            point = o;
        }
        else {
            var o = {};
            o.name = item.name;
            o.value = item.name;
            o.index = index;
            o.obj = item;
            o.children = [];
            let parent = findParent(point, item.caller);
            // lastCaller.caller = item.caller;
            // lastCaller.point = point;
            o.parent = parent;
            point = o;
            if (parent && parent.children) {
                parent.children.push(o);
            }
        }
    });
    window.__FIRE__.push(fire);
}
function findParent(data, name) {
    if (data.parent) {
        if (data.parent.name === name) {
            return data.parent;
        }
        else {
            return findParent(data.parent, name);
        }
    }
    return null;
}
function setFireToWindow() {
    window.__FIRE__ = [];
    for(var item in window.necooData) {
        setFire(window.necooData[item]);
    }
    var __parent__ = {
        children: [],
        name: '开始',
        value: '开始'
    };
    window.__FIRE__.forEach(function(item) {
        __parent__.children.push(item);
    });
    window.__FIRE__ = __parent__;
}

window.onload = function() {
    var button = document.createElement('button');
    var freshButton = document.createElement('button');
    freshButton.className = 'fresh-button';
    button.className = 'see-source';
    button.innerText = '源码分析';
    freshButton.innerText = '刷新数据';
    freshButton.onclick = function() {
        setFireToWindow();
        renderTree();
    };
    var __FLAG__ = 1;
    button.onclick = function() {
        var boxWrap = document.getElementById('boxWrap');
        if (__FLAG__) {
            __FLAG__ = 0;
            boxWrap.style = 'display: block';
        }
        else {
            __FLAG__ = 1;
            boxWrap.style = 'display: none';
        }
    };
    document.body.appendChild(button);
    document.body.appendChild(freshButton);

    var divEl = document.createElement('div');
    divEl.className = 'source-panel';
    divEl.innerHTML = '<div id="boxWrap" style="display: none;"><div id="allCodeBox"><div id="allCodePos"><textarea id="allCode" style="display: none;"></textarea></div></div><div class="tree-box"></div><div id="preCode" style="max-width: 50em; margin-bottom: 1em">JavaScript:<br>\n' +
        '    <textarea id="code" name="code"></textarea><p>Select a theme: <select onchange="selectTheme()" id=select>\n' +
        '    <option selected>default</option>\n' +
        '    <option>3024-day</option>\n' +
        '    <option>3024-night</option>\n' +
        '    <option>abcdef</option>\n' +
        '    <option>ambiance</option>\n' +
        '    <option>base16-dark</option>\n' +
        '    <option>base16-light</option>\n' +
        '    <option>bespin</option>\n' +
        '    <option>blackboard</option>\n' +
        '    <option>cobalt</option>\n' +
        '    <option>colorforth</option>\n' +
        '    <option>darcula</option>\n' +
        '    <option>dracula</option>\n' +
        '    <option>duotone-dark</option>\n' +
        '    <option>duotone-light</option>\n' +
        '    <option>eclipse</option>\n' +
        '    <option>elegant</option>\n' +
        '    <option>erlang-dark</option>\n' +
        '    <option>gruvbox-dark</option>\n' +
        '    <option>hopscotch</option>\n' +
        '    <option>icecoder</option>\n' +
        '    <option>idea</option>\n' +
        '    <option>isotope</option>\n' +
        '    <option>lesser-dark</option>\n' +
        '    <option>liquibyte</option>\n' +
        '    <option>lucario</option>\n' +
        '    <option>material</option>\n' +
        '    <option>mbo</option>\n' +
        '    <option>mdn-like</option>\n' +
        '    <option>midnight</option>\n' +
        '    <option>monokai</option>\n' +
        '    <option>neat</option>\n' +
        '    <option>neo</option>\n' +
        '    <option>night</option>\n' +
        '    <option>nord</option>\n' +
        '    <option>oceanic-next</option>\n' +
        '    <option>panda-syntax</option>\n' +
        '    <option>paraiso-dark</option>\n' +
        '    <option>paraiso-light</option>\n' +
        '    <option>pastel-on-dark</option>\n' +
        '    <option>railscasts</option>\n' +
        '    <option>rubyblue</option>\n' +
        '    <option>seti</option>\n' +
        '    <option>shadowfox</option>\n' +
        '    <option>solarized dark</option>\n' +
        '    <option>solarized light</option>\n' +
        '    <option>the-matrix</option>\n' +
        '    <option>tomorrow-night-bright</option>\n' +
        '    <option>tomorrow-night-eighties</option>\n' +
        '    <option>ttcn</option>\n' +
        '    <option>twilight</option>\n' +
        '    <option>vibrant-ink</option>\n' +
        '    <option>xq-dark</option>\n' +
        '    <option>xq-light</option>\n' +
        '    <option>yeti</option>\n' +
        '    <option>zenburn</option>\n' +
        '</select>\n' +
        '</p><button id="formatBtn">格式化代码</button></div></div>';
    document.body.appendChild(divEl);
    var sc = document.getElementById("code");
    // window.editor = window.CodeMirror.fromTextArea(sc, {
    //     mode: "javascript",
    //     lineNumbers: true,
    //     lineWrapping: true,
    //     extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
    //     foldGutter: true,
    //     gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    //     theme: "monokai",
    // });
    var allCode = document.getElementById('allCode')
    var url = window.necooData[0][0].callerInfo.stackTrace.stackTrace[0].fileName;
    console.log('===' , url);
    $.ajax({url: url, type:'GET', dataType: 'text/plain', contentType: 'text/plain', success: function(response) {
            console.log(response);
            window.SET_ALL_CODE(response);
    }});
    // $(window).on('source-code', function(e, from, to){
    //     from = parseCode(from);
    //     from = from.replace(/__helloworld__/g, '');
    //     window.SET_ALL_CODE(from);
    // });
    window.SET_ALL_CODE = function(value, from) {
        window.allCodeEditor =  CodeMirror.fromTextArea(allCode, {
            mode: "javascript",
            theme: 'panda-syntax',
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
        window.allCodeEditor.setSize('1000px','460px');
    }
    window.editor = CodeMirror.fromTextArea(sc, {
        mode: "javascript",
        theme: 'panda-syntax',
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        matchBrackets: true,
        extraKeys: {"Ctrl-Q": function(cm){ CodeMirror.commands.foldAll(cm); },"Alt-F": "findPersistent"},
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    });
    window.editor.setSize('1000px','300px');
    var input = document.getElementById("select");

    var choice = (location.hash && location.hash.slice(1)) ||
        (document.location.search &&
            decodeURIComponent(document.location.search.slice(1)));
    if (choice) {
        input.value = choice;
        editor.setOption("theme", choice);
    }
    window.selectTheme= function () {
        var theme = input.options[input.selectedIndex].textContent;
        editor.setOption("theme", theme);
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
        editor.autoFormatRange(range.from, range.to);
    }
    setTimeout(function() {
        setFireToWindow();
        renderTree();
    }, 1000);
};

function renderTree() {
    var me = this;
    var d3 = window.d3;
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
        // d3.select(self.frameElement).transition()
        //     .duration(duration)
        //     .style("height", height + "px");
        // Compute the "layout". TODO https://github.com/d3/d3-hierarchy/issues/67
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
    var __O__ = "typeof __O__ !== 'undefined' ? __O__ : {}";
    var argRe = /\;var __O__ = .*?SAVE\(arguments\)\;/g;
    // var returnRe = /if \(__O__\) \{ __O__\.returnValue = _rExpr_[\d]+\; __O__\.returnIndex = [\d]+\;\}/g;
    var returnRe = /_ProcessReturn_\(|, typeof __O__ \!== \'undefined\' \? __O__ : {}\)/g;
    var vaRe = /_ProcessVariable_\(\{[\s\S]*?\}, typeof __O__ \!== \'undefined\' \? __O__ : {}\)\;/g;
    var assignRe = /_ProcessAssign_\(([\s\S]*?), \{.*?\}, typeof __O__ \!== \'undefined\' \? __O__ : {}\)/g;
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
    // var pre = document.getElementById('preCode');
    // pre.textContent = code;
    // pre.className = 'pre prettyprint linenums';
    addPrettyClass(code);
}
function addPrettyClass(code) {
    // PR.prettyPrint();
    var sc = document.getElementById("code");

    // sc.textContent = code;
    // console.log(code);
    // console.log(editor);
    window.editor.setValue(code)
}
