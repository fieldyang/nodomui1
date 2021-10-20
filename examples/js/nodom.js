/**
 * 自定义元素管理器
 */
 class DirectiveElementManager {
    /**
     * 添加自定义元素类
     * @param clazz  自定义元素类或类数组
     */
    static add(clazz) {
        if (Array.isArray(clazz)) {
            for (let c of clazz) {
                this.elements.set(c.name, c);
            }
        }
        else {
            this.elements.set(clazz.name, clazz);
        }
    }
    /**
     * 获取自定义元素类
     * @param tagName   元素名
     * @returns         自定义元素类
     */
    static get(tagName) {
        return this.elements.get(tagName.toUpperCase());
    }
    /**
     * 是否存在自定义元素
     * @param tagName   元素名
     * @returns         存在或不存在
     */
    static has(tagName) {
        return this.elements.has(tagName.toUpperCase());
    }
}
/**
 * 自定义element
 */
DirectiveElementManager.elements = new Map();

/**
 * 指令类
 */
class DirectiveType {
    /**
     * 构造方法
     * @param name      指令类型名
     * @param handle    渲染时执行方法
     * @param prio      类型优先级
     */
    constructor(name, handle, prio) {
        this.name = name;
        this.prio = prio >= 0 ? prio : 10;
        this.handle = handle;
    }
}

/**
 * 指令管理器
 */
class DirectiveManager {
    /**
     * 创建指令类型
     * @param name 		    指令类型名
     * @param config 	    配置对象{order:优先级,init:初始化函数,handler:渲染处理函数}
     */
    static addType(name, handle, prio) {
        this.directiveTypes.set(name, new DirectiveType(name, handle, prio));
    }
    /**
     * 移除过滤器类型
     * @param name  过滤器类型名
     */
    static removeType(name) {
        this.directiveTypes.delete(name);
    }
    /**
     * 获取类型
     * @param name  指令类型名
     * @returns     指令或undefined
     */
    static getType(name) {
        return this.directiveTypes.get(name);
    }
    /**
     * 是否有某个过滤器类型
     * @param type 		过滤器类型名
     * @returns 		true/false
     */
    static hasType(name) {
        return this.directiveTypes.has(name);
    }
}
/**
 * 指令类型集合
 */
DirectiveManager.directiveTypes = new Map();

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/*
 * 消息js文件 中文文件
 */
const NodomMessage_en = {
    /**
     * tip words
     */
    TipWords: {
        application: "Application",
        system: "System",
        module: "Module",
        moduleClass: 'ModuleClass',
        model: "Model",
        directive: "Directive",
        directiveType: "Directive-type",
        expression: "Expression",
        event: "Event",
        method: "Method",
        filter: "Filter",
        filterType: "Filter-type",
        data: "Data",
        dataItem: 'Data-item',
        route: 'Route',
        routeView: 'Route-container',
        plugin: 'Plugin',
        resource: 'Resource',
        root: 'Root',
        element: 'VirtualDom'
    },
    /**
     * error info
     */
    ErrorMsgs: {
        unknown: "unknown error",
        paramException: "{0} '{1}' parameter error，see api",
        invoke: "method {0} parameter {1} must be {2}",
        invoke1: "method {0} parameter {1} must be {2} or {3}",
        invoke2: "method {0} parameter {1} or {2} must be {3}",
        invoke3: "method {0} parameter {1} not allowed empty",
        exist: "{0} is already exist",
        exist1: "{0} '{1}' is already exist",
        notexist: "{0} is not exist",
        notexist1: "{0} '{1}' is not exist",
        notupd: "{0} not allow to change",
        notremove: "{0} not allow to delete",
        notremove1: "{0} {1} not allow to delete",
        namedinvalid: "{0} {1} name error，see name rules",
        initial: "{0} init parameter error",
        jsonparse: "JSON parse error",
        timeout: "request overtime",
        config: "{0} config parameter error",
        config1: "{0} config parameter '{1}' error",
        itemnotempty: "{0} '{1}' config item '{2}' not allow empty",
        itemincorrect: "{0} '{1}' config item '{2}' error",
        wrongTemplate: "wrong template"
    },
    /**
     * form info
     */
    FormMsgs: {
        type: "please input valid {0}",
        unknown: "input error",
        required: "is required",
        min: "min value is {0}",
        max: "max value is {0}"
    },
    WeekDays: {
        "0": "Sun",
        "1": "Mon",
        "2": "Tue",
        "3": "Wed",
        "4": "Thu",
        "5": "Fri",
        "6": "Sat"
    }
};

/**
 * 过滤器工厂，存储模块过滤器
 */
class ModuleFactory {
    /**
     * 添加模块到工厂
     * @param item  模块对象
     */
    static add(item) {
        // //第一个为主模块
        if (this.modules.size === 0) {
            this.mainModule = item;
        }
        this.modules.set(item.id, item);
        //添加模块类
        this.addClass(item.constructor);
    }
    /**
     * 获得模块
     * @param name  类、类名或实例id
     */
    static get(name) {
        if (typeof name === 'number') {
            return this.modules.get(name);
        }
        else {
            return this.getInstance(name);
        }
    }
    /**
     * 是否存在模块类
     * @param clazzName     模块类名
     * @returns     true/false
     */
    static hasClass(clazzName) {
        return this.classes.has(clazzName);
    }
    /**
     * 添加模块类
     * @param clazz     模块类
     * @param name      注册别名
     */
    static addClass(clazz, name) {
        if (this.classes.has(clazz.name)) {
            return;
        }
        this.classes.set(clazz.name, clazz);
        if (name) {
            this.classes.set(name, clazz);
        }
    }
    /**
     * 获取模块实例（通过类名）
     * @param className     模块类或类名
     * @param props         模块外部属性
     */
    static getInstance(clazz) {
        let className = (typeof clazz === 'string') ? clazz : clazz.name;
        let cls;
        // 初始化模块
        if (!this.classes.has(className) && typeof clazz === 'function') {
            cls = clazz;
        }
        else {
            cls = this.classes.get(className);
        }
        if (!cls) {
            return;
        }
        let m = Reflect.construct(cls, []);
        m.init();
        return m;
    }
    /**
     * 从工厂移除模块
     * @param id    模块id
     */
    static remove(id) {
        this.modules.delete(id);
    }
    /**
     * 设置主模块
     * @param m 	模块
     */
    static setMain(m) {
        this.mainModule = m;
    }
    /**
     * 获取主模块
     * @returns 	应用的主模块
     */
    static getMain() {
        return this.mainModule;
    }
}
/**
 * 模块对象工厂 {moduleId:{key:容器key,className:模块类名,instance:模块实例}}
 */
ModuleFactory.modules = new Map();
/**
 * 模块类集合 {className:class}
 */
ModuleFactory.classes = new Map();

/**
 * 虚拟dom
 */
class VirtualDom {
    /**
     * @param tag       标签名
     * @param key       key
     */
    constructor(tag, key) {
        /**
         * 父虚拟dom
         */
        // public parent: VirtualDom;
        /**
         * staticNum 静态标识数
         *  0 表示静态，不进行比较
         *  > 0 每次比较后-1
         *  < 0 不处理
         */
        this.staticNum = 0;
        /**
         * 对应的所有表达式的字段都属于dom model内
         */
        this.allModelField = true;
        this.tagName = tag; //标签
        if (key) {
            this.key = key;
        }
        if (tag) {
            this.tagName = tag;
        }
    }
    /**
     * 移除多个指令
     * @param directives 	待删除的指令类型数组或指令类型
     */
    removeDirectives(directives) {
        if (!this.directives) {
            return;
        }
        //数组
        directives.forEach(d => {
            this.removeDirective(d);
        });
    }
    /**
     * 移除指令
     * @param directive 	待删除的指令类型名
     */
    removeDirective(directive) {
        if (!this.directives) {
            return;
        }
        let ind;
        if ((ind = this.directives.findIndex(item => item.type.name === directive)) !== -1) {
            this.directives.splice(ind, 1);
        }
        if (this.directives.length === 0) {
            delete this.directives;
        }
    }
    /**
     * 添加指令
     * @param directive     指令对象
     * @param sort          是否排序
     */
    addDirective(directive, sort) {
        if (!this.directives) {
            this.directives = [];
        }
        else if (this.directives.find(item => item.type.name === directive.type.name)) {
            return;
        }
        this.directives.push(directive);
        //指令按优先级排序
        if (sort) {
            this.sortDirective();
        }
    }
    /**
     * 指令排序
     */
    sortDirective() {
        if (!this.directives) {
            return;
        }
        if (this.directives.length > 1) {
            this.directives.sort((a, b) => {
                return DirectiveManager.getType(a.type.name).prio < DirectiveManager.getType(b.type.name).prio ? -1 : 1;
            });
        }
    }
    /**
     * 是否有某个类型的指令
     * @param typeName 	    指令类型名
     * @returns             true/false
     */
    hasDirective(typeName) {
        return this.directives && this.directives.findIndex(item => item.type.name === typeName) !== -1;
    }
    /**
     * 获取某个类型的指令
     * @param module            模块
     * @param directiveType 	指令类型名
     * @returns                 指令对象
     */
    getDirective(directiveType) {
        if (!this.directives) {
            return;
        }
        return this.directives.find(item => item.type.name === directiveType);
    }
    /**
     * 添加子节点
     */
    add(dom) {
        if (!this.children) {
            this.children = [];
        }
        this.children.push(dom);
    }
    /**
     * 是否存在某个class
     * @param cls   classname
     * @return      true/false
     */
    hasClass(cls) {
        let clazz = this.getProp('class');
        if (!clazz) {
            return false;
        }
        else {
            return clazz.trim().split(/\s+/).includes(cls);
        }
    }
    /**
     * 添加css class
     * @param cls class名
     */
    addClass(cls) {
        let clazz = this.getProp('class');
        if (!clazz || clazz === '') {
            this.setProp('class', cls);
            this.setStaticOnce();
        }
        else {
            let sa = clazz.trim().split(/\s+/);
            if (!sa.includes(cls)) {
                sa.push(cls);
                clazz = sa.join(' ');
                this.setProp('class', clazz);
                this.setStaticOnce();
            }
        }
    }
    /**
     * 删除css class
     * @param cls class名
     */
    removeClass(cls) {
        let clazz = this.getProp('class');
        if (!clazz || clazz === '') {
            return;
        }
        else {
            let sa = clazz.trim().split(/\s+/);
            let index;
            if ((index = sa.indexOf(cls)) !== -1) {
                sa.splice(index, 1);
                clazz = sa.join(' ');
            }
        }
        this.setProp('class', clazz);
    }
    /**
     * 查询style
     * @param styStr style字符串
     */
    hasStyle(styStr) {
        let styleStr = this.getProp('style');
        if (!styleStr) {
            return false;
        }
        else {
            return styleStr.trim().split(/;\s+/).includes(styStr);
        }
    }
    /**
     * 添加style
     *  @param styStr style字符串
     */
    addStyle(styStr) {
        let styleStr = this.getProp('style');
        if (!styleStr) {
            this.setProp('style', styStr);
            this.setStaticOnce();
        }
        else {
            let sa = styleStr.trim().split(/;\s+/);
            if (!sa.includes(styStr)) {
                sa.push(styStr);
                styleStr = sa.join(';');
                this.setProp('style', styleStr);
                this.setStaticOnce();
            }
        }
    }
    /**
     * 删除style
     * @param styStr style字符串
     */
    removeStyle(styStr) {
        let styleStr = this.getProp('style');
        if (!styleStr) {
            return;
        }
        else {
            let sa = styleStr.trim().split(/;\s+/);
            let index;
            if ((index = sa.indexOf(styStr)) !== -1) {
                sa.splice(index, 1);
                styleStr = sa.join(';');
            }
        }
        this.setProp('style', styleStr);
        this.setStaticOnce();
    }
    /**
     * 是否拥有属性
     * @param propName  属性名
     * @param isExpr    是否只检查表达式属性
     */
    hasProp(propName) {
        if (this.props) {
            return this.props.has(propName);
        }
    }
    /**
     * 获取属性值
     * @param propName  属性名
     * @param isExpr    是否只获取表达式属性
     */
    getProp(propName, isExpr) {
        if (this.props) {
            return this.props.get(propName);
        }
    }
    /**
     * 设置属性值
     * @param propName  属性名
     * @param v         属性值
     */
    setProp(propName, v) {
        if (!this.props) {
            this.props = new Map();
        }
        this.props.set(propName, v);
    }
    /**
     * 删除属性
     * @param props     属性名或属性名数组
     */
    delProp(props) {
        if (!this.props) {
            return;
        }
        if (Util.isArray(props)) {
            for (let p of props) {
                this.props.delete(p);
            }
        }
        else {
            this.props.delete(props);
        }
        //设置静态标志，至少要比较一次
        this.setStaticOnce();
    }
    /**
     * 设置asset
     * @param assetName     asset name
     * @param value         asset value
     */
    setAsset(assetName, value) {
        if (!this.assets) {
            this.assets = new Map();
        }
        this.assets.set(assetName, value);
    }
    /**
     * 删除asset
     * @param assetName     asset name
     */
    delAsset(assetName) {
        if (!this.assets) {
            return;
        }
        this.assets.delete(assetName);
    }
    /**
     * 添加事件
     * @param event     事件对象
     */
    addEvent(event) {
        if (!this.events) {
            this.events = new Map();
        }
        if (!this.events.has(event.name)) {
            this.events.set(event.name, [event.id]);
        }
        else {
            let arr = this.events.get(event.name);
            //已添加的事件，不再添加
            if (arr.indexOf(event.id) === -1) {
                arr.push(event.id);
            }
        }
    }
    /**
     * 获取事件集
     * @param eventName     事件名
     * @returns             事件对象或事件对象数组
     */
    getEvent(eventName) {
        if (this.events) {
            return this.events.get(eventName);
        }
    }
    /**
     * 设置事件集
     * @param eventName     事件名
     * @param events        事件数组
     */
    setEvent(eventName, events) {
        if (!this.events) {
            this.events = new Map();
        }
        this.events.set(eventName, events);
    }
    /**
     * 获取html dom
     * @param module    模块
     * @returns         对应的html dom
     */
    getEl(module) {
        return module.getNode(this.key);
    }
    /**
     * 查找子孙节点
     * @param key 	element key
     * @returns		虚拟dom/undefined
     */
    query(key) {
        if (this.key === key) {
            return this;
        }
        if (this.children) {
            for (let i = 0; i < this.children.length; i++) {
                let dom = this.children[i].query(key);
                if (dom) {
                    return dom;
                }
            }
        }
    }
    /**
     * 设置cache参数
     * @param module    模块
     * @param name      参数名
     * @param value     参数值
     */
    setParam(module, name, value) {
        module.objectManager.setElementParam(this.key, name, value);
    }
    /**
     * 获取参数值
     * @param module    模块
     * @param name      参数名
     * @returns         参数值
     */
    getParam(module, name) {
        return module.objectManager.getElementParam(this.key, name);
    }
    /**
     * 移除参数
     * @param module    模块
     * @param name      参数名
     */
    removeParam(module, name) {
        module.objectManager.removeElementParam(this.key, name);
    }
    /**
     * 设置单次静态标志
     */
    setStaticOnce() {
        if (this.staticNum !== -1) {
            this.staticNum = 1;
        }
    }
    /**
     * 克隆
     * @param changeKey     是否更改key，如果为true，则生成的节点用新的key
     */
    clone() {
        let dst = new VirtualDom(this.tagName, this.key);
        if (this.tagName) {
            //属性
            if (this.props && this.props.size > 0) {
                for (let p of this.props) {
                    dst.setProp(p[0], p[1]);
                }
            }
            if (this.assets && this.assets.size > 0) {
                for (let p of this.assets) {
                    dst.setAsset(p[0], p[1]);
                }
            }
            //事件
            if (this.events && this.events.size > 0) {
                for (let p of this.events) {
                    //复制数组
                    dst.setEvent(p[0], p[1].slice(0));
                }
            }
            if (this.directives && this.directives.length > 0) {
                dst.directives = [];
                for (let d of this.directives) {
                    dst.directives.push(d.clone());
                }
            }
            //子节点clone
            if (this.children) {
                for (let c of this.children) {
                    dst.add(c.clone());
                }
            }
        }
        else {
            dst.expressions = this.expressions;
            dst.textContent = this.textContent;
        }
        dst.staticNum = this.staticNum;
        return dst;
    }
}

/**
 * 表达式类
 */
class Expression {
    /**
     * @param module    模块
     * @param exprStr	表达式串
     */
    constructor(module, exprStr) {
        this.id = Util.genId();
        this.allModelField = true;
        if (!module || !exprStr) {
            return;
        }
        const funStr = this.compile(exprStr);
        this.execFunc = new Function('$model', '$module', `return ` + funStr);
    }
    /**
     * 编译表达式串，替换字段和方法
     * @param exprStr   表达式串
     * @returns         编译后的表达式串
     */
    compile(exprStr) {
        //字符串，object key，有效命名(函数或字段)
        const reg = /('[\s\S]*?')|("[\s\S]*?")|(`[\s\S]*?`)|([a-zA-Z$_][\w$]*\s*?:)|(\.?[a-zA-Z$_][\w$]*(\.[a-zA-Z$_][\w$]*)*(\s*[\[\(](\s*\))?)?)/g;
        let r;
        let retS = '';
        let index = 0; //当前位置
        while ((r = reg.exec(exprStr)) !== null) {
            let s = r[0];
            if (index < r.index) {
                retS += exprStr.substring(index, r.index);
            }
            if (s[0] === "'" || s[0] === '"' || s[0] === '`') { //字符串
                retS += s;
            }
            else {
                let lch = s[s.length - 1];
                if (lch === ':') { //object key
                    retS += s;
                }
                else if (lch === '(' || lch === ')') { //函数，非内部函数
                    retS += handleFunc(s);
                }
                else { //字段
                    if (s.startsWith('this.') || Util.isKeyWord(s) || s[0] === '.') { //非model属性
                        retS += s;
                    }
                    else { //model属性
                        retS += '$model.' + s;
                        //存在‘.’，则变量不全在在当前模型中
                        if (s.indexOf('.') !== -1) {
                            this.allModelField = false;
                        }
                    }
                }
            }
            index = reg.lastIndex;
        }
        if (index < exprStr.length) {
            retS += exprStr.substr(index);
        }
        return retS;
        /**
         * 处理函数串
         * @param str   源串
         * @returns     处理后的串
         */
        function handleFunc(str) {
            let ind = str.indexOf('.');
            //中间无'.'
            if (ind === -1) {
                let ind1 = str.lastIndexOf('(');
                let fn = str.substr(0, ind1);
                //末尾字符
                if (!Util.isKeyWord(fn)) {
                    let lch = str[str.length - 1];
                    if (lch !== ')') { //有参数
                        return '$module.invokeMethod("' + fn + '",';
                    }
                    else { //无参数
                        return '$module.invokeMethod("' + fn + '")';
                    }
                }
            }
            else if (str[0] !== '.') { //第一个为点不处理
                let fn = str.substr(0, ind);
                if (!Util.isKeyWord(fn)) { //首字段非关键词，则为属性
                    return '$model.' + str;
                }
            }
            return str;
        }
    }
    /**
     * 表达式计算
     * @param model 	模型 或 fieldObj对象
     * @returns 		计算结果
     */
    val(module, model) {
        if (!model) {
            model = module.model;
        }
        let v;
        try {
            v = this.execFunc.apply(module.model, [model, module]);
        }
        catch (e) {
            // console.error(e);
        }
        this.value = v;
        return v;
    }
    /**
     * 克隆
     */
    clone() {
        return this;
    }
}

/**
 * css 管理器
 * 针对不同的rule，处理方式不同
 * CSSStyleRule 进行保存和替换，同时 scopeInModule(模块作用域)有效
 * CSSImportRule 路径不重复添加，因为必须加在stylerule前面，所以需要记录最后的import索引号
 */
class CssManager {
    /**
     * 处理style 元素
     * @param module    模块
     * @param dom       虚拟都没
     * @param root      模块root dom
     * @param add       是否添加
     * @returns         如果是styledom，则返回true，否则返回false
     */
    static handleStyleDom(module, dom, root, add) {
        if (dom.tagName.toLowerCase() !== 'style') {
            return false;
        }
        if (add) {
            root.addClass(this.cssPreName + module.id);
        }
        else {
            root.removeClass(this.cssPreName + module.id);
        }
        return true;
    }
    /**
     * 处理 style 下的文本元素
     * @param module    模块
     * @param dom       style text element
     * @returns         true:style text节点,false:非style text节点
     */
    static handleStyleTextDom(module, dom) {
        if (dom.parent.tagName.toLowerCase() !== 'style') {
            return false;
        }
        //scope=this，在模块根节点添加 限定 class
        CssManager.addRules(module, dom.textContent, dom.parent.getProp('scope') === 'this' ? '.' + this.cssPreName + module.id : undefined);
        return true;
    }
    /**
     * 添加多个css rule
     * @param cssText           rule集合
     * @param module            模块
     * @param scopeName         作用域名(前置选择器)
     */
    static addRules(module, cssText, scopeName) {
        //sheet 初始化
        if (!this.sheet) {
            //safari不支持 cssstylesheet constructor，用 style代替
            let sheet = document.createElement('style');
            document.head.appendChild(sheet);
            this.sheet = document.styleSheets[0];
        }
        //如果有作用域，则清除作用域下的rule
        if (scopeName) {
            this.clearModuleRules(module);
        }
        //是否限定在模块内
        //cssRule 获取正则式  @impot
        const reg = /(@[a-zA-Z]+\s+url\(.+?\))|([.#@a-zA-Z]\S*(\s*\S*\s*?)?{)|\}/g;
        //import support url正则式
        const regImp = /@[a-zA-Z]+\s+url/;
        // keyframe font page support... 开始 位置
        let startIndex = -1;
        // { 个数，遇到 } -1 
        let beginNum = 0;
        let re;
        while ((re = reg.exec(cssText)) !== null) {
            if (regImp.test(re[0])) { //import namespace
                handleImport(re[0]);
            }
            else if (re[0] === '}') { //回收括号，单个样式结束判断
                if (startIndex >= 0 && --beginNum <= 0) { //style @ end
                    let txt = cssText.substring(startIndex, re.index + 1);
                    if (txt[0] === '@') { //@开头
                        this.sheet.insertRule(txt, CssManager.sheet.cssRules ? CssManager.sheet.cssRules.length : 0);
                    }
                    else { //style
                        handleStyle(module, txt, scopeName);
                    }
                    startIndex = -1;
                    beginNum = 0;
                }
            }
            else { //style 或 @内部
                if (startIndex === -1) {
                    startIndex = re.index;
                    beginNum++;
                }
                else {
                    beginNum++;
                }
            }
        }
        /**
         * 处理style rule
         * @param module            模块
         * @param cssText           css 文本
         * @param scopeName         作用域名(前置选择器)
         */
        function handleStyle(module, cssText, scopeName) {
            const reg = /.+(?=\{)/;
            let r = reg.exec(cssText);
            if (!r) {
                return;
            }
            // 保存样式名，在模块 object manager中以数组存储
            if (scopeName) {
                let arr = module.objectManager.get('$cssRules');
                if (!arr) {
                    arr = [];
                    module.objectManager.set('$cssRules', arr);
                }
                arr.push((scopeName + ' ' + r[0]));
                //为样式添加 scope name
                cssText = scopeName + ' ' + cssText;
            }
            //加入到样式表
            CssManager.sheet.insertRule(cssText, CssManager.sheet.cssRules ? CssManager.sheet.cssRules.length : 0);
        }
        /**
         * 处理import rule
         * @param cssText   css文本
         */
        function handleImport(cssText) {
            const reg = /(?<=\()\S+(?=\))/;
            let r;
            if ((r = reg.exec(cssText)) !== null) {
                if (CssManager.importMap.has(r[0])) {
                    return;
                }
                //插入import rule
                CssManager.sheet.insertRule(cssText, CssManager.importIndex++);
                CssManager.importMap.set(r[0], true);
            }
        }
    }
    /**
     * 清除模块 css rules
     * @param module    模块
     */
    static clearModuleRules(module) {
        let rules = module.objectManager.get('$cssRules');
        if (!rules || rules.length === 0) {
            return;
        }
        //从sheet清除
        for (let i = 0; i < this.sheet.cssRules.length; i++) {
            let r = this.sheet.cssRules[i];
            if (r.selectorText && rules.indexOf(r.selectorText) !== -1) {
                this.sheet.deleteRule(i--);
            }
        }
        //置空cache
        module.objectManager.set('$cssRules', []);
    }
}
/**
 * import url map，用于存储import的href路径
 */
CssManager.importMap = new Map();
/**
 * importrule 位置
 */
CssManager.importIndex = 0;
/**
 * css class 前置名
 */
CssManager.cssPreName = '___nodommodule___';

/**
 * 存储
 */
class NCache {
    constructor() {
        this.cacheData = {};
    }
    /**
     * 从cache
     * @param key   键，支持"."
     * @reutrns     值或undefined
     */
    get(key) {
        let p = this.cacheData;
        if (key.indexOf('.') !== -1) {
            let arr = key.split('.');
            if (arr.length > 1) {
                for (let i = 0; i < arr.length - 1 && p; i++) {
                    p = p[arr[i]];
                }
                if (p) {
                    key = arr[arr.length - 1];
                }
            }
        }
        if (p) {
            return p[key];
        }
    }
    /**
     * 保存值
     * @param key       键
     * @param value     值
     */
    set(key, value) {
        let p = this.cacheData;
        if (key.indexOf('.') !== -1) {
            let arr = key.split('.');
            if (arr.length > 1) {
                for (let i = 0; i < arr.length - 1; i++) {
                    if (!p[arr[i]] || typeof p[arr[i]] !== 'object') {
                        p[arr[i]] = {};
                    }
                    p = p[arr[i]];
                }
                key = arr[arr.length - 1];
            }
        }
        if (p) {
            p[key] = value;
        }
    }
    /**
     * 移除键
     * @param key   键
     */
    remove(key) {
        let p = this.cacheData;
        if (key.indexOf('.') !== -1) {
            let arr = key.split('.');
            if (arr.length > 1) {
                for (let i = 0; i < arr.length - 1 && p; i++) {
                    p = p[arr[i]];
                }
                if (p) {
                    key = arr[arr.length - 1];
                }
            }
        }
        if (p) {
            delete p[key];
        }
    }
}

/**
 * 全局缓存
 */
class GlobalCache {
    /**
         * 保存到cache
         * @param key       键，支持"."
         * @param value     值
         */
    static set(key, value) {
        this.cache.set(key, value);
    }
    /**
     * 从cache读取
     * @param key   键，支持"."
     * @returns     缓存的值或undefined
     */
    static get(key) {
        return this.cache.get(key);
    }
    /**
     * 从cache移除
     * @param key   键，支持"."
     */
    static remove(key) {
        this.cache.remove(key);
    }
    /**
     * 获取指令实例
     * @param module    模块
     * @param id        指令id
     * @returns         指令对象
     */
    static getDirective(id) {
        return this.cache.get('$directives.' + id + '.$instance');
    }
    /**
     * 保存指令实例
     * @param module        模块
     * @param directive     指令对象
     */
    static saveDirective(directive) {
        this.cache.set('$directives.' + directive.id + '.$instance', directive);
    }
    /**
     * 移除指令
     * @param id    指令id
     */
    static removeDirective(id) {
        this.cache.remove('$directives.' + id);
    }
    /**
     * 设置指令参数
     * @param id        指令id
     * @param key       dom key
     * @param name      参数名
     * @param value     参数值
     */
    static setDirectiveParam(id, key, name, value) {
        this.cache.set('$doms.' + key + '$directives.' + id + '.$params.' + name, value);
    }
    /**
     * 获取指令参数值
     * @param id        指令id
     * @param key       dom key
     * @param name      参数名
     * @returns         参数值
     */
    static getDirectiveParam(id, key, name) {
        return this.cache.get('$doms.' + key + '$directives.' + id + '.$params.' + name);
    }
    /**
     * 移除指令参数
     * @param id        指令id
     * @param key       dom key
     * @param name      参数名
     */
    static removeDirectiveParam(id, key, name) {
        this.cache.remove('$doms.' + key + '$directives.' + id + '.$params.' + name);
    }
    /**
     * 清空指令参数
     * @param id        指令id
     * @param key       dom key
     */
    static clearDirectiveParam(id, key) {
        this.cache.remove('$doms.' + key + '$directives.' + id + '.$params.' + name);
    }
    /**
     * 获取表达式实例
     * @param id        表达式id
     * @returns         表达式对象
     */
    static getExpression(id) {
        return this.cache.get('$expressions.' + id);
    }
    /**
     * 保存表达式实例
     * @param expression    表达式对象
     */
    static saveExpression(expression) {
        this.cache.set('$expressions.' + expression.id, expression);
    }
    /**
     * 移除表达式
     * @param id    表达式id
     */
    static removeExpression(id) {
        this.cache.remove('$expressions.' + id);
    }
    /**
     * 获取事件实例
     * @param id        表达式id
     * @returns         事件对象
     */
    static getEvent(id) {
        return this.cache.get('$events.' + id + '.$instance');
    }
    /**
     * 保存事件实例
     * @param event     事件对象
     */
    static saveEvent(event) {
        this.cache.set('$events.' + event.id + '.$instance', event);
    }
    /**
     * 移除事件
     * @param id    事件id
     */
    static removeEvent(id) {
        this.cache.remove('$events.' + id);
    }
    /**
     * 设置事件参数
     * @param id        事件id
     * @param key       dom key
     * @param name      参数名
     * @param value     参数值
     */
    static setEventParam(id, key, name, value) {
        this.cache.set('$doms.' + key + '$events.' + id + '.$params.' + name, value);
    }
    /**
     * 获取事件参数值
     * @param id        事件id
     * @param key       dom key
     * @param name      参数名
     * @returns         参数值
     */
    static getEventParam(id, key, name) {
        return this.cache.get('$doms.' + key + '$events.' + id + '.$params.' + name);
    }
    /**
     * 移除事件参数
     * @param id        事件id
     * @param key       dom key
     * @param name      参数名
     */
    static removeEventParam(id, key, name) {
        this.cache.remove('$doms.' + key + '$events.' + id + '.$params.' + name);
    }
    /**
     * 清空事件参数
     * @param id        事件id
     * @param key       dom key
     */
    static clearEventParam(id, key) {
        this.cache.remove('$doms.' + key + '$events.' + id + '.$params');
    }
    /**
     * 保存旧虚拟dom
     * @param dom       dom对象
     */
    static saveElement(dom) {
        this.cache.set('$doms.' + dom.key, dom);
    }
    /**
     * 获取渲染树虚拟dom
     * @param key       dom key
     * @returns         dom对象
     */
    static getElement(key) {
        return this.cache.get('$doms.' + key);
    }
    /**
     * 删除渲染树虚拟dom
     * @param key       虚拟dom key
     */
    static removeElement(key) {
        this.cache.remove('$doms.' + key);
    }
    /**
     * 获取key对应的html节点
     * @param key       el key
     * @returns         html element
     */
    static getNode(key) {
        return this.cache.get('$doms.' + key + '.$el');
    }
    /**
     * 保存key对应的html node
     * @param key       dom key
     * @param node      node
     */
    static saveNode(key, node) {
        this.cache.set('$doms.' + key + '.$el', node);
    }
    /**
     * 移除保存的节点（包括参数和html dom）
     * @param key   dom key
     */
    static removeSavedNode(key) {
        this.cache.remove('$doms.' + key);
    }
    /**
     * 设置dom参数值
     * @param key       dom key
     * @param name       参数名
     * @param value     参数值
     */
    static setElementParam(key, name, value) {
        this.cache.set('$doms.' + key + '.$params.' + name, value);
    }
    /**
     * 获取dom参数值
     * @param key       dom key
     * @param name      参数名
     * @returns         参数值
     */
    static getElementParam(key, name) {
        return this.cache.get('$doms.' + key + '.$params.' + name);
    }
    /**
     * 移除dom参数
     * @param key       dom key
     * @param name      参数名
     */
    static removeElementParam(key, name) {
        this.cache.remove('$doms.' + key + '.$params.' + name);
    }
    /**
     * 清除element 参数集
     * @param key   dom key
     */
    static clearElementParams(key) {
        this.cache.remove('$doms.' + key + '.$params');
    }
    /**
     * 清除指令集
     */
    static clearDirectives() {
        this.remove('$directives');
    }
    /**
     * 清除表达式集
     */
    static clearExpressions() {
        this.remove('$directives');
    }
    /**
     * 清除事件集
     */
    static clearEvents() {
        this.remove('$directives');
    }
    /**
     * 清除缓存dom对象
     */
    static clearSaveDoms() {
        this.remove('$doms');
    }
}
GlobalCache.cache = new NCache();

/**
 * 事件类
 * @remarks
 * 事件分为自有事件和代理事件
 * @author      yanglei
 * @since       1.0
 */
class NEvent {
    /**
     * @param module        模块
     * @param eventName     事件名
     * @param eventStr      事件串或事件处理函数,以“:”分割,中间不能有空格,结构为: 方法名[:delg(代理到父对象):nopopo(禁止冒泡):once(只执行一次):capture(useCapture)]
     *                      如果为函数，则替代第三个参数
     * @param handler       事件执行函数，如果方法不在module methods中定义，则可以直接申明，eventStr第一个参数失效，即eventStr可以是":delg:nopopo..."
     */
    constructor(eventName, eventStr, handler) {
        this.id = Util.genId();
        this.name = eventName;
        GlobalCache.saveEvent(this);
        //如果事件串不为空，则不需要处理
        if (eventStr) {
            let tp = typeof eventStr;
            if (tp === 'string') {
                let eStr = eventStr.trim();
                eStr.split(':').forEach((item, i) => {
                    item = item.trim();
                    if (i === 0) { //事件方法
                        this.handler = item;
                    }
                    else { //事件附加参数
                        switch (item) {
                            case 'delg':
                                this.delg = true;
                                break;
                            case 'nopopo':
                                this.nopopo = true;
                                break;
                            case 'once':
                                this.once = true;
                                break;
                            case 'capture':
                                this.capture = true;
                                break;
                        }
                    }
                });
            }
            else if (tp === 'function') {
                handler = eventStr;
            }
        }
        //新增事件方法（不在methods中定义）
        if (handler) {
            this.handler = handler;
        }
        if (document.ontouchend) { //触屏设备
            switch (this.name) {
                case 'click':
                    this.name = 'tap';
                    break;
                case 'mousedown':
                    this.name = 'touchstart';
                    break;
                case 'mouseup':
                    this.name = 'touchend';
                    break;
                case 'mousemove':
                    this.name = 'touchmove';
                    break;
            }
        }
        else { //转非触屏
            switch (this.name) {
                case 'tap':
                    this.name = 'click';
                    break;
                case 'touchstart':
                    this.name = 'mousedown';
                    break;
                case 'touchend':
                    this.name = 'mouseup';
                    break;
                case 'touchmove':
                    this.name = 'mousemove';
                    break;
            }
        }
    }
    /**
     * 设置附加参数值
     * @param module    模块
     * @param dom       虚拟dom
     * @param name      参数名
     * @param value     参数值
     */
    setParam(module, dom, name, value) {
        module.objectManager.setEventParam(this.id, dom.key, name, value);
    }
    /**
     * 获取附加参数值
     * @param module    模块
     * @param dom       虚拟dom
     * @param name      参数名
     * @returns         参数值
     */
    getParam(module, dom, name) {
        return module.objectManager.getEventParam(this.id, dom.key, name);
    }
    /**
     * 移除参数
     * @param module    模块
     * @param dom       虚拟dom
     * @param name      参数名
     */
    removeParam(module, dom, name) {
        return module.objectManager.removeEventParam(this.id, dom.key, name);
    }
    /**
     * 清参数cache
     * @param module    模块
     * @param dom       虚拟dom
     */
    clearParam(module, dom) {
        module.objectManager.clearEventParam(this.id, dom.key);
    }
}

/**
 * 事件管理器
 */
class EventManager {
    /**
     * 绑定事件
     * @param module
     * @param dom
     */
    static bind(module, dom) {
        if (!dom.events) {
            return;
        }
        //判断并设置事件绑定标志
        let el = module.getNode(dom.key);
        if (el['bindEvent']) {
            return;
        }
        el['bindEvent'] = true;
        for (let evt of dom.events) {
            let arr = evt[1];
            //同一个事件名可能对应多个事件对象
            if (arr.length === 0)
                return;
            //获取usecapture
            let capture = (arr.findIndex(item => module.objectManager.getEvent(item).capture === true) !== -1);
            // 只代理一次，也只绑定一次
            //是否已代理
            let hasDelg = false;
            //是否已绑定
            let hasBound = false;
            //遍历处理代理事件
            for (let ii = 0; ii < arr.length; ii++) {
                const ev = module.objectManager.getEvent(arr[ii]);
                //处理外部事件，如果有外部事件，则移除改事件
                if (this.handleExtendEvent(module, dom, ev)) {
                    arr.splice(ii--, 1);
                    continue;
                }
                //当前事件名已绑定且已代理，不再执行
                if (hasBound && hasDelg) {
                    break;
                }
                //代理事件
                if (ev.delg && !hasDelg) {
                    //事件加入父对象
                    Util.addEvent(dom.parent, ev);
                    // 保存代理dom信息
                    let delgs = ev.getParam(module, dom.parent, '$delgs');
                    if (!delgs) {
                        delgs = {};
                        ev.setParam(module, dom.parent, '$delgs', delgs);
                    }
                    delgs[dom.key] = dom;
                    //从本地移除
                    arr.splice(ii--, 1);
                    const parent = dom.parent;
                    //如果父无此事件，则需要绑定到父事件
                    let eh = getCfg(parent, ev.name);
                    if (!eh) {
                        // 保存handler
                        saveCfg(parent, ev.name, handler, ev.capture);
                        module.getNode(parent.key).addEventListener(evt[0], handler, ev.capture);
                    }
                    hasDelg = true;
                }
                else if (!hasBound) {
                    hasBound = true;
                    // 保存handler
                    saveCfg(dom, evt, handler, capture);
                    el.addEventListener(evt[0], handler, capture);
                }
            }
        }
        /**
         * 保存事件配置
         * @param dom       dom节点
         * @param ev        事件名
         * @param handler   事件方法
         * @param capture   是否capture
         */
        function saveCfg(dom, ev, handler, capture) {
            module.objectManager.set('$domevents_' + dom.key + '_' + ev, {
                handler: handler,
                capture: capture
            });
        }
        /**
         * 获取事件配置
         * @param dom       dom节点
         * @param ev        事件名
         * @returns         {handler,capture}
         */
        function getCfg(dom, ev) {
            return module.objectManager.get('$domevents_' + dom.key + '_' + ev);
        }
        /**
         * 事件handler
         * @param e  Event
         */
        function handler(e) {
            //从事件element获取事件
            let el = e.currentTarget;
            // let dom = module.getElement(el.getAttribute('key'));
            const dom = el['vdom'];
            if (!dom || !dom.events || !dom.events.has(e.type)) {
                return;
            }
            const evts = dom.getEvent(e.type);
            //已执行事件map，不重复执行
            let execMap = new Map();
            for (let ii = 0; ii < evts.length; ii++) {
                const eid = evts[ii];
                const ev = module.objectManager.getEvent(eid);
                if (typeof ev.handler === 'string') {
                    ev.handler = module.getMethod(ev.handler);
                }
                if (!ev.handler) {
                    return;
                }
                //禁止冒泡
                if (ev.nopopo) {
                    e.stopPropagation();
                }
                //代理事件，需要作用在子节点上
                if (ev.delg) { // 代理
                    let delgs = ev.getParam(module, dom, '$delgs');
                    //向上找节点
                    for (let i = 0; i < e.path.length && e.path[i] !== el; i++) {
                        let el1 = e.path[i];
                        let key = el1.getAttribute('key');
                        //　找到事件节点
                        if (key && delgs.hasOwnProperty(key)) {
                            let dom1 = delgs[key];
                            if (dom1) {
                                //如果dom对应的事件已执行，不再执行
                                if (execMap.get(ev.id) === dom1.key) {
                                    break;
                                }
                                ev.handler.apply(module, [dom1.model, dom1, ev, e]);
                                execMap.set(ev.id, dom1.key);
                                if (ev.once) {
                                    EventManager.unbind(module, dom1, ev);
                                }
                            }
                            break;
                        }
                    }
                }
                else {
                    ev.handler.apply(module, [dom.model, dom, ev, e]);
                    //事件只执行一次，从事件数组删除
                    if (ev.once) {
                        EventManager.unbind(module, dom, ev);
                        ii--;
                    }
                }
            }
        }
    }
    /**
     * 解绑一个事件
     * @param module    模块
     * @param dom       dom节点
     * @param ev        事件对象
     * @returns
     */
    static unbind(module, dom, ev) {
        let evts;
        if (ev.delg) {
            evts = dom.parent.getEvent(ev.name);
            let delgs = ev.getParam(module, dom.parent, '$delgs');
            delete delgs[dom.key];
            //如果代理不为空，则不删除事件
            if (Object.keys(delgs).length > 0) {
                return;
            }
        }
        else {
            evts = dom.getEvent(ev.name);
        }
        if (!evts) {
            return;
        }
        let index;
        if ((index = evts.findIndex(item => item === ev.id)) === -1)
            return;
        //从事件数组移除
        evts.splice(index, 1);
        //判断并解绑
        if (evts.length === 0) {
            const cfg = module.objectManager.get('$domevents_' + dom.key + '_' + ev.name);
            if (cfg && cfg.handler) {
                dom.getEl(module).removeEventListener(ev.name, cfg.handler, cfg.capture);
            }
        }
    }
    /**
     * 处理外部事件
     * @param module    模块
     * @param dom       dom节点
     * @param event     事件对象
     * @returns         如果有是外部事件，则返回true，否则返回false
     */
    static handleExtendEvent(module, dom, event) {
        let evts = this.get(event.name);
        if (!evts) {
            return false;
        }
        for (let key of Object.keys(evts)) {
            let ev = new NEvent(key, evts[key]);
            ev.capture = event.capture;
            ev.nopopo = event.nopopo;
            ev.delg = event.delg;
            ev.once = event.once;
            //设置依赖事件
            ev.dependEvent = event;
            dom.addEvent(ev);
        }
        return true;
    }
    /**
     * 注册扩展事件
     * @param eventName    事件名
     * @param handleObj    事件处理集
     */
    static regist(eventName, handleObj) {
        this.extendEventMap.set(eventName, handleObj);
    }
    /**
     * 取消注册扩展事件
     * @param eventName     事件名
     */
    static unregist(eventName) {
        return this.extendEventMap.delete(eventName);
    }
    /**
     * 获取扩展事件
     * @param eventName     事件名
     * @returns             事件处理集
     */
    static get(eventName) {
        return this.extendEventMap.get(eventName);
    }
}
/**
 * 外部事件集
 */
EventManager.extendEventMap = new Map();

/**
 * 渲染器
 */
class Renderer {
    /**
     * 添加到渲染列表
     * @param module 模块
     */
    static add(module) {
        //如果已经在列表中，不再添加
        if (!module.dontAddToRender && !this.waitList.includes(module.id)) {
            //计算优先级
            this.waitList.push(module.id);
        }
    }
    //从列表移除
    static remove(module) {
        let ind;
        if ((ind = this.waitList.indexOf(module.id)) !== -1) {
            this.waitList.splice(ind, 1);
        }
    }
    /**
     * 队列渲染
     */
    static render() {
        for (; this.waitList.length > 0;) {
            ModuleFactory.get(this.waitList.shift()).render();
        }
    }
    /**
     * 渲染dom
     * @param module            模块
     * @param src               源dom
     * @param model             模型，如果src已经带有model，则此参数无效
     * @param parent            父dom
     * @param key               key
     * @returns
     */
    static renderDom(module, src, model, parent, key) {
        //节点自带model优先级高
        model = src.model ? src.model : model;
        let dst = new VirtualDom(src.tagName, key ? src.key + '_' + key : src.key);
        //设置当前根root
        if (!parent) {
            this.currentModuleRoot = dst;
        }
        dst.model = model;
        dst.subModuleId = src.subModuleId;
        // 设置父对象
        if (parent) {
            dst.parent = parent;
        }
        //先处理model指令
        if (src.directives && src.directives.length > 0 && src.directives[0].type.name === 'model') {
            src.directives[0].exec(module, dst, src);
        }
        if (src.tagName) {
            if (!dst.notChange) {
                handleProps();
                let r = handleDirectives();
                if (!r) {
                    return;
                }
                //处理style，如果为style，则不处理assets和events
                if (!CssManager.handleStyleDom(module, src, Renderer.currentModuleRoot, src.getProp('scope') === 'this')) {
                    //assets
                    if (src.assets && src.assets.size > 0) {
                        for (let p of src.assets) {
                            dst.setAsset(p[0], p[1]);
                        }
                    }
                    //事件
                    if (src.events && src.events.size > 0) {
                        for (let p of src.events) {
                            //复制数组
                            dst.setEvent(p[0], p[1].slice(0));
                        }
                    }
                }
            }
            // 子节点
            if (src.children && src.children.length > 0) {
                dst.children = [];
                for (let c of src.children) {
                    if (c instanceof VirtualDom) { //未编译节点
                        Renderer.renderDom(module, c, dst.model, dst, key ? key : null);
                    }
                    else { //已编译节点
                        dst.children.push(c);
                    }
                }
            }
        }
        else if (!dst.notChange) { //文本节点
            if (src.expressions) {
                let value = '';
                src.expressions.forEach((v) => {
                    if (v instanceof Expression) { //处理表达式
                        let v1 = v.val(module, dst.model);
                        value += v1 !== undefined ? v1 : '';
                    }
                    else {
                        value += v;
                    }
                });
                dst.textContent = value;
                dst.staticNum = -1;
            }
            else {
                dst.textContent = src.textContent;
            }
        }
        //添加到dom tree
        if (parent && !dst.dontAddToTree) {
            parent.children.push(dst);
        }
        return dst;
        /**
         * 处理指令
         * @returns     true继续执行，false不执行后续渲染代码
         */
        function handleDirectives() {
            if (!src.directives || src.directives.length === 0) {
                return true;
            }
            dst.staticNum = -1;
            for (let d of src.directives) {
                //model指令不执行
                if (d.type.name === 'model') {
                    continue;
                }
                if (!d.exec(module, dst, src)) {
                    return false;
                }
            }
            return true;
        }
        /**
         * 处理属性（带表达式）
         */
        function handleProps() {
            if (!src.props || src.props.size === 0) {
                return;
            }
            for (let k of src.props) {
                if (k[1] instanceof Expression) {
                    dst.setProp(k[0], k[1].val(module, dst.model));
                    dst.staticNum = -1;
                }
                else {
                    dst.setProp(k[0], k[1]);
                }
            }
        }
    }
    /**
     * 渲染到html element
     * @param module 	        模块
     * @param src               渲染节点
     * @param parentEl 	        父html
     * @param isRenderChild     是否渲染子节点
     */
    static renderToHtml(module, src, parentEl, isRenderChild) {
        let el = module.getNode(src.key);
        if (el) { //html dom节点已存在
            if (src.tagName) {
                if (src.props) {
                    //设置属性
                    for (let p of src.props) {
                        if (p[1] !== undefined) {
                            el.setAttribute(p[0], p[1]);
                        }
                    }
                }
                handleAssets(src, el);
            }
            else { //文本节点
                el.textContent = src.textContent;
            }
        }
        else {
            if (src.tagName) {
                el = newEl(src);
            }
            else {
                el = newText(src);
            }
            //先创建子节点，再添加到html dom树，避免频繁添加
            if (el && src.tagName && isRenderChild) {
                genSub(el, src);
            }
            if (el && parentEl) {
                parentEl.appendChild(el);
            }
        }
        return el;
        /**
         * 新建element节点
         * @param dom 		虚拟dom
         * @returns 		新的html element
         */
        function newEl(dom) {
            //style不处理
            if (dom.tagName.toLowerCase() === 'style') {
                return;
            }
            //创建element
            let el = document.createElement(dom.tagName);
            //保存虚拟dom
            el['vdom'] = dom;
            //模块容器，向目标模块设置容器
            if (dom.subModuleId) {
                let m = ModuleFactory.get(dom.subModuleId);
                if (m) {
                    m.setContainer(el);
                }
                //添加到父模块
                module.addChild(m.id);
            }
            //设置属性
            if (dom.props) {
                for (let p of dom.props) {
                    if (p[1] !== undefined) {
                        el.setAttribute(p[0], p[1]);
                    }
                }
            }
            //如果存储node，则不需要key
            // el.setAttribute('key', dom.key);
            //把el引用与key关系存放到cache中
            module.saveNode(dom.key, el);
            //asset
            if (dom.assets && dom.assets.size > 0) {
                for (let p in dom.assets) {
                    el[p] = p[1];
                }
            }
            //处理event
            if (dom.events) {
                EventManager.bind(module, dom);
            }
            return el;
        }
        /**
         * 新建文本节点
         */
        function newText(dom) {
            //样式表处理，如果是样式表文本，则不添加到dom树
            if (CssManager.handleStyleTextDom(module, dom)) {
                return;
            }
            let node = document.createTextNode(dom.textContent || '');
            module.saveNode(dom.key, node);
            return node;
        }
        /**
         * 生成子节点
         * @param pEl 	父节点
         * @param vdom  虚拟dom节点
         */
        function genSub(pEl, vdom) {
            if (vdom.children && vdom.children.length > 0) {
                vdom.children.forEach(item => {
                    let el1;
                    if (item.tagName) {
                        el1 = newEl(item);
                        genSub(el1, item);
                    }
                    else {
                        el1 = newText(item);
                    }
                    if (el1) {
                        pEl.appendChild(el1);
                    }
                });
            }
        }
        /**
         * 处理assets
         */
        function handleAssets(dom, el) {
            //处理asset
            if (dom.assets) {
                for (let k of dom.assets) {
                    el[k[0]] = k[1];
                }
            }
        }
    }
}
/**
 * 等待渲染列表（模块名）
 */
Renderer.waitList = [];

/**
 * 路由管理类
 * @since 	1.0
 */
class Router {
    /**
     * 把路径加入跳转列表(准备跳往该路由)
     * @param path 	路径
     */
    static go(path) {
        //相同路径不加入
        if (path === this.currentPath) {
            return;
        }
        //添加路径到等待列表，已存在，不加入
        if (this.waitList.indexOf(path) === -1) {
            this.waitList.push(path);
        }
        //延迟加载，避免同一个路径多次加入
        setTimeout(() => {
            this.load();
        }, 0);
    }
    /**
     * 启动加载
     */
    static load() {
        //在加载，或无等待列表，则返回
        if (this.waitList.length === 0) {
            return;
        }
        let path = this.waitList.shift();
        this.start(path).then(() => {
            //继续加载
            this.load();
        });
    }
    /**
     * 切换路由
     * @param path 	路径
     */
    static start(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let diff = this.compare(this.currentPath, path);
            // 当前路由依赖的容器模块
            let parentModule;
            if (diff[0] === null) {
                parentModule = ModuleFactory.getMain();
            }
            else {
                parentModule = yield this.getModule(diff[0]);
            }
            //onleave事件，从末往前执行
            for (let i = diff[1].length - 1; i >= 0; i--) {
                const r = diff[1][i];
                if (!r.module) {
                    continue;
                }
                let module = yield this.getModule(r);
                if (Util.isFunction(this.onDefaultLeave)) {
                    this.onDefaultLeave(module.model);
                }
                if (Util.isFunction(r.onLeave)) {
                    r.onLeave(module.model);
                }
                // 清理map映射
                this.activeFieldMap.delete(module.id);
                //module置为不激活
                module.unactive();
            }
            if (diff[2].length === 0) { //路由相同，参数不同
                let route = diff[0];
                if (route !== null) {
                    let module = yield this.getModule(route);
                    // 模块处理
                    this.dependHandle(module, route, diff[3] ? diff[3].module : null);
                }
            }
            else { //路由不同
                //加载模块
                for (let ii = 0; ii < diff[2].length; ii++) {
                    let route = diff[2][ii];
                    //路由不存在或路由没有模块（空路由）
                    if (!route || !route.module) {
                        continue;
                    }
                    let module = yield this.getModule(route);
                    // 模块处理
                    this.dependHandle(module, route, parentModule);
                    //默认全局路由enter事件
                    if (Util.isFunction(this.onDefaultEnter)) {
                        this.onDefaultEnter(module.model);
                    }
                    //当前路由进入事件
                    if (Util.isFunction(route.onEnter)) {
                        route.onEnter(module.model);
                    }
                    parentModule = module;
                }
            }
            //如果是history popstate，则不加入history
            if (this.startStyle === 0) {
                //子路由，替换state
                if (path.startsWith(this.currentPath)) {
                    history.replaceState(path, '', path);
                }
                else { //路径push进history
                    history.pushState(path, '', path);
                }
            }
            //修改currentPath
            this.currentPath = path;
            //设置start类型为正常start
            this.startStyle = 0;
        });
    }
    /*
     * 重定向
     * @param path 	路径
     */
    static redirect(path) {
        this.go(path);
    }
    /**
     * 获取module
     * @param route 路由对象
     * @returns     路由对应模块
     */
    static getModule(route) {
        return __awaiter(this, void 0, void 0, function* () {
            let module = route.module;
            //已经是模块实例
            if (typeof module === 'object') {
                return module;
            }
            //延迟加载
            if (typeof module === 'string' && route.modulePath) { //模块路径
                module = yield import(route.modulePath);
                module = module[route.module];
            }
            //模块类
            if (typeof module === 'function') {
                module = ModuleFactory.get(module);
            }
            route.module = module;
            return module;
        });
    }
    /**
     * 比较两个路径对应的路由链
     * @param path1 	第一个路径
     * @param path2 	第二个路径
     * @returns 		数组 [父路由或不同参数的路由，第一个需要销毁的路由数组，第二个需要增加的路由数组，不同参数路由的父路由]
     */
    static compare(path1, path2) {
        // 获取路由id数组
        let arr1 = null;
        let arr2 = null;
        if (path1) {
            //采用克隆方式复制，避免被第二个路径返回的路由覆盖参数
            arr1 = this.getRouteList(path1, true);
        }
        if (path2) {
            arr2 = this.getRouteList(path2);
        }
        let len = 0;
        if (arr1 !== null) {
            len = arr1.length;
        }
        if (arr2 !== null) {
            if (arr2.length < len) {
                len = arr2.length;
            }
        }
        else {
            len = 0;
        }
        //需要销毁的旧路由数组
        let retArr1 = [];
        //需要加入的新路由数组
        let retArr2 = [];
        let i = 0;
        for (i = 0; i < len; i++) {
            //找到不同路由开始位置
            if (arr1[i].id === arr2[i].id) {
                //比较参数
                if (JSON.stringify(arr1[i].data) !== JSON.stringify(arr2[i].data)) {
                    i++;
                    break;
                }
            }
            else {
                break;
            }
        }
        //旧路由改变数组
        if (arr1 !== null) {
            retArr1 = arr1.slice(i);
        }
        //新路由改变数组（相对于旧路由）
        if (arr2 !== null) {
            retArr2 = arr2.slice(i);
        }
        //上一级路由或参数不同的当前路由
        let p1 = null;
        //上二级路由或参数不同路由的上一级路由
        let p2 = null;
        if (arr2 && i > 0) {
            // 可能存在空路由，需要向前遍历
            for (let j = i - 1; j >= 0; j--) {
                if (!p1) {
                    if (arr2[j].module) {
                        p1 = arr2[j];
                        continue;
                    }
                }
                else if (!p2) {
                    if (arr2[j].module) {
                        p2 = arr2[j];
                        break;
                    }
                }
            }
        }
        return [p1, retArr1, retArr2, p2];
    }
    /**
     * 添加激活字段
     * @param module    模块
     * @param path      路由路径
     * @param model     激活字段所在model
     * @param field     字段名
     */
    static addActiveField(module, path, model, field) {
        if (!model || !field) {
            return;
        }
        let arr = Router.activeFieldMap.get(module.id);
        if (!arr) { //尚未存在，新建
            Router.activeFieldMap.set(module.id, [{ path: path, model: model, field: field }]);
        }
        else if (arr.find(item => item.model === model && item.field === field) === undefined) { //不重复添加
            arr.push({ path: path, model: model, field: field });
        }
    }
    /**
     * 依赖模块相关处理
     * @param module 	模块
     * @param pm        依赖模块
     * @param path 		view对应的route路径
     */
    static dependHandle(module, route, pm) {
        const me = this;
        //激活
        module.active();
        //设置参数
        let o = {
            path: route.path
        };
        if (!Util.isEmpty(route.data)) {
            o['data'] = route.data;
        }
        module.model['$route'] = o;
        if (pm) {
            if (pm.state === 4) { //被依赖模块处于渲染后状态
                module.setContainer(pm.getNode(Router.routerKeyMap.get(pm.id)));
                this.setDomActive(pm, route.fullPath);
            }
            else { //被依赖模块不处于被渲染后状态
                pm.addRenderOps(function (m, p) {
                    module.setContainer(m.getNode(Router.routerKeyMap.get(m.id)));
                    me.setDomActive(m, p);
                }, 1, [pm, route.fullPath], true);
            }
        }
    }
    /**
     * 设置路由元素激活属性
     * @param module    模块
     * @param path      路径
     * @returns
     */
    static setDomActive(module, path) {
        let arr = Router.activeFieldMap.get(module.id);
        if (!arr) {
            return;
        }
        for (let o of arr) {
            o.model[o.field] = o.path === path;
        }
    }
    /**
     * 添加路由
     * @param route 	路由配置
     * @param parent 	父路由
     */
    static addRoute(route, parent) {
        //建立根(空路由)
        if (!this.root) {
            this.root = new Route();
        }
        let pathArr = route.path.split('/');
        let node = parent || this.root;
        let param = [];
        let paramIndex = -1; //最后一个参数开始
        let prePath = ''; //前置路径
        for (let i = 0; i < pathArr.length; i++) {
            let v = pathArr[i].trim();
            if (v === '') {
                pathArr.splice(i--, 1);
                continue;
            }
            if (v.startsWith(':')) { //参数
                if (param.length === 0) {
                    paramIndex = i;
                }
                param.push(v.substr(1));
            }
            else {
                paramIndex = -1;
                param = []; //上级路由的参数清空
                route.path = v; //暂存path
                let j = 0;
                for (; j < node.children.length; j++) {
                    let r = node.children[j];
                    if (r.path === v) {
                        node = r;
                        break;
                    }
                }
                //没找到，创建新节点
                if (j === node.children.length) {
                    if (prePath !== '') {
                        new Route({ path: prePath, parent: node });
                        node = node.children[node.children.length - 1];
                    }
                    prePath = v;
                }
            }
            //不存在参数
            if (paramIndex === -1) {
                route.params = [];
            }
            else {
                route.params = param;
            }
        }
        //添加到树
        if (node !== undefined && node !== route) {
            route.path = prePath;
            node.addChild(route);
        }
        // 添加到路由map    
        this.routeMap.set(route.id, route);
    }
    /**
     * 获取路由数组
     * @param path 	要解析的路径
     * @param clone 是否clone，如果为false，则返回路由树的路由对象，否则返回克隆对象
     * @returns     路由对象数组
     */
    static getRouteList(path, clone) {
        if (!this.root) {
            return [];
        }
        let pathArr = path.split('/');
        let node = this.root;
        let paramIndex = 0; //参数索引
        let retArr = [];
        let fullPath = ''; //完整路径
        let preNode = this.root; //前一个节点
        for (let i = 0; i < pathArr.length; i++) {
            let v = pathArr[i].trim();
            if (v === '') {
                continue;
            }
            let find = false;
            for (let j = 0; j < node.children.length; j++) {
                if (node.children[j].path === v) {
                    //设置完整路径
                    if (preNode !== this.root) {
                        preNode.fullPath = fullPath;
                        preNode.data = node.data;
                        retArr.push(preNode);
                    }
                    //设置新的查找节点
                    node = clone ? node.children[j].clone() : node.children[j];
                    //参数清空
                    node.data = {};
                    preNode = node;
                    find = true;
                    //参数索引置0
                    paramIndex = 0;
                    break;
                }
            }
            //路径叠加
            fullPath += '/' + v;
            //不是孩子节点,作为参数
            if (!find) {
                if (paramIndex < node.params.length) { //超出参数长度的废弃
                    node.data[node.params[paramIndex++]] = v;
                }
            }
        }
        //最后一个节点
        if (node !== this.root) {
            node.fullPath = fullPath;
            retArr.push(node);
        }
        return retArr;
    }
}
/**
 * 路由map
 */
Router.routeMap = new Map();
/**
 * path等待链表
 */
Router.waitList = [];
/**
 * 启动方式 0:直接启动 1:popstate 启动
 */
Router.startStyle = 0;
/**
 * 激活Dom map，格式为{moduleId:[]}
 */
Router.activeFieldMap = new Map();
/**
 * 绑定到module的router指令对应的key，即router容器对应的key，格式为 {moduleId:routerKey,...}
 */
Router.routerKeyMap = new Map();
//处理popstate事件
window.addEventListener('popstate', function (e) {
    //根据state切换module
    const state = history.state;
    if (!state) {
        return;
    }
    Router.startStyle = 1;
    Router.go(state);
});

/**
 * 路由类
 */
class Route {
    /**
     *
     * @param config 路由配置项
     */
    constructor(config) {
        /**
         * 路由参数名数组
         */
        this.params = [];
        /**
         * 路由参数数据
         */
        this.data = {};
        /**
         * 子路由
         */
        this.children = [];
        if (!config || Util.isEmpty(config.path)) {
            return;
        }
        //参数赋值
        for (let o in config) {
            this[o] = config[o];
        }
        this.id = Util.genId();
        Router.addRoute(this, config.parent);
        //子路由
        if (config.routes && Array.isArray(config.routes)) {
            config.routes.forEach((item) => {
                item.parent = this;
                new Route(item);
            });
        }
    }
    /**
     * 添加子路由
     * @param child
     */
    addChild(child) {
        this.children.push(child);
        child.parent = this;
    }
    /**
     * 克隆
     * @returns 克隆对象
     */
    clone() {
        let r = new Route();
        Object.getOwnPropertyNames(this).forEach(item => {
            if (item === 'data') {
                return;
            }
            r[item] = this[item];
        });
        if (this.data) {
            r.data = Util.clone(this.data);
        }
        return r;
    }
}

/**
 * 调度器，用于每次空闲的待操作序列调度
 */
class Scheduler {
    static dispatch() {
        Scheduler.tasks.forEach((item) => {
            if (Util.isFunction(item.func)) {
                if (item.thiser) {
                    item.func.call(item.thiser);
                }
                else {
                    item.func();
                }
            }
        });
    }
    /**
     * 启动调度器
     * @param scheduleTick 	渲染间隔
     */
    static start(scheduleTick) {
        Scheduler.dispatch();
        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(Scheduler.start);
        }
        else {
            window.setTimeout(Scheduler.start, scheduleTick || 50);
        }
    }
    /**
     * 添加任务
     * @param foo 		任务和this指向
     * @param thiser 	this指向
     */
    static addTask(foo, thiser) {
        if (!Util.isFunction(foo)) {
            throw new NError("invoke", "Scheduler.addTask", "0", "function");
        }
        Scheduler.tasks.push({ func: foo, thiser: thiser });
    }
    /**
     * 移除任务
     * @param foo 	任务
     */
    static removeTask(foo) {
        if (!Util.isFunction(foo)) {
            throw new NError("invoke", "Scheduler.removeTask", "0", "function");
        }
        let ind = -1;
        if ((ind = Scheduler.tasks.indexOf(foo)) !== -1) {
            Scheduler.tasks.splice(ind, 1);
        }
    }
}
Scheduler.tasks = [];

/**
 * 新建store方法
 */
/**
 * nodom提示消息
 */
var NodomMessage;
/**
 * 新建一个App
 * @param clazz     模块类
 * @param el        el选择器
 */
function nodom(clazz, el) {
    //渲染器启动渲染
    Scheduler.addTask(Renderer.render, Renderer);
    //启动调度器
    Scheduler.start();
    NodomMessage = NodomMessage_en;
    let mdl = ModuleFactory.get(clazz);
    mdl.setContainer(document.querySelector(el));
    mdl.active();
}
/**
 * 暴露的创建路由方法
 * @param config  数组或单个配置
 */
function createRoute(config) {
    if (Util.isArray(config)) {
        for (let item of config) {
            new Route(item);
        }
    }
    else {
        return new Route(config);
    }
}
/**
 * 创建指令
 * @param name      指令名
 * @param priority  优先级（1最小，1-10为框架保留优先级）
 * @param init      初始化方法
 * @param handler   渲染时方法
 */
function createDirective(name, handler, priority) {
    return DirectiveManager.addType(name, handler, priority);
}
/**
 * 注册模块
 * @param clazz     模块类
 * @param name      注册名，如果没有，则为类名
 */
function registModule(clazz, name) {
    ModuleFactory.addClass(clazz, name);
}
/**
 * ajax 请求
 * @param config    object 或 string
 *                  如果为string，则直接以get方式获取资源
 *                  object 项如下:
 *                  参数名|类型|默认值|必填|可选值|描述
 *                  -|-|-|-|-|-
 *                  url|string|无|是|无|请求url
 *					method|string|GET|否|GET,POST,HEAD|请求类型
 *					params|Object/FormData|{}|否|无|参数，json格式
 *					async|bool|true|否|true,false|是否异步
 *  				timeout|number|0|否|无|请求超时时间
 *                  type|string|text|否|json,text|
 *					withCredentials|bool|false|否|true,false|同源策略，跨域时cookie保存
 *                  header|Object|无|否|无|request header 对象
 *                  user|string|无|否|无|需要认证的请求对应的用户名
 *                  pwd|string|无|否|无|需要认证的请求对应的密码
 *                  rand|bool|无|否|无|请求随机数，设置则浏览器缓存失效
 */
function request(config) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (typeof config === 'string') {
                config = {
                    url: config
                };
            }
            config.params = config.params || {};
            //随机数
            if (config.rand) { //针对数据部分，仅在app中使用
                config.params.$rand = Math.random();
            }
            let url = config.url;
            const async = config.async === false ? false : true;
            const req = new XMLHttpRequest();
            //设置同源策略
            req.withCredentials = config.withCredentials;
            //类型默认为get
            const method = (config.method || 'GET').toUpperCase();
            //超时，同步时不能设置
            req.timeout = async ? config.timeout : 0;
            req.onload = () => {
                if (req.status === 200) {
                    let r = req.responseText;
                    if (config.type === 'json') {
                        try {
                            r = JSON.parse(r);
                        }
                        catch (e) {
                            reject({ type: "jsonparse" });
                        }
                    }
                    resolve(r);
                }
                else {
                    reject({ type: 'error', url: url });
                }
            };
            req.ontimeout = () => reject({ type: 'timeout' });
            req.onerror = () => reject({ type: 'error', url: url });
            //上传数据
            let data = null;
            switch (method) {
                case 'GET':
                    //参数
                    let pa;
                    if (Util.isObject(config.params)) {
                        let ar = [];
                        Util.getOwnProps(config.params).forEach(function (key) {
                            ar.push(key + '=' + config.params[key]);
                        });
                        pa = ar.join('&');
                    }
                    if (pa !== undefined) {
                        if (url.indexOf('?') !== -1) {
                            url += '&' + pa;
                        }
                        else {
                            url += '?' + pa;
                        }
                    }
                    break;
                case 'POST':
                    if (config.params instanceof FormData) {
                        data = config.params;
                    }
                    else {
                        let fd = new FormData();
                        for (let o in config.params) {
                            fd.append(o, config.params[o]);
                        }
                        data = fd;
                    }
                    break;
            }
            req.open(method, url, async, config.user, config.pwd);
            //设置request header
            if (config.header) {
                Util.getOwnProps(config.header).forEach((item) => {
                    req.setRequestHeader(item, config.header[item]);
                });
            }
            req.send(data);
        }).catch((re) => {
            switch (re.type) {
                case "error":
                    throw new NError("notexist1", NodomMessage.TipWords['resource'], re.url);
                case "timeout":
                    throw new NError("timeout");
                case "jsonparse":
                    throw new NError("jsonparse");
            }
        });
    });
}

/**
 * 异常处理类
 * @since       1.0.0
 */
class NError extends Error {
    constructor(errorName, p1, p2, p3, p4) {
        super(errorName);
        let msg = NodomMessage.ErrorMsgs[errorName];
        if (msg === undefined) {
            this.message = "未知错误";
            return;
        }
        //复制请求参数
        let params = [msg];
        for (let i = 1; i < arguments.length; i++) {
            params.push(arguments[i]);
        }
        this.message = Util.compileStr.apply(null, params);
    }
}

/**
 * 基础服务库
 * @since       1.0.0
 */
class Util {
    //唯一主键
    static genId() {
        return this.generatedId++;
    }
    /**
     * 初始化保留词map
     */
    static initKeyMap() {
        this.keyWordMap.set('arguments', true);
        this.keyWordMap.set('boolean', true);
        this.keyWordMap.set('break', true);
        this.keyWordMap.set('byte', true);
        this.keyWordMap.set('catch', true);
        this.keyWordMap.set('char', true);
        this.keyWordMap.set('const', true);
        this.keyWordMap.set('default', true);
        this.keyWordMap.set('delete', true);
        this.keyWordMap.set('do', true);
        this.keyWordMap.set('double', true);
        this.keyWordMap.set('else', true);
        this.keyWordMap.set('enum', true);
        this.keyWordMap.set('eval', true);
        this.keyWordMap.set('false', true);
        this.keyWordMap.set('float', true);
        this.keyWordMap.set('for', true);
        this.keyWordMap.set('function', true);
        this.keyWordMap.set('goto', true);
        this.keyWordMap.set('if', true);
        this.keyWordMap.set('in', true);
        this.keyWordMap.set('instanceof', true);
        this.keyWordMap.set('int', true);
        this.keyWordMap.set('let', true);
        this.keyWordMap.set('long', true);
        this.keyWordMap.set('new', true);
        this.keyWordMap.set('null', true);
        this.keyWordMap.set('return', true);
        this.keyWordMap.set('short', true);
        this.keyWordMap.set('switch', true);
        this.keyWordMap.set('this', true);
        this.keyWordMap.set('throw', true);
        this.keyWordMap.set('true', true);
        this.keyWordMap.set('try', true);
        this.keyWordMap.set('this', true);
        this.keyWordMap.set('throw', true);
        this.keyWordMap.set('typeof', true);
        this.keyWordMap.set('var', true);
        this.keyWordMap.set('while', true);
        this.keyWordMap.set('with', true);
        this.keyWordMap.set('Array', true);
        this.keyWordMap.set('Date', true);
        this.keyWordMap.set('Set', true);
        this.keyWordMap.set('Map', true);
        this.keyWordMap.set('eval', true);
        this.keyWordMap.set('function', true);
        this.keyWordMap.set('Infinity', true);
        this.keyWordMap.set('isFinite', true);
        this.keyWordMap.set('isNaN', true);
        this.keyWordMap.set('isPrototypeOf', true);
        this.keyWordMap.set('Math', true);
        this.keyWordMap.set('NaN', true);
        this.keyWordMap.set('Number', true);
        this.keyWordMap.set('Object', true);
        this.keyWordMap.set('prototype', true);
        this.keyWordMap.set('String', true);
        this.keyWordMap.set('isPrototypeOf', true);
        this.keyWordMap.set('undefined', true);
        this.keyWordMap.set('valueOf', true);
    }
    /**
     * 是否为 js 保留关键字
     * @param name  名字
     * @returns     如果为保留字，则返回true，否则返回false
     */
    static isKeyWord(name) {
        return this.keyWordMap.has(name);
    }
    /******对象相关******/
    /**
     * 对象复制
     * @param srcObj    源对象
     * @param expKey    不复制的键正则表达式或名
     * @param extra     clone附加参数
     * @returns         复制的对象
     */
    static clone(srcObj, expKey, extra) {
        let me = this;
        let map = new WeakMap();
        return clone(srcObj, expKey, extra);
        /**
         * clone对象
         * @param src   待clone对象
         * @param extra clone附加参数
         * @returns     克隆后的对象
         */
        function clone(src, expKey, extra) {
            //非对象或函数，直接返回            
            if (!src || typeof src !== 'object' || Util.isFunction(src)) {
                return src;
            }
            let dst;
            //带有clone方法，则直接返回clone值
            if (src.clone && Util.isFunction(src.clone)) {
                return src.clone(extra);
            }
            else if (me.isObject(src)) {
                dst = new Object();
                //把对象加入map，如果后面有新克隆对象，则用新克隆对象进行覆盖
                map.set(src, dst);
                Object.getOwnPropertyNames(src).forEach((prop) => {
                    //不克隆的键
                    if (expKey) {
                        if (expKey.constructor === RegExp && expKey.test(prop) //正则表达式匹配的键不复制
                            || Util.isArray(expKey) && expKey.includes(prop) //被排除的键不复制
                        ) {
                            return;
                        }
                    }
                    dst[prop] = getCloneObj(src[prop], expKey, extra);
                });
            }
            else if (me.isMap(src)) {
                dst = new Map();
                //把对象加入map，如果后面有新克隆对象，则用新克隆对象进行覆盖
                src.forEach((value, key) => {
                    //不克隆的键
                    if (expKey) {
                        if (expKey.constructor === RegExp && expKey.test(key) //正则表达式匹配的键不复制
                            || expKey.includes(key)) { //被排除的键不复制
                            return;
                        }
                    }
                    dst.set(key, getCloneObj(value, expKey, extra));
                });
            }
            else if (me.isArray(src)) {
                dst = new Array();
                //把对象加入map，如果后面有新克隆对象，则用新克隆对象进行覆盖
                src.forEach(function (item, i) {
                    dst[i] = getCloneObj(item, expKey, extra);
                });
            }
            return dst;
        }
        /**
         * 获取clone对象
         * @param value     待clone值
         * @param expKey    排除键
         * @param extra     附加参数
         */
        function getCloneObj(value, expKey, extra) {
            if (typeof value === 'object' && !Util.isFunction(value)) {
                let co = null;
                if (!map.has(value)) { //clone新对象
                    co = clone(value, expKey, extra);
                }
                else { //从map中获取对象
                    co = map.get(value);
                }
                return co;
            }
            return value;
        }
    }
    /**
     * 合并多个对象并返回
     * @param   参数数组
     * @returns 返回对象
     */
    static merge(o1, o2, o3, o4, o5, o6) {
        let me = this;
        for (let i = 0; i < arguments.length; i++) {
            if (!this.isObject(arguments[i])) {
                throw new NError('invoke', 'Util.merge', i + '', 'object');
            }
        }
        let retObj = Object.assign.apply(null, arguments);
        subObj(retObj);
        return retObj;
        //处理子对象
        function subObj(obj) {
            for (let o in obj) {
                if (me.isObject(obj[o]) || me.isArray(obj[o])) { //对象或数组
                    retObj[o] = me.clone(retObj[o]);
                }
            }
        }
    }
    /**
     * 把obj2对象所有属性赋值给obj1
     */
    static assign(obj1, obj2) {
        if (Object.assign) {
            Object.assign(obj1, obj2);
        }
        else {
            this.getOwnProps(obj2).forEach(function (p) {
                obj1[p] = obj2[p];
            });
        }
        return obj1;
    }
    /**
     * 比较两个对象值是否相同(只比较object和array)
     * @param src   源对象
     * @param dst   目标对象
     * @returns     值相同则返回true，否则返回false
     */
    static compare(src, dst, deep) {
        if (!src && !dst) {
            return true;
        }
        if (typeof src !== 'object' || typeof dst !== 'object') {
            return false;
        }
        const keys = Object.getOwnPropertyNames(src);
        if (keys.length !== Object.getOwnPropertyNames(dst).length) {
            return false;
        }
        for (let k of keys) {
            if (src[k] !== dst[k]) {
                return false;
            }
        }
        //深度比较
        if (deep) {
            for (let k of keys) {
                let r = this.compare(src[k], dst[k]);
                if (!r) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * 获取对象自有属性
     */
    static getOwnProps(obj) {
        if (!obj) {
            return [];
        }
        return Object.getOwnPropertyNames(obj);
    }
    /**************对象判断相关************/
    /**
     * 是否为函数
     * @param foo   检查的对象
     * @returns     true/false
     */
    static isFunction(foo) {
        return foo !== undefined && foo !== null && foo.constructor === Function;
    }
    /**
     * 是否为数组
     * @param obj   检查的对象
     * @returns     true/false
     */
    static isArray(obj) {
        return Array.isArray(obj);
    }
    /**
     * 判断是否为map
     * @param obj
     */
    static isMap(obj) {
        return obj !== null && obj !== undefined && obj.constructor === Map;
    }
    /**
     * 是否为对象
     * @param obj   检查的对象
     * @returns true/false
     */
    static isObject(obj) {
        return obj !== null && obj !== undefined && obj.constructor === Object;
    }
    /**
     * 判断是否为整数
     * @param v 检查的值
     * @returns true/false
     */
    static isInt(v) {
        return Number.isInteger(v);
    }
    /**
     * 判断是否为number
     * @param v 检查的值
     * @returns true/false
     */
    static isNumber(v) {
        return typeof v === 'number';
    }
    /**
     * 判断是否为boolean
     * @param v 检查的值
     * @returns true/false
     */
    static isBoolean(v) {
        return typeof v === 'boolean';
    }
    /**
     * 判断是否为字符串
     * @param v 检查的值
     * @returns true/false
     */
    static isString(v) {
        return typeof v === 'string';
    }
    /**
     * 是否为数字串
     * @param v 检查的值
     * @returns true/false
     */
    static isNumberString(v) {
        return /^\d+\.?\d*$/.test(v);
    }
    /**
     * 对象/字符串是否为空
     * @param obj   检查的对象
     * @returns     true/false
     */
    static isEmpty(obj) {
        if (obj === null || obj === undefined)
            return true;
        let tp = typeof obj;
        if (this.isObject(obj)) {
            let keys = Object.keys(obj);
            if (keys !== undefined) {
                return keys.length === 0;
            }
        }
        else if (tp === 'string') {
            return obj === '';
        }
        return false;
    }
    /**
     * 把srcNode替换为nodes
     * @param srcNode       源dom
     * @param nodes         替换的dom或dom数组
     */
    static replaceNode(srcNode, nodes) {
        // if (!this.isNode(srcNode)) {
        //     throw new NError('invoke', 'this.replaceNode', '0', 'Node');
        // }
        // if (!this.isNode(nodes) && !this.isArray(nodes)) {
        //     throw new NError('invoke1', 'this.replaceNode', '1', 'Node', 'Node Array');
        // }
        let pnode = srcNode.parentNode;
        let bnode = srcNode.nextSibling;
        if (pnode === null) {
            return;
        }
        pnode.removeChild(srcNode);
        const nodeArr = this.isArray(nodes) ? nodes : [nodes];
        nodeArr.forEach(function (node) {
            if (bnode === undefined || bnode === null) {
                pnode.appendChild(node);
            }
            else {
                pnode.insertBefore(node, bnode);
            }
        });
    }
    /**
     * 清空子节点
     * @param el
     */
    static empty(el) {
        let nodes = el.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            el.removeChild(nodes[i]);
        }
    }
    /******日期相关******/
    /**
     * 日期格式化
     * @param srcDate   时间戳串
     * @param format    日期格式
     * @returns          日期串
     */
    static formatDate(srcDate, format) {
        //时间戳
        let timeStamp;
        if (this.isString(srcDate)) {
            //排除日期格式串,只处理时间戳
            let reg = /^\d+$/;
            if (reg.test(srcDate) === true) {
                timeStamp = parseInt(srcDate);
            }
        }
        else if (this.isNumber(srcDate)) {
            timeStamp = srcDate;
        }
        else {
            throw new NError('invoke', 'this.formatDate', '0', 'date string', 'date');
        }
        //得到日期
        let date = new Date(timeStamp);
        // invalid date
        if (isNaN(date.getDay())) {
            return '';
        }
        let o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒
        };
        //年
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        //月日
        this.getOwnProps(o).forEach(function (k) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        });
        //星期
        if (/(E+)/.test(format)) {
            format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + NodomMessage.WeekDays[date.getDay() + ""]);
        }
        return format;
    }
    /******字符串相关*****/
    /**
     * 编译字符串，把{n}替换成带入值
     * @param str 待编译的字符串
     * @param args1,args2,args3,... 待替换的参数
     * @returns 转换后的消息
     */
    static compileStr(src, p1, p2, p3, p4, p5) {
        let reg;
        let args = arguments;
        let index = 0;
        for (;;) {
            if (src.indexOf('\{' + index + '\}') !== -1) {
                reg = new RegExp('\\{' + index + '\\}', 'g');
                src = src.replace(reg, args[index + 1]);
                index++;
            }
            else {
                break;
            }
        }
        return src;
    }
    /**
     * 函数调用
     * @param foo   函数
     * @param obj   this指向
     * @param args  参数数组
     */
    static apply(foo, obj, args) {
        if (!foo) {
            return;
        }
        return Reflect.apply(foo, obj || null, args);
    }
    /**
     * 合并并修正路径，即路径中出现'//','///','\/'的情况，统一置换为'/'
     * @param paths 待合并路径数组
     * @returns     返回路径
     */
    static mergePath(paths) {
        return paths.join('/').replace(/(\/{2,})|\\\//g, '\/');
    }
    /**
     * eval
     * @param evalStr   eval串
     * @returns         eval值
     */
    static eval(evalStr) {
        return new Function(`return(${evalStr})`)();
    }
    /**
     * 改造 dom key，避免克隆时重复，格式为：key_id
     * @param node  节点
     * @param id    附加id
     * @param deep  是否深度处理
     */
    static setNodeKey(node, id, deep) {
        node.key += '_' + (id || Util.genId());
        if (deep && node.children) {
            for (let c of node.children) {
                Util.setNodeKey(c, id, deep);
            }
        }
    }
    /**
     * 给dom添加事件
     * @param dom   dom节点
     * @param ev    事件对象
     */
    static addEvent(dom, ev) {
        if (!dom.events) {
            dom.events = {};
        }
        if (!dom.events[ev.name]) {
            dom.events[ev.name] = [ev.id];
        }
        else {
            dom.events[ev.name].push(ev.id);
        }
    }
}
/**
 * 全局id
 */
Util.generatedId = 1;
/**
 * js 保留字 map
 */
Util.keyWordMap = new Map();
//初始化keymap
Util.initKeyMap();

/**
 * 指令类
 */
class Directive {
    /**
     * 构造方法
     * @param type  	类型名
     * @param value 	指令值
     */
    constructor(type, value) {
        this.id = Util.genId();
        if (type) {
            this.type = DirectiveManager.getType(type);
            if (!this.type) {
                throw new NError('notexist1', NodomMessage.TipWords['directive'], type);
            }
        }
        if (Util.isString(value)) {
            this.value = value.trim();
        }
        else if (value instanceof Expression) {
            this.expression = value;
        }
        else {
            this.value = value;
        }
    }
    /**
     * 执行指令
     * @param module    模块
     * @param dom       渲染目标节点对象
     * @param src       源节点
     * @returns         true/false
     */
    exec(module, dom, src) {
        //禁用，不执行
        if (this.disabled) {
            return true;
        }
        if (this.expression) {
            this.value = this.expression.val(module, dom.model);
        }
        return this.type.handle.apply(this, [module, dom, src]);
    }
    /**
     * 设置参数
     * @param module    模块
     * @param dom       指令对应的虚拟dom
     * @param name      参数名
     * @param value     参数值
     */
    setParam(module, dom, name, value) {
        module.objectManager.setDirectiveParam(this.id, dom.key, name, value);
    }
    /**
     * 获取参数值
     * @param module    模块
     * @param dom       指令对应的虚拟dom
     * @param name      参数名
     * @returns         参数值
     */
    getParam(module, dom, name) {
        return module.objectManager.getDirectiveParam(this.id, dom.key, name);
    }
    /**
     * 移除参数
     * @param module    模块
     * @param dom       指令对应的虚拟dom
     * @param name      参数名
     */
    removeParam(module, dom, name) {
        module.objectManager.removeDirectiveParam(this.id, dom.key, name);
    }
    /**
     * 克隆
     */
    clone() {
        let d = new Directive();
        d.type = this.type;
        d.expression = this.expression;
        d.value = this.value;
        return d;
    }
}

class Compiler {
    /**
     * 构造器
     * @param module
     */
    constructor(module) {
        this.elementId = 0;
        this.module = module;
    }
    /**
    * 编译
    * @param elementStr     待编译html串
    * @returns              虚拟dom
    */
    compile(elementStr) {
        return this.compileTemplate(elementStr);
    }
    /**
     * 编译模版串
     * @param srcStr    源串
     * @returns
     */
    compileTemplate(srcStr) {
        // 清理comment
        let regExp = /\<\!\-\-[\s\S]*?\-\-\>/g;
        srcStr = srcStr.replace(regExp, '');
        //不可见字符正则式
        const regSpace = /^[\s\n\r\t\v]+$/;
        // 1 识别标签
        regExp = /(?<!{{[^}}]*)(?:<(\/?)\s*?([a-zA-Z][a-zA-Z0-9-_]*)([\s\S]*?)(\/?)(?<!=)>)(?![^{{]*}})/g;
        let st = 0;
        //标签串数组,含开始和结束标签
        let tagStack = [];
        //独立文本串数组，对应需要的标签串前面
        let textStack = [];
        //pre标签标志
        let isPreTag = false;
        let r;
        while ((r = regExp.exec(srcStr)) !== null) {
            tagStack.push(r[0]);
            //处理标签之间的文本
            let tmp = '';
            if (st < r.index - 1) {
                tmp = srcStr.substring(st, r.index);
                //全为不可见字符，则保存空字符串
                if (!isPreTag && regSpace.test(tmp)) {
                    tmp = '';
                }
            }
            textStack.push(tmp);
            st = regExp.lastIndex;
        }
        // 标签名数组
        let tagNames = [];
        // 标签对象数组
        let tagObjs = [];
        // 根节点
        let root;
        tagStack.forEach((tag, ii) => {
            //开始标签名
            let stg;
            if (tag.startsWith('</')) { //结束标签
                let etg = tag.substring(2, tag.length - 1).trim();
                let chds = [];
                //找到对应此结束标签的开始标签
                for (let i = ii; tagNames.length > 0; i--) {
                    // 结束标签前面的非空文本节点作为孩子
                    if (i >= 0 && textStack[i] !== '') {
                        chds.push(this.handleText(textStack[i]));
                        // 文本已使用，置为空
                        textStack[i] = '';
                    }
                    if ((stg = tagNames.pop()) === etg) {
                        break;
                    }
                    //当前节点及其子节点同时作为孩子节点
                    let tobj = tagObjs.pop();
                    chds = tobj.children.concat(chds);
                    chds.unshift(tobj);
                }
                //找到节点
                if (stg === etg) {
                    // 添加到父节点
                    let po = tagObjs.pop();
                    po.children = (po.children || []).concat(chds);
                    this.handleSlot(po);
                    if (tagObjs.length > 0) {
                        tagObjs[tagObjs.length - 1].add(po);
                    }
                    if (isPreTag && etg === 'pre') {
                        isPreTag = false;
                    }
                }
                else {
                    throw new NError('wrongTempate');
                }
            }
            else { //标签头
                //去掉标签前后< >
                let tmpS = tag.endsWith('\/>') ? tag.substring(1, tag.length - 2) : tag.substring(1, tag.length - 1);
                //处理标签头，返回dom节点和原始标签名
                const [dom, tagName] = this.handleTag(tmpS.trim());
                //设置pre标签标志
                if (tagName === 'pre') {
                    isPreTag = true;
                }
                //前一个文本节点存在，则作为前一个节点的孩子
                if (ii > 0 && textStack[ii] !== '') {
                    tagObjs[tagObjs.length - 1].add(this.handleText(textStack[ii]));
                    textStack[ii] = '';
                }
                if (!tag.endsWith('\/>')) { // 非自闭合
                    //标签头入栈
                    tagNames.push(tagName);
                    tagObjs.push(dom);
                }
                else { //自闭合，直接作为前一个的孩子节点
                    if (tagObjs.length > 0) {
                        tagObjs[tagObjs.length - 1].children.push(dom);
                    }
                }
                //设置根节点
                if (!root) {
                    root = dom;
                }
            }
        });
        if (tagNames.length > 0) {
            throw new NError('wrongTempate');
        }
        return root;
    }
    /**
     * 处理标签属性
     * @param tagStr    标签串
     * @returns         [虚拟dom节点,原始标签名]
     */
    handleTag(tagStr) {
        const me = this;
        let ele;
        //字符串和表达式替换
        const reg = /('[\s\S]*?')|("[\s\S]*?")|(`[\s\S]*?`)|({{[\S\s]*?\}{0,2}\s*}})|([\w$-]+(\s*=)?)/g;
        let pName;
        //标签原始名
        let tagName;
        let startValue;
        let r;
        let allModelField = true;
        //属性名正则式
        const regName = /[a-zA-Z$_]\S*/;
        while ((r = reg.exec(tagStr)) !== null) {
            let s = r[0];
            if (regName.test(s)) { //属性名
                if (!tagName) {
                    tagName = s;
                    ele = new VirtualDom(tagName, me.genKey());
                }
                else if (s.endsWith('=')) { //带等号
                    if (pName) { //前一个属性名存在，设置空值
                        setValue();
                    }
                    pName = s.substring(0, s.length - 1).trim();
                    startValue = true;
                }
                else if (!pName) { //不带等号
                    pName = s;
                }
                else if (startValue) { //属性名存在，设置属性值
                    setValue(s);
                }
            }
            else { //属性值
                if (pName && startValue) {
                    setValue(s);
                }
            }
        }
        //存在空属性
        if (pName) {
            setValue();
        }
        //后置处理
        this.postHandleNode(ele);
        ele.sortDirective();
        ele.allModelField = allModelField;
        return [ele, tagName];
        /**
         * 设置属性值
         * @param value     属性值
         */
        function setValue(value) {
            if (value) {
                let r;
                //去掉字符串两端
                if (((r = /((?<=^')(.*?)(?='$))|((?<=^")(.*?)(?="$)|((?<=^`)(.*?)(?=`$)))/.exec(value)) !== null)) {
                    value = r[0].trim();
                }
                //表达式编译
                if (/^\{\{[\S\s]*\}\}$/.test(value)) {
                    value = me.compileExpression(value, ele)[0];
                    allModelField = value.allModelField;
                }
            }
            //指令
            if (pName.startsWith("x-")) {
                //不排序
                ele.addDirective(new Directive(pName.substr(2), value));
            }
            else if (pName.startsWith("e-")) { //事件
                ele.addEvent(new NEvent(pName.substr(2), value));
            }
            else { //普通属性
                ele.setProp(pName, value);
            }
            pName = undefined;
            startValue = false;
        }
    }
    /**
     * 处理模块子节点为slot节点
     * @param dom   dom节点
     */
    handleSlot(dom) {
        if (dom.hasDirective('module')) { //po为子模块，其所有子模块判断是否加上slot
            let slotCt;
            for (let j = 0; j < dom.children.length; j++) {
                let c = dom.children[j];
                if (c.hasDirective('slot')) { //带slot的不处理
                    continue;
                }
                if (!slotCt) { //第一个直接被slotCt替换
                    slotCt = new VirtualDom('div', this.genKey());
                    slotCt.addDirective(new Directive('slot', null));
                    //当前位置，用slot替代
                    dom.children.splice(j, 1, slotCt);
                }
                else {
                    //直接删除
                    dom.children.splice(j--, 1);
                }
                slotCt.add(c);
            }
        }
    }
    /**
     * 编译txt为文本节点
     * @param txt 文本串
     */
    handleText(txt) {
        let ele = new VirtualDom(null, this.genKey());
        txt = this.preHandleText(txt);
        if (/\{\{[\s\S]+\}\}/.test(txt)) { //检查是否含有表达式
            ele.expressions = this.compileExpression(txt, ele);
        }
        else {
            ele.textContent = txt;
        }
        return ele;
    }
    /**
     * 处理表达式串
     * @param exprStr   含表达式的串
     * @return          处理后的字符串和表达式数组
     */
    compileExpression(exprStr, dom) {
        if (!exprStr) {
            return;
        }
        let reg = /\{\{[\s\S]+?\}?\s*\}\}/g;
        let retA = new Array();
        let re;
        let oIndex = 0;
        while ((re = reg.exec(exprStr)) !== null) {
            let ind = re.index;
            //字符串
            if (ind > oIndex) {
                let s = exprStr.substring(oIndex, ind);
                retA.push(s);
            }
            //实例化表达式对象
            let exp = new Expression(this.module, re[0].substring(2, re[0].length - 2));
            dom.allModelField = exp.allModelField;
            //加入数组
            retA.push(exp);
            oIndex = ind + re[0].length;
        }
        //最后的字符串
        if (oIndex < exprStr.length - 1) {
            retA.push(exprStr.substr(oIndex));
        }
        return retA;
    }
    /**
     * 后置处理
     * 包括：模块类元素、自定义元素
     * @param node  虚拟dom节点
     */
    postHandleNode(node) {
        // 模块类判断
        if (ModuleFactory.hasClass(node.tagName)) {
            node.addDirective(new Directive('module', node.tagName));
            node.tagName = 'div';
        }
        else if (DirectiveElementManager.has(node.tagName)) { //自定义元素
            let clazz = DirectiveElementManager.get(node.tagName);
            Reflect.construct(clazz, [node, this.module]);
        }
    }
    /**
     * 预处理html保留字符 如 &nbsp;,&lt;等
     * @param str   待处理的字符串
     * @returns     解析之后的串
     */
    preHandleText(str) {
        let reg = /&[a-z]+;/;
        if (reg.test(str)) {
            let div = document.createElement('div');
            div.innerHTML = str;
            return div.textContent;
        }
        return str;
    }
    /**
     * 产生可以
     * @returns     key
     */
    genKey() {
        // return this.module.id + '_' + this.elementId++;
        return this.elementId++ + '';
    }
}

/**
 * 比较器
 */
class DiffTool {
    /**
     * 比较节点
     * @param src           待比较节点（渲染后节点）
     * @param dst 	        被比较节点
     * @param changeArr     增删改的节点数组
     * @returns	            [[type(add 1, upd 2,del 3,move 4 ,rep 5),dom(操作节点),dom1(被替换或修改节点),parent(父节点),loc(位置)]]
     */
    static compare(src, dst, changeArr) {
        if (!src.tagName) { //文本节点
            if (!dst.tagName) {
                if ((src.staticNum || dst.staticNum) && src.textContent !== dst.textContent) {
                    addChange(2, src, null, dst.parent);
                }
            }
            else { //节点类型不同
                addChange(5, src, null, dst.parent);
            }
        }
        else { //element节点
            if (src.tagName !== dst.tagName) { //节点类型不同
                addChange(5, src, null, dst.parent);
            }
            else if (src.staticNum || dst.staticNum) { //节点类型相同，但有一个不是静态节点，进行属性和asset比较
                let change = false;
                for (let p of ['props', 'assets']) {
                    //属性比较
                    if (src[p] && dst[p] || src[p] && !dst[p]) {
                        change = true;
                    }
                    else if (src[p] && dst[p]) {
                        if (Object.keys(src[p]).length !== Object.keys(dst[p]).length) {
                            change = true;
                        }
                        else {
                            for (let k in src[p]) {
                                if (src[p][k] !== dst[p][k]) {
                                    change = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (change) {
                        addChange(2, src, null, dst.parent);
                    }
                }
            }
        }
        if (src.staticNum > 0) {
            src.staticNum--;
        }
        //子节点处理
        if (!src.children || src.children.length === 0) {
            // 旧节点的子节点全部删除
            if (dst.children && dst.children.length > 0) {
                dst.children.forEach(item => addChange(3, item, null, dst));
            }
        }
        else {
            //全部新加节点
            if (!dst.children || dst.children.length === 0) {
                src.children.forEach(item => addChange(1, item, null, dst));
            }
            else { //都有子节点
                //存储比较后需要add的key
                let addObj = {};
                //子节点对比策略
                let [oldStartIdx, oldStartNode, oldEndIdx, oldEndNode] = [0, dst.children[0], dst.children.length - 1, dst.children[dst.children.length - 1]];
                let [newStartIdx, newStartNode, newEndIdx, newEndNode] = [0, src.children[0], src.children.length - 1, src.children[src.children.length - 1]];
                while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
                    if (sameKey(oldStartNode, newStartNode)) {
                        DiffTool.compare(newStartNode, oldStartNode, changeArr);
                        newStartNode = src.children[++newStartIdx];
                        oldStartNode = dst.children[++oldStartIdx];
                    }
                    else if (sameKey(oldEndNode, newEndNode)) {
                        DiffTool.compare(newEndNode, oldEndNode, changeArr);
                        newEndNode = src.children[--newEndIdx];
                        oldEndNode = dst.children[--oldEndIdx];
                    }
                    else if (sameKey(newStartNode, oldEndNode)) {
                        //新前旧后
                        DiffTool.compare(newStartNode, oldEndNode, changeArr);
                        //跳过插入点会提前移动的节点
                        while (addObj.hasOwnProperty(oldStartNode.key)) {
                            changeArr[addObj[oldStartNode.key]][0] = 4;
                            delete addObj[oldStartNode.key];
                            oldStartNode = dst.children[++oldStartIdx];
                        }
                        //接在待操作老节点前面
                        addChange(4, oldEndNode, oldStartNode, dst);
                        newStartNode = src.children[++newStartIdx];
                        oldEndNode = dst.children[--oldEndIdx];
                    }
                    else if (sameKey(newEndNode, oldStartNode)) {
                        DiffTool.compare(newEndNode, oldStartNode, changeArr);
                        //跳过插入点会提前移动的节点
                        while (addObj.hasOwnProperty(oldEndNode.key)) {
                            changeArr[addObj[oldEndNode.key]][0] = 4;
                            delete addObj[oldEndNode.key];
                            oldEndNode = dst.children[--oldEndIdx];
                        }
                        //接在 oldEndIdx 之后，但是再下一个节点可能移动位置，所以记录oldEndIdx节点
                        addChange(4, oldStartNode, oldEndNode, dst, 1);
                        newEndNode = src.children[--newEndIdx];
                        oldStartNode = dst.children[++oldStartIdx];
                    }
                    else {
                        //跳过插入点会提前移动的节点
                        if (addObj.hasOwnProperty(oldStartNode.key)) {
                            while (addObj.hasOwnProperty(oldStartNode.key)) {
                                changeArr[addObj[oldStartNode.key]][0] = 4;
                                delete addObj[oldStartNode.key];
                                oldStartNode = dst.children[++oldStartIdx];
                            }
                            continue; //继续diff，暂不add
                        }
                        //加入到addObj
                        addObj[newStartNode.key] = addChange(1, newStartNode, oldStartNode, dst) - 1;
                        newStartNode = src.children[++newStartIdx];
                    }
                }
                //有新增或删除节点
                if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
                    if (oldStartIdx > oldEndIdx) {
                        //没有老节点
                        for (let i = newStartIdx; i <= newEndIdx; i++) {
                            // 添加到dst.children[i]前面
                            addChange(1, src.children[i], i, dst);
                        }
                    }
                    else {
                        //有老节点，需要删除
                        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                            let ch = dst.children[i];
                            //如果要删除的节点在addArr中，则表示move，否则表示删除
                            if (!addObj.hasOwnProperty(ch.key)) {
                                addChange(3, ch, null, dst);
                            }
                            else {
                                changeArr[addObj[ch.key]][0] = 4;
                            }
                        }
                    }
                }
            }
        }
        /**
         * 是否有相同key
         * @param src   源节点
         * @param dst   目标节点
         * @returns     相同key为true，否则为false
         */
        function sameKey(src, dst) {
            return src.key === dst.key;
        }
        /**
         * 添加刪除替換
        * @param type       类型 add 1, upd 2,del 3,move 4 ,rep 5
        * @param dom        虚拟节点
        * @param dom1       相对节点
        * @param parent     父节点
        * @param extra      move时 0:相对节点前，1:相对节点后
        */
        function addChange(type, dom, dom1, parent, loc) {
            return changeArr.push([type, dom, dom1, parent, loc]);
        }
    }
}

/**
 * 自定义元素
 * 用于扩充定义，主要对ast obj进行前置处理
 */
class DirectiveElement {
    constructor(node, module) {
        if (node.hasProp('tag')) {
            node.tagName = node.getProp('tag');
            node.delProp('tag');
        }
        else {
            node.tagName = 'div';
        }
    }
}

/**
 * 工厂基类
 */
class NFactory {
    /**
     * @param module 模块
     */
    constructor(module) {
        /**
         * 工厂item对象
         */
        this.items = new Map();
        if (module !== undefined) {
            this.moduleId = module.id;
        }
    }
    /**
     * 添加到工厂
     * @param name 	item name
     * @param item	item
     */
    add(name, item) {
        this.items.set(name, item);
    }
    /**
     * 获得item
     * @param name 	item name
     * @returns     item
     */
    get(name) {
        return this.items.get(name);
    }
    /**
     * 从容器移除
     * @param name 	item name
     */
    remove(name) {
        this.items.delete(name);
    }
    /**
     * 是否拥有该项
     * @param name  item name
     * @return      true/false
     */
    has(name) {
        return this.items.has(name);
    }
}

/*
 * 消息js文件 中文文件
 */
const NodomMessage_zh = {
    /**
     * 提示单词
     */
    TipWords: {
        application: "应用",
        system: "系统",
        module: "模块",
        moduleClass: '模块类',
        model: "模型",
        directive: "指令",
        directiveType: "指令类型",
        expression: "表达式",
        event: "事件",
        method: "方法",
        filter: "过滤器",
        filterType: "过滤器类型",
        data: "数据",
        dataItem: '数据项',
        route: '路由',
        routeView: '路由容器',
        plugin: '插件',
        resource: '资源',
        root: '根',
        element: '元素'
    },
    /**
     * 异常信息
     */
    ErrorMsgs: {
        unknown: "未知错误",
        paramException: "{0}'{1}'方法参数错误，请参考api",
        invoke: "{0}方法调用参数{1}必须为{2}",
        invoke1: "{0}方法调用参数{1}必须为{2}或{3}",
        invoke2: "{0}方法调用参数{1}或{2}必须为{3}",
        invoke3: "{0}方法调用参数{1}不能为空",
        exist: "{0}已存在",
        exist1: "{0}'{1}'已存在",
        notexist: "{0}不存在",
        notexist1: "{0}'{1}'不存在",
        notupd: "{0}不可修改",
        notremove: "{0}不可删除",
        notremove1: "{0}{1}不可删除",
        namedinvalid: "{0}{1}命名错误，请参考用户手册对应命名规范",
        initial: "{0}初始化参数错误",
        jsonparse: "JSON解析错误",
        timeout: "请求超时",
        config: "{0}配置参数错误",
        config1: "{0}配置参数'{1}'错误",
        itemnotempty: "{0} '{1}' 配置项 '{2}' 不能为空",
        itemincorrect: "{0} '{1}' 配置项 '{2}' 错误",
        compile1: "{0}标签未闭合",
        compile2: "结束标签{0}未找到与之匹配的开始标签",
        compile3: "请检查模板标签闭合情况，模板需要有一个闭合的根节点",
        wrongTemplate: "模版格式错误"
    },
    /**
     * 表单信息
     */
    FormMsgs: {
        type: "请输入有效的{0}",
        unknown: "输入错误",
        required: "不能为空",
        min: "最小输入值为{0}",
        max: "最大输入值为{0}"
    },
    WeekDays: {
        "0": "日",
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四",
        "5": "五",
        "6": "六"
    }
};

/**
 * 模型工厂
 */
class ModelManager {
    /**
     * 添加到 dataNModelMap
     * @param data      数据对象
     * @param model     模型
     */
    static addToDataMap(data, model) {
        this.dataMap.set(data, model);
    }
    /**
     * 删除从 dataNModelMap
     * @param data      数据对象
     * @param model     模型
     */
    static delFromDataMap(data) {
        this.dataMap.delete(data);
    }
    /**
     * 从dataNModelMap获取model
     * @param data      数据对象
     * @returns         model
     */
    static getFromDataMap(data) {
        return this.dataMap.get(data);
    }
    /**
     * 是否存在数据模型映射
     * @param data  数据对象
     * @returns     true/false
     */
    static hasDataModel(data) {
        return this.dataMap.has(data);
    }
    /**
     * 添加源模型到到模型map
     * @param model     模型代理
     * @param srcNModel  源模型
     */
    static addModel(model, srcNModel) {
        if (!this.modelMap.has(model)) {
            this.modelMap.set(model, { model: srcNModel });
        }
        else {
            this.modelMap.get(model).model = srcNModel;
        }
    }
    /**
   * 删除源模型到到模型map
   * @param model     模型代理
   * @param srcNModel  源模型
   */
    static delModel(model) {
        this.modelMap.delete(model);
    }
    /**
     * 从模型Map获取源数据
     * @param model     模型代理
     * @returns         源模型
     */
    static getData(model) {
        if (this.modelMap.has(model)) {
            return this.modelMap.get(model).data;
        }
        return undefined;
    }
    /**
     * 获取model监听器
     * @param model     model
     * @param key       model对应的属性
     * @param foo       监听处理方法
     * @returns         void
     */
    static addWatcher(model, key, foo) {
        // 把model加入到model map
        if (!this.modelMap.has(model)) {
            this.modelMap.set(model, {});
        }
        let watchers = this.modelMap.get(model).watchers;
        //添加watchers属性
        if (!watchers) {
            watchers = {};
            this.modelMap.get(model).watchers = watchers;
        }
        //添加观察器数组
        if (!watchers[key]) {
            watchers[key] = [foo];
        }
        else {
            //把处理函数加入观察器数组
            watchers[key].push(foo);
        }
    }
    /**
     * 获取model监听器
     * @param model     model
     * @param key       model对应的属性
     * @param foo       监听处理方法
     * @returns         void
     */
    static removeWatcher(model, key, foo) {
        if (!this.modelMap.has(model) || !this.modelMap.get(model).watchers) {
            return;
        }
        let watchers = this.modelMap.get(model).watchers;
        if (!watchers[key]) {
            return;
        }
        let index = watchers[key].findIndex(foo);
        //找到后移除
        if (index !== -1) {
            watchers.splice(index, 1);
        }
    }
    /**
     * 获取model监听器
     * @param model     model
     * @param key       model对应的属性
     * @returns         监听处理函数数组
     */
    static getWatcher(model, key) {
        if (!this.modelMap.has(model)) {
            return;
        }
        let watchers = this.modelMap.get(model).watchers;
        if (watchers) {
            return watchers[key];
        }
    }
    /**
     * 绑定model到module
     * @param model     模型
     * @param module    模块
     * @returns
     */
    static bindToModule(model, module) {
        let obj = this.modelMap.get(model);
        if (!obj) {
            return;
        }
        let mid = typeof module === 'number' ? module : module.id;
        if (!obj.modules) {
            obj.modules = [mid];
        }
        else {
            let arr = obj.modules;
            if (arr.indexOf(mid) === -1) {
                arr.push(mid);
            }
        }
        //级联设置
        Object.getOwnPropertyNames(model).forEach(item => {
            if (typeof model[item] === 'object' && model[item].$key) {
                ModelManager.bindToModule(model[item], module);
            }
        });
    }
    /**
     * 绑定model到多个module
     * @param model     模型
     * @param ids       模块id数组
     * @returns
     */
    static bindToModules(model, ids) {
        let obj = this.modelMap.get(model);
        if (!obj) {
            return;
        }
        if (!obj.modules) {
            obj.modules = ids;
        }
        else {
            let arr = obj.modules;
            for (let mid of ids) {
                if (arr.indexOf(mid) === -1) {
                    arr.push(mid);
                }
            }
        }
        //级联设置
        Object.getOwnPropertyNames(model).forEach(item => {
            if (typeof model[item] === 'object' && model[item].$key) {
                ModelManager.bindToModules(model[item], ids);
            }
        });
    }
    /**
     * model从module解绑
     * @param model     模型
     * @param module    模块
     * @returns
     */
    static unbindFromModule(model, module) {
        let obj = this.modelMap.get(model);
        if (!obj || !obj.modules) {
            return;
        }
        let mid = typeof module === 'number' ? module : module.id;
        let arr = obj.modules;
        let ind;
        if ((ind = arr.indexOf(mid)) === -1) {
            arr.splice(ind);
        }
        //级联解绑
        Object.getOwnPropertyNames(model).forEach(item => {
            if (typeof model[item] === 'object' && model[item].$key) {
                ModelManager.unbindFromModule(model[item], module);
            }
        });
    }
    /**
     * 获取model绑定的moduleId
     * @param model     模型
     * @returns model绑定的模块id数组
     */
    static getModuleIds(model) {
        let obj = this.modelMap.get(model);
        if (!obj) {
            return;
        }
        return obj.modules;
    }
    /**
     * 更新导致渲染
     * 如果不设置oldValue和newValue，则直接强制渲染
     * @param model     model
     * @param key       属性
     * @param oldValue  旧值
     * @param newValue  新值
     * @param force     强制渲染
     */
    static update(model, key, oldValue, newValue, force) {
        //处理观察器函数
        let obj = this.modelMap.get(model);
        if (!obj) {
            return;
        }
        let mids = obj.modules;
        let modules = [];
        for (let mid of mids) {
            let m = ModuleFactory.get(mid);
            modules.push(m);
            //增加修改标志
            m.changedModelMap.set(model.$key, true);
        }
        let watcher = this.getWatcher(model, key);
        if (watcher) {
            for (let foo of watcher) {
                for (let m of modules) {
                    //方法名
                    if (typeof foo === 'string') {
                        foo = m.getMethod(foo);
                        if (foo) {
                            foo.call(m, model, oldValue, newValue);
                        }
                    }
                    else {
                        foo.call(m, model, oldValue, newValue);
                    }
                }
            }
        }
        if (oldValue !== newValue || force) {
            for (let m of modules) {
                Renderer.add(m);
            }
        }
    }
}
// public module: Module;
/**
 * 数据对象与模型映射，key为数据对象，value为model
 */
ModelManager.dataMap = new WeakMap();
/**
 * 模型模块映射
 * key:model proxy, value:{data:data,watchers:{key:[监听器1,监听器2,...]},modules:[id1,id2,...]}
 * 每个数据对象，可有多个监听器
 */
ModelManager.modelMap = new WeakMap();

/**
 * 模型类
 */
class Model {
    /**
     * @param data 		数据
     * @param module 	模块对象
     * @returns         模型代理对象
     */
    constructor(data, module) {
        //模型管理器
        let proxy = new Proxy(data, {
            set: (src, key, value, receiver) => {
                //值未变,proxy 不处理
                if (src[key] === value) {
                    return true;
                }
                //不处理原型属性 
                if (['__proto__', 'constructor'].includes(key)) {
                    return true;
                }
                const excArr = ["$key"];
                //非对象，null，非model更新渲染
                if (typeof value !== 'function' && excArr.indexOf(key) === -1) {
                    ModelManager.update(proxy, key, src[key], value);
                }
                return Reflect.set(src, key, value, receiver);
            },
            get: (src, key, receiver) => {
                let res = Reflect.get(src, key, receiver);
                //数组的sort和fill触发强行渲染
                if (Array.isArray(src) && ['sort', 'fill'].indexOf(key) !== -1) { //强制渲染
                    ModelManager.update(proxy, null, null, null, true);
                }
                let data = ModelManager.getFromDataMap(src[key]);
                if (data) {
                    return data;
                }
                if (res !== null && typeof res === 'object') {
                    //如果是对象，则返回代理，便于后续激活get set方法                   
                    //判断是否已经代理，如果未代理，则增加代理
                    if (!src[key].$key) {
                        let p = new Model(res, module);
                        return p;
                    }
                }
                return res;
            },
            deleteProperty: function (src, key) {
                //如果删除对象，从mm中同步删除
                if (src[key] !== null && typeof src[key] === 'object') {
                    ModelManager.delFromDataMap(src[key]);
                    ModelManager.delModel(src[key]);
                }
                delete src[key];
                ModelManager.update(proxy, key, null, null, true);
                return true;
            }
        });
        proxy.$watch = this.$watch;
        proxy.$get = this.$get;
        proxy.$set = this.$set;
        proxy.$key = Util.genId();
        ModelManager.addToDataMap(data, proxy);
        ModelManager.addModel(proxy, data);
        //绑定到模块
        if (module) {
            ModelManager.bindToModule(proxy, module);
        }
        return proxy;
    }
    /**
     * 观察(取消观察)某个数据项
     * @param key       数据项名
     * @param operate   数据项变化时执行方法名(在module的methods中定义)
     * @param cancel    取消观察
     */
    $watch(key, operate, cancel) {
        let model = this;
        let index = -1;
        //如果带'.'，则只取最里面那个对象
        if ((index = key.lastIndexOf('.')) !== -1) {
            model = this.$get(key.substr(0, index));
            key = key.substr(index + 1);
        }
        if (!model) {
            return;
        }
        if (cancel) {
            ModelManager.removeWatcher(model, key, operate);
        }
        else {
            ModelManager.addWatcher(model, key, operate);
        }
    }
    /**
     * 查询子属性
     * @param key   子属性，可以分级，如 name.firstName
     * @returns     属性对应model proxy
     */
    $get(key) {
        let model = this;
        if (key.indexOf('.') !== -1) { //层级字段
            let arr = key.split('.');
            for (let i = 0; i < arr.length - 1; i++) {
                model = model[arr[i]];
                if (!model) {
                    break;
                }
            }
            if (!model) {
                return;
            }
            key = arr[arr.length - 1];
        }
        return model[key];
    }
    /**
     * 设置值
     * @param key       子属性，可以分级，如 name.firstName
     * @param value     属性值
     * @param module    需要绑定的新模块
     */
    $set(key, value, module) {
        let model = this;
        let mids = ModelManager.getModuleIds(this);
        if (key.indexOf('.') !== -1) { //层级字段
            let arr = key.split('.');
            for (let i = 0; i < arr.length - 1; i++) {
                //不存在，则创建新的model
                if (!model[arr[i]]) {
                    let m = new Model({});
                    ModelManager.bindToModules(m, mids);
                    model[arr[i]] = m;
                }
            }
            key = arr[arr.length - 1];
        }
        //绑定model到模块
        if (typeof value === 'object' && module) {
            ModelManager.bindToModule(value, module);
        }
        model[key] = value;
    }
}

/**
 * 指令管理器
 * $directives  指令集
 * $expressions 表达式集
 * $events      事件集
 * $savedoms    dom相关缓存 包括 html dom 和 参数
 * $doms        渲染树
 */
class ObjectManager {
    /**
     * module   模块
     * @param module
     */
    constructor(module) {
        this.module = module;
        this.cache = new NCache();
    }
    /**
     * 保存到cache
     * @param key       键，支持"."
     * @param value     值
     */
    set(key, value) {
        this.cache.set(key, value);
    }
    /**
     * 从cache读取
     * @param key   键，支持"."
     * @returns     缓存的值或undefined
     */
    get(key) {
        return this.cache.get(key);
    }
    /**
     * 从cache移除
     * @param key   键，支持"."
     */
    remove(key) {
        this.cache.remove(key);
    }
    /**
     * 获取指令实例
     * @param module    模块
     * @param id        指令id
     * @returns         指令对象
     */
    getDirective(id) {
        let d = this.cache.get('$directives.' + id + '.$instance');
        if (!d) {
            d = GlobalCache.get('$directives.' + id);
            GlobalCache.removeDirective(id);
            if (d) {
                this.cache.set('$directives.' + id, d);
                return d.$instance;
            }
        }
        return d;
    }
    /**
     * 保存指令实例
     * @param module        模块
     * @param directive     指令对象
     */
    saveDirective(directive) {
        this.cache.set('$directives.' + directive.id + '.$instance', directive);
    }
    /**
     * 移除指令
     * @param id    指令id
     */
    removeDirective(id) {
        this.cache.remove('$directives.' + id);
    }
    /**
     * 设置指令参数
     * @param id        指令id
     * @param key       dom key
     * @param name      参数名
     * @param value     参数值
     */
    setDirectiveParam(id, key, name, value) {
        this.cache.set('$doms.' + key + '$directives.' + id + '.$params.' + name, value);
    }
    /**
     * 获取指令参数值
     * @param id        指令id
     * @param key       dom key
     * @param name      参数名
     * @returns         参数值
     */
    getDirectiveParam(id, key, name) {
        return this.cache.get('$doms.' + key + '$directives.' + id + '.$params.' + name);
    }
    /**
     * 移除指令参数
     * @param id        指令id
     * @param key       dom key
     * @param name      参数名
     */
    removeDirectiveParam(id, key, name) {
        this.cache.remove('$doms.' + key + '$directives.' + id + '.$params.' + name);
    }
    /**
     * 清空指令参数
     * @param id        指令id
     * @param key       dom key
     */
    clearDirectiveParam(id, key) {
        this.cache.remove('$doms.' + key + '$directives.' + id + '.$params.' + name);
    }
    /**
     * 获取表达式实例
     * @param id        表达式id
     * @returns         表达式对象
     */
    getExpression(id) {
        let ex = this.cache.get('$expressions.' + id);
        if (!ex) {
            ex = GlobalCache.get('$expressions.' + id);
            GlobalCache.removeExpression(id);
            if (ex) {
                this.cache.set('$expressions.' + id, ex);
                return ex;
            }
        }
        return ex;
    }
    /**
     * 保存表达式实例
     * @param expression    表达式对象
     */
    saveExpression(expression) {
        this.cache.set('$expressions.' + expression.id, expression);
    }
    /**
     * 移除表达式
     * @param id    表达式id
     */
    removeExpression(id) {
        this.cache.remove('$expressions.' + id);
    }
    /**
     * 获取事件实例
     * @param id        表达式id
     * @returns         事件对象
     */
    getEvent(id) {
        let ev = this.cache.get('$events.' + id + '.$instance');
        if (!ev) {
            ev = GlobalCache.get('$events.' + id);
            GlobalCache.removeEvent(id);
            if (ev) {
                this.cache.set('$events.' + id, ev);
                return ev.$instance;
            }
        }
        return ev;
    }
    /**
     * 保存事件实例
     * @param event     事件对象
     */
    saveEvent(event) {
        this.cache.set('$events.' + event.id + '.$instance', event);
    }
    /**
     * 移除事件
     * @param id    事件id
     */
    removeEvent(id) {
        this.cache.remove('$events.' + id);
    }
    /**
     * 设置事件参数
     * @param id        事件id
     * @param key       dom key
     * @param name      参数名
     * @param value     参数值
     */
    setEventParam(id, key, name, value) {
        this.cache.set('$doms.' + key + '$events.' + id + '.$params.' + name, value);
    }
    /**
     * 获取事件参数值
     * @param id        事件id
     * @param key       dom key
     * @param name      参数名
     * @returns         参数值
     */
    getEventParam(id, key, name) {
        return this.cache.get('$doms.' + key + '$events.' + id + '.$params.' + name);
    }
    /**
     * 移除事件参数
     * @param id        事件id
     * @param key       dom key
     * @param name      参数名
     */
    removeEventParam(id, key, name) {
        this.cache.remove('$doms.' + key + '$events.' + id + '.$params.' + name);
    }
    /**
     * 清空事件参数
     * @param id        事件id
     * @param key       dom key
     */
    clearEventParam(id, key) {
        this.cache.remove('$doms.' + key + '$events.' + id + '.$params');
    }
    /**
     * 获取旧虚拟dom
     * @param dom       dom对象
     */
    saveElement(dom) {
        this.cache.set('$doms.' + dom.key, dom);
    }
    /**
     * 获取渲染树虚拟dom
     * @param key       dom key
     * @returns         dom对象
     */
    getElement(key) {
        return this.cache.get('$doms.' + key);
    }
    /**
     * 删除渲染树虚拟dom
     * @param key       虚拟dom key
     */
    removeElement(key) {
        this.cache.remove('$doms.' + key);
    }
    /**
     * 移除保存的节点（包括参数和html dom）
     * @param key   dom key
     */
    removeSavedNode(key) {
        this.cache.remove('$doms.' + key);
    }
    /**
     * 设置dom参数值
     * @param key       dom key
     * @param name       参数名
     * @param value     参数值
     */
    setElementParam(key, name, value) {
        this.cache.set('$doms.' + key + '.$params.' + name, value);
    }
    /**
     * 获取dom参数值
     * @param key       dom key
     * @param name      参数名
     * @returns         参数值
     */
    getElementParam(key, name) {
        return this.cache.get('$doms.' + key + '.$params.' + name);
    }
    /**
     * 移除dom参数
     * @param key       dom key
     * @param name      参数名
     */
    removeElementParam(key, name) {
        this.cache.remove('$doms.' + key + '.$params.' + name);
    }
    /**
     * 清除element 参数集
     * @param key   dom key
     */
    clearElementParams(key) {
        this.cache.remove('$doms.' + key + '.$params');
    }
    /**
     * 清除指令集
     */
    clearDirectives() {
        this.remove('$directives');
    }
    /**
     * 清除表达式集
     */
    clearExpressions() {
        this.remove('$directives');
    }
    /**
     * 清除事件集
     */
    clearEvents() {
        this.remove('$directives');
    }
    /**
     * 清除缓存dom对象
     */
    clearSaveDoms() {
        this.remove('$doms');
    }
}

/**
 * 模块类
 */
class Module {
    /**
     * 构造器
     */
    constructor() {
        /**
         * 子模块id数组
         */
        this.children = [];
        /**
         * 后置渲染序列
         */
        this.preRenderOps = [];
        /**
         * 后置渲染序列
         */
        this.postRenderOps = [];
        /**
         * 用于保存每个key对应的html node
         */
        this.keyNodeMap = new Map();
        /**
         * 上次渲染dommap，{key:true}
         */
        this.renderDomMap = new Map();
        this.id = Util.genId();
        this.objectManager = new ObjectManager(this);
        this.methods = {};
        this.state = 0;
        this.changedModelMap = new Map();
        //加入模块工厂
        ModuleFactory.add(this);
    }
    /**
     * 初始化
     */
    init() {
        // 设置状态为初始化
        this.state = 1;
        //初始化model
        //创建模型，克隆数据
        this.model = new Model(Util.clone(this.data || {}), this);
        //注册子模块
        if (this.modules && Array.isArray(this.modules)) {
            for (let cls of this.modules) {
                ModuleFactory.addClass(cls);
            }
            delete this.modules;
        }
    }
    /**
     * 模版串方法
     * @param props     props对象，在模版容器dom中进行配置，从父模块传入
     * @returns         模版串
     */
    template(props) {
        return null;
    }
    /**
     * 模型渲染
     * @return false 渲染失败 true 渲染成功
     */
    render() {
        this.dontAddToRender = true;
        //编译
        if (!this.originTree) {
            this.compile();
        }
        //执行前置方法
        this.doRenderOps(0);
        this.doModuleEvent('onBeforeRender');
        if (!this.renderTree) {
            this.doFirstRender();
        }
        else { //增量渲染
            //执行每次渲染前事件
            if (this.model) {
                let oldTree = this.renderTree;
                this.renderTree = Renderer.renderDom(this, this.originTree, this.model);
                this.doModuleEvent('onBeforeRenderToHtml');
                let changeDoms = [];
                // 比较节点
                DiffTool.compare(this.renderTree, oldTree, changeDoms);
                //执行更改
                if (changeDoms.length > 0) {
                    this.handleChangedDoms(changeDoms);
                }
            }
        }
        //设置已渲染状态
        this.state = 4;
        //执行后置方法
        this.doRenderOps(1);
        //执行每次渲染后事件
        this.doModuleEvent('onRender');
        this.changedModelMap.clear();
        this.dontAddToRender = false;
        return true;
    }
    /**
     * 执行首次渲染
     * @param root 	根虚拟dom
     */
    doFirstRender() {
        this.doModuleEvent('onBeforeFirstRender');
        this.dontAddToRender = false;
        //渲染树
        this.renderTree = Renderer.renderDom(this, this.originTree, this.model);
        this.doModuleEvent('onBeforeFirstRenderToHTML');
        //清空子元素
        Util.empty(this.container);
        //渲染到html
        Renderer.renderToHtml(this, this.renderTree, this.container, true);
        //执行首次渲染后事件
        this.doModuleEvent('onFirstRender');
    }
    /**
     * 处理更改的dom节点
     * @param changeDoms    更改的dom参数数组
     */
    handleChangedDoms(changeDoms) {
        for (let item of changeDoms) {
            let [n1, n2, pEl] = [
                item[1] ? this.getNode(item[1].key) : null,
                item[2] && typeof item[2] === 'object' ? this.getNode(item[2].key) : null,
                item[3] ? this.getNode(item[3].key) : null
            ];
            switch (item[0]) {
                case 1: //添加
                    //把新dom缓存添加到旧dom缓存
                    Renderer.renderToHtml(this, item[1], pEl, true);
                    n1 = this.getNode(item[1].key);
                    if (!n2) { //不存在添加节点或为索引号
                        if (typeof item[2] === 'number' && pEl.childNodes.length - 1 > item[2]) {
                            pEl.insertBefore(n1, pEl.childNodes[item[2]]);
                        }
                        else {
                            pEl.appendChild(n1);
                        }
                    }
                    else {
                        pEl.insertBefore(n1, n2);
                    }
                    break;
                case 2: //修改
                    Renderer.renderToHtml(this, item[1], null, false);
                    break;
                case 3: //删除
                    //清除缓存
                    this.objectManager.removeSavedNode(item[1].key);
                    this.keyNodeMap.delete(item[1].key);
                    //从html dom树移除
                    pEl.removeChild(n1);
                    break;
                case 4: //移动
                    if (item[4]) { //相对节点后
                        if (n2 && n2.nextSibling) {
                            pEl.insertBefore(n1, n2.nextSibling);
                        }
                        else {
                            pEl.appendChild(n1);
                        }
                    }
                    else {
                        pEl.insertBefore(n1, n2);
                    }
                    break;
                default: //替换
                    Renderer.renderToHtml(this, item[1], pEl, true);
                    n1 = this.getNode(item[1].key);
                    pEl.replaceChild(n1, n2);
            }
        }
    }
    /**
     * 添加子模块
     * @param moduleId      模块id
     * @param className     类名
     */
    addChild(moduleId) {
        if (!this.children.includes(moduleId)) {
            this.children.push(moduleId);
            let m = ModuleFactory.get(moduleId);
            if (m) {
                m.parentId = this.id;
            }
        }
    }
    /**
     * 激活模块(添加到渲染器)
     */
    active() {
        this.state = 3;
        Renderer.add(this);
        for (let id of this.children) {
            let m = ModuleFactory.get(id);
            if (m) {
                m.active();
            }
        }
    }
    /**
     * 取消激活
     */
    unactive() {
        if (ModuleFactory.getMain() === this || this.state === 2) {
            return;
        }
        //设置状态
        this.state = 2;
        //删除容器
        delete this.container;
        //删除渲染树
        delete this.renderTree;
        // 清理dom key map
        this.keyNodeMap.clear();
        //清理缓存
        this.clearCache();
        //处理子模块
        for (let id of this.children) {
            let m = ModuleFactory.get(id);
            if (m) {
                m.unactive();
            }
        }
    }
    /**
     * 模块销毁
     */
    destroy() {
        if (Util.isArray(this.children)) {
            this.children.forEach((item) => {
                let m = ModuleFactory.get(item);
                if (m) {
                    m.destroy();
                }
            });
        }
        this.clearCache(true);
        //从工厂释放
        ModuleFactory.remove(this.id);
    }
    /**
     * 获取父模块
     * @returns     父模块
     */
    getParent() {
        if (!this.parentId) {
            return;
        }
        return ModuleFactory.get(this.parentId);
    }
    /**
     * 执行模块事件
     * @param eventName 	事件名
     */
    doModuleEvent(eventName) {
        this.invokeMethod(eventName, this.model);
    }
    /**
     * 获取模块方法
     * @param name  方法名
     * @returns     方法
     */
    getMethod(name) {
        return this.methods[name];
    }
    /**
     * 添加方法
     * @param name  方法名
     * @param foo   方法函数
     */
    addMethod(name, foo) {
        this.methods[name] = foo;
    }
    /**
     * 移除方法
     * @param name  方法名
     */
    removeMethod(name) {
        delete this.methods[name];
    }
    /**
     * 设置渲染容器
     * @param el    容器
     */
    setContainer(el) {
        this.container = el;
    }
    /**
     * 调用方法
     * @param methodName    方法名
     */
    invokeMethod(methodName, arg1, arg2, arg3) {
        let foo = this.getMethod(methodName);
        if (foo && typeof foo === 'function') {
            let args = [];
            for (let i = 1; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            return foo.apply(this, args);
        }
    }
    /**
     * 添加渲染方法
     * @param foo   方法函数
     * @param flag  标志 0:渲染前执行 1:渲染后执行
     * @param args  参数
     * @param once  是否只执行一次，如果为true，则执行后删除
     */
    addRenderOps(foo, flag, args, once) {
        if (typeof foo !== 'function') {
            return;
        }
        let arr = flag === 0 ? this.preRenderOps : this.postRenderOps;
        arr.push({
            foo: foo,
            args: args,
            once: once
        });
    }
    /**
     * 执行渲染方法
     * @param flag 类型 0:前置 1:后置
     */
    doRenderOps(flag) {
        let arr = flag === 0 ? this.preRenderOps : this.postRenderOps;
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                let o = arr[i];
                o.foo.apply(this, o.args);
                // 执行后删除
                if (o.once) {
                    arr.splice(i--, 1);
                }
            }
        }
    }
    /**
     * 设置props
     * @param props     属性值
     */
    setProps(props) {
        let change = false;
        if (!this.props) {
            change = true;
        }
        else {
            const keys = Object.getOwnPropertyNames(props);
            let len1 = keys.indexOf('$data') === -1 ? keys.length : keys.length - 1;
            const keys1 = this.props ? Object.getOwnPropertyNames(this.props) : [];
            let len2 = keys.indexOf('$data') === -1 ? keys1.length : keys1.length - 1;
            if (len1 !== len2) {
                change = true;
            }
            else {
                for (let k of keys) {
                    if (k === '$data') {
                        continue;
                    }
                    // object 默认改变
                    if (props[k] !== this.props[k] || typeof (props[k]) === 'object') {
                        change = true;
                        break;
                    }
                }
            }
        }
        this.props = props;
        if (change) { //有改变，进行编译并激活
            this.compile();
            this.active();
        }
    }
    /**
     * 编译
     */
    compile() {
        //清除缓存
        this.clearCache();
        this.originTree = new Compiler(this).compile(this.template(this.props));
    }
    /**
     * 清理缓存
     * @param force 强力清除
     */
    clearCache(force) {
        if (force) { //强力清除，后续不再使用
            this.objectManager.cache = new NCache();
            return;
        }
        //清理dom相关
        this.objectManager.clearSaveDoms();
        //清理指令
        this.objectManager.clearDirectives();
        //清理表达式
        this.objectManager.clearExpressions();
        //清理事件
        this.objectManager.clearEvents();
        //清理css url
        CssManager.clearModuleRules(this);
    }
    /**
     * 获取node
     * @param key   dom key
     * @returns     html node
     */
    getNode(key) {
        return this.keyNodeMap.get(key);
    }
    /**
     * save node
     * @param key   dom key
     * @param node  html node
     */
    saveNode(key, node) {
        this.keyNodeMap.set(key, node);
    }
}

/**
 * module 元素
 */
class MODULE extends DirectiveElement {
    constructor(node, module) {
        super(node, module);
        //类名
        let clazz = node.getProp('name');
        if (!clazz) {
            throw new NError('itemnotempty', NodomMessage.TipWords['element'], 'MODULE', 'className');
        }
        node.delProp('name');
        node.addDirective(new Directive('module', clazz));
    }
}
/**
 * for 元素
 */
class FOR extends DirectiveElement {
    constructor(node, module) {
        super(node, module);
        //条件
        let cond = node.getProp('cond');
        if (!cond) {
            throw new NError('itemnotempty', NodomMessage.TipWords['element'], 'FOR', 'cond');
        }
        node.delProp('cond');
        if (typeof cond === 'number') { //表达式
            cond = GlobalCache.getExpression(cond);
        }
        node.addDirective(new Directive('repeat', cond));
    }
}
/**
 * 递归元素
 */
class RECUR extends DirectiveElement {
    constructor(node, module) {
        super(node, module);
        //条件
        let cond = node.getProp('cond');
        node.delProp('cond');
        if (typeof cond === 'number') { //表达式
            cond = GlobalCache.getExpression(cond);
        }
        node.addDirective(new Directive('recur', cond));
    }
}
/**
 * IF 元素
 */
class IF extends DirectiveElement {
    constructor(node, module) {
        super(node, module);
        //条件
        let cond = node.getProp('cond');
        if (!cond) {
            throw new NError('itemnotempty', NodomMessage.TipWords['element'], 'IF', 'cond');
        }
        node.delProp('cond');
        if (typeof cond === 'number') { //表达式
            cond = GlobalCache.getExpression(cond);
        }
        node.addDirective(new Directive('if', cond));
    }
}
class ELSE extends DirectiveElement {
    constructor(node, module) {
        super(node, module);
        node.addDirective(new Directive('else', null));
    }
}
/**
 * ELSEIF 元素
 */
class ELSEIF extends DirectiveElement {
    constructor(node, module) {
        super(node, module);
        //条件
        let cond = node.getProp('cond');
        if (!cond) {
            throw new NError('itemnotempty', NodomMessage.TipWords['element'], 'ELSEIF', 'cond');
        }
        node.delProp('cond');
        if (typeof cond === 'number') { //表达式
            cond = GlobalCache.getExpression(cond);
        }
        node.addDirective(new Directive('elseif', cond));
    }
}
/**
 * ENDIF 元素
 */
class ENDIF extends DirectiveElement {
    constructor(node, module) {
        super(node, module);
        node.addDirective(new Directive('endif', null));
    }
}
/**
 * 替代器
 */
class SLOT extends DirectiveElement {
    constructor(node, module) {
        super(node, module);
        //条件
        let cond = node.getProp('name') || 'default';
        node.delProp('name');
        node.addDirective(new Directive('slot', cond));
    }
}
DirectiveElementManager.add([MODULE, FOR, IF, RECUR, ELSE, ELSEIF, ENDIF, SLOT]);

((function () {
    /**
     * 指令类型初始化
     * 每个指令类型都有一个名字、处理函数和优先级，处理函数不能用箭头函数
     * 处理函数在渲染时执行，包含两个参数 module(模块)、dom(目标虚拟dom)、src(源虚拟dom)
     * 处理函数的this指向指令
     * 处理函数的返回值 true 表示继续，false 表示后续指令不再执行
     */
    /**
     * module 指令
     * 用于指定该元素为模块容器，表示子模块
     * 用法 x-module='模块类名'
     */
    createDirective('module', function (module, dom, src) {
        let m;
        //存在moduleId，表示已经渲染过，不渲染
        let mid = src.subModuleId;
        let handle = true;
        if (mid) {
            m = ModuleFactory.get(mid);
            handle = !dom.getProp('renderOnce');
        }
        else {
            m = ModuleFactory.get(this.value);
            if (!m) {
                return true;
            }
            mid = m.id;
            //保留modelId
            src.subModuleId = mid;
        }
        //保存到dom上，提升渲染性能
        dom.subModuleId = mid;
        if (handle) { //需要处理
            //设置props，如果改变了props，启动渲染
            let o = {};
            if (dom.props) {
                for (let p of dom.props) {
                    if (p[0][0] === '$') { //数据
                        if (!o.$data) {
                            o.$data = {};
                        }
                        o.$data[p[0].substr(1)] = p[1];
                        //删除属性
                        dom.delProp(p[0]);
                    }
                    else {
                        o[p[0]] = p[1];
                    }
                }
                //传递给模块
                m.setProps(o);
            }
        }
        return true;
    }, 8);
    /**
     *  model指令
     */
    createDirective('model', function (module, dom, src) {
        let model = dom.model.$get(this.value);
        if (model) {
            dom.model = model;
        }
        return true;
    }, 1);
    /**
     * 指令名 repeat
     * 描述：重复指令
     */
    createDirective('repeat', function (module, dom, src) {
        let rows = this.value;
        // 无数据，不渲染
        if (!Util.isArray(rows) || rows.length === 0) {
            return false;
        }
        const parent = dom.parent;
        //禁用该指令
        this.disabled = true;
        for (let i = 0; i < rows.length; i++) {
            rows[i].$index = i;
            //渲染一次-1，所以需要+1
            src.staticNum++;
            Renderer.renderDom(module, src, rows[i], parent, rows[i].$key);
        }
        //启用该指令
        this.disabled = false;
        return false;
    }, 2);
    /**
     * 递归指令
     * 作用：在dom内部递归，用于具有相同数据结构的节点递归生成
     * 递归指令不允许嵌套
     * name表示递归名字，必须与内部的recur标签的ref保持一致，名字默认为default
     * 典型模版
     * ```
     * <recur name='r1'>
     *      <div>...</div>
     *      <p>...</p>
     *      <recur ref='r1' />
     * </recur>
     * ```
     */
    createDirective('recur', function (module, dom, src) {
        //递归节点存放容器
        if (dom.hasProp('ref')) {
            //如果出现在repeat中，src为单例，需要在使用前清空子节点，避免沿用上次的子节点
            src.children = [];
            //递归存储名
            const name = '$recurs.' + (dom.getProp('ref') || 'default');
            let node = module.objectManager.get(name);
            if (!node) {
                return true;
            }
            let model = dom.model;
            let cond = node.getDirective('recur');
            let m = model[cond.value];
            //不存在子层数组，不再递归
            if (!m) {
                return true;
            }
            //克隆，后续可以继续用
            let node1 = node.clone();
            let key;
            if (!Array.isArray(m)) { //recur子节点不为数组，依赖子层数据
                node1.model = m;
                key = m.$key;
                Util.setNodeKey(node1, key, true);
            }
            else {
                key = dom.model.$key;
            }
            src.children = [node1];
        }
        else { //递归节点
            let data = dom.model[this.value];
            if (!data) {
                return true;
            }
            //递归名，默认default
            const name = '$recurs.' + (dom.getProp('name') || 'default');
            if (!module.objectManager.get(name)) {
                module.objectManager.set(name, src.clone());
            }
        }
        return true;
    }, 2);
    /**
     * 指令名 if
     * 描述：条件指令
     */
    createDirective('if', function (module, dom, src) {
        dom.parent.setParam(module, '$if', this.value);
        return this.value;
    }, 5);
    /**
     * 指令名 else
     * 描述：else指令
     */
    createDirective('else', function (module, dom, src) {
        //如果前面的if/elseif值为true，则隐藏，否则显示
        return dom.parent.getParam(module, '$if') === false;
    }, 5);
    /**
     * elseif 指令
     */
    createDirective('elseif', function (module, dom, src) {
        let v = dom.parent.getParam(module, '$if');
        if (v === true) {
            return false;
        }
        else {
            if (!this.value) {
                return false;
            }
            else {
                dom.parent.setParam(module, '$if', true);
            }
        }
        return true;
    }, 5);
    /**
     * elseif 指令
     */
    createDirective('endif', function (module, dom, src) {
        dom.parent.removeParam(module, '$if');
        return true;
    }, 5);
    /**
     * 指令名 show
     * 描述：显示指令
     */
    createDirective('show', function (module, dom, src) {
        return this.value;
    }, 5);
    /**
     * 指令名 data
     * 描述：从当前模块获取数据并用于子模块，dom带module指令时有效
     */
    // createDirective('data',
    //     function(module:Module,dom:VirtualDom,src:VirtualDom){
    //         if (typeof this.value !== 'object' || !dom.hasDirective('module')){
    //             return;
    //         }
    //         let mdlDir:Directive = dom.getDirective(module,'module');
    //         let mid = mdlDir.getParam(module,dom,'moduleId');
    //         if(!mid){
    //             return;
    //         }
    //         let obj = this.value;
    //         //子模块
    //         let subMdl = ModuleFactory.get(mid);
    //         //子model
    //         let m: Model = subMdl.model;
    //         let model = dom.model;
    //         Object.getOwnPropertyNames(obj).forEach(p => {
    //             //字段名
    //             let field;
    //             // 反向修改
    //             let reverse = false;
    //             if (Array.isArray(obj[p])) {
    //                 field = obj[p][0];
    //                 if (obj[p].length > 1) {
    //                     reverse = obj[p][1];
    //                 }
    //                 //删除reverse，只保留字段
    //                 obj[p] = field;
    //             } else {
    //                 field = obj[p];
    //             }
    //             let d = model.$get(field);
    //             //数据赋值
    //             if (d !== undefined) {
    //                 //对象直接引用，需将model绑定到新模块
    //                 if(typeof d === 'object'){
    //                     ModelManager.bindToModule(d,mid);
    //                 }
    //                 m[p] = d;
    //             }
    //             //反向处理（对象无需进行反向处理）
    //             if (reverse && typeof d !== 'object') {
    //                 m.$watch(p, function (model1,ov, nv) {
    //                     model.$set(field, nv);
    //                 });
    //             }
    //         });
    //     },
    //     9
    // );
    /**
     * 指令名 field
     * 描述：字段指令
     */
    createDirective('field', function (module, dom, src) {
        const me = this;
        const type = dom.getProp('type') || 'text';
        const tgname = dom.tagName.toLowerCase();
        const model = dom.model;
        if (!model) {
            return true;
        }
        let dataValue = model.$get(this.value);
        if (type === 'radio') {
            let value = dom.getProp('value');
            if (dataValue == value) {
                dom.setProp('checked', true);
                dom.setAsset('checked', 'checked');
            }
            else {
                dom.setAsset('checked', false);
                dom.delProp('checked');
            }
        }
        else if (type === 'checkbox') {
            //设置状态和value
            let yv = dom.getProp('yes-value');
            //当前值为yes-value
            if (dataValue == yv) {
                dom.setProp('value', yv);
                dom.setAsset('checked', 'checked');
            }
            else { //当前值为no-value
                dom.setProp('value', dom.getProp('no-value'));
                dom.setAsset('checked', false);
            }
        }
        else if (tgname === 'select') { //下拉框
            dom.setAsset('value', dataValue);
            dom.setProp('value', dataValue);
        }
        else {
            let v = (dataValue !== undefined && dataValue !== null) ? dataValue : '';
            dom.setAsset('value', v);
            dom.setProp('value', v);
        }
        //初始化
        if (!this.getParam(module, dom, 'inited')) {
            dom.addEvent(new NEvent('change', function (model, dom) {
                let el = module.getNode(dom.key);
                if (!el) {
                    return;
                }
                let type = dom.getProp('type');
                let field = me.value;
                let v = el.value;
                //根据选中状态设置checkbox的value
                if (type === 'checkbox') {
                    if (dom.getProp('yes-value') == v) {
                        v = dom.getProp('no-value');
                    }
                    else {
                        v = dom.getProp('yes-value');
                    }
                }
                else if (type === 'radio') {
                    if (!el.checked) {
                        v = undefined;
                    }
                }
                //修改字段值,需要处理.运算符
                let temp = this;
                let arr = field.split('.');
                if (arr.length === 1) {
                    model[field] = v;
                }
                else {
                    field = arr.pop();
                    for (let i = 0; i < arr.length; i++) {
                        temp = temp[arr[i]];
                    }
                    temp[field] = v;
                }
                //修改value值，该节点不重新渲染
                if (type !== 'radio') {
                    dom.setProp('value', v);
                    el.value = v;
                }
            }));
            this.setParam(module, dom, 'inited', true);
        }
        return true;
    }, 10);
    /**
     * route指令
     */
    createDirective('route', function (module, dom, src) {
        if (!this.value) {
            return true;
        }
        //a标签需要设置href
        if (dom.tagName.toLowerCase() === 'a') {
            dom.setProp('href', 'javascript:void(0)');
        }
        dom.setProp('path', this.value);
        //有激活属性
        if (dom.hasProp('active')) {
            let acName = dom.getProp('active');
            dom.delProp('active');
            //active 转expression
            Router.addActiveField(module, this.value, dom.model, acName);
            if (this.value.startsWith(Router.currentPath) && dom.model[acName]) {
                Router.go(this.value);
            }
        }
        //添加click事件,避免重复创建事件对象，创建后缓存
        let event = module.objectManager.get('$routeClickEvent');
        if (!event) {
            event = new NEvent('click', (model, dom, e) => {
                let path = dom.getProp('path');
                if (!path) {
                    let dir = dom.getDirective('route');
                    path = dir.value;
                }
                if (Util.isEmpty(path)) {
                    return;
                }
                Router.go(path);
            });
            module.objectManager.set('$routeClickEvent', event);
        }
        dom.addEvent(event);
        return true;
    });
    /**
     * 增加router指令
     */
    createDirective('router', function (module, dom, src) {
        Router.routerKeyMap.set(module.id, dom.key);
        return true;
    });
    /**
     * 插头指令
     * 用于模块中，可实现同名替换
     */
    createDirective('slot', function (module, dom, src) {
        // const parent = dom.parent;
        this.value = this.value || 'default';
        let mid = dom.parent.subModuleId;
        //父dom有module指令，表示为替代节点，替换子模块中的对应的slot节点；否则为子模块定义slot节点
        if (mid) {
            let m = ModuleFactory.get(mid);
            if (m) {
                //缓存当前替换节点
                m.objectManager.set('$slots.' + this.value, { rendered: dom, origin: src.clone() });
            }
            //设置不添加到dom树
            dom.dontAddToTree = true;
        }
        else { //源slot节点
            //获取替换节点进行替换
            let cfg = module.objectManager.get('$slots.' + this.value);
            if (cfg) {
                let rdom;
                if (dom.hasProp('innerRender')) { //内部渲染
                    rdom = cfg.origin;
                }
                else { //父模块渲染
                    rdom = cfg.rendered;
                }
                //避免key重复，更新key，如果为origin，则会修改原来的key？？？
                for (let d of rdom.children) {
                    Util.setNodeKey(d, dom.key, true);
                }
                //更改渲染子节点
                src.children = rdom.children;
                module.objectManager.remove('$slots.' + this.value);
            }
        }
        return true;
    }, 5);
})());

/**
 * tap事件
 */
EventManager.regist('tap', {
    touchstart(dom, module, evtObj, e) {
        let tch = e.touches[0];
        evtObj.dependEvent.setParam(module, dom, 'pos', { sx: tch.pageX, sy: tch.pageY, t: Date.now() });
    },
    touchmove(dom, module, evtObj, e) {
        let pos = evtObj.dependEvent.getParam(module, dom, 'pos');
        if (!pos) {
            return;
        }
        let tch = e.touches[0];
        let dx = tch.pageX - pos.sx;
        let dy = tch.pageY - pos.sy;
        //判断是否移动
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            pos.move = true;
        }
    },
    touchend(dom, module, evtObj, e) {
        let pos = evtObj.dependEvent.getParam(module, dom, 'pos');
        if (!pos) {
            return;
        }
        evtObj.dependEvent.removeParam(module, dom, 'pos');
        let dt = Date.now() - pos.t;
        //点下时间不超过200ms,触发事件
        if (!pos.move && dt < 200) {
            let foo = evtObj.dependEvent.handler;
            if (typeof foo === 'string') {
                foo = module.getMethod(foo);
            }
            if (foo) {
                foo.apply(module, [dom.model, dom, evtObj.dependEvent, e]);
            }
        }
    }
});
/**
 * swipe事件
 */
EventManager.regist('swipe', {
    touchstart(dom, module, evtObj, e) {
        let tch = e.touches[0];
        let t = Date.now();
        evtObj.dependEvent.setParam(module, dom, 'swipe', {
            oldTime: [t, t],
            speedLoc: [{ x: tch.pageX, y: tch.pageY }, { x: tch.pageX, y: tch.pageY }],
            oldLoc: { x: tch.pageX, y: tch.pageY }
        });
    },
    touchmove(dom, module, evtObj, e) {
        let nt = Date.now();
        let tch = e.touches[0];
        let mv = evtObj.dependEvent.getParam(module, dom, 'swipe');
        //50ms记录一次
        if (nt - mv.oldTime[1] > 50) {
            mv.speedLoc[0] = { x: mv.speedLoc[1].x, y: mv.speedLoc[1].y };
            mv.speedLoc[1] = { x: tch.pageX, y: tch.pageY };
            mv.oldTime[0] = mv.oldTime[1];
            mv.oldTime[1] = nt;
        }
        mv.oldLoc = { x: tch.pageX, y: tch.pageY };
    },
    touchend(dom, module, evtObj, e) {
        let mv = evtObj.dependEvent.getParam(module, dom, 'swipe');
        let nt = Date.now();
        //取值序号 0 或 1，默认1，如果释放时间与上次事件太短，则取0
        let ind = (nt - mv.oldTime[1] < 30) ? 0 : 1;
        let dx = mv.oldLoc.x - mv.speedLoc[ind].x;
        let dy = mv.oldLoc.y - mv.speedLoc[ind].y;
        let s = Math.sqrt(dx * dx + dy * dy);
        let dt = nt - mv.oldTime[ind];
        //超过300ms 不执行事件
        if (dt > 300 || s < 10) {
            return;
        }
        let v0 = s / dt;
        //速度>0.1,触发swipe事件
        if (v0 > 0.05) {
            let sname = '';
            if (dx < 0 && Math.abs(dy / dx) < 1) {
                e.v0 = v0; //添加附加参数到e
                sname = 'swipeleft';
            }
            if (dx > 0 && Math.abs(dy / dx) < 1) {
                e.v0 = v0;
                sname = 'swiperight';
            }
            if (dy > 0 && Math.abs(dx / dy) < 1) {
                e.v0 = v0;
                sname = 'swipedown';
            }
            if (dy < 0 && Math.abs(dx / dy) < 1) {
                e.v0 = v0;
                sname = 'swipeup';
            }
            //处理swipe
            if (evtObj.dependEvent.name === sname) {
                let foo = evtObj.dependEvent.handler;
                if (typeof foo === 'string') {
                    foo = module.getMethod(foo);
                }
                if (foo) {
                    foo.apply(module, [dom.model, dom, evtObj.dependEvent, e]);
                }
            }
        }
    }
});
//把swpie注册到4个方向
EventManager.regist('swipeleft', EventManager.get('swipe'));
EventManager.regist('swiperight', EventManager.get('swipe'));
EventManager.regist('swipeup', EventManager.get('swipe'));
EventManager.regist('swipedown', EventManager.get('swipe'));

export { Compiler, CssManager, DiffTool, Directive, DirectiveElement, DirectiveElementManager, DirectiveManager, DirectiveType, EventManager, Expression, GlobalCache, Model, ModelManager, Module, ModuleFactory, NCache, NError, NEvent, NFactory, NodomMessage, NodomMessage_en, NodomMessage_zh, Renderer, Route, Router, Scheduler, Util, VirtualDom, createDirective, createRoute, nodom, registModule, request };