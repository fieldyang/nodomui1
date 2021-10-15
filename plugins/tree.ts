// import { Module,registModule,ModuleFactory,VirtualDom,ModelManager } from "../../../examples/js/nodom.js";
import { ModelManager } from "../../nodom3.2/core/modelmanager.js";
import { Module } from "../../nodom3.2/core/module.js";
import { registModule,Model ,VirtualDom} from "../examples/js/nodom.js";

export class UITree extends Module{
    /**
     * 数据项名
     */
    dataName:string;

    /**
     * 打开状态字段名
     */
    openName:string;

    /**
     * 选中字段名
     */
    checkName:string;

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
    field:string;

    /**
     * 节点点击事件
     */
    itemClickEvent:Function;

    template(props?:any):string{
        this.dataName = props.dataName;
        this.displayField = props.displayField;
        this.valueField = props.valueField;
        
        let openName = props.openField || '$isOpen';
        this.openName = openName;
        let checkName = props.checkField || '$checked';
        this.checkName = checkName;
        this.itemClickEvent = props.itemClick;
        this.field = props.field;
        
        this.icons = props.icons?props.icons.split(',').map(item=>item.trim()):undefined;
        
        let temp =  `
            <div class='nd-tree' x-model=${props.dataName}>
                <for cond={{children}} class='nd-tree-nodect' value={{${props.valueField}}}>
				    <div class='nd-tree-node'>
                        <b class={{genArrowCls(!children||children.length===0,${openName})}} e-click='expandClose'></b>
                        ${props.icons?"<b class={{genFolderCls(!children||children.length===0," + openName + ")}}></b>":""}
                        ${checkName?"<b class={{genCheckCls($checked)}} e-click='checkItem'></b>":""}
                        <span e-click='clickItem'>{{${props.displayField}}}</span>
                    </div>
                    <recur cond='children' class={{genSubCls(${openName})}}>
                        <for cond={{children}} class='nd-tree-nodect'  value={{${props.valueField}}}>
                            <div class='nd-tree-node'>
                                <b class={{genArrowCls(!children||children.length===0,${openName})}} e-click='expandClose'></b>
                                ${props.icons?"<b class={{genFolderCls(!children||children.length===0," + openName + ")}}></b>":""}
                                ${checkName?"<b class={{genCheckCls(" + checkName +")}} e-click='checkItem'></b>":""}
                                <span e-click='clickItem'>{{${props.displayField}}}</span>
                            </div>
                            <recur ref />
                        </for>                
                    </recur>
                </for>
            </div>
        `;
        return temp;
    }

    methods = {
        //创建选择框class
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
        },

        //创建树左侧箭头class
        genArrowCls(isLeaf,isOpen){
            let arr = ['nd-tree-icon'];
            if(!isLeaf){
                arr.push('nd-icon-arrow-right');
            }
            if(isOpen){
                arr.push('nd-tree-node-open');
            }
            return arr.join(' ');
        },
        
        //显示文件夹图标
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
        },
        //创建子树css
        genSubCls(isOpen){
            return isOpen?'nd-tree-subct nd-tree-subct-show':'nd-tree-subct';
        },
        //点击item事件
        clickItem(model,dom,eobj,e){
            if(!this.itemClickEvent){
                return;
            }
            let foo = this.getParent().getMethod(this.itemClickEvent);
            if(!foo){
                return;
            }
            foo.apply(this,[model,dom,eobj,e]);
        },

        //展开关闭
        expandClose(model,dom,eobj,e){
            model[this.openName] = !model[this.openName];
        },
        //checkbox 点击
        checkItem(model,dom,eobj,e){
            this.handleCheck(dom.parent.parent);
        },
        onBeforeFirstRender(model){
            model[this.dataName] = this.props.$data[this.dataName];
            //新数据绑定到当前模块
            ModelManager.bindToModule(model[this.dataName],this);
            if(this.field){
                model.$watch(this.field,()=>{
                    this.setValue(model[this.field]);
                })
                // this.setValue(model[this.field]);
            }
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
            state = model[this.checkName] || 0;
            if(state === 0 || state === 2){ //未选中或部分选中，点击后选中
                state = 1;
            }else{
                state = 0;
            }
        }
        model[this.checkName] = state;
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
           r[this.checkName] = state;
           this.handleSubCheck(r,state);
       }
    }

    /**
     * 获取value
     */
    public getValue():any[]{
        const me = this;
        if(!this.dataName || this.valueField === '' ){
            return;
        }
        let va = [];
        let model = this.model;
        getChecked(this.model);
        model[this.dataName] = va;
        return va;

        function getChecked(m){
            if(!m.children){
                return;
            }
            for(let r of m.children){
                if(r[me.checkName] === 1){
                    va.push(r[me.valueField]);
                }
                getChecked(r);
            }
        }
    }

    /**
     * 设置值
     * @param value 
     * @returns 
     */
    public setValue(value){
        const me = this;
        if(!this.dataName || this.valueField === '' ){
            return;
        }
        setNode(this.model[this.dataName]);
        //反向处理
        this.leafToRoot();
        /**
         * 查找并设置节点
         * @param m     model
         */
        function setNode(m){
            let ind = -1;
            if((ind=value.indexOf(m[me.valueField])) !== -1){
                m[me.checkName] = 1;
                //处理子节点
                me.handleSubCheck(me.model,1);
                //移除该值
                value.splice(ind,1);
            }else if(m.children){ //处理子节点
                for(let m1 of m.children){
                    setNode(m1);
                }
            }
        }
    }

    /**
     * 叶子到根反向处理
     */
     leafToRoot(){
        const me = this;
        let modelList;
        let modelMap;
        let pmodel = this.model[this.dataName];
        if (!pmodel || !pmodel.children) {
            return;
        }

        for (let m of pmodel.children) {
            modelMap = new WeakMap();
            modelList = [];
            handleOne(m);
        }

        function handleOne(model) {
            //先处理子节点
            if (model.children && model.children.length > 0) {
                //由子节点确定是否选中
                model[me.checkName] = 0;
                //设置为1时的数量，孩子设置为1时 --
                modelMap.set(model, { need: model.children.length, cnt: 0 });
                //父节点入栈
                modelList.push(model);
                for (let m of model.children) {
                    handleOne(m);
                }
                //子节点处理结束，父节点出栈
                modelList.pop();
            }
            handleUp(model[me.checkName]);
        }

        /**
         * 向上处理
         */
        function handleUp(state) {
            if (modelList.length === 0) {
                return;
            }

            //1个为2，则所有父为2
            if(state === 2){
                for (let m of modelList) {
                    m[me.checkName] = 2;   
                }
                return;
            }
            
            for (let i = modelList.length - 1; i >= 0; i--) {
                let m = modelList[i];
                let cfg = modelMap.get(m);
                if (state === 1) {
                    cfg.cnt++;
                }
                
                let st;
                if (cfg.need <= cfg.cnt) { //子节点全选中
                    st = 1;
                    // modelList.pop();
                }else if (cfg.cnt === 0) {
                    st = 0;
                }else {
                    st = 2;
                }
                //状态未改变，不向上处理
                if(st === m[me.checkName]){
                    return;
                }else{
                    m[me.checkName] = st;
                }
                state = st;
            }
        }
    }
}

registModule(UITree,'ui-tree');