// import { Module,registModule,VirtualDom,ModelManager } from "../../../examples/js/nodom.js";
import { registModule, Model, Module ,VirtualDom} from "../../nodom3.3";

/**
 * 树形插件
 * 数据项
 * treeData         树结构数据
 * treeValue        树check数组存放值，传入时，必须在父模块定义数组，对应valueField，如[1,2,3] 
 * 参数说明
 * displayField：   数据项中用于显示的属性名
 * valueField：     数据项中用于取值的属性名
 * icons：          树节点图标，依次为为非叶子节点关闭状态，打开状态，叶子节点，如果只有两个，则表示非叶子节点和叶子节点，如果1个，则表示非叶子节点
 * itemClick：      节点点击事件
 */
export class UITree extends Module{
    /**
     * 数据项名
     */
    // dataName:string;

    /**
     * 打开状态字段名
     */
    // openName:string;

    /**
     * 选中字段名
     */
    // checkName:string;

    /**
     * 值字段名
     */
    valueField:string;

    /**
     * 显示字段名
     */
    displayField:string;

    /**
     * 节点图标
     */
    icons:string[];

    /**
     * 值字段
     */
    // field:string;

    /**
     * 节点点击事件名
     */
    itemClickEventName:string;

    /**
     * 模版函数
     * @param props     父模块传递的属性值 
     * @returns         模版字符串
     */
    template(props?:any):string{
        // this.dataName = props.dataName;
        this.displayField = props.displayField;
        this.valueField = props.valueField;
        // this.field = props.valueName;
        this.itemClickEventName = props.itemClick;
        this.icons = props.icons?props.icons.split(',').map(item=>item.trim()):undefined;
        let nodeTmp = props.template || `{{${props.displayField}}}`;
        let needCheck = (props.checkbox === 'true')
        return `
            <div class='nd-tree' x-model='treeData'>
                <for cond={{children}} class='nd-tree-nodect' value={{${props.valueField}}}>
				    <div class='nd-tree-node'>
                        <b class={{genArrowCls(!children||children.length===0,__opened)}} e-click='expandClose'></b>
                        ${props.icons?"<b class={{genFolderCls(!children||children.length===0,__opened)}}></b>":""}
                        ${needCheck?"<b class={{genCheckCls(__checked)}} e-click='checkItem'></b>":""}
                        <span e-click='clickItem'>${nodeTmp}</span>
                    </div>
                    <recur cond='children' class={{genSubCls(__opened)}}>
                        <for cond={{children}} class='nd-tree-nodect'  value={{${props.valueField}}}>
                            <div class='nd-tree-node'>
                                <b class={{genArrowCls(!children||children.length===0,__opened)}} e-click='expandClose'></b>
                                ${props.icons?"<b class={{genFolderCls(!children||children.length===0,__opened)}}></b>":""}
                                ${needCheck?"<b class={{genCheckCls(__checked)}} e-click='checkItem'></b>":""}
                                <span e-click='clickItem'>${nodeTmp}</span>
                            </div>
                            <recur ref />
                        </for>                
                    </recur>
                </for>
            </div>
        `;
    }

    
    /**
     * 创建选择框class
     * @param checked   选中标识 true:选中  false:未选中
     * @returns         选择框class
     */ 
    genCheckCls(checked){
        let arr = ['nd-tree-icon'];
        if(!checked){
            arr.push('nd-tree-uncheck');
        }else if(checked === 1){
            arr.push('nd-tree-checked');
        }else{
            arr.push('nd-tree-partchecked');
        }
        return arr.join(' ');
    }

    /**
     * 创建树左侧箭头class
     * @param isLeaf    是否未叶子节点
     * @param isOpen    是否展开
     * @returns         箭头(展开收拢)图标class
     */
    genArrowCls(isLeaf,isOpen){
        let arr = ['nd-tree-icon'];
        if(!isLeaf){
            arr.push('nd-icon-arrow-right');
        }
        if(isOpen){
            arr.push('nd-tree-node-open');
        }
        return arr.join(' ');
    }
    
    /**
     * 显示文件夹图标
     * @param isLeaf    是否叶子节点
     * @param isOpen    是否展开
     * @returns         文件夹图标class
     */
    genFolderCls(isLeaf,isOpen){
        if (!this.icons || this.icons.length === 0) {
            return;
        }
        const arr = this.icons;
        //icon cls arr
        let arr1 = ['nd-tree-icon'];
        if(arr.length === 1){
            arr1.push(isLeaf?'':'nd-icon-' + arr[0]);
        }else if(arr.length===2){
            arr1.push('nd-icon-' + (isLeaf?arr[1]:arr[0]));
        }else if(arr.length===3){
            if(isOpen){
                arr1.push('nd-icon-' + (isLeaf?arr[2]:arr[1]));
            }else{
                arr1.push('nd-icon-' + (isLeaf?arr[2]:arr[0]));
            }
        }
        return arr1.join(' ');
    }
    /**
     * 创建子树css
     * @param isOpen    是否展开 
     * @returns         子树class
     */
    genSubCls(isOpen){
        return isOpen?'nd-tree-subct nd-tree-subct-show':'nd-tree-subct';
    }
    /**
     * 点击item事件
     * @param model     当前节点对应model 
     * @param dom       virtual dom节点
     * @param eobj      NEvent对象
     * @param e         event对象
     */
    clickItem(model,dom,eobj,e){
        if(!this.itemClickEventName){
            return;
        }
        let foo = this.getParent().getMethod(this.itemClickEventName);
        if(!foo){
            return;
        }
        foo.apply(this,[model,dom,eobj,e]);
    }

    /**
     * 展开关闭节点
     * @param model 当前节点对应model 
     * @param dom       virtual dom节点
     * @param eobj      NEvent对象
     * @param e         event对象
     */
    expandClose(model,dom,eobj,e){
        model['__opened'] = !model['__opened'];
    }
    
    /**
     * checkbox 点击
     * @param model     当前节点对应model 
     * @param dom       virtual dom节点
     * @param eobj      NEvent对象
     * @param e         event对象
     */
    checkItem(model,dom,eobj,e){
        this.handleCheck(dom.parent.parent);
    }

    /**
     * 首次渲染事件
     * @param model     树对应model 
     */
    onBeforeFirstRender(model){
        if(model.treeValue && model.treeValue.length>0){
            model.$watch('treeValue',()=>{
                this.setValue(model['treeValue']);
            })
            this.setValue(model['treeValue']);
        }
    }


    /**
    * 处理选中状态
    * @param dom    dom节点
    * @param state  状态 0未选中 1选中
    */
    private handleCheck(dom:VirtualDom,state?:number){
        const me = this;
        let model = dom.model;
        if(state === undefined){
            state = model['__checked'] || 0;
            if(state === 0 || state === 2){ //未选中或部分选中，点击后选中
                state = 1;
            }else{
                state = 0;
            }
        }
        model['__checked'] = state;
        this.changeValue(model);
        this.handleSubCheck(model,state);
        this.leafToRoot();
    }

    /**
    * 处理子节点选中
    * @param model     
    * @param state 
    */
    private handleSubCheck(model:Model,state:number){
       let rows = model['children'];
       if(!rows){
           return;
       }
       for(let r of rows){
           r['__checked'] = state;
           this.changeValue(r);
           this.handleSubCheck(r,state);
       }
    }

    /**
     * 设置值
     * @param value 
     */
    public setValue(value){
        const me = this;
        if(!value || this.valueField === '' || !this.model['treeData'] || !this.model['treeData'].children){
            return;
        }
        for(let m of this.model['treeData'].children){
            setNode(m);
        }
        
        //反向处理
        this.leafToRoot();
        /**
         * 查找并设置节点
         * @param m     model
         */
        function setNode(m){
            if(value.indexOf(m[me.valueField]) !== -1){
                m['__checked'] = 1;
                //处理子树
                me.handleSubCheck(m,1);
            }else if(m.children){ //处理子节点
                for(let m1 of m.children){
                    setNode(m1);
                }
            }
        }
    }

    /**
     * 修改树的值
     * @param model     节点model 
     * @returns 
     */
    private changeValue(model){
        if(!this.valueField || !this.model['treeValue']){
            return;
        }
        let state = model['__checked'];
        let value = this.model['treeValue'];
        if(!value){
            value = [];
        }

        //当前model的value值
        let cv = model[this.valueField];
        let ind = value.indexOf(cv);
        if(state === 1){ //选中，增加值
            if(ind === -1){
                value.push(cv);
            }
        }else if(ind !== -1){ //未选中,移除
            value.splice(ind,1);
        }
    }

    /**
     * 叶子到根反向处理
     */
    private leafToRoot(){
        const me = this;
        let modelList;
        let modelMap;
        let pmodel = this.model['treeData'];
        
        if (!pmodel || !pmodel.children) {
            return;
        }
        
        for (let m of pmodel.children) {
            modelMap = new WeakMap();
            modelList = [];
            handleOne(m);
        }

        function handleOne(model) {
            if(modelList.length>0 && model['__checked'] === 1){
                let last = modelList[modelList.length-1];
                modelMap.get(last).cnt++;
            }
            //先处理子节点
            if (model.children && model.children.length > 0) {
                //设置初始状态
                modelMap.set(model, { need: model.children.length, cnt: 0 });
                //父节点入栈
                modelList.push(model);
                for (let m of model.children) {
                    handleOne(m);
                }
                //子节点处理结束，父节点出栈
                modelList.pop();
                let cfg = modelMap.get(model);
                if(cfg.need === cfg.cnt){   //子节点全选中
                    model['__checked'] = 1;
                }else if(cfg.cnt === 0){    //子节点全未选中
                    model['__checked'] = 0;
                }else{                      //部分选中
                    model['__checked'] = 2;
                }
                me.changeValue(model);
            }
        }
    }
}
//注册模块
registModule(UITree,'ui-tree');