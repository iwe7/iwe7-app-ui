import { AppActionService, AddInputAction } from 'iwe7-app';
import { Store } from '@ngrx/store';
import { Iwe7UiService } from './iwe7-ui.service';
import { Directive, Input, ElementRef } from '@angular/core';
import { ComponentModel } from 'iwe7-app';
@Directive({ selector: '[customCreater]' })
export class CustomCreaterDirective {
    @Input()
    set componentCreater(val: ComponentModel[]) {
        if (val) {
            const newVal = val.sort((a, b) => parseInt(a.component_displayorder, 10) - parseInt(b.component_displayorder, 10));
            const element: HTMLElement = this.ele.nativeElement;
            const container = element.parentElement;
            for (const key in newVal) {
                const item = newVal[key];
                this.ui.load(newVal[key].component_selector).pipe().subscribe(ele => {
                    // inputs
                    ele.id = item.component_id;
                    this.store.dispatch(new AddInputAction({
                        id: item.component_id,
                        ...item.component_inputs
                    }));
                    // outputs
                    for (const key in item.component_outputs) {
                        ele.addEventListener(key, (e: any) => {
                            const action = item.component_outputs[key];
                            this.action.get(action, e.detail);
                        });
                    }
                    container.appendChild(ele);
                });
            }
        }
    }
    constructor(
        public ele: ElementRef,
        public ui: Iwe7UiService,
        public action: AppActionService,
        public store: Store<any>
    ) { }

}
