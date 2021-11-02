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
 
    private gridData:any;
    template(props){
        this.model['gridData'] = props.$data.data;
        this.rowAlt = props.rowAlt === 'true';
        this.fixHead = props.fixHead === 'true';
        this.gridLine = props.gridLine;
        return `
            <div class='nd-grid ${this.fixHead?"nd-grid-fixed":""}'>
                <div class={{genHeadCls()}}>
                    <div class='nd-grid-row'></div>
                </div>
                <div class={{genBodyCls()}}>
                    <for cond={{gridData}} class='nd-grid-row'></for>
                </div>
                <slot name='default' style='display:none'/>
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
        this.templateStr = props.template;
        return `
            <div class='nd-grid-title' style="${this.width?this.width+'px':''}">{{${this.field}}}</div>
        `
    }
    
    onBeforeFirstRender(model){
        let pmodule = ModuleFactory.get(this.parentId);
        let header = pmodule.originTree.children[0].children[0];
        let body = pmodule.originTree.children[1].children[0];
        let th = new VirtualDom('div');
        // th.addClass('nd-grid-row-item');
        th.setProp('class','nd-grid-row-item');
        if(this.width){
            th.setProp('style','width:' + this.width + 'px');
        }else{
            th.setProp('style','flex:1');
        }
        // th.setProp('style','flex:1');
        let txt = new VirtualDom();
        txt.textContent = this.title;
        th.add(txt);
        header.add(th);
        
        th = new VirtualDom('div');
        // th.addClass('nd-grid-row-item');
        th.setProp('class','nd-grid-row-item');
        if(this.width){
            th.setProp('style','width:' + this.width + 'px');
        }else{
            th.setProp('style','flex:1');
        }
        txt = new VirtualDom();
        txt.expressions = [new Expression(this,this.field)];
        th.add(txt);
        body.add(th);
        
        Renderer.add(pmodule);
    }
}

//注册模块
registModule(UIGridCol,'ui-grid-col');