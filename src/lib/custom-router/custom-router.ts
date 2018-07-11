import { AppSelectorService, ComponentModel } from 'iwe7-app';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { selectEntitiesIwe7Components } from 'iwe7-app';

@Component({
    selector: 'custom-router',
    templateUrl: 'custom-router.html'
})

export class CustomRouterComponent implements OnInit {

    @Input() id: string;

    components$: Observable<ComponentModel[]>;
    constructor(
        public store: Store<any>,
        public selector: AppSelectorService
    ) { }

    ngOnInit() {
        this.components$ = this.store.select(selectEntitiesIwe7Components).pipe(
            map(res => res[this.id]),
            map(res => res.component_contents)
        );
    }
}
