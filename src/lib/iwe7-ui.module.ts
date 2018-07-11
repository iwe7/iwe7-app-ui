import { CustomCreaterDirective } from './custom-creater';
import { NgModule } from '@angular/core';
import { CustomRouterComponent } from './custom-router/custom-router';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [CustomCreaterDirective, CustomRouterComponent],
    exports: [CustomCreaterDirective, CustomRouterComponent]
})
export class Iwe7UIModule { }
