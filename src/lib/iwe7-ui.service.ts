import { createCustomElement } from '@angular/elements';
import { Observable, from } from 'rxjs';
import { ROUTES } from '@angular/router';
import {
    Injectable, SystemJsNgModuleLoader, Inject,
    Injector, NgModuleFactory, NgModuleRef
} from '@angular/core';
import { flattenDeep } from 'lodash';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class Iwe7UiService {
    routes: any;
    routesMap: Map<string, string> = new Map();
    constructor(
        public loader: SystemJsNgModuleLoader,
        @Inject(ROUTES) routes: any,
        public injector: Injector
    ) {
        this.routes = flattenDeep(routes);
        this.routes.map(res => {
            if (res.loadChildren) {
                this.routesMap.set(res.path, res.loadChildren);
            }
        });
    }

    load(name: string): Observable<HTMLElement> {
        console.log(name);
        const path = this.routesMap.get(name);
        if (path) {
            return from(this.loader.load(path)).pipe(
                map((res: NgModuleFactory<any>) => res.create(this.injector)),
                map((res: NgModuleRef<any>) => res.instance),
                switchMap(res => res.defined),
                map(res => document.createElement(name))
            );
        } else {
            return Observable.create(obser => {
                obser.next(document.createElement('div'));
                obser.complete();
            });
        }
    }

    register(name: string, comp: any, injector: Injector): Observable<any> {
        const ctrl = createCustomElement(comp, { injector });
        if (!customElements.get(name)) {
            customElements.define(name, ctrl);
            return from(customElements.whenDefined(name));
        } else {
            return Observable.create(obser => {
                obser.next();
                obser.complete();
            });
        }
    }
}
