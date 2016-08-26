/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentFactoryResolver, Injector, NgModuleFactoryLoader, OpaqueToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Route } from './config';
/**
 * @deprecated use Routes
 */
export declare const ROUTER_CONFIG: OpaqueToken;
export declare const ROUTES: OpaqueToken;
export declare class LoadedRouterConfig {
    routes: Route[];
    injector: Injector;
    factoryResolver: ComponentFactoryResolver;
    constructor(routes: Route[], injector: Injector, factoryResolver: ComponentFactoryResolver);
}
export declare class RouterConfigLoader {
    private loader;
    constructor(loader: NgModuleFactoryLoader);
    load(parentInjector: Injector, path: string): Observable<LoadedRouterConfig>;
}
