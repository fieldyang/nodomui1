// import { Module,registModule,ModuleFactory,Element } from "../../../examples/js/nodom.js";
import { Module } from "../../nodom3.2/core/module.js";
import { registModule,Model ,Element} from "../examples/js/nodom.js";

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
     * 节点点击事件
     */
    itemClickEvent:Function;

    template(props?:any):string{
        this.dataName = props.dataName;
        this.displayField = props.displayField;
        this.valueField = props.valueField;
        
        let openName = props.openField || '$isOpen';
        this.openName = openName;
        let checkName = props.checkField;
        this.checkName = checkName;
        this.itemClickEvent = props.itemClick;
        
        this.icons = props.icons?props.icons.split(',').map(item=>item.trim()):undefined;
        
        let temp =  `
            <div class='nd-tree' x-model=${props.dataName}>
                <for cond={{children}} class='nd-tree-nodect'>
				    <div class='nd-tree-node'>
                        <b class={{genArrowCls(!children||children.length===0,${openName})}} e-click='expandClose'></b>
                        ${props.icons?"<b class={{genFolderCls(!children||children.length===0," + openName + ")}}></b>":""}
                        ${checkName?"<b class={{genCheckCls($checked)}} e-click='checkItem'></b>":""}
                        <span e-click='clickItem'>{{${props.displayField}}}</span>
                    </div>
                    <recur cond='children' class={{genSubCls(${this.openName})}}>
                        <for cond={{children}} class='nd-tree-nodect'>
                            <div class='nd-tree-node'>
                                <b class={{genArrowCls(!children||children.length===0,${openName})}} e-click='expandClose'></b>
                                ${props.icons?"<b class={{genFolderCls(!children||children.length===0," + openName + ")}}></b>":""}
                                ${checkName?"<b class={{genCheckCls($checked)}} e-click='checkItem'></b>":""}
                                <span e-click='clickItem'>{{${props.displayField}}}</span>
                            </div>
                            <recur ref />
                        </for>                
                        
                    </recur>
                </for>
            </div>
        `;
        console.log(temp)
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

        genSubCls(isOpen){
            return isOpen?'nd-tree-subct nd-tree-subct-show':'nd-tree-subct';
        },
        clickItem(model,dom,eobj,e){
            console.log()
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
            this.handleCheck(dom);
        }
    }

    /**
    * 处理选中状态
    * @param model      数据模型
    */
    private handleCheck(dom:Element){
        const me = this;
        let model = dom.model;
        let state;
        if(state === undefined){
            state = model[this.checkName] || 0;
            if(state === 0 || state === 2){ //未选中或部分选中，点击后选中
                state = 1;
            }else{
                state = 0;
            }
        }
        
        model[this.checkName] = state;
        handleSubCheck(model,state);
        handleParentCheck(dom);
        //修改值
        // this.getValue();


        function handleSubCheck(model:Model,state:number){
            let rows = model['children'];
            if(!rows){
                return;
            }
            for(let r of rows){
                r[me.checkName] = state;
                handleSubCheck(r,state);
            }
        }

        function handleParentCheck(dom:Element){
            let parent = dom.parent.parent.parent;
            if(!parent || parent === me.renderTree){
                return;
            }
            let pm = parent.model;
            if(!pm.children){
                return;
            }
            
            // 有一个状态为2则为2
            if(pm.children.find(item=>item[me.checkName] === 2)){
                pm[me.checkName] = 2;
            }else{
                if(pm.children.find(item=>item[me.checkName] === 1)){
                    if(pm.children.find(item=>!item[me.checkName])){ //1 0皆有
                        pm[me.checkName] = 2;
                    }else{ //全为1
                        pm[me.checkName] = 1;
                    }   
                }else{ //全为0
                    pm[me.checkName]=0;
                }
            }

            handleParentCheck(parent);
        }
    }


    /**
    * 处理子孙选中状态
    * @param model      当前model
    * @param state      值
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
    * 处理整颗树，根据子节点选中状态设置父节点状态，如果孩子选中则全选中，还有部分选中和不选中
    * @param model      停止的model，如果此model存在，则到model这儿就停止遍历
    */
    private refreshAll(model?:Model){
        const me = this;
        let findModel:boolean = false;
        handleOne(model);
        function handleOne(pmodel){
            if(findModel || !pmodel || !pmodel.children){
                return;
            }
            if(model && model === pmodel){
                findModel = true;
                return;
            }
            let count = 0;
            for(let r of pmodel.children){
                handleOne(r);
                //得到state=1的个数
                if(r[me.checkName] === 1){
                    count++;
                }
            }
            let state = 0;
            //全为1，则父模型状态为1
            if(count === pmodel.children.length){
                state = 1;
            }else if(count>0){ //部分选中
                state = 2;
            }
            pmodel.children = state;
        }
    }

    /**
     * 获取value
     */
    getValue():any[]{
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
    private setValue(value){
        const me = this;
        if(!this.dataName || this.valueField === '' ){
            return;
        }
        let findCount = 0;
        let finded = false;

        setNode(this.model);
        // 刷新状态
        this.refreshAll();
        /**
         * 查找并设置节点
         * @param m     model
         * @returns     无
         */
        function setNode(m){
            //找够了，则不再查找
            if(finded){
                return;
            }
            //找到则设置state=2
            if(value.indexOf(m[me.valueField]) !== -1){
                m[me.checkName] = 1;
                me.handleSubCheck(m,1);
                if(++findCount === value.length){
                    finded = true;
                    return;
                }
            }
            //子节点处理
            if(m.children){
                for(let r of m.children){
                    setNode(r);
                }
            }
        }
    }
}

registModule(UITree,'ui-tree');