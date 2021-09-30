// import { Module,registModule,ModuleFactory } from "../../../examples/js/nodom.js";
import { Module,registModule,ModuleFactory } from "../examples/js/nodom.js";

export class UITree extends Module{
    /**
     * 打开状态字段名
     */
    openName:string;

    /**
     * 节点图标
     */
    icons:string[];

    /**
     * 节点点击事件
     */
    itemClickEvent:Function;

    template(props?:any):string{
        let openName = props.openField || '$isOpen';
        this.openName = openName;
        this.icons = props.icons?props.icons.split(',').map(item=>item.trim()):undefined;
        if(props.itemClick){
            this.itemClickEvent = props.itemClick;
        }
        let temp =  `
            <div class='nd-tree' x-model=${props.dataName}>
                <for cond={{children}} class='nd-tree-nodect'>
				    <div class='nd-tree-node'>
                        <b class={{genArrowCls(${this.openName})}} e-click='expandClose'></b>
                        ${props.icons?"<b class={{genFolderCls(!children||children.length===0," + openName + ")}}></b>":""}
                        ${props.valueField?"<b class={{genCheckCls($checked)}}></b>":""}
                        <span e-click='clickItem'>{{${props.displayField}}}</span>
                    </div>
                    <recur cond='children' class={{genSubCls(${this.openName})}}>
                        <for cond={{children}} class='nd-tree-nodect'>
                            <div class='nd-tree-node'>
                                <b class={{genArrowCls()}} e-click='expandClose'></b>
                                ${props.icons?"<b class={{genFolderCls(!children||children.length===0," + openName + ")}}></b>":""}
                                ${props.valueField?"<b class={{genCheckCls(checked)}}></b>":""}
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
            if(checked){
                return 'nd-tree-checked'
            }
            return 'nd-tree-uncheck';
        },

        //创建树左侧箭头class
        genArrowCls(isOpen){
            let cls = 'nd-tree-icon nd-icon-arrow-right ';
            if(isOpen){
                return cls + 'nd-tree-node-open';
            }
            return cls;
        },
        
        //显示文件夹图标
        genFolderCls(isLeaf,isOpen){
            if (!this.icons || this.icons.length === 0) {
                return;
            }
            const arr = this.icons;
            if(arr.length === 1){
                return isLeaf?'':'nd-icon-' + arr[0];
            }else if(arr.length===2){
                return 'nd-icon-' + (isLeaf?arr[1]:arr[0]);
            }else if(arr.length===3){
                if(isOpen){
                    return 'nd-icon-' + (isLeaf?arr[2]:arr[1]);
                }else{
                    return 'nd-icon-' + (isLeaf?arr[2]:arr[0]);
                }
            }
        },

        genSubCls(isOpen){
            console.log(isOpen);
            return isOpen?'nd-tree-subct nd-tree-subct-show':'nd-tree-subct';
        },
        clickItem(dom,module,eobj,e){
            if(!module.itemClickEvent){
                return;
            }
            let foo = module.getParent().getMethod(module.itemClickEvent);
            if(!foo){
                return;
            }
            foo.apply(this,[dom,module,eobj,e]);
        },

        //展开关闭
        expandClose(dom,module,eobj,e){
            console.log(this);
            this.$set(module.openName,!this[module.openName]);
        }

    }
}

registModule(UITree,'ui-tree');