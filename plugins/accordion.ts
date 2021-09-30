// import { Module } from "../../nodom3.2/core/module";

import { Module,registModule } from "../examples/js/nodom.js";



/**
 * 手风琴插件
 */
export class UIAccordion extends Module {
    template(props?:any):string{
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
 */
export class UIAccordionItem extends Module{
    template(props?:any):string{
        return `
            <div class='nd-accordion-item'>
                <div class='nd-accordion-first'>
                    ${props.title}
                    <b class='nd-accordion-icon' />
                </div>
                <div class='nd-accordion-content'>
                    <slot></slot>
                </div>
            </div>
        `
    }
}

registModule(UIAccordionItem,'ui-accordion-item');


