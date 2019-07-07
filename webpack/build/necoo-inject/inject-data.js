
/**
 * 根据函数执行顺序数组生成可以具有父子关系的树🌲
 * @param data
 */
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

/**
 * 寻找当前节点的父节点
 * @param data 当前节点
 * @param name 调用函数的名字
 * @returns {null|*|null|*}
 */
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

/**
 * 根据数组生成多颗树，并绑定到window对象上，这样可以方便查看树的原始数据
 */
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

module.exports = setFireToWindow;