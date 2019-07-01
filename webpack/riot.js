
            var RE_VAR_FIN = /(\b|\'|\"|\|\/|\.|\-|\[)((?!__VAR__|SAVE|arguments|Error|console|var|function|if|else|for|in|do|while|switch|case|typeof|break|continue|return|throw|try|catch|finally|with|new|delete|void|Object|Array|String|Number|Boolean|Function|RegExp|Date|Math|true|false|null|undefined|NaN))[\w$]+(\b|(\'\")?)/g;
            var __DATA__ = [];
            function __DEEPCLONE__(o) {
                return o;
                // var copy = o;
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
                        args: {
                        },
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
              }
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
                        args: {
                        },
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
                data.replace(/[,{][\$\w]+(?=:)|(^ *|[^\"\-\'$\w\.{])(?!(?:var|JSON|if|for|else|this|switch|break|arguments|console|return|case|function|typeof|true|false|delete|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g, function(_, $1, $2) {
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
                }
                catch(e) {
                    console.log(e);
                }
            }
            function SAVENAME(args, name) {
                try {
                    if (name) {
                        args.callee.prototype.name = name;
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
            function TRY_CATCH() {
                var __error__ = {};
                // try {
                //     console.log(iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii);
                // }
                // catch (e) {
                //     __error__ = e;
                // }
                __error__ = new Error();
                __error__.stackArray = window.StackTrace.getSync();
                return __error__;
            }
            // 获取堆栈信息以获取父级调用者
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
                        }
                        else if (nowStack.indexOf('<anonymous>') === -1 && flag === true) {
                            o['type'] = stackArr[i-1].trim().split(' ')[0];
                            o['parentName'] = stackArr[i].trim().split(' ')[0];
                            break;
                        }
                    }
                }
                return o;
            }
            var __flag__ = false;
            function SAVE(args) {
                var arguments = args;
                var __error__ = TRY_CATCH();
                if (window.__INDEX__ >= 0) {
                    if (!__DATA__[window.__INDEX__]) {
                        __DATA__[window.__INDEX__] = [];
                    }
                    if (!__flag__) {
                        __flag__ = true;
                        $.ajax({url: __error__.stackArray[0].fileName, type:'GET', dataType: 'text/plain', contentType: 'text/plain', success: function(response) {
                                window.__SOURCE_CODE__ = response;
                                setTimeout(function() {
                                    $(window).trigger('source-code', response);
                                }, 3000);
                            }});
                    }
                    // @todo: 要实现深度克隆复制参数，个人感觉可以对字符串进行克隆就行
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
                    };
                    // console.log(__obj__);
                    // console.log(__obj__.name, __obj__.caller, __error__.stack);
                    if (!__obj__.name) {
                        __obj__.name = args.callee && args.callee.prototype.name;
                    }
                    if (!__obj__.caller) {
                        try {
                            __obj__.caller = args.callee.caller && args.callee.caller.prototype.name;
                        }
                        catch (e) {
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
            ;;

const COMPONENTS_IMPLEMENTATION_MAP = new Map(),
      DOM_COMPONENT_INSTANCE_PROPERTY = Symbol('riot-component'),
      PLUGINS_SET = new Set(),
      IS_DIRECTIVE = 'is',
      VALUE_ATTRIBUTE = 'value',
      ATTRIBUTES_KEY_SYMBOL = Symbol('attributes'),
      TEMPLATE_KEY_SYMBOL = Symbol('template');

var globals = Object.freeze({
  COMPONENTS_IMPLEMENTATION_MAP: COMPONENTS_IMPLEMENTATION_MAP,
  DOM_COMPONENT_INSTANCE_PROPERTY: DOM_COMPONENT_INSTANCE_PROPERTY,
  PLUGINS_SET: PLUGINS_SET,
  IS_DIRECTIVE: IS_DIRECTIVE,
  VALUE_ATTRIBUTE: VALUE_ATTRIBUTE,
  ATTRIBUTES_KEY_SYMBOL: ATTRIBUTES_KEY_SYMBOL,
  TEMPLATE_KEY_SYMBOL: TEMPLATE_KEY_SYMBOL
});


function cleanNode(node) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  clearChildren(node, node.childNodes);
}



function clearChildren(parent, children) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  Array.from(children).forEach(n => parent.removeChild(n));
}

const EACH = 0;
const IF = 1;
const SIMPLE = 2;
const TAG = 3;
const SLOT = 4;
var bindingTypes = {
  EACH,
  IF,
  SIMPLE,
  TAG,
  SLOT
};


function createTemplateMeta(componentTemplate) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  const fragment = componentTemplate.dom.cloneNode(true);
  return {
    avoidDOMInjection: true,
    fragment,
    children: Array.from(fragment.childNodes)
  };
}



const append = (get, parent, children, start, end, before) => {
  if (end - start < 2) parent.insertBefore(get(children[start], 1), before);else {
    const fragment = parent.ownerDocument.createDocumentFragment();

    while (start < end) fragment.appendChild(get(children[start++], 1));

    parent.insertBefore(fragment, before);
  }
};

const eqeq = (a, b) => a == b;

const identity = O => O;

const indexOf = (moreNodes, moreStart, moreEnd, lessNodes, lessStart, lessEnd, compare) => {
  const length = lessEnd - lessStart;
  

  if (length < 1) return -1;

  while (moreEnd - moreStart >= length) {
    let m = moreStart;
    let l = lessStart;

    while (m < moreEnd && l < lessEnd && compare(moreNodes[m], lessNodes[l])) {
      m++;
      l++;
    }

    if (l === lessEnd) return moreStart;
    moreStart = m + 1;
  }

  return -1;
};

const isReversed = (futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare) => {
  while (currentStart < currentEnd && compare(currentNodes[currentStart], futureNodes[futureEnd - 1])) {
    currentStart++;
    futureEnd--;
  }

  return futureEnd === 0;
};

const next = (get, list, i, length, before) => i < length ? get(list[i], 0) : 0 < i ? get(list[i - 1], -0).nextSibling : before;

const remove = (get, parent, children, start, end) => {
  if (end - start < 2) parent.removeChild(get(children[start], -1));else {
    const range = parent.ownerDocument.createRange();
    range.setStartBefore(get(children[start], -1));
    range.setEndAfter(get(children[end - 1], -1));
    range.deleteContents();
  }
};


const DELETION = -1;
const INSERTION = 1;
const SKIP = 0;
const SKIP_OND = 50;

const HS = (futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges) => {
  let k = 0;
  

  let minLen = futureChanges < currentChanges ? futureChanges : currentChanges;
  const link = Array(minLen++);
  const tresh = Array(minLen);
  tresh[0] = -1;

  for (let i = 1; i < minLen; i++) tresh[i] = currentEnd;

  const keymap = new Map();

  for (let i = currentStart; i < currentEnd; i++) keymap.set(currentNodes[i], i);

  for (let i = futureStart; i < futureEnd; i++) {
    const idxInOld = keymap.get(futureNodes[i]);

    if (idxInOld != null) {
      k = findK(tresh, minLen, idxInOld);
      

      if (-1 < k) {
        tresh[k] = idxInOld;
        link[k] = {
          newi: i,
          oldi: idxInOld,
          prev: link[k - 1]
        };
      }
    }
  }

  k = --minLen;
  --currentEnd;

  while (tresh[k] > currentEnd) --k;

  minLen = currentChanges + futureChanges - k;
  const diff = Array(minLen);
  let ptr = link[k];
  --futureEnd;

  while (ptr) {
    const {
      newi,
      oldi
    } = ptr;

    while (futureEnd > newi) {
      diff[--minLen] = INSERTION;
      --futureEnd;
    }

    while (currentEnd > oldi) {
      diff[--minLen] = DELETION;
      --currentEnd;
    }

    diff[--minLen] = SKIP;
    --futureEnd;
    --currentEnd;
    ptr = ptr.prev;
  }

  while (futureEnd >= futureStart) {
    diff[--minLen] = INSERTION;
    --futureEnd;
  }

  while (currentEnd >= currentStart) {
    diff[--minLen] = DELETION;
    --currentEnd;
  }

  return diff;
};


const OND = (futureNodes, futureStart, rows, currentNodes, currentStart, cols, compare) => {
  const length = rows + cols;
  const v = [];
  let d, k, r, c, pv, cv, pd;

  outer: for (d = 0; d <= length; d++) {
    
    if (d > SKIP_OND) return null;
    pd = d - 1;
    

    pv = d ? v[d - 1] : [0, 0];
    cv = v[d] = [];

    for (k = -d; k <= d; k += 2) {
      if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
        c = pv[pd + k + 1];
      } else {
        c = pv[pd + k - 1] + 1;
      }

      r = c - k;

      while (c < cols && r < rows && compare(currentNodes[currentStart + c], futureNodes[futureStart + r])) {
        c++;
        r++;
      }

      if (c === cols && r === rows) {
        break outer;
      }

      cv[d + k] = c;
    }
  }

  const diff = Array(d / 2 + length / 2);
  let diffIdx = diff.length - 1;

  for (d = v.length - 1; d >= 0; d--) {
    while (c > 0 && r > 0 && compare(currentNodes[currentStart + c - 1], futureNodes[futureStart + r - 1])) {
      diff[diffIdx--] = SKIP;
      c--;
      r--;
    }

    if (!d) break;
    pd = d - 1;
    

    pv = d ? v[d - 1] : [0, 0];
    k = c - r;

    if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
      r--;
      diff[diffIdx--] = INSERTION;
    } else {
      c--;
      diff[diffIdx--] = DELETION;
    }
  }

  return diff;
};

const applyDiff = (diff, get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before) => {
  const live = new Map();
  const length = diff.length;
  let currentIndex = currentStart;
  let i = 0;

  while (i < length) {
    switch (diff[i++]) {
      case SKIP:
        futureStart++;
        currentIndex++;
        break;

      case INSERTION:
        live.set(futureNodes[futureStart], 1);
        append(get, parentNode, futureNodes, futureStart++, futureStart, currentIndex < currentLength ? get(currentNodes[currentIndex], 0) : before);
        break;

      case DELETION:
        currentIndex++;
        break;
    }
  }

  i = 0;

  while (i < length) {
    switch (diff[i++]) {
      case SKIP:
        currentStart++;
        break;

      case DELETION:
        if (live.has(currentNodes[currentStart])) currentStart++;else remove(get, parentNode, currentNodes, currentStart++, currentStart);
        break;
    }
  }
};

const findK = (ktr, length, j) => {
  let lo = 1;
  let hi = length;

  while (lo < hi) {
    const mid = (lo + hi) / 2 >>> 0;
    if (j < ktr[mid]) hi = mid;else lo = mid + 1;
  }

  return lo;
};

const smartDiff = (get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before) => {
  applyDiff(OND(futureNodes, futureStart, futureChanges, currentNodes, currentStart, currentChanges, compare) || HS(futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges), get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before);
};



const domdiff = (parentNode,
currentNodes,
futureNodes,
options
) => {
  if (!options) options = {};
  const compare = options.compare || eqeq;
  const get = options.node || identity;
  const before = options.before == null ? null : get(options.before, 0);
  const currentLength = currentNodes.length;
  let currentEnd = currentLength;
  let currentStart = 0;
  let futureEnd = futureNodes.length;
  let futureStart = 0;

  while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentStart], futureNodes[futureStart])) {
    currentStart++;
    futureStart++;
  }


  while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentEnd - 1], futureNodes[futureEnd - 1])) {
    currentEnd--;
    futureEnd--;
  }

  const currentSame = currentStart === currentEnd;
  const futureSame = futureStart === futureEnd;

  if (currentSame && futureSame) return futureNodes;

  if (currentSame && futureStart < futureEnd) {
    append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentStart, currentLength, before));
    return futureNodes;
  }


  if (futureSame && currentStart < currentEnd) {
    remove(get, parentNode, currentNodes, currentStart, currentEnd);
    return futureNodes;
  }

  const currentChanges = currentEnd - currentStart;
  const futureChanges = futureEnd - futureStart;
  let i = -1;

  if (currentChanges < futureChanges) {
    i = indexOf(futureNodes, futureStart, futureEnd, currentNodes, currentStart, currentEnd, compare);

    if (-1 < i) {
      append(get, parentNode, futureNodes, futureStart, i, get(currentNodes[currentStart], 0));
      append(get, parentNode, futureNodes, i + currentChanges, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
      return futureNodes;
    }
  }
  
  else if (futureChanges < currentChanges) {
      i = indexOf(currentNodes, currentStart, currentEnd, futureNodes, futureStart, futureEnd, compare);

      if (-1 < i) {
        remove(get, parentNode, currentNodes, currentStart, i);
        remove(get, parentNode, currentNodes, i + futureChanges, currentEnd);
        return futureNodes;
      }
    }

  


  if (currentChanges < 2 || futureChanges < 2) {
    append(get, parentNode, futureNodes, futureStart, futureEnd, get(currentNodes[currentStart], 0));
    remove(get, parentNode, currentNodes, currentStart, currentEnd);
    return futureNodes;
  }


  if (currentChanges === futureChanges && isReversed(futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare)) {
    append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
    return futureNodes;
  }


  smartDiff(get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before);
  return futureNodes;
};



function isNil(value) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return value == null;
}



function isTemplate(el) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return !isNil(el.content);
}

const EachBinding = Object.seal({
  childrenMap: null,
  node: null,
  root: null,
  condition: null,
  evaluate: null,
  template: null,
  isTemplateTag: false,
  nodes: [],
  getKey: null,
  indexName: null,
  itemName: null,
  afterPlaceholder: null,
  placeholder: null,
  mount(scope, parentScope) {
    return this.update(scope, parentScope);
  },

  update(scope, parentScope) {
    const {
      placeholder
    } = this;
    const collection = this.evaluate(scope);
    const items = collection ? Array.from(collection) : [];
    const parent = placeholder.parentNode;

    const {
      newChildrenMap,
      batches,
      futureNodes
    } = createPatch(items, scope, parentScope, this);

    if (futureNodes.length) {
      domdiff(parent, this.nodes, futureNodes, {
        before: placeholder,
        node: patch(Array.from(this.childrenMap.values()), parentScope)
      });
    } else {
      unmountRedundant(this.childrenMap);
    }


    batches.forEach(fn => fn());

    this.childrenMap = newChildrenMap;
    this.nodes = futureNodes;
    return this;
  },

  unmount(scope, parentScope) {
    unmountRedundant(this.childrenMap, parentScope);
    this.childrenMap = new Map();
    this.nodes = [];
    return this;
  }

});


function patch(redundant, parentScope) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return (item, info) => {
    if (info < 0) {
      const {
        template,
        context
      } = redundant.pop();

      template.unmount(context, parentScope, null);
    }

    return item;
  };
}



function unmountRedundant(childrenMap, parentScope) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return Array.from(childrenMap.values()).map((_ref) => {
    let {
      template,
      context
    } = _ref;
    return template.unmount(context, parentScope, true);
  });
}



function mustFilterItem(condition, context) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return condition ? Boolean(condition(context)) === false : false;
}



function extendScope(scope, _ref2) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  let {
    itemName,
    indexName,
    index,
    item
  } = _ref2;
  scope[itemName] = item;
  if (indexName) scope[indexName] = index;
  return scope;
}



function createPatch(items, scope, parentScope, binding) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  const {
    condition,
    template,
    childrenMap,
    itemName,
    getKey,
    indexName,
    root,
    isTemplateTag
  } = binding;
  const newChildrenMap = new Map();
  const batches = [];
  const futureNodes = [];
  items.forEach((item, index) => {
    const context = extendScope(Object.create(scope), {
      itemName,
      indexName,
      index,
      item
    });
    const key = getKey ? getKey(context) : index;
    const oldItem = childrenMap.get(key);

    if (mustFilterItem(condition, context)) {
      return;
    }

    const componentTemplate = oldItem ? oldItem.template : template.clone();
    const el = oldItem ? componentTemplate.el : root.cloneNode();
    const mustMount = !oldItem;
    const meta = isTemplateTag && mustMount ? createTemplateMeta(componentTemplate) : {};

    if (mustMount) {
      batches.push(() => componentTemplate.mount(el, context, parentScope, meta));
    } else {
      batches.push(() => componentTemplate.update(context, parentScope));
    }


    if (isTemplateTag) {
      futureNodes.push(...(meta.children || componentTemplate.children));
    } else {
      futureNodes.push(el);
    }


    childrenMap.delete(key);

    newChildrenMap.set(key, {
      template: componentTemplate,
      context,
      index
    });
  });
  return {
    newChildrenMap,
    batches,
    futureNodes
  };
}

function create(node, _ref3) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  let {
    evaluate,
    condition,
    itemName,
    indexName,
    getKey,
    template
  } = _ref3;
  const placeholder = document.createTextNode('');
  const parent = node.parentNode;
  const root = node.cloneNode();
  parent.insertBefore(placeholder, node);
  parent.removeChild(node);
  return Object.assign({}, EachBinding, {
    childrenMap: new Map(),
    node,
    root,
    condition,
    evaluate,
    isTemplateTag: isTemplate(root),
    template: template.createDOM(node),
    getKey,
    indexName,
    itemName,
    placeholder
  });
}



const IfBinding = Object.seal({
  node: null,
  evaluate: null,
  parent: null,
  isTemplateTag: false,
  placeholder: null,
  template: null,
  mount(scope, parentScope) {
    this.parent.insertBefore(this.placeholder, this.node);
    this.parent.removeChild(this.node);
    return this.update(scope, parentScope);
  },

  update(scope, parentScope) {
    const value = !!this.evaluate(scope);
    const mustMount = !this.value && value;
    const mustUnmount = this.value && !value;

    switch (true) {
      case mustMount:
        this.parent.insertBefore(this.node, this.placeholder);
        this.template = this.template.clone();
        this.template.mount(this.node, scope, parentScope);
        break;

      case mustUnmount:
        this.unmount(scope);
        break;

      default:
        if (value) this.template.update(scope, parentScope);
    }

    this.value = value;
    return this;
  },

  unmount(scope, parentScope) {
    this.template.unmount(scope, parentScope);
    return this;
  }

});

function create$1(node, _ref4) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  let {
    evaluate,
    template
  } = _ref4;
  return Object.assign({}, IfBinding, {
    node,
    evaluate,
    parent: node.parentNode,
    placeholder: document.createTextNode(''),
    template: template.createDOM(node)
  });
}

const ATTRIBUTE = 0;
const EVENT = 1;
const TEXT = 2;
const VALUE = 3;
var expressionTypes = {
  ATTRIBUTE,
  EVENT,
  TEXT,
  VALUE
};
const REMOVE_ATTRIBUTE = 'removeAttribute';
const SET_ATTIBUTE = 'setAttribute';


function setAllAttributes(node, attributes) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  Object.entries(attributes).forEach((_ref5) => {
    let [name, value] = _ref5;
    return attributeExpression(node, {
      name
    }, value);
  });
}



function removeAllAttributes(node, attributes) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  Object.keys(attributes).forEach(attribute => node.removeAttribute(attribute));
}



function attributeExpression(node, _ref6, value, oldValue) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  let {
    name
  } = _ref6;
  if (!name) {
    if (value) {
      setAllAttributes(node, value);
    } else if (oldValue) {
      removeAllAttributes(node, oldValue);
    }

    return;
  }


  if (typeof value === 'boolean') {
    node[name] = value;
  }

  node[getMethod(value)](name, normalizeValue(name, value));
}



function getMethod(value) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return isNil(value) || value === false || value === '' || typeof value === 'object' ? REMOVE_ATTRIBUTE : SET_ATTIBUTE;
}



function normalizeValue(name, value) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (value === true) return name;
  return value;
}



function eventExpression(node, _ref7, value) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  let {
    name
  } = _ref7;
  node[name] = value;
}



function textExpression(node, _ref8, value) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  let {
    childNodeIndex
  } = _ref8;
  const target = node.childNodes[childNodeIndex];
  const val = normalizeValue$1(value);

  if (target.nodeType === Node.COMMENT_NODE) {
    const textNode = document.createTextNode(val);
    node.replaceChild(textNode, target);
  } else {
    target.data = normalizeValue$1(val);
  }
}



function normalizeValue$1(value) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return value != null ? value : '';
}



function valueExpression(node, expression, value) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  node.value = value;
}

var expressions = {
  [ATTRIBUTE]: attributeExpression,
  [EVENT]: eventExpression,
  [TEXT]: textExpression,
  [VALUE]: valueExpression
};
const Expression = Object.seal({
  node: null,
  value: null,

  
  mount(scope) {
    this.value = this.evaluate(scope);

    apply(this, this.value);
    return this;
  },

  
  update(scope) {
    const value = this.evaluate(scope);

    if (this.value !== value) {
      apply(this, value);
      this.value = value;
    }

    return this;
  },

  
  unmount() {
    return this;
  }

});


function apply(expression, value) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return expressions[expression.type](expression.node, expression, value, expression.value);
}

function create$2(node, data) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return Object.assign({}, Expression, data, {
    node
  });
}



function flattenCollectionMethods(collection, methods, context) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return methods.reduce((acc, method) => {
    return Object.assign({}, acc, {
      [method]: scope => {
        return collection.map(item => item[method](scope)) && context;
      }
    });
  }, {});
}

function create$3(node, _ref9) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  let {
    expressions
  } = _ref9;
  return Object.assign({}, flattenCollectionMethods(expressions.map(expression => create$2(node, expression)), ['mount', 'update', 'unmount']));
}

const SlotBinding = Object.seal({
  node: null,
  name: null,
  template: null,
  mount(scope, parentScope) {
    const templateData = scope.slots ? scope.slots.find((_ref10) => {
      let {
        id
      } = _ref10;
      return id === this.name;
    }) : false;
    const {
      parentNode
    } = this.node;
    this.template = templateData && create$6(templateData.html, templateData.bindings).createDOM(parentNode);

    if (this.template) {
      this.template.mount(this.node, parentScope);
      moveSlotInnerContent(this.node);
    }

    parentNode.removeChild(this.node);
    return this;
  },

  update(scope, parentScope) {
    if (this.template && parentScope) {
      this.template.update(parentScope);
    }

    return this;
  },

  unmount(scope, parentScope) {
    if (this.template) {
      this.template.unmount(parentScope);
    }

    return this;
  }

});


function moveSlotInnerContent(slot) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (slot.firstChild) {
    slot.parentNode.insertBefore(slot.firstChild, slot);
    moveSlotInnerContent(slot);
  }
}



function createSlot(node, _ref11) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  let {
    name
  } = _ref11;
  return Object.assign({}, SlotBinding, {
    node,
    name
  });
}



function getTag(component, slots, attributes) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (slots === void 0) {
    slots = [];
  }

  if (attributes === void 0) {
    attributes = [];
  }
  if (component) {
    return component({
      slots,
      attributes
    });
  }


  return create$6(slotsToMarkup(slots), [...slotBindings(slots), {
    expressions: attributes.map(attr => {
      return Object.assign({
        type: ATTRIBUTE
      }, attr);
    })
  }]);
}



function slotBindings(slots) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return slots.reduce((acc, _ref12) => {
    let {
      bindings
    } = _ref12;
    return acc.concat(bindings);
  }, []);
}



function slotsToMarkup(slots) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return slots.reduce((acc, slot) => {
    return acc + slot.html;
  }, '');
}

const TagBinding = Object.seal({
  node: null,
  evaluate: null,
  name: null,
  slots: null,
  tag: null,
  attributes: null,
  getComponent: null,

  mount(scope) {
    return this.update(scope);
  },

  update(scope, parentScope) {
    const name = this.evaluate(scope);

    if (name === this.name) {
      this.tag.update(scope);
    } else {
      this.unmount(scope, parentScope, true);

      this.name = name;
      this.tag = getTag(this.getComponent(name), this.slots, this.attributes);
      this.tag.mount(this.node, scope);
    }

    return this;
  },

  unmount(scope, parentScope, keepRootTag) {
    if (this.tag) {
      this.tag.unmount(keepRootTag);
    }

    return this;
  }

});

function create$4(node, _ref13) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  let {
    evaluate,
    getComponent,
    slots,
    attributes
  } = _ref13;
  return Object.assign({}, TagBinding, {
    node,
    evaluate,
    slots,
    attributes,
    getComponent
  });
}

var bindings = {
  [IF]: create$1,
  [SIMPLE]: create$3,
  [EACH]: create,
  [TAG]: create$4,
  [SLOT]: createSlot
};


function create$5(root, binding) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  const {
    selector,
    type,
    redundantAttribute,
    expressions
  } = binding;

  const node = selector ? root.querySelector(selector) : root;

  if (redundantAttribute) node.removeAttribute(redundantAttribute);

  return (bindings[type] || bindings[SIMPLE])(node, Object.assign({}, binding, {
    expressions: expressions || []
  }));
}



function isSvg(el) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  const owner = el.ownerSVGElement;
  return !!owner || owner === null;
}


function createHTMLTree(html, root) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  const template = isTemplate(root) ? root : document.createElement('template');
  template.innerHTML = html;
  return template.content;
}


function creteSVGTree(html, container) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  const svgNode = container.ownerDocument.importNode(new window.DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${html}</svg>`, 'application/xml').documentElement, true);
  return svgNode;
}



function createDOMTree(root, html) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (isSvg(root)) return creteSVGTree(html, root);
  return createHTMLTree(html, root);
}





function moveChildren(source, target) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (source.firstChild) {
    target.appendChild(source.firstChild);
    moveChildren(source, target);
  }
}



function injectDOM(el, dom) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  switch (true) {
    case isSvg(el):
      moveChildren(dom, el);
      break;

    case isTemplate(el):
      el.parentNode.replaceChild(dom, el);
      break;

    default:
      el.appendChild(dom);
  }
}



function createTemplateDOM(el, html) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return html && (typeof html === 'string' ? createDOMTree(el, html) : html);
}



const TemplateChunk = Object.freeze({
  bindings: null,
  bindingsData: null,
  html: null,
  isTemplateTag: false,
  fragment: null,
  children: null,
  dom: null,
  el: null,

  
  createDOM(el) {
    this.dom = this.dom || createTemplateDOM(el, this.html);
    return this;
  },

  
  mount(el, scope, parentScope, meta) {
    if (meta === void 0) {
      meta = {};
    }

    if (!el) throw new Error('Please provide DOM node to mount properly your template');
    if (this.el) this.unmount(scope);

    const {
      fragment,
      children,
      avoidDOMInjection
    } = meta;

    const {
      parentNode
    } = children ? children[0] : el;
    this.isTemplateTag = isTemplate(el);

    this.createDOM(el);

    if (this.dom) {
      this.fragment = fragment || this.dom.cloneNode(true);
    }


    this.el = this.isTemplateTag ? parentNode : el;

    this.children = this.isTemplateTag ? children || Array.from(this.fragment.childNodes) : null;

    if (!avoidDOMInjection && this.fragment) injectDOM(el, this.fragment);

    this.bindings = this.bindingsData.map(binding => create$5(this.el, binding));
    this.bindings.forEach(b => b.mount(scope, parentScope));
    return this;
  },

  
  update(scope, parentScope) {
    this.bindings.forEach(b => b.update(scope, parentScope));
    return this;
  },

  
  unmount(scope, parentScope, mustRemoveRoot) {
    if (this.el) {
      this.bindings.forEach(b => b.unmount(scope, parentScope));

      if (mustRemoveRoot && this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
      } else if (mustRemoveRoot !== null) {
        if (this.children) {
          clearChildren(this.children[0].parentNode, this.children);
        } else {
          cleanNode(this.el);
        }
      }

      this.el = null;
    }

    return this;
  },

  
  clone() {
    return Object.assign({}, this, {
      el: null
    });
  }

});


function create$6(html, bindings) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (bindings === void 0) {
    bindings = [];
  }

  return Object.assign({}, TemplateChunk, {
    html,
    bindingsData: bindings
  });
}


function checkType(element, type) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return typeof element === type;
}


function isFunction(value) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return checkType(value, 'function');
}




function panic(error) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  throw new Error(error);
}


function callOrAssign(source) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return isFunction(source) ? source.prototype && source.prototype.constructor ? new source() : source() : source;
}


function camelToDashCase(string) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}


function dashToCamelCase(string) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return string.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}


function defineDefaults(source, defaults) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  Object.entries(defaults).forEach((_ref) => {
    let [key, value] = _ref;
    if (!source[key]) source[key] = value;
  });
  return source;
}

function noop() { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return this;
}


function autobindMethods(source, methods) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  methods.forEach(method => {
    source[method] = source[method].bind(source);
  });
  return source;
}


function defineProperty(source, key, value, options) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (options === void 0) {
    options = {};
  }

  Object.defineProperty(source, key, Object.assign({
    value,
    enumerable: false,
    writable: false,
    configurable: true
  }, options));
  return source;
}


function defineProperties(source, properties, options) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  Object.entries(properties).forEach((_ref2) => {
    let [key, value] = _ref2;
    defineProperty(source, key, value, options);
  });
  return source;
}


function evaluateAttributeExpressions(attributes) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return attributes.reduce((acc, attribute) => {
    const {
      value,
      type
    } = attribute;

    switch (true) {
      case !attribute.name && type === expressionTypes.ATTRIBUTE:
        return Object.assign({}, acc, value);

      case type === expressionTypes.VALUE:
        acc[VALUE_ATTRIBUTE] = attribute.value;
        break;

      default:
        acc[dashToCamelCase(attribute.name)] = attribute.value;
    }

    return acc;
  }, {});
}


function domToArray(els) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (!Array.isArray(els)) {
    if (/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(els)) && typeof els.length === 'number') return Array.from(els);else
      return [els];
  }


  return els;
}



const normalize = values => values.length === 1 ? values[0] : values;



function parseNodes(els, name, method) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  const names = typeof name === 'string' ? [name] : name;
  return normalize(domToArray(els).map(el => {
    return normalize(names.map(n => el[method](n)));
  }));
}



function set(els, name, value) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  const attrs = typeof name === 'object' ? name : {
    [name]: value
  };
  const props = Object.keys(attrs);
  domToArray(els).forEach(el => {
    props.forEach(prop => el.setAttribute(prop, attrs[prop]));
  });
  return els;
}


function get(els, name) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return parseNodes(els, name, 'getAttribute');
}



function DOMattributesToObject(element) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return Array.from(element.attributes).reduce((acc, attribute) => {
    acc[dashToCamelCase(attribute.name)] = attribute.value;
    return acc;
  }, {});
}


function getName(element) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return get(element, IS_DIRECTIVE) || element.tagName.toLowerCase();
}



function $(selector, ctx) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return domToArray(typeof selector === 'string' ? (ctx || document).querySelectorAll(selector) : selector);
}

const CSS_BY_NAME = new Map();
const STYLE_NODE_SELECTOR = 'style[riot]';

const getStyleNode = (style => {
  return () => {
    if (style) return style;

    style = $(STYLE_NODE_SELECTOR)[0] || document.createElement('style');
    set(style, 'type', 'text/css');
    

    if (!style.parentNode) document.head.appendChild(style);
    return style;
  };
})();



var cssManager = {
  CSS_BY_NAME,

  
  add(name, css) {
    if (!CSS_BY_NAME.has(name)) {
      CSS_BY_NAME.set(name, css);
      this.inject();
    }

    return this;
  },

  
  inject() {
    getStyleNode().innerHTML = [...CSS_BY_NAME.values()].join('\n');
    return this;
  },

  
  remove(name) {
    if (CSS_BY_NAME.has(name)) {
      CSS_BY_NAME.delete(name);
      this.inject();
    }

    return this;
  }

};


function curry(fn) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  for (var _len = arguments.length, acc = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    acc[_key - 1] = arguments[_key];
  }

  return function _anonymous_1() { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args = [...acc, ...args];
    return args.length < fn.length ? curry(fn, ...args) : fn(...args);
  };
}

const COMPONENT_CORE_HELPERS = Object.freeze({
  $(selector) {
    return $(selector, this.root)[0];
  },

  $$(selector) {
    return $(selector, this.root);
  }

});
const COMPONENT_LIFECYCLE_METHODS = Object.freeze({
  shouldUpdate: noop,
  onBeforeMount: noop,
  onMounted: noop,
  onBeforeUpdate: noop,
  onUpdated: noop,
  onBeforeUnmount: noop,
  onUnmounted: noop
});
const MOCKED_TEMPLATE_INTERFACE = {
  update: noop,
  mount: noop,
  unmount: noop,
  clone: noop,
  createDOM: noop
  

};

function componentTemplateFactory(template, components) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return template(create$6, expressionTypes, bindingTypes, name => {
    return components[name] || COMPONENTS_IMPLEMENTATION_MAP.get(name);
  });
}



function createComponent(_ref) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  let {
    css,
    template,
    exports,
    name
  } = _ref;
  const templateFn = template ? componentTemplateFactory(template, exports ? createSubcomponents(exports.components) : {}) : MOCKED_TEMPLATE_INTERFACE;
  return (_ref2) => {
    let {
      slots,
      attributes,
      props
    } = _ref2;
    const componentAPI = callOrAssign(exports) || {};
    const component = defineComponent({
      css,
      template: templateFn,
      componentAPI,
      name
    })({
      slots,
      attributes,
      props
    });

    return {
      mount(element, parentScope, state) {
        return component.mount(element, state, parentScope);
      },

      update(parentScope, state) {
        return component.update(state, parentScope);
      },

      unmount(preserveRoot) {
        return component.unmount(preserveRoot);
      }

    };
  };
}


function defineComponent(_ref3) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  let {
    css,
    template,
    componentAPI,
    name
  } = _ref3;
  if (css && name) cssManager.add(name, css);
  return curry(enhanceComponentAPI)(defineProperties(
  defineDefaults(componentAPI, Object.assign({}, COMPONENT_LIFECYCLE_METHODS, {
    state: {}
  })), Object.assign({
    slots: null,
    root: null
  }, COMPONENT_CORE_HELPERS, {
    name,
    css,
    template
  })));
}


function evaluateProps(element, attributeExpressions) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (attributeExpressions === void 0) {
    attributeExpressions = [];
  }

  return Object.assign({}, DOMattributesToObject(element), evaluateAttributeExpressions(attributeExpressions));
}



function createAttributeBindings(node, attributes) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (attributes === void 0) {
    attributes = [];
  }

  const expressions = attributes.map(a => create$2(node, a));
  const binding = {};

  const updateValues = method => scope => {
    expressions.forEach(e => e[method](scope));
    return binding;
  };

  return Object.assign(binding, {
    expressions,
    mount: updateValues('mount'),
    update: updateValues('update'),
    unmount: updateValues('unmount')
  });
}



function createSubcomponents(components) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (components === void 0) {
    components = {};
  }

  return Object.entries(callOrAssign(components)).reduce((acc, _ref4) => {
    let [key, value] = _ref4;
    acc[camelToDashCase(key)] = createComponent(value);
    return acc;
  }, {});
}



function runPlugins(component) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return [...PLUGINS_SET].reduce((c, fn) => fn(c) || c, component);
}



function computeState(oldState, newState) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return Object.assign({}, oldState, callOrAssign(newState));
}



function addCssHook(element, name) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (getName(element) !== name) {
    set(element, 'is', name);
  }
}



function enhanceComponentAPI(component, _ref5) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  let {
    slots,
    attributes,
    props
  } = _ref5;
  const initialProps = callOrAssign(props);
  return autobindMethods(runPlugins(defineProperties(Object.create(component), {
    mount(element, state, parentScope) {
      if (state === void 0) {
        state = {};
      }

      this[ATTRIBUTES_KEY_SYMBOL] = createAttributeBindings(element, attributes).mount(parentScope);
      this.props = Object.freeze(Object.assign({}, initialProps, evaluateProps(element, this[ATTRIBUTES_KEY_SYMBOL].expressions)));
      this.state = computeState(this.state, state);
      this[TEMPLATE_KEY_SYMBOL] = this.template.createDOM(element).clone();

      element[DOM_COMPONENT_INSTANCE_PROPERTY] = this;

      component.name && addCssHook(element, component.name);

      defineProperty(this, 'root', element);

      defineProperty(this, 'slots', slots);

      this.onBeforeMount(this.props, this.state);

      this[TEMPLATE_KEY_SYMBOL].mount(element, this, parentScope);
      this.onMounted(this.props, this.state);
      return this;
    },

    update(state, parentScope) {
      if (state === void 0) {
        state = {};
      }

      if (parentScope) {
        this[ATTRIBUTES_KEY_SYMBOL].update(parentScope);
      }

      const newProps = evaluateProps(this.root, this[ATTRIBUTES_KEY_SYMBOL].expressions);
      if (this.shouldUpdate(newProps, this.props) === false) return;
      this.props = Object.freeze(Object.assign({}, initialProps, newProps));
      this.state = computeState(this.state, state);
      this.onBeforeUpdate(this.props, this.state);
      this[TEMPLATE_KEY_SYMBOL].update(this, parentScope);
      this.onUpdated(this.props, this.state);
      return this;
    },

    unmount(preserveRoot) {
      this.onBeforeUnmount(this.props, this.state);
      this[ATTRIBUTES_KEY_SYMBOL].unmount();

      this[TEMPLATE_KEY_SYMBOL].unmount(this, {}, preserveRoot === null ? null : !preserveRoot);
      this.onUnmounted(this.props, this.state);
      return this;
    }

  })), Object.keys(component).filter(prop => isFunction(component[prop])));
}


function mountComponent(element, initialProps, componentName) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  const name = componentName || getName(element);
  if (!COMPONENTS_IMPLEMENTATION_MAP.has(name)) panic(`The component named "${name}" was never registered`);
  const component = COMPONENTS_IMPLEMENTATION_MAP.get(name)({
    props: initialProps
  });
  return component.mount(element);
}




function compose() { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return fns.reduce((f, g) => function _anonymous_2() { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
    return f(g(...arguments));
  });
}

const {
  DOM_COMPONENT_INSTANCE_PROPERTY: DOM_COMPONENT_INSTANCE_PROPERTY$1,
  COMPONENTS_IMPLEMENTATION_MAP: COMPONENTS_IMPLEMENTATION_MAP$1,
  PLUGINS_SET: PLUGINS_SET$1
} = globals;




function register(name, _ref) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  let {
    css,
    template,
    exports
  } = _ref;
  if (COMPONENTS_IMPLEMENTATION_MAP$1.has(name)) panic(`The component "${name}" was already registered`);
  COMPONENTS_IMPLEMENTATION_MAP$1.set(name, createComponent({
    name,
    css,
    template,
    exports
  }));
  return COMPONENTS_IMPLEMENTATION_MAP$1;
}


function unregister(name) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (!COMPONENTS_IMPLEMENTATION_MAP$1.has(name)) panic(`The component "${name}" was never registered`);
  COMPONENTS_IMPLEMENTATION_MAP$1.delete(name);
  cssManager.remove(name);
  return COMPONENTS_IMPLEMENTATION_MAP$1;
}


function mount(selector, initialProps, name) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return $(selector).map(element => mountComponent(element, initialProps, name));
}


function unmount(selector, keepRootElement) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return $(selector).map(element => {
    if (element[DOM_COMPONENT_INSTANCE_PROPERTY$1]) {
      element[DOM_COMPONENT_INSTANCE_PROPERTY$1].unmount(keepRootElement);
    }

    return element;
  });
}


function install(plugin) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (!isFunction(plugin)) panic('Plugins must be of type function');
  if (PLUGINS_SET$1.has(plugin)) panic('This plugin was already install');
  PLUGINS_SET$1.add(plugin);
  return PLUGINS_SET$1;
}


function uninstall(plugin) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  if (!PLUGINS_SET$1.has(plugin)) panic('This plugin was never installed');
  PLUGINS_SET$1.delete(plugin);
  return PLUGINS_SET$1;
}


function component(implementation) { ;var __O__ = (this.SAVE ? this : window).SAVE(arguments);
  return (el, props) => compose(c => c.mount(el), c => c({
    props
  }), createComponent)(implementation);
}


const version = 'v4.3.1';

const __ = {
  cssManager,
  defineComponent,
  globals
};

export { __, component, install, mount, register, uninstall, unmount, unregister, version };
