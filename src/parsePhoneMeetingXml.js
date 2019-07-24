/**
 * @file 解析电话会议卡片的xml数据，返回所需的数据对象
 * @author hongrunhui@baidu.com
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || this, global.parsePhoneMeetingXml = factory());
}(this, function () {
    // 所需要的字段名字
    const keys = ['row', 'top_bar', 'bottom_bar', 'action'];
    function loadXML(xmlString) {
        var xmlDoc;
        // IE浏览器, window.DOMParser 判断是否是非ie浏览器,loadXML方法载入xml字符串
        if (!window.DOMParser && window.ActiveXObject) {
            var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
            for (var i = 0; i < xmlDomVersions.length; i++) {
                try {
                    xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlString);
                    break;
                } catch (e) {
                    console.error('IE 浏览器, xml 解析失败');
                }
            }
        }
        // 支持Mozilla浏览器
        else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
            try {
                /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
                 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
                 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
                 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
                 */
                var domParser = new DOMParser();
                xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
            } catch (e) {
                console.error('xml 解析失败');
            }
        }
        else {
            return null;
        }

        return xmlDoc;
    }
    function getData(parent, nodeName, dataObj) {
        let els = parent.querySelectorAll(nodeName);
        dataObj[nodeName] = getObjItem(els, parent);
    }
    function sliceNode(node) {
        return node && Array.prototype.slice.call(node);
    }
    function parseAttr(node) {
        let map = {};
        if (node && node.attributes) {
            let attrs = node.attributes;
            for(let i = attrs.length - 1; i >= 0; i--) {
                let attr = attrs[i];
                let name = attr.name;
                let value = attr.nodeValue;
                map[name] = value;
            }
        }
        return map;
    }
    function getObjItem(nodeArr, mapNode) {
        let obj = [];
        nodeArr = sliceNode(nodeArr);
        nodeArr && nodeArr.length && sliceNode(nodeArr).forEach(node => {
            let childs = node.children;
            let childValue = {};
            childs && sliceNode(childs).forEach(function (children) {
                let id = children.getAttribute('id');
                let el = mapNode.getElementById(id);
                childValue[id] = {
                    name: el.nodeName,
                    attrs: parseAttr(el)
                };
            });
            obj.push(childValue);
        });
        return obj;
    }
    function parsePhoneMeetingXml(xmlStr) {
        let xmlObj = loadXML(xmlStr);
        let parseData = {};
        if (xmlObj) {
            keys.forEach( name => {
                getData(xmlObj, name, parseData);
            });
            console.log('parseData', parseData, xmlObj.querySelector('content'));
        }
        return parseData;
    }
    return parsePhoneMeetingXml;
}));
