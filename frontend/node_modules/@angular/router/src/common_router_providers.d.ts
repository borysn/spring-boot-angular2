/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Location } from '@angular/common';
import { ApplicationRef, ComponentResolver, Injector, NgModuleFactoryLoader, OpaqueToken } from '@angular/core';
import { Route, Routes } from './config';
import { Router } from './router';
import { RouterOutletMap } from './router_outlet_map';
import { ActivatedRoute } from './router_state';
import { UrlSerializer } from './url_tree';
export declare const ROUTER_CONFIGURATION: OpaqueToken;
/**
 * @experimental
 */
export interface ExtraOptions {
    enableTracing?: boolean;
    useHash?: boolean;
}
export declare function setupRouter(ref: ApplicationRef, resolver: ComponentResolver, urlSerializer: UrlSerializer, outletMap: RouterOutletMap, location: Location, injector: Injector, loader: NgModuleFactoryLoader, config: Route[][], opts?: ExtraOptions): Router;
export declare function rootRoute(router: Router): ActivatedRoute;
export declare function initialRouterNavigation(router: Router): () => void;
/**
 * An array of {@link Provider}s. To use the router, you must add this to your application.
 *
 * ### Example
 *
 * ```
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * class AppCmp {
 *   // ...
 * }
 *
 * const config = [
 *   {path: 'home', component: Home}
 * ];
 *
 * bootstrap(AppCmp, [provideRouter(config)]);
 * ```
 *
 * @deprecated use RouterModule instead
 */
export declare function provideRouter(routes: Routes, config?: ExtraOptions): any[];
export declare function provideRouterInitializer(): {
    provide: OpaqueToken;
    multi: boolean;
    useFactory: (router: Router) => () => void;
    deps: typeof Router[];
};
/**
 * Router configuration.
 *
 * ### Example
 *
 * ```
 * @NgModule({providers: [
 *   provideRoutes([{path: 'home', component: Home}])
 * ]})
 * class LazyLoadedModule {
 *   // ...
 * }
 * ```
 *
 * @deprecated
 */
export declare function provideRoutes(routes: Routes): any;
/**
 * Router configuration.
 *
 * ### Example
 *
 * ```
 * @NgModule({providers: [
 *   provideRouterOptions({enableTracing: true})
 * ]})
 * class LazyLoadedModule {
 *   // ...
 * }
 * ```
 *
 * @deprecated
 */
export declare function provideRouterConfig(config: ExtraOptions): any;
