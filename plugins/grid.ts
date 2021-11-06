// import { Renderer,Module,registModule,VirtualDom,ModelManager,NEvent,Expression } from "../../../examples/js/nodom.js";
import { registModule, Renderer, Module ,VirtualDom,NEvent ,Expression} from "../../nodom3.3";

/**
 * grid 插件
 * 配置参数
 *  rowAlt      行颜色交替标志，不用设置值
 *  gridLine    网格线类型，包括cols(列) rows(行) both(行列)，默认无
 *  fixHead     是否固定表头，默认false
 *  checkbox    是否显示复选框，默认false
 *  expand      是否支持行展开，默认false
 */

export class UIGrid extends Module{
    /**
     * 行交替
     */
    private rowAlt:boolean;
 
    /**
     * 网格线 row column both
     */
    private gridLine:string;
 
    /**
     * 固定头部
     */
    private fixHead:boolean;
 
    /**
     * 列对象
     */
    private columns:UIGridCol[] = [];

    /**
     * 表头选中状态 0未选中 1选中 2部分选中
     */
    private headCheck = 0;
 
    template(props){
        this.rowAlt = props.rowAlt === 'true';
        this.fixHead = props.fixHead === 'true';
        this.gridLine = props.gridLine;
        let expandStr='';
        let expandHeadStr='';
        let checkStr='';
        let checkHeadStr='';
        if(props.expand === 'true'){
            expandStr = `<div class='nd-grid-row-item nd-grid-icon'>
                            <b class={{__expanded?'nd-expand-icon nd-expand-open':'nd-expand-icon'}} e-click='clickExpand'/>
                        </div>`;
            expandHeadStr = `<div class='nd-grid-row-item nd-grid-icon'></div>`;
        }
        if(props.checkbox === 'true'){
            checkStr = `<div class='nd-grid-row-item nd-grid-icon'>
                            <b class={{genCheckCls(__checked)}} e-click='clickCheck'/>
                        </div>`;
            checkHeadStr = `<div class='nd-grid-row-item nd-grid-icon'>
                        <b class={{genCheckCls(this.headCheck)}} e-click='clickHeadCheck'/>
                    </div>`;            
        }
        return `
            <div class={{genGridCls()}}>
                <div class={{genHeadCls()}}>
                    <div class='nd-grid-row'>
                        ${expandHeadStr}
                        ${checkHeadStr}
                    </div>
                </div>
                <div class={{genBodyCls()}}>
                    <for cond={{gridData}}>
                        <div class='nd-grid-row'>
                            ${expandStr}
                            ${checkStr}
                        </div>
                        <slot name='expandrow' x-show={{__expanded}} class='nd-grid-expand' innerRender />
                    </for>
                </div>
                <slot></slot>
            </div>
        `
    }

    /**
     * 产生head css
     * @returns css串
     */
    genHeadCls(){
        let arr = ['nd-grid-head'];
        // if(this.gridLine === 'rows'){
        //     arr.push('nd-grid-head-row-line')
        // }else if(this.gridLine === 'cols'){
        //     arr.push('nd-grid-col-line');
        // }else if(this.gridLine === 'both'){
        //     arr.push('nd-grid-head-all-line');
        // }
        return arr.join(' ');
    }

    genGridCls(){
        let arr = ['nd-grid'];
        if(this.fixHead){
            arr.push("nd-grid-fixhead");
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
    /**
     * 产生body css
     * @returns css串
     */
    genBodyCls(){
        let arr = ['nd-grid-body'];
        if(this.rowAlt){
            arr.push("nd-grid-rowalt");
        }
        // if(this.gridLine === 'rows'){
        //     arr.push('nd-grid-row-line')
        // }else if(this.gridLine === 'cols'){
        //     arr.push('nd-grid-col-line');
        // }else if(this.gridLine === 'both'){
        //     arr.push('nd-grid-all-line');
        // }
        return arr.join(' ');
    }

    /**
     * 生成checkbox class
     * @param  st   状态 0未选中 1全选中 2部分选中
     * @returns     checkbox 的class
     */
     genCheckCls(st) {
        if (!st) {
            return 'nd-icon-checkbox';
        }
        else if (st === 1) {
            return 'nd-icon-checked';
        }
        else {
            return 'nd-icon-partchecked';
        }
    }

    /**
     * 添加列
     * @param props  gridcol属性 
     */
    addColumn(col:UIGridCol){
        // 不重复添加
        if(this.columns.indexOf(col) !== -1){
            return;
        }
        this.columns.push(col);

        let header = this.originTree.children[0].children[0];
        let body = this.originTree.children[1].children[0].children[0];
        //表头
        let th = new VirtualDom('div');
        th.setProp('class','nd-grid-row-item');
        const props = col.props;
        if(props.width){
            th.setProp('style','width:' + props.width + 'px');
        }else{
            th.setProp('style','flex:1');
        }

        let txt = new VirtualDom();
        txt.textContent = props.title;
        th.add(txt);

        //排序按钮
        if(props.sortable === 'true' && props.field){
            let sort = new VirtualDom('div');
            sort.setProp('class','nd-grid-sort');
            //升序
            let b = new VirtualDom('b');
            b.setProp('class','nd-grid-sort-raise');
            b.addEvent(new NEvent('click','raiseSort'));
            b.setParam(this,'__field',props.field);
            sort.add(b);
            //降序
            b = new VirtualDom('b');
            b.setProp('class','nd-grid-sort-down');
            b.addEvent(new NEvent('click','downSort'));
            b.setParam(this,'__field',props.field);
            sort.add(b);

            th.add(sort);    
        }
        
        header.add(th);
        
        //body 列
        th = new VirtualDom('div');
        th.setProp('class','nd-grid-row-item');
        if(props.width){
            th.setProp('style','width:' + props.width + 'px');
        }else{
            th.setProp('style','flex:1');
        }
        txt = new VirtualDom();
        txt.expressions = [new Expression(this,props.field)];
        th.add(txt);
        body.add(th);
        //启动父模块渲染
        setTimeout(()=>{
            Renderer.add(this);
        },0)
    }

    /**
     * 点击expand
     * @param model 
     */
    clickExpand(model){
        model['__expanded'] = !model['__expanded'];
    }

    /**
     * 点击头部checkbox
     */
    clickHeadCheck(){
        let st = this.headCheck === 1?0:1;
        this.headCheck = st;

        if(!this.model['gridData'] || this.model['gridData'].length === 0){
            return;
        }
        //更新行checkbox状态
        for(let m of this.model['gridData']){
            m['__checked'] = st;
        }
    }
    /**
     * 点击行 checkbox
     * @param model 
     */
    clickCheck(model){
        model['__checked'] = model['__checked']?0:1;
        //修改表头checkbox选中状态
        const rows = this.model['gridData'];
        const arr = rows.filter(item=>item.__checked === 1);
        if(arr.length === rows.length){
            this.headCheck = 1;
        }else if(arr.length === 0){
            this.headCheck = 0;
        }else{
            this.headCheck = 2;
        }
    }

    /**
     * 升序排序
     * @param model 
     * @param dom
     */
    raiseSort(model,dom){
        const field = dom.getParam[this,'__field'];
        this.model['gridData'].sort((a,b)=>{
            if(a[field]>b[field]){
                return 1;
            }
            return -1;
        });
    }

    /**
     * 降序
     * @param model 
     * @param dom
     */
    downSort(model,dom){
        const field = dom.getParam[this,'__field'];
        console.log(field);
        this.model['gridData'].sort((a,b)=>{
            if(a[field]<b[field]){
                return 1;
            }
            return -1;
        })
    }
}

//注册模块
registModule(UIGrid,'ui-grid');

/**
 * grid colunn
 * 配置参数
 *  title       列标题
 *  width       宽度，不带单位，如 widt='100'，如果不设置，则默认flex:1，如果自动铺满，最后一列不设置宽度
 *  sortable    是否排序，默认false
 *  template    自定义模版
 */
export class UIGridCol extends Module{
    template(props){
        let pm:UIGrid = <UIGrid>this.getParent();
        this.props = props
        pm.addColumn(this);
        return null;
    }
}

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
registModule(UIGridCol,'ui-grid-col');

registModule(UIGridExpand,'ui-grid-expand');
