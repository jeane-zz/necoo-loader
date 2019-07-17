// 对d3.js做了修改，所以使用本地的。 @todo: 上传npm包
import * as d3 from "./lib/d3";
import CodeMirror from 'codemirror';
import 'codemirror-formatting';
import $ from 'n-zepto';
import setFireToWindow from './inject-data';
import {injectTpl} from "./inject-tpl";

class CodeMirrorInstance {
    constructor(config = {}) {
        this.defaultConfig = {
            mode: "javascript",
            theme: 'monokai',
            // 行号
            lineNumbers: true,
            // 在长行时文字是换行(wrap)还是滚动(scroll)，默认为滚动(scroll)
            lineWrapping: false,
            styleActiveLine: true,
            styleSelectedText: true,
            // 括号匹配
            matchBrackets: true,
            // 自定义快捷键
            extraKeys: {
                "Ctrl-Q": cm => {
                    CodeMirror.commands.foldAll(cm);
                },
                "Alt-F": "findPersistent"
            },
            foldGutter: true,
            // 用来添加额外的gutter（在行号gutter前或代替行号gutter）。值应该是CSS名称数组，每一项定义了用于绘制gutter背景的宽度（还有可选的背景）。
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        };
        this.config = Object.assign(config, this.defaultConfig);
        this.$textarea = this.config.$textarea;
        this.codeMirror = CodeMirror.fromTextArea(this.$textarea, this.config);
    }
    setValue(value) {
        this.codeMirror.setValue(value);
    }
    setSize(width, height) {
        this.codeMirror.setSize(width, height);
    }
}

function initCodemirror(id, config = {}) {
    const allCodeEle = $(id);
    let codeMirrorInstance = new CodeMirrorInstance({
        $textarea: allCodeEle[0],
        ...config
    });
    return codeMirrorInstance;
}

// 插入按钮
function getSourceCodeData(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type:'GET',
            dataType: 'text/plain',
            contentType: 'text/plain',
            success: response => {
                resolve(response);
            },
            error: err => {
                reject({
                    msg: 'error',
                    e: err
                });
            }
        });
    });
}


Zepto(function ($) {
    new Inject();
});
class Inject {
    constructor() {
        const allCodeId = '#necoo-allCode';
        const currentFunCodeId = '#code';
        this.initButtons();
        this.currentFunCodemirror = initCodemirror(currentFunCodeId);
        this.sourceCodemirror = initCodemirror(allCodeId);
        this.sourceCodemirror.codeMirror.setSize(window.screen.availWidth * 0.5 + 'px', window.screen.availHeight * 0.8 + 'px');
        this.setSourceToCodeMirror(this.sourceCodemirror);
        this.bindSelectTheme(this.currentFunCodemirror);

    }
    initButtons() {
        let button = $('<button class="see-source">源码分析</button>');
        let freshButton = $('<button class="fresh-button">刷新数据</button>');
        let injectElement = $(`<div class="source-panel">${injectTpl}</div>`);
        freshButton.on('click', () => {
            // 先设置数据，再渲染d3
            setFireToWindow();
            this.renderTree();
        });
        button.on('click', () => {
            setFireToWindow();
            this.renderTree();
            $('#necoo-boxWrap').toggle();
        });
        $(document.body)
            .append(button)
            .append(freshButton)
            .append(injectElement);
    }
    async setSourceToCodeMirror(codeMirrorInstance) {
        try {
            const url = window.necooData[0][0].callerInfo.stackTrace.stackTrace[0].fileName;
            const sourceCode = await getSourceCodeData(url);
            codeMirrorInstance.setValue(sourceCode);
        }
        catch (e) {
            console.log(e);
        }
    }
    bindSelectTheme(codeMirrorInstance) {
        const selectId = '#select';
        const formatBtnId = '#formatBtn';
        let input = $(selectId)[0];
        let choice = location.hash && location.hash.slice(1)
            || document.location.search
            && decodeURIComponent(document.location.search.slice(1));
        if (choice) {
            input.value = choice;
            codeMirrorInstance.setOption("theme", choice);
        }
        window.selectTheme = function () {
            const theme = input.options[input.selectedIndex].textContent;
            codeMirrorInstance.setOption("theme", theme);
            location.hash = "#" + theme;
        };

        CodeMirror.on(window, "hashchange", () => {
            const theme = location.hash.slice(1);
            if (theme) {
                input.value = theme;
                window.selectTheme();
            }
        });

        function getSelectedRange() {
            return {
                from: editor.getCursor(true),
                to: editor.getCursor(false)
            };
        }

        const formatBtn = $(formatBtnId);
        formatBtn.on('click', () => {
            autoFormatSelection();
        });
        function autoFormatSelection() {
            const range = getSelectedRange();
            codeMirrorInstance.autoFormatRange(range.from, range.to);
        }
    }
    renderTree() {
        let me = this;
        const treeBoxCls = ".tree-box";
        document.querySelector('.tree-box').innerHTML ='';
        let margin = {
                top: 30,
                right: 20,
                bottom: 30,
                left: 20
            },
            width = 960,
            barHeight = 20,
            barWidth = (width - margin.left - margin.right) * 0.2;
        let i = 0,
            duration = 400,
            root;
        let diagonal = d3.linkHorizontal()
            .x(d => {
                return d.y;
            })
            .y(d => {
                return d.x;
            });
        let svg = d3
            .select(treeBoxCls)
            .append("svg")
            .attr("width", width)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        d3.json("treeData.json", (error, flare) => {
            if (error) throw error;
            root = d3.hierarchy(flare);
            root.x0 = 0;
            root.y0 = 0;
            update(root);
        });
        function update(root) {
            let nodes = root.descendants();
            let height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);
            d3.select("svg")
                .transition()
                .duration(duration)
                .attr("height", height);
            let index = -1;
            root.eachBefore(n => {
                n.x = ++index * barHeight;
                n.y = n.depth * 20;
            });
            // Update the nodes…
            let node = svg
                .selectAll(".node")
                .data(nodes, d => {
                    return d.id || (d.id = ++i);
                });
            let nodeEnter = node
                .enter()
                .append("g")
                .attr("class", "node")
                .attr("transform", d => {
                    return "translate(" + root.y0 + "," + root.x0 + ")";
                })
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
                .text(d => {
                    console.log(d.data);
                    return d.data && d.data.name;
                });
            // Transition nodes to their new position.
            let clickEl = nodeEnter.append("rect")
                .attr("y", -barHeight/2)
                .attr("x", barWidth - 30)
                .attr("height", barHeight)
                .attr("width", '30')
                .style("fill", 'green');
            let clickToSource = nodeEnter.append("rect")
                .attr("y", -barHeight/2)
                .attr("x", barWidth)
                .attr("height", barHeight)
                .attr("width", '40')
                .style("fill", 'green')
                .on("click", renderFuncSource.bind(null, 'source'));
            let clickToExec = nodeEnter.append("rect")
                .attr("y", -barHeight/2)
                .attr("x", barWidth + 40)
                .attr("height", barHeight)
                .attr("width", '40')
                .style("fill", 'red')
                .on("click", renderFuncSource.bind(null, 'exec'));
            nodeEnter.append("text")
                .attr("dy", barHeight/2-5)
                .attr("dx", barWidth - 20)
                .text(d => {
                    return d.data.index;
                });
            nodeEnter.append("text")
                .attr("dy", barHeight / 2 - 5)
                .attr("dx", barWidth + 5)
                .text(d => {
                    return '定义处';
                });
            nodeEnter.append("text")
                .attr("dy", barHeight / 2 - 5)
                .attr("dx", barWidth + 45)
                .text(d => {
                    return '调用处';
                });
            nodeEnter
                .transition()
                .duration(duration)
                .attr("transform", d => {
                    return "translate(" + d.y + "," + d.x + ")";
                })
                .style("opacity", 1);
            node
                .transition()
                .duration(duration)
                .attr("transform", d => {
                    return "translate(" + d.y + "," + d.x + ")";
                })
                .style("opacity", 1)
                .select("rect")
                .style("fill", color);
            // Transition exiting nodes to the parent's new position.
            node
                .exit()
                .transition()
                .duration(duration)
                .attr("transform", d => {
                    return "translate(" + root.y + "," + root.x + ")";
                })
                .style("opacity", 0)
                .remove();
            // Update the links…
            let link = svg.selectAll(".link")
                .data(root.links(), d => {
                    return d.target.id;
                });
            // Enter any new links at the parent's previous position.
            link
                .enter()
                .insert("path", "g")
                .attr("class", "link")
                .attr("d", d => {
                    let o = {x: root.x0, y: root.y0};
                    return diagonal({source: o, target: o});
                })
                .transition()
                .duration(duration)
                .attr("d", diagonal);
            // Transition links to their new position.
            link
                .transition()
                .duration(duration)
                .attr("d", diagonal);
            // Transition exiting nodes to the parent's new position.
            link
                .exit()
                .transition()
                .duration(duration)
                .attr("d", d => {
                    let o = {x: root.x, y: root.y};
                    return diagonal({source: o, target: o});
                })
                .remove();
            // Stash the old positions for transition.
            root.each(d => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
            function renderFuncSource(type, d) {
                console.log(type, d);
                let index = d.data.index;
                let sourceLine = '';
                if (type === 'exec') {
                    if (d.data.obj.callerInfo.father) {
                        sourceLine = d.data.obj.callerInfo.father.lineNumber;
                        me.sourceCodemirror.codeMirror.scrollIntoView({line: d.data.obj.callerInfo.father.lineNumber, ch: d.data.obj.callerInfo.father.columnNumber});
                        me.sourceCodemirror.codeMirror.doc.markText({line:d.data.obj.callerInfo.father.lineNumber-1, ch: 0},{line: d.data.obj.callerInfo.father.lineNumber-1, ch: d.data.obj.callerInfo.father.columnNumber}, {className: "errorHighlight", css: 'animation:mymove 5s;'});
                    }
                }
                if (type === 'source') {
                    if (d.data.obj.callerInfo.self) {
                        let self = d.data.obj.callerInfo.self;
                        sourceLine = self.lineNumber;
                        me.sourceCodemirror.codeMirror.scrollIntoView({line: self.lineNumber, ch: self.columnNumber});
                        me.sourceCodemirror.codeMirror.doc.markText({line: self.lineNumber-1, ch: 0},{line: self.lineNumber-1, ch: self.columnNumber}, {className: "errorHighlight", css: 'animation:mymove 5s;'});
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
                    this.renderCode(d.data.obj.func);
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
    parseCode(code) {
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
    renderCode(code) {
        if (!code) {
            return;
        }
        code = this.parseCode(code);
        this.currentFunCodemirror.setValue(code)
    }
}


