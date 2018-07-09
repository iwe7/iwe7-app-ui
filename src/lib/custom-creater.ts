import { Iwe7UiService } from './iwe7-ui.service';
import { Directive, Input, ElementRef } from '@angular/core';
import { ComponentModel } from 'iwe7-app';
@Directive({ selector: '[customCreater]' })
export class CustomCreaterDirective {
    @Input()
    set customCreater(val: ComponentModel[]) {
        if (val) {
            const newVal = val.sort((a, b) => parseInt(a.component_displayorder, 10) - parseInt(b.component_displayorder, 10));
            const element: HTMLElement = this.ele.nativeElement;
            const container = element.parentElement;
            for (const key in newVal) {
                const item = newVal[key];
                this.ui.load(newVal[key].component_selector).pipe().subscribe(ele => {
                    // 绑定输入

                    // 绑定输出

                    container.appendChild(ele);
                });
            }
        }
    }
    constructor(
        public ele: ElementRef,
        public ui: Iwe7UiService
    ) { }

}
