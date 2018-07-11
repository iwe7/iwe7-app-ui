import { Update } from '@ngrx/entity';
import { Iwe7UiService } from './iwe7-ui.service';
import { Directive, Input, ElementRef } from '@angular/core';
import {
    ComponentModel, AppActionService,
    AddInputAction, AppSelectorService, UpdateInputAction
} from 'iwe7-app';
import { Store } from '@ngrx/store';

@Directive({ selector: '[customCreater]' })
export class CustomCreaterDirective {
    @Input()
    set customCreater(val: ComponentModel[]) {
        if (val) {
            const newVal = val.sort((a, b) => parseInt(a.component_displayorder, 10) - parseInt(b.component_displayorder, 10));
            const element: HTMLElement = this.ele.nativeElement;
            const container = element.parentElement.parentElement;
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
                            // 绑定UI
                            const action = item.component_outputs[key];
                            if (action.type === 'selector') {
                                const update: Update<any> = {
                                    id: action.id,
                                    changes: {
                                        [`${action.name}`]: e.detail
                                    }
                                };
                                this.store.dispatch(new UpdateInputAction(update));
                            }
                            if (action.type === 'action') {
                                const action2 = this.action.get(action.name, e.detail);
                                this.store.dispatch(action2);
                            }
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
        public selector: AppSelectorService,
        public store: Store<any>
    ) { }

}
