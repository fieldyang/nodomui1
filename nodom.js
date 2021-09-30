/**
 * 自定义元素管理器
 */
class DefineElementManager {
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
DefineElementManager.elements = new Map();

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

/**
 * 指令类
 */
class DirectiveType {
    /**
     * 构造方法
     * @param name      指令类型名
     * @param prio      类型优先级
     * @param init      编译时执行方法
     * @param handle    渲染时执行方法
     */
    constructor(name, prio, init, handle) {
        this.name = name;
        this.prio = prio >= 0 ? prio : 10;
        this.init = init;
        this.handle = handle;
    }
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
        element: 'Element'
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
        itemincorrect: "{0} '{1}' config item '{2}' error"
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
     * @param id    模块id
     * @param item  模块存储对象
     */
    static add(item) {
        //第一个为主模块
        if (this.modules.size === 0) {
            this.mainModule = item;
        }
        this.modules.set(item.id, item);
        //加入模块类map
        if (!this.classes.has(item.constructor.name)) {
            this.classes.set(item.constructor.name, item);
        }
    }
    /**
     * 获得模块
     * @param name  类、类名或实例id
     * @param props 传递给子模块的外部属性(用于产生模版)
     */
    static get(name, props) {
        if (typeof name === 'number') {
            return this.modules.get(name);
        }
        else {
            return this.getInstance(name, props);
        }
    }
    /**
     * 是否存在模块类
     * @param clazzName     模块类名
     * @returns     true/false
     */
    static has(clazzName) {
        return this.classes.has(clazzName);
    }
    /**
     * 获取模块实例（通过类名）
     * @param className     模块类名
     * @param props         模块外部属性
     */
    static getInstance(clazz, props) {
        let className = (typeof clazz === 'string') ? clazz : clazz.name;
        // 初始化模块
        if (!this.classes.has(className) && typeof clazz === 'function') {
            Reflect.construct(clazz, []);
        }
        let src = this.classes.get(className);
        if (!src) {
            return;
        }
        // 模块实例
        let instance;
        //未初始化
        if (src.state === 0) {
            src.init();
            instance = src;
        }
        else {
            instance = src.clone();
        }
        if (src.template) {
            let tp = src.template.apply(src.model, [props]);
            let root;
            //当返回为数组时，如果第二个参数为true，则表示不再保留模版函数
            if (Array.isArray(tp)) {
                root = Compiler.compile(tp[0]);
                if (tp.length > 1 && tp[1]) {
                    src.virtualDom = root;
                    delete src.template;
                }
            }
            else { //只返回编译串
                root = Compiler.compile(tp);
            }
            instance.virtualDom = root;
        }
        return instance;
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
 * 模块类集合 {className:instance}
 */
ModuleFactory.classes = new Map();

/**
 * 渲染器
 */
class Renderer {
    /**
     * 添加到渲染列表
     * @param module 模块
     */
    static add(module, force) {
        //如果已经在列表中，不再添加
        if (!this.waitList.includes(module.id)) {
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
        //调用队列渲染
        for (let i = 0; i < this.waitList.length; i++) {
            let m = ModuleFactory.get(this.waitList[i]);
            //渲染成功，从队列移除
            if (!m || m.render()) {
                this.waitList.shift();
                i--;
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
            //父模块不存在，不继续处理
            if (!parentModule) {
                return;
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
                this.moduleDependMap.delete(module.id);
                //module置为不激活
                module.unactive();
            }
            if (diff[2].length === 0) { //路由相同，参数不同
                let route = diff[0];
                if (route !== null) {
                    let module = yield this.getModule(route);
                    // 模块处理
                    this.dependHandle(module, route, parentModule);
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
                    //添加路由容器依赖
                    this.moduleDependMap.set(module.id, parentModule.id);
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
     * @returns 		数组 [父路由，第一个需要销毁的路由数组，第二个需要增加的路由数组]
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
        //上一级路由和上二级路由
        let p1 = null;
        if (arr1 && i > 0) {
            // 可能存在空路由，需要向前遍历
            for (let j = i - 1; j >= 0; j--) {
                if (arr1[j].module) {
                    p1 = arr1[j];
                    break;
                }
            }
        }
        return [p1, retArr1, retArr2];
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
        //设置首次渲染
        module.setFirstRender(true);
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
        if (pm.state === 4) { //被依赖模块处于渲染后状态
            module.setContainer(pm.getNode(this.routerKeyMap.get(pm.id)));
            this.setDomActive(pm, route.fullPath);
        }
        else { //被依赖模块不处于被渲染后状态
            pm.addRenderOps(function (m, p) {
                module.setContainer(m.getNode(Router.routerKeyMap.get(m.id)));
                me.setDomActive(m, p);
            }, 1, [pm, route.fullPath], true);
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
        //渲染，因为当前模块还在渲染队列中，需要延迟加载
        if (module.state !== 4) {
            setTimeout(() => {
                Renderer.add(module);
            }, 0);
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
/**
 * 路由模块依赖map {依赖模块id:被依赖模块id}
 */
Router.moduleDependMap = new Map();
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
let store;
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
function createDirective(name, priority, init, handler) {
    return DirectiveManager.addType(name, priority, init, handler);
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
        // let map: Map<Object, any> = new Map();
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
    /***********************对象相关******************/
    /**
     * 找到符合符合属性值条件的对象（深度遍历）
     * @param obj       待查询对象
     * @param props     属性值对象
     * @param one       是否满足一个条件就可以，默认false
     */
    static findObjByProps(obj, props, one) {
        if (!this.isObject(obj)) {
            throw new NError('invoke', 'Util.findObjByProps', '0', 'Object');
        }
        //默认false
        one = one || false;
        let ps = this.getOwnProps(props);
        let find = false;
        if (one === false) { //所有条件都满足
            find = true;
            for (let i = 0; i < ps.length; i++) {
                let p = ps[i];
                if (obj[p] !== props[p]) {
                    find = false;
                    break;
                }
            }
        }
        else { //一个条件满足
            for (let i = 0; i < ps.length; i++) {
                let p = ps[i];
                if (obj[p] === props[p]) {
                    find = true;
                    break;
                }
            }
        }
        if (find) {
            return obj;
        }
        //子节点查找
        for (let p in obj) {
            let o = obj[p];
            if (o !== null) {
                if (this.isObject(o)) { //子对象
                    //递归查找
                    let oprops = this.getOwnProps(o);
                    for (let i = 0; i < oprops.length; i++) {
                        let item = o[oprops[i]];
                        if (item !== null && this.isObject(item)) {
                            let r = this.findObjByProps(item, props, one);
                            if (r !== null) {
                                return r;
                            }
                        }
                    }
                }
                else if (this.isArray(o)) { //数组对象
                    for (let i = 0; i < o.length; i++) {
                        let item = o[i];
                        if (item !== null && this.isObject(item)) {
                            let r = this.findObjByProps(item, props, one);
                            if (r !== null) {
                                return r;
                            }
                        }
                    }
                }
            }
        }
        return null;
    }
    /**********dom相关***********/
    /**
     * 获取dom节点
     * @param selector  选择器
     * @param findAll   是否获取所有，默认为false
     * @param pview     父html element
     * @returns         html element/null 或 nodelist或[]
     */
    static get(selector, findAll, pview) {
        pview = pview || document;
        if (findAll === true) {
            return pview.querySelectorAll(selector);
        }
        return pview.querySelector(selector);
    }
    /**
     * 是否为element
     * @param el    传入的对象
     * @returns     true/false
     */
    static isEl(el) {
        return el instanceof HTMLElement || el instanceof SVGElement;
    }
    /**
     * 是否为node
     * @param node 传入的对象
     * @returns true/false
     */
    static isNode(node) {
        return node !== undefined && node !== null && (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE);
    }
    /**
     * 新建dom
     * @param tagName   标签名
     * @param config    属性集合
     * @param text      innerText
     * @returns         新建的elelment
     */
    static newEl(tagName, config, text) {
        if (!this.isString(tagName) || this.isEmpty(tagName)) {
            throw new NError('invoke', 'this.newEl', '0', 'string');
        }
        let el = document.createElement(tagName);
        if (this.isObject(config)) {
            this.attr(el, config);
        }
        else if (this.isString(text)) {
            el.innerHTML = text;
        }
        return el;
    }
    /**
     * 新建svg element
     * @param tagName   标签名
     * @returns         svg element
     */
    static newSvgEl(tagName, config) {
        let el = document.createElementNS("http://www.w3.org/2000/svg", tagName);
        if (this.isObject(config)) {
            this.attr(el, config);
        }
        return el;
    }
    /**
     * 把srcNode替换为nodes
     * @param srcNode       源dom
     * @param nodes         替换的dom或dom数组
     */
    static replaceNode(srcNode, nodes) {
        if (!this.isNode(srcNode)) {
            throw new NError('invoke', 'this.replaceNode', '0', 'Node');
        }
        if (!this.isNode(nodes) && !this.isArray(nodes)) {
            throw new NError('invoke1', 'this.replaceNode', '1', 'Node', 'Node Array');
        }
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
        const me = this;
        if (!me.isEl(el)) {
            throw new NError('invoke', 'this.empty', '0', 'Element');
        }
        let nodes = el.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            el.removeChild(nodes[i]);
        }
    }
    /**
     * 删除节点
     * @param node html node
     */
    static remove(node) {
        const me = this;
        if (!me.isNode(node)) {
            throw new NError('invoke', 'this.remove', '0', 'Node');
        }
        if (node.parentNode !== null) {
            node.parentNode.removeChild(node);
        }
    }
    /**
     * 获取／设置属性
     * @param el    element
     * @param param 属性名，设置多个属性时用对象
     * @param value 属性值，获取属性时不需要设置
     * @returns     属性值
     */
    static attr(el, param, value) {
        const me = this;
        if (!me.isEl(el)) {
            throw new NError('invoke', 'this.attr', '0', 'Element');
        }
        if (this.isEmpty(param)) {
            throw new NError('invoke', 'this.attr', '1', 'string', 'object');
        }
        if (value === undefined || value === null) {
            if (this.isObject(param)) { //设置多个属性
                this.getOwnProps(param).forEach(function (k) {
                    if (k === 'value') {
                        el[k] = param[k];
                    }
                    else {
                        el.setAttribute(k, param[k]);
                    }
                });
            }
            else if (this.isString(param)) { //获取属性
                if (param === 'value') {
                    return param[value];
                }
                return el.getAttribute(param);
            }
        }
        else { //设置属性
            if (param === 'value') {
                el[param] = value;
            }
            else {
                el.setAttribute(param, value);
            }
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
     *
     * @param vDom element元素
     * @param module 模块
     * @param parent 父element
     * @param parentEl 父真实dom
     * @returns 新建一个dom元素
     */
    static newEls(vDom, module, parent, parentEl) {
        let el1;
        if (vDom.tagName) {
            el1 = newEl(vDom, parent, parentEl);
            genSub(el1, vDom);
        }
        else {
            el1 = newText(vDom.textContent);
        }
        return el1;
        /**
     * 新建element节点
     * @param vdom 		虚拟dom
     * @param parent 	父虚拟dom
     * @param parentEl 	父element
     * @returns 		新的html element
     */
        function newEl(vdom, parent, parentEl) {
            //创建element
            let el;
            if (vdom.getTmpParam('isSvgNode')) { //如果为svg node，则创建svg element
                el = Util.newSvgEl(vdom.tagName);
            }
            else {
                el = Util.newEl(vdom.tagName);
            }
            //设置属性
            Util.getOwnProps(vdom.props).forEach((k) => {
                if (typeof vdom.props[k] != 'function')
                    el.setAttribute(k, vdom.props[k]);
            });
            el.setAttribute('key', vdom.key);
            vdom.handleNEvents(module, el, parent, parentEl);
            vdom.handleAssets(el);
            return el;
        }
        /**
         * 新建文本节点
         */
        function newText(text, dom) {
            if (!text) {
                text = '';
            }
            return document.createTextNode(text);
        }
        /**
         * 生成子节点
         * @param pEl 	父节点
         * @param vNode 虚拟dom父节点
         */
        function genSub(pEl, vNode) {
            if (vNode.children && vNode.children.length > 0) {
                vNode.children.forEach((item) => {
                    let el1;
                    if (item.tagName) {
                        el1 = newEl(item, vNode, pEl);
                        genSub(el1, item);
                    }
                    else {
                        el1 = newText(item.textContent);
                    }
                    pEl.appendChild(el1);
                });
            }
        }
    }
}
Util.generatedId = 1;
/**
 * js 保留关键字
 */
Util.keyWords = [
    'arguments', 'boolean', 'break', 'byte', 'catch', 'char', 'const', 'default', 'delete', 'do',
    'double', 'else', 'enum', 'eval', 'false', 'float', 'for', 'function', 'goto', 'if',
    'in', 'instanceof', 'int', 'let', 'long', 'new', 'null', 'return', 'short', 'switch',
    'this', 'throw', 'throws', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with',
    'Array', 'Date', 'eval', 'function', 'hasOwnProperty', 'Infinity', 'isFinite', 'isNaN',
    'isPrototypeOf', 'length', 'Math', 'NaN', 'Number', 'Object', 'prototype', 'String', 'undefined', 'valueOf'
];

/**
 * 指令管理器
 */
class DirectiveManager {
    /**
     * 创建指令类型
     * @param name 		    指令类型名
     * @param config 	    配置对象{order:优先级,init:初始化函数,handler:渲染处理函数}
     */
    static addType(name, prio, init, handle) {
        this.directiveTypes.set(name, new DirectiveType(name, prio, init, handle));
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
    /**
     * 指令初始化
     * @param directive     指令
     * @param dom           虚拟dom
     * @param parent        父虚拟dom
     */
    static init(directive, dom, parent) {
        let dt = directive.type;
        if (dt) {
            return dt.init(directive, dom, parent);
        }
    }
    /**
     * 执行指令
     * @param directive     指令
     * @param dom           虚拟dom
     * @param module        模块
     * @param parent        父dom
     * @returns             指令执行结果
     */
    static exec(directive, dom, module, parent) {
        //调用
        return Util.apply(directive.type.handle, null, [directive, dom, module, parent]);
    }
}
/**
 * 指令类型集合
 */
DirectiveManager.directiveTypes = new Map();

/**
 * 表达式类
 */
class Expression {
    /**
     * @param exprStr	表达式串
     */
    constructor(exprStr) {
        this.fields = []; // 字段数组
        this.id = Util.genId();
        if (exprStr) {
            this.execFunc = new Function('$model', '$methods', `
                with($model){
                    with($methods){
                        return ${exprStr.trim()};
                    }
                }
            `);
        }
    }
    /**
     * 初始化，把表达式串转换成堆栈
     * @param exprStr 	表达式串
     */
    compile(exprStr) {
        const me = this;
        //字符串识别正则式
        let reg = /('.*')|(".*")|(`.*`)/g;
        //开始位置
        let st = 0;
        //存在字符串
        let hasStr = false;
        let r;
        while ((r = reg.exec(exprStr)) !== null) {
            if (r.index > st) {
                let tmp = exprStr.substring(st, r.index);
                let s1 = handle(tmp);
                exprStr = exprStr.substring(0, st) + s1 + r[0] + exprStr.substr(reg.lastIndex);
                reg.lastIndex = st + s1.length + r[0].length;
            }
            st = reg.lastIndex;
            hasStr = true;
        }
        if (!hasStr) {
            exprStr = handle(exprStr);
        }
        return exprStr;
        /**
         * 处理单词串
         * @param src   源串
         * @returns     处理后的串
         */
        function handle(src) {
            let reg = /[$a-zA-Z_][$\w\d\.]+(\s*\()?/g;
            let r;
            while ((r = reg.exec(src)) !== null) {
                if (r[0].endsWith('(')) {
                    let fos = handleFunc(r[0], r.index > 0 ? src[r.index - 1] : '');
                    src = src.substring(0, r.index) + fos + src.substr(reg.lastIndex);
                    reg.lastIndex = r.index + fos.length;
                }
                else {
                    let fn = r[0];
                    let ind = fn.indexOf('.');
                    if (ind !== -1) {
                        fn = fn.substring(0, ind);
                    }
                    // 非保留字
                    if (Util.keyWords.indexOf(fn) === -1) {
                        me.fields.push(fn);
                    }
                }
            }
            return src;
        }
        /**
         * 处理函数
         * @param src   源串
         * @param preCh 前一个字符
         * @returns     处理后的函数串
         */
        function handleFunc(src, preCh) {
            let mName = src.substring(0, src.length - 1).trim();
            let ind = mName.indexOf('.');
            //可能是模块方法
            if (ind === -1) {
                if (Util.keyWords.indexOf(mName) === -1 && preCh !== '.') { //非关键词,且前一个字符不是.
                    return "($module.getMethod('" + mName + "')||" + mName + ')(';
                }
            }
            else {
                let fn = mName.substring(0, ind);
                if (Util.keyWords.indexOf(fn) === -1) {
                    me.fields.push(fn);
                }
            }
            return src;
        }
    }
    /**
     * 表达式计算
     * @param model 	模型 或 fieldObj对象
     * @returns 		计算结果
     */
    val(model) {
        if (!this.execFunc) {
            return '';
        }
        let module = ModuleFactory.get(model.$moduleId);
        if (!model)
            model = module.model;
        let v;
        try {
            v = this.execFunc.apply(module.model, [model, module.methods || {}]);
        }
        catch (e) {
            console.error(e);
        }
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
 * 指令类
 */
class Directive {
    /**
     * 构造方法
     * @param type  	类型名
     * @param value 	指令值
     * @param dom       指令对应的dom
     * @param filters   过滤器字符串或过滤器对象,如果为过滤器串，则以｜分割
     * @param notSort   不排序
     */
    constructor(type, value, dom, parent, notSort) {
        this.id = Util.genId();
        this.type = DirectiveManager.getType(type);
        if (Util.isString(value)) {
            this.value = value.trim();
        }
        else if (value instanceof Expression) {
            this.expression = value;
        }
        if (type !== undefined && dom) {
            DirectiveManager.init(this, dom, parent);
            dom.addDirective(this, !notSort);
        }
    }
    /**
     * 执行指令
     * @param module    模块
     * @param dom       指令执行时dom
     * @param parent    父虚拟dom
     */
    exec(module, dom, parent) {
        return __awaiter(this, void 0, void 0, function* () {
            return DirectiveManager.exec(this, dom, module, parent);
        });
    }
    /**
     * 克隆
     * @param dst   目标dom
     * @returns     新指令
     */
    clone(dst) {
        let dir = new Directive(this.type.name, this.value);
        if (this.params) {
            dir.params = Util.clone(this.params);
        }
        if (this.extra) {
            dir.extra = Util.clone(this.extra);
        }
        if (this.expression) {
            dir.expression = this.expression;
        }
        DirectiveManager.init(dir, dst);
        return dir;
    }
}

/**
 * 改变的dom类型
 * 用于比较需要修改渲染的节点属性存储
 */
class ChangedDom {
    /**
     *
     * @param node      虚拟节点
     * @param type      修改类型  add(添加节点),del(删除节点),upd(更新节点),rep(替换节点),text(修改文本内容)
     * @param parent    父虚拟dom
     * @param index     在父节点中的位置索引
     */
    constructor(node, type, parent, index) {
        this.node = node;
        this.type = type;
        this.parent = parent;
        this.index = index;
    }
}

/**
 * 虚拟dom
 */
class Element {
    /**
     * @param tag 标签名
     */
    constructor(tag) {
        /**
         * 指令集
         */
        this.directives = [];
        /**
         * 直接属性 不是来自于attribute，而是直接作用于html element，如el.checked,el.value等
         */
        this.assets = new Map();
        /**
         * 静态属性(attribute)集合
         * {prop1:value1,...}
         */
        this.props = {};
        /**
         * 含表达式的属性集合
         * {prop1:value1,...}
         */
        this.exprProps = {};
        /**
         * 事件集合,{eventName1:nodomNEvent1,...}
         * 一个事件名，可以绑定多个事件方法对象
         */
        this.events = new Map();
        /**
         * 表达式+字符串数组，用于textnode
         */
        this.expressions = [];
        /**
         * 子element
         */
        this.children = [];
        /**
         * 不渲染标志，单次渲染有效
         */
        this.dontRender = false;
        /**
         * 模块外部数据集，d- 开头的属性，用于从父、兄和子模块获取数据，该element为模块容器时有效，
         */
        this.moduleDatas = {};
        /**
         * 渲染前（获取model后）执行方法集合,可以是方法名（在module的methods中定义），也可以是函数
         * 函数的this指向element的model，参数为(element,module)
         */
        this.beforeRenderOps = [];
        /**
         * 渲染后（renderToHtml前）执行方法集合，可以是方法名（在module的methods中定义），也可以是函数
         * 函数的this指向element的model，参数为(element,module)
         */
        this.afterRenderOps = [];
        /**
         * 临时参数 map
         */
        this.tmpParamMap = new Map();
        this.tagName = tag; //标签
        //检查是否为svg
        if (tag && tag.toLowerCase() === 'svg') {
            this.setTmpParam('isSvgNode', true);
        }
        //key
        this.key = Util.genId() + '';
    }
    /**
     * 渲染到virtualdom树
     * @param module 	模块
     * @param parent 	父节点
     * @returns         渲染成功（dontRender=false） true,否则false
     */
    render(module, parent) {
        if (this.dontRender) {
            this.doDontRender(parent);
            return false;
        }
        // 设置父对象
        if (parent) {
            // 设置modelId
            if (!this.model) {
                this.model = parent.model;
            }
            this.parent = parent;
        }
        //设置model为模块model
        if (!this.model) {
            this.model = module.model;
        }
        //先执行model指令
        if (this.hasDirective('model')) {
            let d = this.getDirective('model');
            d.exec(module, this, this.parent);
        }
        //前置方法集合执行
        this.doRenderOp(module, 'before');
        if (this.tagName !== undefined) { //element
            if (!this.handleDirectives(module)) {
                this.doDontRender(parent);
                return false;
            }
            this.handleProps(module);
        }
        else { //textContent
            this.handleTextContent(module);
        }
        //子节点渲染，子模块不渲染
        if (!this.hasDirective('module')) {
            for (let i = 0; i < this.children.length; i++) {
                let item = this.children[i];
                if (!item.render(module, this)) {
                    item.doDontRender(this);
                    i--;
                }
            }
        }
        //后置方法集执行
        this.doRenderOp(module, 'after');
        return true;
    }
    /**
     * 渲染到html element
     * @param module 	模块
     * @param params 	配置对象{}
     *          type 		类型
     *          parent 	父虚拟dom
     */
    renderToHtml(module, params) {
        let el;
        let el1;
        let type = params.type;
        let parent = params.parent;
        //重置dontRender
        //构建el
        if (type === 'fresh' || type === 'add' || type === 'text') {
            if (parent) {
                el = module.getNode(parent.key);
            }
            else {
                el = module.getContainer();
                // console.log(el);
            }
        }
        else if (this.tagName !== undefined) { //element节点才可以查找
            el = module.getNode(this.key);
            this.handleAssets(el);
        }
        if (!el) {
            return;
        }
        switch (type) {
            case 'fresh': //首次渲染
                if (this.tagName) {
                    el1 = newEl(this, null, el);
                    //首次渲染需要生成子孙节点
                    genSub(el1, this);
                }
                else {
                    el1 = newText(this.textContent);
                }
                el.appendChild(el1);
                break;
            case 'text': //文本更改
                if (!parent || !parent.children) {
                    break;
                }
                let indexArr = [];
                parent.children.forEach(v => [
                    indexArr.push(v.key)
                ]);
                let ind = indexArr.indexOf(this.key);
                if (ind !== -1) {
                    el.childNodes[ind].textContent = this.textContent;
                }
                break;
            case 'upd': //修改属性
                //删除属性
                if (params.removeProps) {
                    params.removeProps.forEach((p) => {
                        el.removeAttribute(p);
                    });
                }
                //修改属性
                if (params.changeProps) {
                    params.changeProps.forEach((p) => {
                        el.setAttribute(p['k'], p['v']);
                    });
                }
                //修改直接绑定el上的属性（不是attribute）
                if (params.changeAssets) {
                    params.changeAssets.forEach((p) => {
                        el[p['k']] = p['v'];
                    });
                }
                break;
            case 'rep': //替换节点
                el1 = newEl(this, parent);
                Util.replaceNode(el, el1);
                break;
            case 'add': //添加
                if (this.tagName) {
                    el1 = newEl(this, parent, el);
                    genSub(el1, this);
                }
                else {
                    el1 = newText(this.textContent);
                }
                if (params.index === el.childNodes.length) {
                    el.appendChild(el1);
                }
                else {
                    el.insertBefore(el1, el.childNodes[params.index]);
                }
        }
        /**
         * 新建element节点
         * @param vdom 		虚拟dom
         * @param parent 	父虚拟dom
         * @param parentEl 	父element
         * @returns 		新的html element
         */
        function newEl(vdom, parent, parentEl) {
            //创建element
            let el;
            if (vdom.getTmpParam('isSvgNode')) { //如果为svg node，则创建svg element
                el = Util.newSvgEl(vdom.tagName);
            }
            else {
                el = Util.newEl(vdom.tagName);
            }
            //设置属性
            Util.getOwnProps(vdom.props).forEach((k) => {
                if (typeof vdom.props[k] != 'function')
                    el.setAttribute(k, vdom.props[k]);
            });
            el.setAttribute('key', vdom.key);
            vdom.handleNEvents(module, el, parent, parentEl);
            vdom.handleAssets(el);
            return el;
        }
        /**
         * 新建文本节点
         */
        function newText(text) {
            return document.createTextNode(text || '');
        }
        /**
         * 生成子节点
         * @param pEl 	父节点
         * @param vNode 虚拟dom父节点
         */
        function genSub(pEl, vNode) {
            if (vNode.children && vNode.children.length > 0) {
                vNode.children.forEach((item) => {
                    let el1;
                    if (item.tagName) {
                        el1 = newEl(item, vNode, pEl);
                        genSub(el1, item);
                    }
                    else {
                        el1 = newText(item.textContent);
                    }
                    pEl.appendChild(el1);
                });
            }
        }
    }
    /**
     * 克隆
     * changeKey    是否更改key，主要用于创建时克隆，渲染时克隆不允许修改key
     */
    clone(changeKey) {
        let dst = new Element();
        //不直接拷贝的属性
        let notCopyProps = ['parent', 'directives', 'defineEl', 'children', 'model'];
        //简单属性
        Util.getOwnProps(this).forEach((p) => {
            if (notCopyProps.includes(p)) {
                return;
            }
            if (typeof this[p] === 'object') {
                dst[p] = Util.clone(this[p]);
            }
            else {
                dst[p] = this[p];
            }
        });
        //表示clone后进行新建节点
        if (changeKey) {
            dst.key = Util.genId() + '';
        }
        //指令复制
        for (let d of this.directives) {
            dst.directives.push(d.clone(dst));
        }
        //孩子节点
        for (let c of this.children) {
            dst.add(c.clone(changeKey));
        }
        return dst;
    }
    /**
     * 处理指令
     * @param module    模块
     */
    handleDirectives(module) {
        for (let d of this.directives.values()) {
            //model指令已经执行，不再执行
            if (d.type.name === 'model') {
                continue;
            }
            if (d.expression) {
                d.value = d.expression.val(this.model);
            }
            d.exec(module, this, this.parent);
            //指令可能改变render标志
            if (this.dontRender) {
                return false;
            }
        }
        return true;
    }
    /**
     * 表达式处理，添加到expression计算队列
     * @param exprArr   表达式或字符串数组
     * @param module    模块
     */
    handleExpression(exprArr, module) {
        let model = this.model;
        let value = '';
        if (exprArr.length === 1 && typeof exprArr[0] !== 'string') {
            let v1 = exprArr[0].val(model);
            return v1 !== undefined ? v1 : '';
        }
        exprArr.forEach((v) => {
            if (v instanceof Expression) { //处理表达式
                let v1 = v.val(model);
                value += v1 !== undefined ? v1 : '';
            }
            else {
                value += v;
            }
        });
        return value;
    }
    /**
      * 处理属性（带表达式）
      * @param module    模块
      */
    handleProps(module) {
        for (let k of Util.getOwnProps(this.exprProps)) {
            //属性值为数组，则为表达式
            if (Util.isArray(this.exprProps[k])) {
                let pv = this.handleExpression(this.exprProps[k], module);
                if (k === 'style') {
                    this.addStyle(pv);
                }
                else {
                    this.props[k] = pv;
                }
            }
            else if (this.exprProps[k] instanceof Expression) { //单个表达式
                if (k === 'style') {
                    this.addStyle(this.exprProps[k].val(this.model));
                }
                else {
                    // console.log('prop is',k,this.exprProps[k].execFunc);
                    this.props[k] = this.exprProps[k].val(this.model);
                }
            }
        }
    }
    /**
     * 处理asset，在渲染到html时执行
     * @param el    dom对应的html element
     */
    handleAssets(el) {
        if (!this.tagName || !el) {
            return;
        }
        for (let key of this.assets) {
            el[key[0]] = key[1];
        }
    }
    /**
     * 处理文本（表达式）
     * @param module    模块
     */
    handleTextContent(module) {
        if (this.expressions !== undefined && this.expressions.length > 0) {
            this.textContent = this.handleExpression(this.expressions, module) || '';
        }
    }
    /**
     * 处理事件
     * @param module    模块
     * @param el        html element
     * @param parent    父virtual dom
     * @param parentEl  父html element
     */
    handleNEvents(module, el, parent, parentEl) {
        if (this.events.size === 0) {
            return;
        }
        for (let evt of this.events.values()) {
            if (Util.isArray(evt)) {
                for (let evo of evt) {
                    evo.bind(module, this, el, parent, parentEl);
                }
            }
            else {
                evt.bind(module, this, el, parent, parentEl);
            }
        }
    }
    /**
     * 移除指令
     * @param directives 	待删除的指令类型数组或指令类型
     */
    removeDirectives(directives) {
        if (typeof directives === 'string') {
            let ind;
            if ((ind = this.directives.findIndex(item => item.type.name === directives)) !== -1) {
                this.directives.splice(ind, 1);
            }
            return;
        }
        for (let d of directives) {
            let ind;
            if ((ind = this.directives.findIndex(item => item.type.name === d)) !== -1) {
                this.directives.splice(ind, 1);
            }
        }
    }
    /**
     * 添加指令
     * @param directive     指令对象
     * @param sort          是否排序
     */
    addDirective(directive, sort) {
        let finded = false;
        for (let i = 0; i < this.directives.length; i++) {
            //如果存在相同类型，则直接替换
            if (this.directives[i].type === directive.type) {
                this.directives[i] = directive;
                finded = true;
                break;
            }
        }
        if (!finded) {
            this.directives.push(directive);
        }
        //指令按优先级排序
        if (sort) {
            if (this.directives.length > 1) {
                this.directives.sort((a, b) => {
                    return a.type.prio - b.type.prio;
                });
            }
        }
    }
    /**
     * 是否有某个类型的指令
     * @param directiveType 	指令类型名
     * @return true/false
     */
    hasDirective(directiveType) {
        return this.directives.findIndex(item => item.type.name === directiveType) !== -1;
    }
    /**
     * 获取某个类型的指令
     * @param directiveType 	指令类型名
     * @return directive
     */
    getDirective(directiveType) {
        return this.directives.find(item => item.type.name === directiveType);
    }
    /**
     * 添加子节点
     * @param dom 	子节点
     */
    add(dom) {
        if (Array.isArray(dom)) {
            dom.forEach(v => {
                //将parent也附加上，增量渲染需要
                v.parent = this;
            });
            this.children.push(...dom);
        }
        else {
            this.children.push(dom);
            dom.parent = this;
        }
    }
    /**
     * 移除子节点
     * @param dom   子dom
     */
    removeChild(dom) {
        let ind;
        // 移除
        if (Util.isArray(this.children) && (ind = this.children.indexOf(dom)) !== -1) {
            this.children.splice(ind, 1);
        }
    }
    /**
     * 替换目标节点
     * @param dst 	目标节点
     */
    replace(dst) {
        if (!dst.parent) {
            return false;
        }
        let ind = dst.parent.children.indexOf(dst);
        if (ind === -1) {
            return false;
        }
        //替换
        dst.parent.children.splice(ind, 1, this);
        return true;
    }
    /**
     * 是否包含节点
     * @param dom 	包含的节点
     */
    contains(dom) {
        for (; dom !== undefined && dom !== this; dom = dom.parent)
            ;
        return dom !== undefined;
    }
    /**
     * 是否存在某个class
     * @param cls   classname
     * @return      true/false
     */
    hasClass(cls) {
        let clazz = this.props['class'];
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
        let clazz = this.props['class'];
        if (!clazz) {
            this.props['class'] = cls;
        }
        else {
            let sa = clazz.trim().split(/\s+/);
            if (!sa.includes(cls)) {
                sa.push(cls);
                clazz = sa.join(' ');
                this.props['class'] = clazz;
            }
        }
    }
    /**
     * 删除css class
     * @param cls class名
     */
    removeClass(cls) {
        let clazz = this.props['class'];
        if (!clazz) {
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
        this.props['class'] = clazz;
    }
    /**
         * 查询style
         * @param styStr style字符串
         */
    hasStyle(styStr) {
        let styleStr = this.props['style'];
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
        let styleStr = this.props['style'];
        if (!styleStr) {
            this.props['style'] = styStr;
        }
        else {
            let sa = styleStr.trim().split(/;\s+/);
            if (!sa.includes(styStr)) {
                sa.push(styStr);
                styleStr = sa.join(';');
                this.props['style'] = styleStr;
            }
        }
    }
    /**
     * 删除style
     * @param styStr style字符串
     */
    removeStyle(styStr) {
        let styleStr = this.props['style'];
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
        this.props['style'] = styleStr;
    }
    /**
     * 是否拥有属性
     * @param propName  属性名
     */
    hasProp(propName) {
        return this.props.hasOwnProperty(propName) || this.exprProps.hasOwnProperty(propName);
    }
    /**
     * 获取属性值
     * @param propName  属性名
     */
    getProp(propName, isExpr) {
        if (isExpr) {
            return this.exprProps[propName];
        }
        else {
            return this.props[propName];
        }
    }
    /**
     * 设置属性值
     * @param propName  属性名
     * @param v         属性值
     * @param isExpr    是否是表达式属性 默认false
     */
    setProp(propName, v, isExpr) {
        if (isExpr) {
            this.exprProps[propName] = v;
        }
        else {
            this.props[propName] = v;
        }
    }
    /**
     * 删除属性
     * @param props     属性名或属性名数组
     */
    delProp(props) {
        if (Util.isArray(props)) {
            for (let p of props) {
                delete this.exprProps[p];
            }
            for (let p of props) {
                delete this.props[p];
            }
        }
        else {
            delete this.exprProps[props];
            delete this.props[props];
        }
    }
    /**
     * 设置asset
     * @param assetName     asset name
     * @param value         asset value
     */
    setAsset(assetName, value) {
        this.assets.set(assetName, value);
    }
    /**
     * 删除asset
     * @param assetName     asset name
     */
    delAsset(assetName) {
        this.assets.delete(assetName);
    }
    /**
     * 查找子孙节点
     * @param key 	element key
     * @returns		虚拟dom/undefined
     */
    query(key) {
        //defineEl
        if (typeof key === 'object' && key != null) {
            let res = true;
            for (const [attr, value] of Object.entries(key)) {
                if (attr !== 'type' && (this.getProp(attr.toLocaleLowerCase()) || this[attr]) != value) {
                    res = false;
                    break;
                }
            }
            if (res) {
                return this;
            }
        }
        else {
            if (this.key === key)
                return this;
        }
        for (let i = 0; i < this.children.length; i++) {
            let dom = this.children[i].query(key);
            if (dom) {
                return dom;
            }
        }
    }
    /**
     * 比较节点
     * @param dst 	待比较节点
     * @returns	{type:类型 text/rep/add/upd,node:节点,parent:父节点,
     * 			changeProps:改变属性,[{k:prop1,v:value1},...],removeProps:删除属性,[prop1,prop2,...],changeAssets:改变的asset}
     */
    compare(dst, retArr, deleteMap, parentNode) {
        if (!dst) {
            return;
        }
        let re = new ChangedDom();
        let change = false;
        if (this.tagName === undefined) { //文本节点
            if (dst.tagName === undefined) {
                if (this.textContent !== dst.textContent) {
                    re.type = 'text';
                    change = true;
                }
            }
            else { //节点类型不同
                addDelKey(this, 'rep');
            }
        }
        else { //element节点
            if (this.tagName !== dst.tagName) { //节点类型不同
                addDelKey(this, 'rep');
            }
            else { //节点类型相同，可能属性不同
                //检查属性，如果不同则放到changeProps
                re.changeProps = [];
                re.changeAssets = [];
                //待删除属性
                re.removeProps = [];
                //删除或增加的属性
                Util.getOwnProps(dst.props).forEach((k) => {
                    if (!this.hasProp(k)) {
                        re.removeProps.push(k);
                    }
                });
                //修改后的属性
                Util.getOwnProps(this.props).forEach((k) => {
                    let v1 = dst.props[k];
                    if (this.props[k] !== v1) {
                        re.changeProps.push({ k: k, v: this.props[k] });
                    }
                });
                //修改后的asset
                for (let kv of this.assets) {
                    let v1 = dst.assets.get(kv[0]);
                    if (kv[0] !== v1) {
                        re.changeAssets.push({ k: kv[0], v: kv[1] });
                    }
                }
                // props assets 改变或删除，加入渲染
                if (re.changeProps.length > 0 || re.changeAssets.length > 0 || re.removeProps.length > 0) {
                    change = true;
                    re.type = 'upd';
                }
            }
        }
        //改变则加入数据
        if (change) {
            re.node = this;
            if (parentNode) {
                re.parent = parentNode;
            }
            retArr.push(re);
        }
        //子节点处理
        if (!this.children || this.children.length === 0) {
            // 旧节点的子节点全部删除
            if (dst.children && dst.children.length > 0) {
                dst.children.forEach(item => addDelKey(item));
            }
        }
        else {
            //全部新加节点
            if (!dst.children || dst.children.length === 0) {
                this.children.forEach(item => retArr.push(new ChangedDom(item, 'add', this)));
            }
            else { //都有子节点
                //子节点对比策略
                let [oldStartIdx, oldStartNode, oldEndIdx, oldEndNode] = [0, dst.children[0], dst.children.length - 1, dst.children[dst.children.length - 1]];
                let [newStartIdx, newStartNode, newEndIdx, newEndNode] = [0, this.children[0], this.children.length - 1, this.children[this.children.length - 1]];
                while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
                    if (sameKey(oldStartNode, newStartNode)) {
                        newStartNode.compare(oldStartNode, retArr, deleteMap, this);
                        newStartNode = this.children[++newStartIdx];
                        oldStartNode = dst.children[++oldStartIdx];
                    }
                    else if (sameKey(oldEndNode, newEndNode)) {
                        newEndNode.compare(oldEndNode, retArr, deleteMap, this);
                        newEndNode = this.children[--newEndIdx];
                        oldEndNode = dst.children[--oldEndIdx];
                    }
                    else if (sameKey(newStartNode, oldEndNode)) {
                        //新前久后
                        newStartNode.compare(oldEndNode, retArr, deleteMap, this);
                        //接在待操作老节点前面
                        addDelKey(oldEndNode, 'insert', [oldStartNode.key]);
                        newStartNode = this.children[++newStartIdx];
                        oldEndNode = dst.children[--oldEndIdx];
                    }
                    else if (sameKey(newEndNode, oldStartNode)) {
                        newEndNode.compare(oldStartNode, retArr, deleteMap, this);
                        //接在老节点后面
                        addDelKey(oldStartNode, 'insert', [dst.children[oldEndIdx + 1].key]);
                        newEndNode = this.children[--newEndIdx];
                        oldStartNode = dst.children[++oldStartIdx];
                    }
                    else {
                        addDelKey(newStartNode, 'add', [oldStartNode.key]);
                        newStartNode = this.children[++newStartIdx];
                    }
                }
                //有新增或删除节点
                if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
                    if (oldStartIdx > oldEndIdx) {
                        //没有老节点
                        for (let i = newStartIdx; i <= newEndIdx; i++) {
                            let ch = this.children[i];
                            if (ch) {
                                // 添加到老节点的前面
                                oldEndNode && addDelKey(ch, 'add', [dst.children[oldEndIdx + 1].key]);
                            }
                        }
                    }
                    else {
                        //有老节点
                        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                            addDelKey(dst.children[i], 'del');
                        }
                    }
                }
            }
        }
        function sameKey(newElement, oldElement) {
            return newElement.key === oldElement.key;
        }
        //添加刪除替換的key
        function addDelKey(element, type, insert) {
            let pKey = element.parent.key;
            if (!deleteMap.has(pKey)) {
                deleteMap.set(pKey, new Array());
            }
            //添加节点或者更改节点顺序
            if (insert != undefined) {
                deleteMap.get(pKey).push(type === 'add' ? [element.key, insert[0], 'add'] : [element.key, insert[0]]);
            }
            else {
                let ans;
                //老节点的删除不能依据index
                if (type == 'del') {
                    ans = [element.key];
                }
                else {
                    ans = type == 'rep' ? element.parent.children.indexOf(element) + '|' + element.key : element.parent.children.indexOf(element);
                }
                deleteMap.get(pKey).push(ans);
            }
        }
    }
    /**
     * 添加事件
     * @param event         事件对象
     */
    addEvent(event) {
        //如果已经存在，则改为event数组，即同名event可以多个执行方法
        if (this.events.has(event.name)) {
            let ev = this.events.get(event.name);
            let evs;
            if (Util.isArray(ev)) {
                evs = ev;
            }
            else {
                evs = [ev];
            }
            evs.push(event);
            this.events.set(event.name, evs);
        }
        else {
            this.events.set(event.name, event);
        }
    }
    /**
     * 获取事件
     * @param eventName     事件名
     * @returns             事件对象或事件对象数组
     */
    getEvent(eventName) {
        return this.events.get(eventName);
    }
    /**
     * 执行不渲染关联操作
     * 关联操作，包括:
     *  1 节点(子节点)含有module指令，需要unactive
     */
    doDontRender(parent) {
        //对于模块容器，对应module需unactive
        if (this.hasDirective('module')) {
            let d = this.getDirective('module');
            if (d.extra && d.extra.moduleId) {
                let mdl = ModuleFactory.get(d.extra.moduleId);
                if (mdl) {
                    mdl.unactive();
                }
            }
        }
        //子节点递归
        for (let c of this.children) {
            c.doDontRender(this);
        }
        //从虚拟dom树中移除
        if (parent) {
            parent.removeChild(this);
        }
    }
    /**
     * 设置临时参数
     * @param key       参数名
     * @param value     参数值
     */
    setTmpParam(key, value) {
        this.tmpParamMap.set(key, value);
    }
    /**
     * 获取临时参数
     * @param key       参数名
     * @returns         参数值
     */
    getTmpParam(key) {
        return this.tmpParamMap.get(key);
    }
    /**
     * 删除临时参数
     * @param key       参数名
     */
    removeTmpParam(key) {
        this.tmpParamMap.delete(key);
    }
    /**
     * 是否有临时参数
     * @param key       参数名
     */
    hasTmpParam(key) {
        return this.tmpParamMap.has(key);
    }
    /**
     * 添加渲染附加操作
     * @param method    方法名
     * @param type      类型 before,after
     */
    addRenderOp(method, type) {
        if (type === 'before') {
            this.beforeRenderOps.push(method);
        }
        else {
            this.afterRenderOps.push(method);
        }
    }
    /**
     * 执行渲染附加操作
     * @param module    模块
     * @param type      类型 before,after
     */
    doRenderOp(module, type) {
        // 否则执行注册在element上的前置渲染方法
        let arr = type === 'before' ? this.beforeRenderOps : this.afterRenderOps;
        for (let m of arr) {
            //可能是字符串
            if (typeof m === 'string') {
                m = module.getMethod(m);
            }
            if (m) {
                m.apply(this.model, [this, module]);
            }
        }
    }
}

/**
 * 事件类
 * @remarks
 * 事件分为自有事件和代理事件
 * 自有事件绑定在view上
 * 代理事件绑定在父view上，存储于事件对象的events数组中
 * 如果所绑定对象已存在该事件名对应的事件，如果是代理事件，则添加到子事件队列，否则替换view自有事件
 * 事件执行顺序，先执行代理事件，再执行自有事件
 *
 * @author      yanglei
 * @since       1.0
 */
class NEvent {
    /**
     * @param eventName     事件名
     * @param eventStr      事件串或事件处理函数,以“:”分割,中间不能有空格,结构为: 方法名[:delg(代理到父对象):nopopo(禁止冒泡):once(只执行一次):capture(useCapture)]
     *                      如果为函数，则替代第三个参数
     * @param handler       事件执行函数，如果方法不在module methods中定义，则可以直接申明，eventStr第一个参数失效，即eventStr可以是":delg:nopopo..."
     */
    constructor(eventName, eventStr, handler) {
        this.id = Util.genId();
        this.name = eventName;
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
        //设备类型  1:触屏，2:非触屏	
        let dtype = 'ontouchend' in document ? 1 : 2;
        //触屏事件根据设备类型进行处理
        if (dtype === 1) { //触屏设备
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
     * 事件触发
     * @param e     事件
     * @param el    html element
     */
    fire(e, el) {
        const module = ModuleFactory.get(this.moduleId);
        if (!module.getContainer()) {
            return;
        }
        let dom = module.getElement(this.domKey);
        const model = dom.model;
        //如果capture为true，则先执行自有事件，再执行代理事件，否则反之
        if (this.capture) {
            handleSelf(this, e, model, module, dom, el);
            handleDelg(this, e, dom);
        }
        else {
            if (handleDelg(this, e, dom)) {
                handleSelf(this, e, model, module, dom, el);
            }
        }
        //判断是否清除事件
        if (this.events !== undefined &&
            this.events.has(this.name) &&
            this.events.get(this.name).length === 0 &&
            this.handler === undefined) {
            if (!el) {
                el = module.getNode(this.domKey);
            }
            if (ExternalNEvent.touches[this.name]) {
                ExternalNEvent.unregist(this, el);
            }
            else {
                if (el !== null) {
                    el.removeEventListener(this.name, this.handleListener);
                }
            }
        }
        /**
         * 处理自有事件
         * @param eObj      nodom event对象
         * @param e         事件
         * @param dom       虚拟dom
         * @returns         true 允许冒泡 false 禁止冒泡
         */
        function handleDelg(eObj, e, dom) {
            //代理事件执行
            if (eObj.events === undefined) {
                return true;
            }
            //事件target对应的key
            let eKey = e.target.getAttribute('key');
            let arr = eObj.events.get(eObj.name);
            if (Util.isArray(arr)) {
                if (arr.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        let sdom = dom.query(arr[i].domKey);
                        if (!sdom) {
                            continue;
                        }
                        // 找到对应的子事件执行
                        if (eKey === sdom.key || sdom.query(eKey)) {
                            //执行
                            arr[i].fire(e);
                            //执行一次，需要移除
                            if (arr[i].once) {
                                eObj.removeChild(arr[i]);
                            }
                            //禁止冒泡
                            if (arr[i].nopopo) {
                                return false;
                            }
                        }
                    }
                }
                else { //删除该事件
                    eObj.events.delete(eObj.name);
                }
            }
            return true;
        }
        /**
         * 处理自有事件
         * @param eObj      NEvent对象
         * @param e         事件
         * @param model     模型
         * @param module    模块
         * @param dom       虚拟dom
         */
        function handleSelf(eObj, e, model, module, dom, el) {
            if (typeof eObj.handler === 'string') {
                eObj.handler = module.getMethod(eObj.handler);
            }
            if (!eObj.handler) {
                return;
            }
            //禁止冒泡
            if (eObj.nopopo) {
                e.stopPropagation();
            }
            Util.apply(eObj.handler, dom.model, [dom, module, e, el]);
            //事件只执行一次，则删除handler
            if (eObj.once) {
                delete eObj.handler;
            }
        }
    }
    /**
     * 绑定事件
     * @param module    模块
     * @param dom       虚拟dom
     * @param el        html element
     * @param parent    父dom
     * @param parentEl  对应htmlelement的父html element
     */
    bind(module, dom, el, parent, parentEl) {
        this.moduleId = module.id;
        this.domKey = dom.key;
        if (this.delg && parent) { //代理到父对象
            this.delegateTo(module, dom, el, parent, parentEl);
        }
        else {
            this.bindTo(el);
        }
    }
    /**
     * 绑定到el
     * @param el    目标html element
     */
    bindTo(el) {
        //触屏事件
        if (ExternalNEvent.touches[this.name]) {
            ExternalNEvent.regist(this, el);
        }
        else {
            this.handleListener = (e) => {
                this.fire(e, el);
            };
            el.addEventListener(this.name, this.handleListener, this.capture);
        }
    }
    /**
     *
     * 事件代理到父对象
     * @param module    模块
     * @param vdom      虚拟dom
     * @param el        事件作用的html element
     * @param parent    父虚拟dom
     * @param parentEl  父element
     */
    delegateTo(module, vdom, el, parent, parentEl) {
        this.domKey = vdom.key;
        this.moduleId = module.id;
        //如果不存在父对象，则用body
        if (!parentEl) {
            parentEl = document.body;
        }
        //父节点如果没有这个事件，则新建，否则直接指向父节点相应事件
        if (!parent.events.has(this.name)) {
            let ev = new NEvent(this.name);
            ev.bindTo(parentEl);
            parent.events.set(this.name, ev);
        }
        //为父对象事件添加子事件
        let evt = parent.events.get(this.name);
        let ev;
        if (Util.isArray(evt) && evt.length > 0) {
            ev = evt[0];
        }
        else {
            ev = evt;
        }
        if (ev) {
            ev.addChild(this);
        }
    }
    /**
     * 添加子事件
     * @param ev    事件
     */
    addChild(ev) {
        if (!this.events) {
            this.events = new Map();
        }
        //事件类型对应的数组
        if (!this.events.has(this.name)) {
            this.events.set(this.name, new Array());
        }
        this.events.get(this.name).push(ev);
    }
    /**
     * 移除子事件
     * @param ev    子事件
     */
    removeChild(ev) {
        if (this.events === undefined || this.events[ev.name] === undefined) {
            return;
        }
        let ind = this.events[ev.name].indexOf(ev);
        if (ind !== -1) {
            this.events[ev.name].splice(ind, 1);
            if (this.events[ev.name].length === 0) {
                this.events.delete(ev.name);
            }
        }
    }
    /**
     * 克隆
     */
    clone() {
        let evt = new NEvent(this.name);
        let arr = ['delg', 'once', 'nopopo', 'capture', 'handler'];
        arr.forEach((item) => {
            evt[item] = this[item];
        });
        if (this.extraParamMap) {
            evt.extraParamMap = Util.clone(this.extraParamMap);
        }
        return evt;
    }
    /**
     * 获取event 的domkey
     */
    getDomKey() {
        return this.domKey;
    }
    /**
     * 设置附加参数值
     * @param key       参数名
     * @param value     参数值
     */
    setExtraParam(key, value) {
        if (!this.extraParamMap) {
            this.extraParamMap = new Map();
        }
        this.extraParamMap.set(key, value);
    }
    /**
     * 获取附加参数值
     * @param key   参数名
     * @returns     参数值
     */
    getExtraParam(key) {
        return this.extraParamMap ? this.extraParamMap.get(key) : undefined;
    }
}
/**
 * 扩展事件
 */
class ExternalNEvent {
    /**
     * 注册事件
     * @param evtObj    event对象
     */
    static regist(evtObj, el) {
        //触屏事件组
        let touchEvts = ExternalNEvent.touches[evtObj.name];
        //如果绑定了，需要解绑
        if (!Util.isEmpty(evtObj.touchListeners)) {
            this.unregist(evtObj);
        }
        // el不存在
        if (!el) {
            const module = ModuleFactory.get(evtObj.moduleId);
            el = module.getNode(evtObj.getDomKey());
        }
        evtObj.touchListeners = new Map();
        if (touchEvts && el !== null) {
            // 绑定事件组
            Util.getOwnProps(touchEvts).forEach(function (ev) {
                //先记录下事件，为之后释放
                evtObj.touchListeners[ev] = function (e) {
                    touchEvts[ev](e, evtObj);
                };
                el.addEventListener(ev, evtObj.touchListeners[ev], evtObj.capture);
            });
        }
    }
    /**
     * 取消已注册事件
     * @param evtObj    event对象
     * @param el        事件绑定的html element
     */
    static unregist(evtObj, el) {
        const evt = ExternalNEvent.touches[evtObj.name];
        if (!el) {
            const module = ModuleFactory.get(evtObj.moduleId);
            el = module.getNode(evtObj.getDomKey());
        }
        if (evt) {
            // 解绑事件
            if (el !== null) {
                Util.getOwnProps(evtObj.touchListeners).forEach(function (ev) {
                    el.removeEventListener(ev, evtObj.touchListeners[ev]);
                });
            }
        }
    }
}
/**
 * 触屏事件
 */
ExternalNEvent.touches = {};
/**
 * 触屏事件
 */
ExternalNEvent.touches = {
    tap: {
        touchstart: function (e, evtObj) {
            let tch = e.touches[0];
            evtObj.setExtraParam('pos', { sx: tch.pageX, sy: tch.pageY, t: Date.now() });
        },
        touchmove: function (e, evtObj) {
            let pos = evtObj.getExtraParam('pos');
            let tch = e.touches[0];
            let dx = tch.pageX - pos.sx;
            let dy = tch.pageY - pos.sy;
            //判断是否移动
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                pos.move = true;
            }
        },
        touchend: function (e, evtObj) {
            let pos = evtObj.getExtraParam('pos');
            let dt = Date.now() - pos.t;
            //点下时间不超过200ms
            if (pos.move === true || dt > 200) {
                return;
            }
            evtObj.fire(e);
        }
    },
    swipe: {
        touchstart: function (e, evtObj) {
            let tch = e.touches[0];
            let t = Date.now();
            evtObj.setExtraParam('swipe', {
                oldTime: [t, t],
                speedLoc: [{ x: tch.pageX, y: tch.pageY }, { x: tch.pageX, y: tch.pageY }],
                oldLoc: { x: tch.pageX, y: tch.pageY }
            });
        },
        touchmove: function (e, evtObj) {
            let nt = Date.now();
            let tch = e.touches[0];
            let mv = evtObj.getExtraParam('swipe');
            //50ms记录一次
            if (nt - mv.oldTime > 50) {
                mv.speedLoc[0] = { x: mv.speedLoc[1].x, y: mv.speedLoc[1].y };
                mv.speedLoc[1] = { x: tch.pageX, y: tch.pageY };
                mv.oldTime[0] = mv.oldTime[1];
                mv.oldTime[1] = nt;
            }
            mv.oldLoc = { x: tch.pageX, y: tch.pageY };
        },
        touchend: function (e, evtObj) {
            let mv = evtObj.getExtraParam('swipe');
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
                if (evtObj.name === sname) {
                    evtObj.fire(e);
                }
            }
        }
    }
};
//swipe事件
ExternalNEvent.touches['swipeleft'] = ExternalNEvent.touches['swipe'];
ExternalNEvent.touches['swiperight'] = ExternalNEvent.touches['swipe'];
ExternalNEvent.touches['swipeup'] = ExternalNEvent.touches['swipe'];
ExternalNEvent.touches['swipedown'] = ExternalNEvent.touches['swipe'];

class Compiler {
    /**
    * 编译
    * @param elementStr    待编译html串
    * @returns             虚拟dom
    */
    static compile(elementStr) {
        // 这里是把模板串通过正则表达式匹配 生成AST
        let ast = this.compileTemplateToAst(elementStr);
        let oe = new Element('div');
        // 将AST编译成抽象语法树
        this.compileAST(oe, ast);
        return oe;
    }
    /**
     * 编译模版串
     * @param srcStr    源串
     * @returns
     */
    static compileTemplateToAst(srcStr) {
        // 清理comment
        let regExp = /\<\!\-\-[\s\S]*?\-\-\>/g;
        srcStr = srcStr.replace(regExp, '');
        // 1 识别标签
        regExp = /(?<!\{\{[^<}}]*)(?:<(\/?)\s*?([a-zA-Z][a-zA-Z0-9-_]*)([\s\S]*?)(\/?)(?<!=)>)(?![^>{{]*?\}\})/g;
        let st = 0;
        //标签串数组,含开始和结束标签
        let tagStack = [];
        //独立文本串数组，对应需要的标签串前面
        let textStack = [];
        let r;
        while ((r = regExp.exec(srcStr)) !== null) {
            tagStack.push(r[0]);
            //处理标签之间的文本
            if (st < r.index - 1) {
                textStack.push(srcStr.substring(st, r.index));
            }
            else {
                textStack.push('');
            }
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
                        chds.push({ textContent: textStack[i] });
                        // 文本已使用，置为空
                        textStack[i] = '';
                    }
                    if ((stg = tagNames.pop()) === etg) {
                        break;
                    }
                    // 标签节点作为孩子
                    let tobj = tagObjs.pop();
                    //把孩子节点改为兄弟节点
                    for (; tobj.children.length > 0;) {
                        let o = tobj.children.pop();
                        chds.unshift(o);
                    }
                    chds.unshift(tobj);
                }
                //找到节点
                if (stg === etg) {
                    // 添加到父节点
                    let po = tagObjs.pop();
                    po.children = po.children.concat(chds);
                    if (tagObjs.length > 0) {
                        tagObjs[tagObjs.length - 1].children.push(po);
                    }
                }
                else {
                    throw '模版格式错误';
                }
            }
            else { //标签头
                //去掉标签前后< >
                let tmpS = tag.endsWith('\/>') ? tag.substring(1, tag.length - 2) : tag.substring(1, tag.length - 1);
                let obj = this.handleTagAttr(tmpS.trim());
                //前一个文本节点存在，则作为前一个节点的孩子
                if (ii > 0 && textStack[ii] !== '') {
                    tagObjs[tagObjs.length - 1].children.push({
                        textContent: textStack[ii]
                    });
                    textStack[ii] = '';
                }
                if (!tag.endsWith('\/>')) { // 非自闭合
                    //标签头入栈
                    tagNames.push(obj.tagName);
                    tagObjs.push(obj);
                }
                else { //自闭合，直接作为前一个的孩子节点
                    if (tagObjs.length > 0) {
                        tagObjs[tagObjs.length - 1].children.push(obj);
                    }
                }
                //设置根节点
                if (!root) {
                    root = obj;
                }
            }
        });
        if (tagNames.length > 0) {
            throw '模版定义错误';
        }
        return root;
    }
    /**
     * 处理标签属性
     * @param tagStr    标签串
     * @returns
     */
    static handleTagAttr(tagStr) {
        const me = this;
        //字符串和表达式替换
        let reg = /('[\s\S]*?')|("[\s\S]*?")|(`[\s\S]*?`)|({{[\S\s]*?\}{0,2}\s*}})/g;
        let tagName;
        let attrs = new Map;
        let pName;
        let startValue;
        let finded = false; //是否匹配了有效的reg
        let st = 0;
        let r;
        while ((r = reg.exec(tagStr)) !== null) {
            if (r.index > st) {
                let tmp = tagStr.substring(st, r.index).trim();
                if (tmp === '') {
                    continue;
                }
                finded = true;
                handle(tmp);
                if (startValue) {
                    setValue(r[0]);
                }
                st = reg.lastIndex;
            }
            st = reg.lastIndex;
        }
        if (!finded) {
            handle(tagStr);
        }
        return {
            tagName: tagName,
            attrs: attrs,
            children: []
        };
        /**
         * 处理串（非字符串和表达式）
         * @param s
         */
        function handle(s) {
            let reg = /([^ \f\n\r\t\v=]+)|(\=)/g;
            let r;
            while ((r = reg.exec(s)) !== null) {
                if (!tagName) {
                    tagName = r[0];
                }
                else if (!pName) {
                    pName = r[0];
                }
                else if (startValue) {
                    setValue(r[0]);
                }
                else if (pName && r[0] === '=') {
                    startValue = true;
                }
                else if (pName && !startValue) { //无值属性
                    setValue();
                    pName = r[0];
                }
            }
            //只有名无值
            if (pName && !startValue) {
                setValue();
            }
        }
        /**
         * 设置属性值
         * @param value     属性值
         */
        function setValue(value) {
            //属性名判断
            if (!/^[A-Za-z][\w\d-]*$/.test(pName)) {
                return;
            }
            if (value) {
                let r;
                //去掉字符串两端
                if (((r = /((?<=^')(.*?)(?='$))|((?<=^")(.*?)(?="$)|((?<=^`)(.*?)(?=`$)))/.exec(value)) !== null)) {
                    value = r[0].trim();
                }
                //表达式编译
                if (/^\{\{[\S\s]*\}\}$/.test(value)) {
                    value = me.compileExpression(value)[0];
                }
            }
            attrs.set(pName, value);
            pName = undefined;
            startValue = false;
        }
    }
    /**
     * 把AST编译成虚拟dom
     * @param oe 虚拟dom的根容器
     * @param ast 抽象语法树也就是JSON对象
     * @returns oe 虚拟dom的根容器
     */
    static compileAST(oe, ast) {
        if (!ast)
            return;
        ast.tagName ? this.handleAstNode(oe, ast) : this.handleAstText(oe, ast);
        return oe;
    }
    /**
     * 编译text类型的ast到虚拟dom
     * @param parent 父虚拟dom节点
     * @param ast 虚拟dom树
     */
    static handleAstText(parent, astObj) {
        let text = new Element();
        parent.children.push(text);
        if (/\{\{[\s\S]+\}\}/.test(astObj.textContent)) {
            text.expressions = this.compileExpression(astObj.textContent);
        }
        else {
            text.textContent = astObj.textContent;
        }
    }
    /**
     *
     * @param oe 虚拟dom
     * @param astObj
     */
    static handleAstNode(parent, astObj) {
        //前置处理
        this.preHandleNode(astObj);
        let child = new Element(astObj.tagName);
        parent.add(child);
        this.handleAstAttrs(child, astObj.attrs, parent);
        for (let a of astObj.children) {
            this.compileAST(child, a);
        }
    }
    /**
     * 编译ast 到虚拟dom
     * @param oe        虚拟dom
     * @param attrs     需要编译成虚拟dom的attrs
     * @param parent    父虚拟dom节点
     */
    static handleAstAttrs(oe, attrs, parent) {
        //指令数组 先处理普通属性在处理指令
        let directives = [];
        if (!attrs) {
            return;
        }
        for (const attr of attrs) {
            if (attr[0].startsWith("x-")) {
                //指令
                let o = {
                    name: attr[0].substr(2),
                    value: attr[1]
                };
                directives.push(o);
            }
            else if (attr[0].startsWith("e-")) {
                // 事件
                let e = attr[0].substr(2);
                oe.addEvent(new NEvent(e, attr[1]));
            }
            else if (attr[0].startsWith("d-")) {
                // 数据
                let tempArr = attr[0].split(':');
                let bindFlag = false;
                if (tempArr.length === 2) {
                    bindFlag = tempArr[1] == 'true' ? true : false;
                }
                let name = tempArr[0].substr(2);
                let value = tempArr[0];
                // 变量别名，变量名（原对象.变量名)，双向绑定标志
                let data = [value, bindFlag];
                oe.moduleDatas[name] = data;
            }
            else {
                oe.setProp(attr[0], attr[1], attr[1] instanceof Expression);
            }
        }
        //处理属性
        for (let attr of directives) {
            new Directive(attr.name, attr.value, oe, parent, true);
        }
        if (directives.length > 1) {
            //指令排序
            oe.directives.sort((a, b) => {
                return a.type.prio - b.type.prio;
            });
        }
    }
    /**
     * 处理表达式串
     * @param exprStr   含表达式的串
     * @return          处理后的字符串和表达式数组
     */
    static compileExpression(exprStr) {
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
            let exp = new Expression(re[0].substring(2, re[0].length - 2));
            //加入工厂
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
     * 前置处理
     * 包括：模块类元素、自定义元素
     * @param node  ast node
     */
    static preHandleNode(node) {
        // 模块类判断
        if (ModuleFactory.has(node.tagName)) {
            node.attrs.set('x-module', node.tagName);
            node.tagName = 'div';
        }
        else if (DefineElementManager.has(node.tagName)) { //自定义元素
            let clazz = DefineElementManager.get(node.tagName);
            Reflect.construct(clazz, [node]);
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
        compile3: "请检查模板标签闭合情况，模板需要有一个闭合的根节点"
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
 * 方法工厂
 */
class MethodFactory extends NFactory {
    /**
     * 调用方法
     * @param name 		方法名
     * @param params 	方法参数数组
     */
    invoke(name, params) {
        const foo = this.get(name);
        if (!Util.isFunction(foo)) {
            throw new NError(NodomMessage.ErrorMsgs['notexist1'], NodomMessage.TipWords['method'], name);
        }
        return Util.apply(foo, this.module.model, params);
    }
}

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
        let mm = module.modelManager;
        let proxy = new Proxy(data, {
            set: (src, key, value, receiver) => {
                //值未变,proxy 不处理
                if (src[key] === value) {
                    return true;
                }
                //不处理原型属性 
                let excludes = ['__proto__', 'constructor'];
                if (excludes.includes(key)) {
                    return true;
                }
                const excArr = ['$watch', "$moduleId", "$set", "$get", "$key", "$index"];
                //不进行赋值
                if (typeof value !== 'object' || (value === null || !value.$watch)) {
                    //更新渲染
                    if (excArr.indexOf(key) == -1) {
                        mm.update(proxy, key, src[key], value);
                    }
                }
                return Reflect.set(src, key, value, receiver);
            },
            get: (src, key, receiver) => {
                let res = Reflect.get(src, key, receiver);
                //数组的sort和fill触发强行渲染
                if (Array.isArray(src) && ['sort', 'fill'].indexOf(key) !== -1) { //强制渲染
                    mm.update(proxy, null, null, null, true);
                }
                let data = module.modelManager.getFromDataMap(src[key]);
                if (data) {
                    return data;
                }
                if (res !== null && typeof res === 'object') {
                    //如果是对象，则返回代理，便于后续激活get set方法                   
                    //判断是否已经代理，如果未代理，则增加代理
                    if (!src[key].$watch) {
                        let p = new Model(res, module);
                        return p;
                    }
                }
                return res;
            },
            deleteProperty: function (src, key) {
                //如果删除对象，从mm中同步删除
                if (src[key] != null && typeof src[key] === 'object') {
                    mm.delToDataMap(src[key]);
                    mm.delModelToModelMap(src[key]);
                }
                delete src[key];
                return true;
            }
        });
        proxy.$watch = this.$watch;
        proxy.$moduleId = module.id;
        proxy.$get = this.$get;
        proxy.$set = this.$set;
        proxy.$key = Util.genId();
        mm.addToDataMap(data, proxy);
        mm.addModelToModelMap(proxy, data);
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
        const mod = ModuleFactory.get(this.$moduleId);
        if (cancel) {
            mod.modelManager.removeWatcherFromModelMap(model, key, operate);
        }
        else {
            mod.modelManager.addWatcherToModelMap(model, key, operate);
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
     */
    $set(key, value) {
        let model = this;
        if (key.indexOf('.') !== -1) { //层级字段
            let arr = key.split('.');
            for (let i = 0; i < arr.length - 1; i++) {
                //不存在，则创建新的model
                if (!model[arr[i]]) {
                    model[arr[i]] = new Model({}, ModuleFactory.get(this.$moduleId));
                }
            }
            key = arr[arr.length - 1];
        }
        model[key] = value;
    }
    /**
     * 执行模块方法
     * @param methodName    方法名
     * @param args          参数数组
     */
    $call(methodName, args) {
        let module = ModuleFactory.get(this.$moduleId);
        return module.invokeMethod(methodName, args);
    }
}

/**
 * 模型工厂
 */
class ModelManager {
    constructor(module) {
        /**
         * 数据对象与模型映射，key为数据对象，value为model
         */
        this.dataMap = new WeakMap();
        /**
         * 模型模块映射
         * key:model proxy, value:{model:model,watchers:{key:[监听器1,监听器2,...]}}
         * 每个数据对象，可有多个监听器
         */
        this.modelMap = new WeakMap();
        this.module = module;
    }
    /**
     * 添加到 dataNModelMap
     * @param data      数据对象
     * @param model     模型
     */
    addToDataMap(data, model) {
        this.dataMap.set(data, model);
    }
    /**
  * 删除从 dataNModelMap
  * @param data      数据对象
  * @param model     模型
  */
    delToDataMap(data) {
        this.dataMap.delete(data);
    }
    /**
     * 从dataNModelMap获取model
     * @param data      数据对象
     * @returns         model
     */
    getFromDataMap(data) {
        return this.dataMap.get(data);
    }
    /**
     * 是否存在数据模型映射
     * @param data  数据对象
     * @returns     true/false
     */
    hasDataNModel(data) {
        return this.dataMap.has(data);
    }
    /**
     * 添加源模型到到模型map
     * @param model     模型代理
     * @param srcNModel  源模型
     */
    addModelToModelMap(model, srcNModel) {
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
    delModelToModelMap(model) {
        this.modelMap.delete(model);
    }
    /**
     * 从模型Map获取源模型
     * @param model     模型代理
     * @returns         源模型
     */
    getModelFromModelMap(model) {
        if (this.modelMap.has(model)) {
            return this.modelMap.get(model).model;
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
    addWatcherToModelMap(model, key, foo) {
        // 把model加入到model map
        if (!this.modelMap.has(model)) {
            this.modelMap.set(model, {});
        }
        //添加watchers属性
        if (!this.modelMap.get(model).watchers) {
            this.modelMap.get(model).watchers = Object.create(null);
        }
        let watchers = this.modelMap.get(model).watchers;
        //添加观察器数组
        if (!watchers[key]) {
            watchers[key] = [];
        }
        //把处理函数加入观察器数组
        watchers[key].push(foo);
    }
    /**
     * 获取model监听器
     * @param model     model
     * @param key       model对应的属性
     * @param foo       监听处理方法
     * @returns         void
     */
    removeWatcherFromModelMap(model, key, foo) {
        if (!this.modelMap.has(model)) {
            return;
        }
        if (!this.modelMap.get(model).watchers) {
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
    getWatcherFromModelMap(model, key) {
        if (!this.modelMap.has(model)) {
            return undefined;
        }
        let watchers = this.modelMap.get(model).watchers;
        if (watchers) {
            return watchers[key];
        }
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
    update(model, key, oldValue, newValue, force) {
        if (oldValue !== newValue || force) {
            Renderer.add(this.module);
        }
        //处理观察器函数
        let watcher = this.getWatcherFromModelMap(model, key);
        if (watcher) {
            for (let foo of watcher) {
                //方法名
                if (typeof foo === 'string') {
                    if (this.module) {
                        foo = this.module.getMethod(foo);
                        if (foo) {
                            foo.call(model, oldValue, newValue);
                        }
                    }
                }
                else {
                    foo.call(model, oldValue, newValue);
                }
            }
        }
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
         * 是否是首次渲染
         */
        this.firstRender = true;
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
        this.id = Util.genId();
        this.state = 0;
        //加入模块工厂
        ModuleFactory.add(this);
        // 初始化模型工厂
        this.modelManager = new ModelManager(this);
    }
    /**
     * 初始化
     */
    init() {
        // 设置状态为初始化
        this.state = 1;
        //初始化model
        let data = (typeof this.model === 'function' ? this.model() : this.model);
        this.model = new Model(data || {}, this);
        //初始化方法集
        this.methods = (typeof this.methods === 'function' ? this.methods.apply(this.model) : this.methods) || {};
        //初始化子模块实例
        let mods = (typeof this.modules === 'function' ? this.modules.apply(this.model) : this.modules);
        if (Array.isArray(mods)) {
            for (let cls of mods) {
                Reflect.construct(cls, []);
            }
        }
        delete this.modules;
        // 如果为字符串，则处理模版，否则在获取模块实例时处理
        if (typeof this.template === 'string') {
            this.virtualDom = Compiler.compile(this.template);
            delete this.template;
        }
        //处理css配置
        this.handleCss();
    }
    /**
     * 处理css
     */
    handleCss() {
        let cssArr = (typeof this.css === 'function' ? this.css.apply(this.model) : this.css);
        if (Array.isArray(cssArr) && cssArr.length > 0) {
            //如果不存在stylesheet或最后一个stylesheet是link src，则新建一个style标签
            if (document.styleSheets.length === 0 || document.styleSheets[document.styleSheets.length - 1].href) {
                document.head.appendChild(document.createElement('style'));
            }
            //得到最后一个sheet
            let sheet = document.styleSheets[document.styleSheets.length - 1];
            for (let css of cssArr) {
                if (typeof css === 'string') {
                    sheet.insertRule("@import '" + css + "'");
                }
                else if (typeof css === 'object') {
                    for (let p in css) {
                        let style = p + '{';
                        for (let p1 in css[p]) { //多个样式
                            style += p1 + ':' + css[p][p1] + ';';
                        }
                        style += p + '}';
                        //加入样式表
                        sheet.insertRule(style);
                    }
                }
            }
        }
        delete this.css;
    }
    /**
     * 模型渲染
     * @return false 渲染失败 true 渲染成功
     */
    render() {
        //状态为2，不渲染
        if (this.state === 2) {
            return true;
        }
        //容器没就位或state不为active则不渲染，返回渲染失败
        if (this.state < 3 || !this.getContainer()) {
            return false;
        }
        //克隆新的树
        let root = this.virtualDom.clone();
        //执行前置方法
        this.doRenderOps(0);
        if (this.firstRender) {
            this.doFirstRender(root);
        }
        else { //增量渲染
            //执行每次渲染前事件
            this.doModuleEvent('onBeforeRender');
            if (this.model) {
                root.model = this.model;
                let oldTree = this.renderTree;
                this.renderTree = root;
                //渲染
                root.render(this, null);
                this.doModuleEvent('onBeforeRenderToHtml');
                let deleteMap = new Map();
                let renderDoms = [];
                // 比较节点
                root.compare(oldTree, renderDoms, deleteMap);
                //刪除和替換
                deleteMap.forEach((value, key) => {
                    let dp = this.getNode(key);
                    let tmp = [];
                    for (let i = 0; i < value.length; i++) {
                        let index = value[i];
                        if (typeof index == 'object') {
                            let els;
                            //新建替换
                            if (index[2] != undefined) {
                                els = dp.querySelectorAll("[key='" + index[1] + "']");
                                dp.insertBefore((() => {
                                    const vDom = root.query(index[0]);
                                    return Util.newEls(vDom, this, vDom.parent, this.getNode(vDom.parent.key));
                                })(), els[els.length - 1]);
                            }
                            else if (index.length === 2) {
                                //更改dom节点顺序
                                let ele = this.getNode(index[0]);
                                if (ele) {
                                    els = dp.querySelectorAll("[key='" + index[1] + "']");
                                    dp.insertBefore(ele, els[els.length - 1]);
                                }
                            }
                            else {
                                //删除dom节点
                                els = dp.querySelectorAll("[key='" + index[0] + "']");
                                dp.removeChild(els[els.length - 1]);
                            }
                        }
                        else {
                            tmp.push(index);
                        }
                    }
                    //替换和删除需要反向操作
                    for (let i = tmp.length - 1; i >= 0; i--) {
                        let index = tmp[i];
                        if (typeof index == 'string') {
                            let parm = index.split('|');
                            index = parm[0];
                            const vDom = root.query(parm[1]);
                            dp.insertBefore((() => {
                                return Util.newEls(vDom, this, vDom.parent, this.getNode(vDom.parent.key));
                            })(), dp.childNodes[index++]);
                        }
                        if (dp.childNodes.length > index)
                            dp.removeChild(dp.childNodes[index]);
                    }
                });
                deleteMap.clear();
                // 渲染
                renderDoms.forEach((item) => {
                    item.node.renderToHtml(this, item);
                });
            }
            //执行每次渲染后事件
            this.doModuleEvent('onRender');
        }
        //设置已渲染状态
        this.state = 4;
        //执行后置方法
        this.doRenderOps(1);
        return true;
    }
    /**
     * 执行首次渲染
     * @param root 	根虚拟dom
     */
    doFirstRender(root) {
        this.doModuleEvent('onBeforeFirstRender');
        //渲染树
        this.renderTree = root;
        if (this.model) {
            root.model = this.model;
        }
        root.render(this, null);
        this.doModuleEvent('onBeforeFirstRenderToHTML');
        //无容器，不执行
        if (!this.getContainer()) {
            return;
        }
        //清空子元素
        Util.empty(this.container);
        //渲染到html
        root.renderToHtml(this, { type: 'fresh' });
        //删除首次渲染标志
        delete this.firstRender;
        //执行首次渲染后事件
        this.doModuleEvent('onFirstRender');
    }
    /**
     * 克隆模块
     */
    clone() {
        let me = this;
        let m = Reflect.construct(this.constructor, []);
        //克隆数据
        if (this.model) {
            let data = Util.clone(this.model);
            m.model = new Model(data, m);
        }
        let excludes = ['id', 'name', 'model', 'virtualDom', 'container', 'containerKey', 'modelManager'];
        Object.getOwnPropertyNames(this).forEach((item) => {
            if (excludes.includes(item)) {
                return;
            }
            m[item] = me[item];
        });
        //克隆虚拟dom树
        if (this.virtualDom) {
            m.virtualDom = this.virtualDom.clone(true);
        }
        return m;
    }
    /**
     * 数据改变
     * @param model 	改变的model
     */
    dataChange() {
        Renderer.add(this);
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
     * 接受消息
     * @param fromName 		来源模块名
     * @param data 			消息内容
     */
    receive(fromName, data) {
        this.doModuleEvent('onReceive', [fromName, data]);
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
        //设置首次渲染标志
        this.firstRender = true;
        //处理子节点
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
    /*************事件**************/
    /**
     * 执行模块事件
     * @param eventName 	事件名
     * @param param 		参数，为数组
     */
    doModuleEvent(eventName, param) {
        if (param) {
            param.unshift(this);
        }
        else {
            param = [this];
        }
        this.invokeMethod(eventName, param);
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
     * 获取模块下的html节点
     * @param key       el key值或对象{attrName:attrValue}
     * @param notNull   如果不存在，则返回container
     * @returns         html element
     */
    getNode(key, notNull) {
        let keyName;
        let value;
        if (typeof key === 'string') { //默认为key值查找
            keyName = 'key';
            value = key;
        }
        else { //对象
            keyName = Object.getOwnPropertyNames(key)[0];
            value = key[keyName];
        }
        let qs = "[" + keyName + "='" + value + "']";
        let ct = this.getContainer();
        if (ct) {
            return ct.querySelector(qs);
        }
        else if (notNull) {
            return ct || null;
        }
    }
    /**
     * 获取虚拟dom节点
     * @param key               dom key
     * @param fromVirtualDom    是否从源虚拟dom数获取，否则从渲染树获取
     */
    getElement(key, fromVirtualDom) {
        let tree = fromVirtualDom ? this.virtualDom : this.renderTree;
        return tree.query(key);
    }
    /**
     * 获取模块容器
     */
    getContainer() {
        if (!this.container) {
            if (this.containerKey) {
                this.container = this.getParent().getNode(this.containerKey);
            }
        }
        return this.container;
    }
    /**
     * 设置渲染容器
     * @param el    容器
     */
    setContainer(el) {
        this.container = el;
    }
    /**
     * 设置渲染容器key
     * @param key   容器key
     */
    setContainerKey(key) {
        this.containerKey = key;
    }
    /**
     * 设置首次渲染标志
     * @param flag  首次渲染标志true/false
     */
    setFirstRender(flag) {
        this.firstRender = flag;
    }
    /**
     * 调用方法
     * @param methodName    方法名
     * @param args          参数数组
     */
    invokeMethod(methodName, args) {
        let foo = this.getMethod(methodName);
        if (foo && typeof foo === 'function') {
            return foo.apply(this.model, args);
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
}

/**
 * 自定义元素
 * 用于扩充定义，主要对ast obj进行前置处理
 */
class DefineElement {
    constructor(node) {
        if (node.attrs.has('tag')) {
            node.tagName = node.attrs.get('tag');
            node.attrs.delete('tag');
        }
        else {
            node.tagName = 'div';
        }
    }
}

/**
 * module 元素
 */
class MODULE extends DefineElement {
    constructor(node) {
        super(node);
        //类名
        let clazz = node.attrs.get('className');
        if (!clazz) {
            throw new NError('itemnotempty', NodomMessage.TipWords['element'], 'MODULE', 'className');
        }
        //模块名
        let moduleName = node.attrs.get('name');
        if (moduleName) {
            clazz += '|' + moduleName;
        }
        node.attrs.set('x-module', clazz);
    }
}
/**
 * for 元素
 */
class FOR extends DefineElement {
    constructor(node) {
        super(node);
        //条件
        let cond = node.attrs.get('cond');
        if (!cond) {
            throw new NError('itemnotempty', NodomMessage.TipWords['element'], 'FOR', 'cond');
        }
        node.attrs.set('x-repeat', cond);
    }
}
class RECUR extends DefineElement {
    constructor(node) {
        super(node);
        //条件
        let cond = node.attrs.get('cond');
        if (!cond) {
            throw new NError('itemnotempty', NodomMessage.TipWords['element'], 'RECUR', 'cond');
        }
        node.attrs.set('x-recur', cond);
    }
}
class IF extends DefineElement {
    constructor(node) {
        super(node);
        //条件
        let cond = node.attrs.get('cond');
        if (!cond) {
            throw new NError('itemnotempty', NodomMessage.TipWords['element'], 'IF', 'cond');
        }
        node.attrs.set('x-if', cond);
    }
}
class ELSE extends DefineElement {
    constructor(node) {
        super(node);
        node.attrs.set('x-else', undefined);
    }
}
class ELSEIF extends DefineElement {
    constructor(node) {
        super(node);
        //条件
        let cond = node.attrs.get('cond');
        if (!cond) {
            throw new NError('itemnotempty', NodomMessage.TipWords['element'], 'ELSEIF', 'cond');
        }
        node.attrs.set('x-elseif', cond);
    }
}
class SWITCH extends DefineElement {
    constructor(node) {
        super(node);
        //条件
        let cond = node.attrs.get('cond');
        if (!cond) {
            throw new NError('itemnotempty', NodomMessage.TipWords['element'], 'SWITCH', 'cond');
        }
        node.attrs.set('x-switch', cond);
    }
}
class CASE extends DefineElement {
    constructor(node) {
        super(node);
        //条件
        let cond = node.attrs.get('cond');
        if (!cond) {
            throw new NError('itemnotempty', NodomMessage.TipWords['element'], 'CASE', 'cond');
        }
        node.attrs.set('x-case', cond);
    }
}
// DefineElementManager.add('SLOT', {
//     init: function (element: Element, parent?: Element) {
//         element.tagName = 'div';
//         if(element.hasProp('name'))
//         element.setTmpParam('slotName',element.getProp('name'));
//     }
// });
DefineElementManager.add([MODULE, FOR, RECUR, IF, ELSE, ELSEIF, SWITCH, CASE]);

((function () {
    /**
     *  指令类型初始化
     *  每个指令类型都有一个init和handle方法，init和handle都可选
     *  init 方法在编译时执行，包含两个参数 directive(指令)、dom(虚拟dom)，无返回
     *  handle方法在渲染时执行，包含四个参数 directive(指令)、dom(虚拟dom)、module(模块)、parent(父虚拟dom)
     */
    /**
     * module 指令
     * 用于指定该元素为模块容器，表示该模块的子模块
     * 用法
     *   x-module='moduleclass|modulename|dataurl'
     *   moduleclass 为模块类名
     *   modulename  为模块对象名，可选
     * 可增加 data 属性，用于指定数据url
     * 可增加 name 属性，用于设置模块name，如果x-module已设置，则无效
     */
    DirectiveManager.addType('module', 0, (directive, dom) => {
        let value = directive.value;
        let valueArr = value.split('|');
        directive.value = valueArr[0];
        //设置dom role
        dom.setProp('role', 'module');
        //设置module name
        if (valueArr.length > 1) {
            dom.setProp('moduleName', valueArr[1]);
        }
        directive.extra = {};
    }, (directive, dom, module, parent) => {
        const ext = directive.extra;
        let m;
        //存在moduleId，表示已经渲染过，不渲染
        if (ext.moduleId) {
            m = ModuleFactory.get(ext.moduleId);
        }
        else {
            let props = {};
            Object.getOwnPropertyNames(dom.props).forEach(p => {
                props[p] = dom.props[p];
            });
            Object.getOwnPropertyNames(dom.exprProps).forEach(p => {
                props[p] = dom.exprProps[p].val(dom.model);
            });
            m = ModuleFactory.get(directive.value, props);
            if (!m) {
                return;
            }
            // delete dom.props;
            // delete dom.exprProps;
            //保留modelId
            directive.extra = { moduleId: m.id };
            //添加到父模块
            module.addChild(m.id);
            //设置容器
            m.setContainerKey(dom.key);
            //添加到渲染器
            m.active();
        }
    });
    /**
     *  model指令
     */
    DirectiveManager.addType('model', 1, (directive, dom) => {
        let value = directive.value;
        //处理以.分割的字段，没有就是一个
        if (Util.isString(value)) {
            directive.value = value;
        }
    }, (directive, dom, module, parent) => {
        let model = dom.model;
        if (directive.value == '$$') {
            model = module.model;
        }
        else {
            model = model.$get(directive.value);
        }
        if (!model) {
            model = module.model.$get(directive.value);
        }
        if (model) {
            dom.model = model;
        }
    });
    /**
     * 指令名 repeat
     * 描述：重复指令
     */
    DirectiveManager.addType('repeat', 2, (directive, dom) => {
    }, (directive, dom, module, parent) => {
        dom.dontRender = true;
        let rows = directive.value;
        // 无数据，不渲染
        if (!Util.isArray(rows) || rows.length === 0) {
            return;
        }
        dom.dontRender = false;
        let chds = [];
        let key = dom.key;
        // 移除指令
        dom.removeDirectives(['repeat']);
        for (let i = 0; i < rows.length; i++) {
            let node = dom.clone();
            //设置modelId
            node.model = rows[i];
            //设置key
            if (rows[i].$key) {
                setKey(node, key, rows[i].$key);
            }
            else {
                setKey(node, key, Util.genId());
            }
            rows[i].$index = i;
            chds.push(node);
        }
        //找到并追加到dom后
        if (chds.length > 0) {
            for (let i = 0, len = parent.children.length; i < len; i++) {
                if (parent.children[i] === dom) {
                    chds = [i + 1, 0].concat(chds);
                    Array.prototype.splice.apply(parent.children, chds);
                    break;
                }
            }
        }
        // 不渲染该节点
        dom.dontRender = true;
        function setKey(node, key, id) {
            node.key = key + '_' + id;
            node.children.forEach((dom) => {
                setKey(dom, dom.key, id);
            });
        }
    });
    /**
     * 递归指令
     * 作用：在dom内部递归，即根据数据层复制节点作为前一层的子节点
     * 数据格式：
     * data:{
     *     recurItem:{
    *          title:'第一层',
    *          recurItem:{
    *              title:'第二层',
    *              recurItem:{...}
    *          }
    *      }
     * }
     * 模版格式：
     * <div x-recursion='items'><span>{{title}}</span></div>
     */
    DirectiveManager.addType('recur', 3, (directive, dom, parent) => {
    }, (directive, dom, module, parent) => {
        let model = dom.model;
        if (!model) {
            return;
        }
        let data = model[directive.value];
        // 渲染时，去掉model指令，避免被递归节点使用
        dom.removeDirectives('model');
        //处理内部递归节点
        if (data) {
            if (Array.isArray(data)) { //为数组，则遍历生成多个节点
                // 先克隆一个用作基本节点，避免在循环中为基本节点增加子节点
                let node = dom.clone(true);
                for (let d of data) {
                    let nod = node.clone(true);
                    nod.model = d;
                    //作为当前节点子节点
                    dom.add(nod);
                }
            }
            else {
                let node = dom.clone(true);
                node.model = data;
                //作为当前节点子节点
                dom.add(node);
            }
        }
    });
    /**
     * 指令名 if
     * 描述：条件指令
     */
    DirectiveManager.addType('if', 10, (directive, dom, parent) => {
    }, (directive, dom, module, parent) => {
        dom.dontRender = !directive.value;
    });
    /**
     * 指令名 else
     * 描述：else指令
     */
    DirectiveManager.addType('else', 10, (directive, dom, parent) => {
    }, (directive, dom, module, parent) => {
        dom.dontRender = true;
        let index = parent.children.findIndex(item => item.key === dom.key);
        if (index === -1) {
            return;
        }
        for (let i = index - 1; i >= 0; i--) {
            let c = parent.children[i];
            //不处理非标签
            if (!c.tagName) {
                continue;
            }
            // 前一个元素不含if和elseif指令，则不处理
            if (!c.hasDirective('if') && !c.hasDirective('elseif')) {
                break;
            }
            let d = c.getDirective('elseif') || c.getDirective('if');
            if (d && d.value) {
                return;
            }
        }
        dom.dontRender = false;
    });
    /**
     * elseif 指令
     */
    DirectiveManager.addType('elseif', 10, (directive, dom, parent) => {
    }, (directive, dom, module, parent) => {
        dom.dontRender = !directive.value;
    });
    /**
     * 指令名 show
     * 描述：显示指令
     */
    DirectiveManager.addType('show', 10, (directive, dom) => {
        if (typeof directive.value === 'string') {
            let value = directive.value;
            if (!value) {
                throw new NError("paramException", "x-show");
            }
            let expr = new Expression(value);
            directive.value = expr;
        }
    }, (directive, dom, module, parent) => {
        dom.dontRender = !directive.value;
    });
    /**
     * 指令名 data
     * 描述：从当前模块获取数据并用于子模块，dom带module指令时有效
     */
    DirectiveManager.addType('data', 5, (directive, dom) => {
    }, (directive, dom, module, parent) => {
        if (typeof directive.value !== 'object') {
            return;
        }
        let mdlDir = dom.getDirective('module');
        if (!mdlDir || !mdlDir.extra.moduleId) {
            return;
        }
        let obj = directive.value;
        //子模块
        let subMdl = ModuleFactory.get(mdlDir.extra.moduleId);
        //子model
        let m = subMdl.model;
        let model = dom.model;
        Object.getOwnPropertyNames(obj).forEach(p => {
            //字段名
            let field;
            // 反向修改
            let reverse = false;
            if (Array.isArray(obj[p])) {
                field = obj[p][0];
                if (obj[p].length > 1) {
                    reverse = obj[p][1];
                }
                //删除reverse，只保留字段
                obj[p] = field;
            }
            else {
                field = obj[p];
            }
            let d = model.$get(field);
            //数据赋值
            if (d !== undefined) {
                m[p] = d;
            }
            //反向处理
            if (reverse) {
                m.$watch(p, function (ov, nv) {
                    console.log(model);
                    if (model) {
                        model.$set(field, nv);
                    }
                });
            }
        });
    });
    /**
     * 指令名
     * 描述：显示指令
     */
    DirectiveManager.addType('animation', 9, (directive, dom) => {
        let arr = directive.value.trim().split('|');
        let privateName = ['fade', 'scale-fixtop', 'scale-fixleft', 'scale-fixbottom', 'scale-fixright', 'scale-fixcenterX', 'scale-fixcenterY'];
        if (privateName.includes(arr[0].trim())) {
            arr[0] = arr[0].trim();
        }
        else {
            arr[0] = new Expression(arr[0].trim());
        }
        // 渲染标志
        if (arr[1]) {
            arr[1] = new Expression(arr[1].trim());
        }
        else {
            // 如果没有传入渲染标志，则说明只需要在元素渲染的时候启用动画。直接吧渲染标志设置成true
            arr[1] = true;
        }
        directive.value = arr;
    }, (directive, dom, module, parent) => {
        var _a, _b, _c, _d, _e, _f;
        let arr = directive.value;
        let cls = dom.getProp('class');
        let model = dom.model;
        if (Util.isString(cls) && !Util.isEmpty(cls)) {
            cls.trim().split(/\s+/);
        }
        let confObj = arr[0];
        if (arr[0] instanceof Expression) {
            confObj = confObj.val(model, dom);
        }
        else {
            confObj = {
                name: confObj
            };
        }
        if (!Util.isObject(confObj)) {
            return new NError('未找到animation配置对象');
        }
        let renderFlag = arr[1];
        let nameEnter = ((_a = confObj.name) === null || _a === void 0 ? void 0 : _a.enter) || confObj.name;
        let nameLeave = ((_b = confObj.name) === null || _b === void 0 ? void 0 : _b.leave) || confObj.name;
        let hiddenMode = confObj.hiddenMode || 'display';
        let durationEnter = ((_c = confObj.duration) === null || _c === void 0 ? void 0 : _c.enter) || '0.3s';
        let durationLeave = ((_d = confObj.duration) === null || _d === void 0 ? void 0 : _d.leave) || '0.3s';
        let delayEnter = ((_e = confObj.delay) === null || _e === void 0 ? void 0 : _e.enter) || '0s'; // 如果不配置则默认不延迟
        let delayLeave = ((_f = confObj.delay) === null || _f === void 0 ? void 0 : _f.leave) || '0s'; // 如果不配置则默认不延迟
        if (renderFlag instanceof Expression) {
            renderFlag = renderFlag.val(model);
        }
        let el = document.querySelector(`[key='${dom.key}']`);
        // 定义动画结束回调。
        let handler = () => {
            // 离开动画结束之后隐藏元素
            if (!renderFlag || renderFlag === 'false') {
                if (hiddenMode && hiddenMode == 'visibility') {
                    el.style.visibility = 'hidden';
                }
                else {
                    el.style.display = 'none';
                }
            }
            el.classList.remove("nd-animation-" + nameEnter + "-enter");
            el.classList.remove("nd-animation-" + nameLeave + "-leave");
            el.removeEventListener('animationend', handler);
        };
        if (!renderFlag || renderFlag === 'false') {
            // 从显示切换到隐藏。
            if (el) {
                if (el.style.visibility == 'hidden' || el.style.display == 'none') {
                    // 当前处于隐藏，没有必要播放动画
                    if (hiddenMode && hiddenMode == 'visibility') {
                        el.style.visibility = 'hidden';
                        dom.addStyle('visibility:hidden');
                    }
                    else {
                        el.style.display = 'none';
                        dom.addStyle('display:none');
                    }
                    return;
                }
                // 为了触发动画
                //  1. 删除原来的动画属性
                el.classList.remove("nd-animation-" + nameEnter + "-enter");
                // 操作了真实dom，虚拟dom也要做相应的变化，否则可能导致第二次渲染属性不一致
                dom.removeClass("nd-animation-" + nameEnter + "-enter");
                //  2.重新定位一次元素。 本来是el.offsetWidth=el.offsetWidth的
                //    下面是严格模式下的替代方案
                void el.offsetWidth;
                // 控制播放时间
                el.style.animationDuration = durationLeave;
                el.style.animationDelay = delayLeave;
                dom.addStyle(`animation-duration:${durationEnter};animation-delay:${delayEnter}`);
                //  3.添加新的动画
                el.classList.add("nd-animation-" + nameLeave + "-leave");
                // 操作了真实dom，虚拟dom也要做相应的变化，否则可能导致第二次渲染属性不一致
                dom.addClass("nd-animation-" + nameLeave + "-leave");
                // 添加动画结束监听
                el.addEventListener('animationend', handler);
            }
            else {
                // 不显示，并且也没有el 比如poptip
                if (hiddenMode && hiddenMode == 'visibility') {
                    dom.addStyle("visibility:hidden");
                }
                else {
                    dom.addStyle("display:none");
                }
                dom.dontRender = false;
            }
        }
        else {
            // 从隐藏切换到显示
            if (el) {
                if (el.style.visibility == 'hidden' || el.style.display == 'none') {
                    // 当前处于隐藏
                    // 手动设置延时
                    let delay = parseFloat(delayEnter) * 1000;
                    // 因为下面是异步执行,所有这一次不能让元素先展示出来
                    if (hiddenMode && hiddenMode == 'visibility') {
                        el.style.visibility = 'hidden';
                        dom.addStyle('visibility:hidden');
                    }
                    else {
                        el.style.display = 'none';
                        dom.addStyle('display:none');
                    }
                    // 进入动画要手动设置延时.否则通过animation-delay属性会先显示元素,然后计算延时,然后再播放动画.
                    setTimeout(() => {
                        // 先切换成显示状态,再触发动画
                        if (hiddenMode && hiddenMode == 'visibility') {
                            el.style.visibility = 'visible';
                        }
                        else {
                            el.style.display = '';
                        }
                        //  1. 删除原来的动画属性
                        el.classList.remove("nd-animation-" + nameLeave + "-leave");
                        // 操作了真实dom，虚拟dom也要做相应的变化，否则可能导致第二次渲染属性不一致
                        dom.removeClass("nd-animation-" + nameLeave + "-leave");
                        //  2.重新定位一次元素。 本来是el.offsetWidth=el.offsetWidth的
                        //    下面是严格模式下的替代方案
                        void el.offsetWidth;
                        // 控制播放时间
                        el.style.animationDuration = durationEnter;
                        // 动画延时播放时间
                        el.style.animationDelay = "0s";
                        dom.addStyle(`animation-duration:${durationEnter};animation-delay:0s`); //
                        //  3.添加新的动画
                        el.classList.add("nd-animation-" + nameEnter + "-enter");
                        // 操作了真实dom，虚拟dom也要做相应的变化，否则可能导致第二次渲染属性不一致
                        dom.addClass('nd-animation-' + nameEnter + '-enter');
                        // 添加动画结束监听
                        el.addEventListener('animationend', handler);
                    }, delay);
                }
                else {
                    // 当前处于显示状态 
                    // 为了不重复播放显示动画，这里直接返回
                    dom.addClass('nd-animation-' + nameEnter + '-enter');
                    return;
                }
            }
            else {
                dom.addClass('nd-animation-' + nameEnter + '-enter');
                dom.dontRender = false;
            }
        }
    });
    /**
     * 指令名 field
     * 描述：字段指令
     */
    DirectiveManager.addType('field', 10, (directive, dom) => {
        dom.setProp('name', directive.value);
        //默认text
        let type = dom.getProp('type') || 'text';
        let eventName = dom.tagName === 'input' && ['text', 'checkbox', 'radio'].includes(type) ? 'input' : 'change';
        //增加value表达式
        if (!dom.hasProp('value') && ['text', 'number', 'date', 'datetime', 'datetime-local', 'month', 'week', 'time', 'email', 'password', 'search', 'tel', 'url', 'color', 'radio'].includes(type)
            || dom.tagName === 'TEXTAREA') {
            dom.setProp('value', new Expression(directive.value), true);
        }
        dom.addEvent(new NEvent(eventName, function (dom, module, e, el) {
            if (!el) {
                return;
            }
            let type = dom.getProp('type');
            let field = dom.getDirective('field').value;
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
                this[field] = v;
            }
            else {
                for (let i = 0; i < arr.length - 1; i++) {
                    temp = temp[arr[i]];
                }
                temp[arr[arr.length - 1]] = v;
            }
            //修改value值，该节点不重新渲染
            if (type !== 'radio') {
                dom.setProp('value', v);
                el.value = v;
            }
        }));
    }, (directive, dom, module, parent) => {
        const type = dom.getProp('type');
        const tgname = dom.tagName.toLowerCase();
        const model = dom.model;
        if (!model) {
            return;
        }
        let dataValue = model.$get(directive.value);
        //变为字符串
        if (dataValue !== undefined && dataValue !== null) {
            dataValue += '';
        }
        //无法获取虚拟dom的value，只能从对应的element获取
        let el = module.getNode(dom.key);
        let value = el ? el.value : undefined;
        if (type === 'radio') {
            if (dataValue + '' === value) {
                dom.assets.set('checked', true);
                dom.setProp('checked', 'checked');
            }
            else {
                dom.assets.set('checked', false);
                dom.delProp('checked');
            }
        }
        else if (type === 'checkbox') {
            //设置状态和value
            let yv = dom.getProp('yes-value');
            //当前值为yes-value
            if (dataValue + '' === yv) {
                dom.setProp('value', yv);
                dom.assets.set('checked', true);
            }
            else { //当前值为no-value
                dom.setProp('value', dom.getProp('no-value'));
                dom.assets.set('checked', false);
            }
        }
        else if (tgname === 'select') { //下拉框
            if (!directive.extra || !directive.extra.inited) {
                setTimeout(() => {
                    directive.extra = { inited: true };
                    dom.setProp('value', dataValue);
                    dom.setAsset('value', dataValue);
                    Renderer.add(module);
                }, 0);
            }
            else {
                if (dataValue !== value) {
                    dom.setProp('value', dataValue);
                    dom.setAsset('value', dataValue);
                }
            }
        }
        else {
            dom.assets.set('value', dataValue === undefined || dataValue === null ? '' : dataValue);
        }
    });
    /**
     * 指令名 validity
     * 描述：字段指令
     */
    DirectiveManager.addType('validity', 10, (directive, dom) => {
        let ind, fn, method;
        let value = directive.value;
        //处理带自定义校验方法
        if ((ind = value.indexOf('|')) !== -1) {
            fn = value.substr(0, ind);
            method = value.substr(ind + 1);
        }
        else {
            fn = value;
        }
        directive.extra = { initEvent: false };
        directive.value = fn;
        directive.params = {
            enabled: false //不可用
        };
        //如果有方法，则需要存储
        if (method) {
            directive.params.method = method;
        }
        //如果没有子节点，添加一个，需要延迟执行
        if (dom.children.length === 0) {
            let vd1 = new Element();
            vd1.textContent = '';
            dom.add(vd1);
        }
        else { //子节点
            dom.children.forEach((item) => {
                if (item.children.length === 0) {
                    let vd1 = new Element();
                    vd1.textContent = '   ';
                    item.add(vd1);
                }
            });
        }
    }, (directive, dom, module, parent) => {
        setTimeout(() => {
            const el = module.getNode({ name: directive.value });
            if (!directive.extra.initEvent) {
                directive.extra.initEvent = true;
                //添加focus和blur事件
                el.addEventListener('focus', function () {
                    setTimeout(() => { directive.params.enabled = true; }, 0);
                });
                el.addEventListener('blur', function () {
                    Renderer.add(module);
                });
            }
        }, 0);
        //未获取focus，不需要校验
        if (!directive.params.enabled) {
            dom.dontRender = true;
            return;
        }
        const el = module.getNode({ name: directive.value });
        if (!el) {
            return;
        }
        let chds = [];
        //找到带rel的节点
        dom.children.forEach((item) => {
            if (item.tagName !== undefined && item.hasProp('rel')) {
                chds.push(item);
            }
        });
        let resultArr = [];
        //自定义方法校验
        if (directive.params.method) {
            const foo = module.getMethod(directive.params.method);
            if (Util.isFunction(foo)) {
                let r = foo.call(module.model, el.value);
                if (!r) {
                    resultArr.push('custom');
                }
            }
        }
        let vld = el.validity;
        if (!vld.valid) {
            // 查找校验异常属性
            for (var o in vld) {
                if (vld[o] === true) {
                    resultArr.push(o);
                }
            }
        }
        if (resultArr.length > 0) {
            //转换成ref对应值
            let vn = handle(resultArr);
            //单个校验
            if (chds.length === 0) {
                setTip(dom, vn, el);
            }
            else { //多个校验
                for (let i = 0; i < chds.length; i++) {
                    let rel = chds[i].getProp('rel');
                    if (rel === vn) {
                        setTip(chds[i], vn, el);
                    }
                    else { //隐藏
                        chds[i].dontRender = true;
                    }
                }
            }
        }
        else {
            dom.dontRender = true;
        }
        /**
         * 设置提示
         * @param vd    虚拟dom节点
         * @param vn    验证结果名
         * @param el    验证html element
         */
        function setTip(vd, vn, el) {
            //子节点不存在，添加一个
            let text = vd.children[0].textContent.trim();
            if (text === '') { //没有提示内容，根据类型提示
                text = Util.compileStr(NodomMessage.FormMsgs[vn], el.getAttribute(vn));
            }
            vd.children[0].textContent = text;
        }
        /**
         * 验证名转换
         */
        function handle(arr) {
            for (var i = 0; i < arr.length; i++) {
                switch (arr[i]) {
                    case 'valueMissing':
                        return 'required';
                    case 'typeMismatch':
                        return 'type';
                    case 'tooLong':
                        return 'maxLength';
                    case 'tooShort':
                        return 'minLength';
                    case 'rangeUnderflow':
                        return 'min';
                    case 'rangeOverflow':
                        return 'max';
                    case 'patternMismatch':
                        return 'pattern';
                    default:
                        return arr[i];
                }
            }
        }
    });
    /**
     * 增加route指令
     */
    DirectiveManager.addType('route', 10, (directive, dom) => {
        //a标签需要设置href
        if (dom.tagName.toLowerCase() === 'a') {
            dom.setProp('href', 'javascript:void(0)');
        }
        if (dom.hasProp('active')) {
            let ac = dom.getProp('active');
            //active 转expression
            dom.setProp('active', new Expression(ac), true);
            //保存activeName
            directive.extra = { activeName: ac };
        }
        // 不重复添加route event
        let evt = dom.getEvent('click');
        if (evt) {
            if (Array.isArray(evt)) {
                for (let ev of evt) { //已存在路由事件
                    if (ev.getExtraParam('routeEvent')) {
                        return;
                    }
                }
            }
            else if (evt.getExtraParam('routeEvent')) {
                return;
            }
        }
        //添加click事件
        evt = new NEvent('click', (dom, module, e) => {
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
        //设置路由标识
        evt.setExtraParam('routeEvent', true);
        dom.addEvent(evt);
    }, (directive, dom, module, parent) => {
        // 设置激活字段
        if (directive.extra) {
            Router.addActiveField(module, directive.value, dom.model, directive.extra.activeName);
        }
        dom.setProp('path', directive.value);
        //延迟激活（指令执行后才执行属性处理，延迟才能获取active prop的值）
        setTimeout(() => {
            // 路由路径以当前路径开始
            if (dom.getProp('active') === true && directive.value.startsWith(Router.currentPath)) {
                Router.go(directive.value);
            }
        }, 0);
    });
    /**
     * 增加router指令
     */
    DirectiveManager.addType('router', 10, (directive, dom) => {
        //修改节点role
        dom.setProp('role', 'module');
    }, (directive, dom, module, parent) => {
        Router.routerKeyMap.set(module.id, dom.key);
    });
    /**
     * 插槽指令
     * 配合slot标签使用
     */
    DirectiveManager.addType('slot', 3, (directive, dom) => {
        dom.setProp('slotName', directive.value);
    }, (directive, dom, module, parent) => {
    });
})());

export { ChangedDom, Compiler, Directive, DirectiveManager, DirectiveType, Element, Expression, ExternalNEvent, MethodFactory, Model, ModelManager, Module, ModuleFactory, NError, NEvent, NFactory, NodomMessage, NodomMessage_en, NodomMessage_zh, Renderer, Route, Router, Scheduler, Util, createDirective, createRoute, nodom, request, store };
//# sourceMappingURL=nodom.js.map
