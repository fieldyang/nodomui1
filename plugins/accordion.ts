// import { Module,registModule,ModuleFactory } from "../../../examples/js/nodom.js";
import { Model } from "../../nodom3.2/core/model.js";
import { ModuleFactory } from "../../nodom3.2/index.js";
import { Module,registModule } from "../examples/js/nodom.js";

/**
 * 折叠插件
 * 属性配置
 * single: true/false 是否同时只展开一个
 */
export class UIAccordion extends Module {
    public single;
    template(props?:any):string{
        this.single = (props['single']==='true');
        return `
            <div class='nd-accordion'>
                <slot></slot>
            </div>
        `;
    }
}

registModule(UIAccordion,'ui-accordion');
/**
 * accordion item
 * 属性配置
 * open: true/false,是否展开
 */
export class UIAccordionItem extends Module{
    private open:boolean;
    template(props?:any):string{
        this.open = (props['open'] === 'true');
        return `
            <div class='nd-accordion-item'>
                <div class='nd-accordion-title' e-click='clickItem'>
                    ${props.title}
                    <b class={{$open?'nd-accordion-icon nd-accordion-open':'nd-accordion-icon'}} />
                </div>
                <div class='nd-accordion-content' class={{$open?'nd-accordion-content':'nd-accordion-content  nd-accordion-hide'}}>
                    <slot></slot>
                </div>
            </div>
        `
    }

    methods={
        onBeforeFirstRender(model){
            model['$open'] = this.open;
            let module = ModuleFactory.get(this.parentId);
            this.showSingle = module['single'];
        },
        clickItem(model:Model,dom){
            let module = ModuleFactory.get(this.parentId);
            if(module['single']){
                for(let mid of module.children){
                    let m:Module = ModuleFactory.get(mid);
                    if(mid !== this.id){
                        m.model['$open'] = false;
                    }else{
                        m.model['$open'] = true;
                    }
                }
            }else{
                model['$open'] = !model['$open'];
            }
        }
    }
}
registModule(UIAccordionItem,'ui-accordion-item');