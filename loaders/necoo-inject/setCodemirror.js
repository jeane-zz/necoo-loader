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
        this.clickIndex = -1;
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
        const margin =  {
            top: 30,
            right: 20,
            bottom: 30,
            left: 20
        };
        const width = 960;
        this.d3Config = {
            treeBoxCls: ".tree-box",
            margin,
            width,
            barHeight: 20,
            barWidth: (width - margin.left - margin.right) * 0.2,
            duration: 400,
        };
        this.lastTextMaker = null;
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
            let sourceCode = await getSourceCodeData(url);
            sourceCode = this.removeNecooPushCallStack(sourceCode);
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
    update(source) {
        let nodes = this.root.descendants();
        let height = Math.max(500, nodes.length * this.d3Config.barHeight + this.d3Config.margin.top + this.d3Config.margin.bottom);
        d3.select("svg")
            .transition()
            .duration(this.d3Config.duration)
            .attr("height", height);
        let index = -1, i = 0;
        this.root.eachBefore(n => {
            n.x = ++index * this.d3Config.barHeight;
            n.y = n.depth * 20;
        });
        // Update the nodes…
        let node = this.svg
            .selectAll(".node")
            .data(nodes, d => {
                return d.id || (d.id = ++i);
            });
        let nodeEnter = node
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .style("opacity", 0);
        // Enter any new nodes at the parent's previous position.
        nodeEnter.append("rect")
            .attr("y", -this.d3Config.barHeight / 2)
            .attr("height", this.d3Config.barHeight)
            .attr("width", this.d3Config.barWidth)
            .attr('class', this.setClass.bind(this))
            .attr('fill', (d) => {
            })
            // .style("fill", this.color)
            .on("click", this.click.bind(this));
        // 函数名字
        nodeEnter.append("text")
            .attr("dy", 3.5)
            .attr("dx", 5.5)
            .text(d => {
                return d.data && d.data.name;
            });
        // Transition nodes to their new position.
        this.clickEl = nodeEnter.append("rect")
            .attr("y", -this.d3Config.barHeight/2)
            .attr("x", this.d3Config.barWidth - 30)
            .attr("height", this.d3Config.barHeight)
            .attr("width", '30')
            .attr('class', this.getCls.bind(this, 'node-index'));
         this.clickToSource = nodeEnter.append("rect")
            .attr("y", -this.d3Config.barHeight/2)
            .attr("x", this.d3Config.barWidth)
            .attr("height", this.d3Config.barHeight)
            .attr("width", '40')
             .attr('class', this.getCls.bind(this, 'node-to-source'))
            // .style("fill", 'green')
            .on("click", this.renderFuncSource.bind(this, 'source'));
         this.clickToExec = nodeEnter.append("rect")
            .attr("y", -this.d3Config.barHeight/2)
            .attr("x", this.d3Config.barWidth + 40)
            .attr("height", this.d3Config.barHeight)
            .attr("width", '40')
             .attr('class', this.getCls.bind(this, 'node-to-exec'))
             // .style("fill", 'red')
            .on("click", this.renderFuncSource.bind(this, 'exec'));
         // 设置右侧文字
        nodeEnter.append("text")
            .attr("dy", this.d3Config.barHeight/2-5)
            .attr("dx", this.d3Config.barWidth - 20)
            .text(d => {
                return d.data.index;
            });
        nodeEnter.append("text")
            .attr("dy", this.d3Config.barHeight / 2 - 5)
            .attr("dx", this.d3Config.barWidth + 5)
            .text(d => {
                return '定义处';
            });
        nodeEnter.append("text")
            .attr("dy", this.d3Config.barHeight / 2 - 5)
            .attr("dx", this.d3Config.barWidth + 45)
            .text(d => {
                return '调用处';
            });
        nodeEnter
            .transition()
            .duration(this.d3Config.duration)
            .attr("transform", d => {
                return "translate(" + d.y + "," + d.x + ")";
            })
            .style("opacity", 1);
        node
            .transition()
            .duration(this.d3Config.duration)
            .attr("transform", d => {
                return "translate(" + d.y + "," + d.x + ")";
            })
            .style("opacity", 1)
            .select("rect")
            .attr('class', this.setClass.bind(this));
        // .style("fill", this.color);
        // Transition exiting nodes to the parent's new position.
        node
            .exit()
            .transition()
            .duration(this.d3Config.duration)
            .attr("transform", d => {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .style("opacity", 0)
            .remove();
        // Update the links…
        let link = this.svg.selectAll(".link")
            .data(this.root.links(), d => {
                return d.target.id;
            });
        // Enter any new links at the parent's previous position.
        link
            .enter()
            .insert("path", "g")
            .attr("class", "link")
            .attr("d", d => {
                let o = {x: source.x0, y: source.y0};
                return this.diagonal({source: o, target: o});
            })
            .transition()
            .duration(this.d3Config.duration)
            .attr("d", this.diagonal);
        // Transition links to their new position.
        link
            .transition()
            .duration(this.d3Config.duration)
            .attr("d", this.diagonal);
        // Transition exiting nodes to the parent's new position.
        link
            .exit()
            .transition()
            .duration(this.d3Config.duration)
            .attr("d", d => {
                let o = {x: source.x, y: source.y};
                return this.diagonal({source: o, target: o});
            })
            .remove();
        // Stash the old positions for transition.
        this.root.each(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }
    renderFuncSource(type, d) {
        let me = this;
        let index = d.data.index;
        let sourceLine = '';
        let textMarker = '';
        if (this.lastTextMaker) {
            this.lastTextMaker.clear();
        }
        if (type === 'exec') {
            if (d.data.obj.callerInfo.father) {
                sourceLine = d.data.obj.callerInfo.father.lineNumber;
                me.sourceCodemirror.codeMirror.scrollIntoView({line: d.data.obj.callerInfo.father.lineNumber, ch: d.data.obj.callerInfo.father.columnNumber}, 100);
                this.lastTextMaker = me.sourceCodemirror.codeMirror.doc.markText({line:d.data.obj.callerInfo.father.lineNumber-1, ch: 0},{line: d.data.obj.callerInfo.father.lineNumber-1, ch: d.data.obj.callerInfo.father.columnNumber}, {className: "errorHighlight"});
            }
        }
        if (type === 'source') {
            if (d.data.obj.callerInfo.self) {
                let self = d.data.obj.callerInfo.self;
                sourceLine = self.lineNumber;
                me.sourceCodemirror.codeMirror.scrollIntoView({line: self.lineNumber, ch: self.columnNumber}, 100);
                this.lastTextMaker = me.sourceCodemirror.codeMirror.doc.markText({line: self.lineNumber-1, ch: 0},{line: self.lineNumber-1, ch: self.columnNumber}, {className: "errorHighlight"});
            }
        }
        this.clickIndex = d.id;
        if (typeof index !== 'undefined') {
            // let sourceBox = d3.select('#preCode');
            // sourceBox.style("position", 'absolute');
            // sourceBox.style("left", d.y + barWidth + 1200 + 'px');
            // sourceBox.style("top", d.x + 'px');
            me.renderCode(d.data.obj.func);
        }
        if (d.data.obj.isVariable) {
            console.log('%c变量： ', 'color:red;font-size:20px;', d.data.obj.variable);
            return;
        }
        console.table('%c输入：', 'color:#0f0;;font-size:20px;', d.data.obj.args);
        console.log('%c输出' + sourceLine + '行：', 'color:red;font-size:20px;', d.data.obj.returnValue);
        console.log('%c-----------------------', 'color: #f0f', d);
        this.getArgsFuncStr(d);
        this.update(d);
    }
    // Toggle children on click.
    click(d) {
        console.log(d);
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        this.update(d);
    }
    setClickColor(d) {
        return d.isClick ? "red" : "green";
    }
    getCls(defaultCls, d) {
        return defaultCls;
    }
    setClass(d) {
        let cls = d._children ? "node-parent-close" : d.children ? "node-parent-open" : "node-children";
        if (d.id === this.clickIndex) {
            cls += ' click-node';
        }
        return cls;
    }
    renderTree() {
        document.querySelector(this.d3Config.treeBoxCls).innerHTML = '';
        this.diagonal = d3.linkHorizontal()
            .x(d => {
                return d.y;
            })
            .y(d => {
                return d.x;
            });
        this.svg = d3
            .select(this.d3Config.treeBoxCls)
            .append("svg")
            .attr("width", this.d3Config.width)
            .append("g")
            .attr("transform", "translate(" + this.d3Config.margin.left + "," + this.d3Config.margin.top + ")");
        d3.json("treeData.json", (error, flare) => {
            if (error) throw error;
            this.root = d3.hierarchy(flare);
            this.root.x0 = 0;
            this.root.y0 = 0;
            this.update(this.root);
        });
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
        this.currentFunCodemirror.codeMirror.setValue(code)
    }
    removeNecooPushCallStack(code) {
        const re = /var necooData = window\.necooPush\(arguments\);/gi;
        return code.replace(re, '');
    }
    getArgsFuncStr(d) {
        const callerInfo = d.data.obj.callerInfo.father;
        const defineInfo = d.data.obj.callerInfo.self;
        const execLine = callerInfo ? {
            columnNumber: callerInfo.columnNumber,
            lineNumber: callerInfo.lineNumber - 1
        } : null;
        const defineLine = defineInfo ? {
            columnNumber: defineInfo.columnNumber,
            lineNumber: defineInfo.lineNumber - 2
        } : null;
        let execLineStr = this.sourceCodemirror.codeMirror.getLine(execLine.lineNumber);
        let defineLineStr = this.sourceCodemirror.codeMirror.getLine(defineLine.lineNumber);
        let args = d.data.obj.arguments;
        console.log('exec', execLineStr);
        console.log('define', defineLineStr, Array.prototype.slice.apply(args));
    }
}


