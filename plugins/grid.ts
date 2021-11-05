// import { Renderer,Module,registModule,VirtualDom,ModelManager,ModuleFactory,Expression } from "../../../examples/js/nodom.js";
import { registModule, Renderer, Module ,VirtualDom,ModuleFactory,Expression} from "../../nodom3.3";

/**
 * panel 插件
 * ui-grid参数
 *  rowalt      行颜色交替标志，不用设置值
 *  sortable    排序标志，不用设置值 
 *  gridline    网格线类型，包括column(列) row(行) both(行列)，不设置则不显示
 * cols参数(列信息)
 *  field       表格数据数组对应名，如rows等
 *  子元素(列)，用div元素
 *  width       宽度，表示整个列宽度为几份，所有列的宽度合在一起表示总份数，栅格方式，默认1
 *  title       该列表头显示
 *  notsort     当表格设置sortable时，该设置表示该列不显示排序按钮
 *  editable    是否可编辑 尚未提供
 *  inputtype   输入类型，参考ui-form，默认text，尚未提供
 *
 * sub参数(详细显示框)
 *  auto        自动生成详细显示框标志，设置该标志后，点击左侧箭头，自动生成显示框
 *  cols        一行显示列数，auto设置时有效
 *  labelwidth  label宽度，默认100，auto设置时有效
 */

export class UIGrid extends Module{
    /**
     * grid数据绑定字段名
     */
    private dataName:string;
    
    /**
     * 行交替
     */
    private rowAlt:boolean;
 
    /**
     * 排序
     */
    private sortable:boolean;
 
    /**
     * 网格线 row column both
     */
     private gridLine:string;
 
     /**
      * 固定头部
      */
     private fixHead:boolean;
 
     /**
      * 显示checkbox
      */
     private checkbox:boolean;
 
     /**
      * 是否隐藏头部
      */
     private hideHead:boolean;
 
     /**
      * 默认列宽
      */
     private defaultColWidth:number;
 
     /**
      * 全选字段名(checkbox时有效)
      */
     private wholeCheckName:string;
 
     /**
      * 是否显示下拉详情
      */
     private showDetail:boolean;
 
     /**
      * 显示子属性名
      */
     private subName:string;
 
     /**
      * 选中属性名
      */
     private checkName:string;
 
    /**
     *  滚动变量数据
     */
    private scrollName:string;
 
    template(props){
        this.rowAlt = props.rowAlt === 'true';
        this.fixHead = props.fixHead === 'true';
        this.gridLine = props.gridLine;
        return `
            <div class='nd-grid ${this.fixHead?"nd-grid-fixed":""}'>
                <div class={{genHeadCls()}}>
                    <slot name='thead' class='nd-grid-row' />
                </div>
                <div class={{genBodyCls()}}>
                    <for cond={{gridData}}>
                        <slot name='tbody' class='nd-grid-row' innerRender/>
                        <!--class={{__expanded?'nd-grid-sub':'nd-grid-hidesub'}}-->
                        <slot name='subgrid' class={{__expanded?'nd-grid-sub':'nd-grid-sub nd-grid-hidesub'}} innerRender />
                    </for>
                </div>
            </div>
        `
    }

    /**
     * 产生head css
     * @returns css串
     */
    genHeadCls(){
        let arr = ['nd-grid-head'];
        if(this.gridLine === 'rows'){
            arr.push('nd-grid-head-row-line')
        }else if(this.gridLine === 'cols'){
            arr.push('nd-grid-col-line');
        }else if(this.gridLine === 'both'){
            arr.push('nd-grid-head-all-line');
        }
        return arr.join(' ');
    }

    /**
     * 产生body css
     * @returns css串
     */
    genBodyCls(){
        let arr = ['nd-grid-body'];
        if(this.rowAlt){
            arr.push("nd-grid-rowalt");
        }
        if(this.gridLine === 'rows'){
            arr.push('nd-grid-row-line')
        }else if(this.gridLine === 'cols'){
            arr.push('nd-grid-col-line');
        }else if(this.gridLine === 'both'){
            arr.push('nd-grid-all-line');
        }
        return arr.join(' ');
    }
}

//注册模块
registModule(UIGrid,'ui-grid');

/**
 * grid 列
 */
export class UIGridCol extends Module{
    title:string;
    width:number;
    notsort:boolean;
    field:string;
    align:string;
    isExpand:boolean;   
    /**
     * 模版串
     */
    templateStr:string;

    template(props){
        this.notsort = props.notsoft === 'true';
        this.width = props.width?parseInt(props.width):0;
        this.title = props.title;
        this.field = props.field;
        this.align = props.align;

        //父模块
        let pm:any = this.getParent();

        let style;
        let cssArr = ['nd-grid-row-item'];
        if(props.type === 'icon'){
            cssArr.push('nd-grid-icon');
        }else{
            if(props.width){
                style = 'width:' + this.width + 'px;';
            }else{
                style = 'flex:1;';
            }
        } 

        let str;
        if(props.isExpand === 'true'){  //展开图标
            str = `<div class='${cssArr.join(" ")}'  ${style ? 'style="' + style +'"' : ''}>
                    <b class={{__expanded?'nd-expand-icon nd-expand-open':'nd-expand-icon'}} e-click='clickExpand'/>
                  </div>`;
        }else if(props.isCheckbox === 'true'){
            //保存check对应的col子模块到父模块
            if(pm){
                if(!pm.checks){
                    pm.checks = [this];
                }else{
                    pm.checks.push(this);
                }
            }
            str = `<div class='${cssArr.join(" ")}'  ${style ? 'style="' + style +'"' : ''}>
                    <b class={{genCheckCls(__checked)}} e-click='clickCheck'/>
                  </div>`;
        }else{
            str = `<div ${style?'style="'+style+'"':''} class='${cssArr.join(" ")}'>
                    <slot innerRender></slot>
                </div>`;
        }
        return str;
        // return `
        //     <!--<div class='nd-grid-title' ${style?'style='+style:''}">{{${this.field}}}</div>-->
        //     <div ${style?'style='+style:''} class='${cssArr.join(" ")}'>
        //         <slot></slot>
        //     </div>
        // `
    }

    clickExpand(model){
        this.model['__expanded'] = !this.model['__expanded'];
    }

    clickCheck(model){
        let pm:any = this.getParent();
        //表头checkbox
        if(pm.checks[0] == this){
            let st = this.model['__checked'] === 1?0:1;
            this.model['__checked'] = st;
            updateAll(st);
        }else{ //表格checkbox
            this.model['__checked'] = this.model['__checked']?0:1;
            updateParent();
        }

        function updateAll(st){
            for(let m of pm.checks){
                m.model['__checked'] = st;
            }
        }

        function updateParent(){
            let cnt = 0;
            for(let i=1;i<pm.checks.length;i++){
                if(pm.checks[i].model['__checked'] === 1){
                    cnt++;
                }
            }
            if(cnt === pm.checks.length-1){
                pm.checks[0].model['__checked'] = 1;
            }else if(cnt === 0){
                pm.checks[0].model['__checked'] = 0;
            }else{
                pm.checks[0].model['__checked'] = 2;
            }

        }
    }

    genCheckCls(st){
        if(!st){
            return 'nd-icon-checkbox';
        }else if(st===1){
            return 'nd-icon-checked';
        }else{
            return 'nd-icon-partchecked';
        }
    }
    
    onBeforeFirstRender(model){
        // let pmodule = ModuleFactory.get(this.parentId);
        // let header = pmodule.originTree.children[0].children[0];
        // let body = pmodule.originTree.children[1].children[0].children[0];
        // let th = new VirtualDom('div');
        // th.setProp('class','nd-grid-row-item');
        // if(this.width){
        //     th.setProp('style','width:' + this.width + 'px');
        // }else{
        //     th.setProp('style','flex:1');
        // }
        // let txt = new VirtualDom();
        // txt.textContent = this.title;
        // th.add(txt);
        // header.add(th);
        
        // th = new VirtualDom('div');
        // th.setProp('class','nd-grid-row-item');
        // if(this.width){
        //     th.setProp('style','width:' + this.width + 'px');
        // }else{
        //     th.setProp('style','flex:1');
        // }
        // txt = new VirtualDom();
        // txt.expressions = [new Expression(this,this.field)];
        // th.add(txt);
        // body.add(th);
        
        // Renderer.add(pmodule);
    }
}
//注册模块
registModule(UIGridCol,'ui-grid-col');
export class UIGridExpand extends Module{
    template(props){
        return `
            <div>
                <slot innerRender></slot>
            </div>
        `
    }
}

//注册模块
registModule(UIGridExpand,'ui-grid-expand');
