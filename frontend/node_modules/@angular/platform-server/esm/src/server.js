/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common';
import { analyzeAppProvidersForDeprecatedConfiguration, platformCoreDynamic } from '@angular/compiler';
import { ApplicationRef, NgModule, PLATFORM_COMMON_PROVIDERS, PLATFORM_INITIALIZER, createPlatformFactory, platformCore } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Console, ReflectionCapabilities, reflector, wtfInit } from '../core_private';
import { Parse5DomAdapter } from './parse5_adapter';
function notSupported(feature) {
    throw new Error(`platform-server does not support '${feature}'.`);
}
class ServerPlatformLocation extends PlatformLocation {
    getBaseHrefFromDOM() { throw notSupported('getBaseHrefFromDOM'); }
    ;
    onPopState(fn) { notSupported('onPopState'); }
    ;
    onHashChange(fn) { notSupported('onHashChange'); }
    ;
    get pathname() { throw notSupported('pathname'); }
    get search() { throw notSupported('search'); }
    get hash() { throw notSupported('hash'); }
    replaceState(state, title, url) { notSupported('replaceState'); }
    ;
    pushState(state, title, url) { notSupported('pushState'); }
    ;
    forward() { notSupported('forward'); }
    ;
    back() { notSupported('back'); }
    ;
}
export const INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_INITIALIZER, useValue: initParse5Adapter, multi: true },
    { provide: PlatformLocation, useClass: ServerPlatformLocation },
];
/**
 * A set of providers to initialize the Angular platform in a server.
 *
 * Used automatically by `serverBootstrap`, or can be passed to `platform`.
 * @deprecated Use `platformServer()` or create a custom platform factory via
 * `createPlatformFactory(platformServer, ...)`
 */
export const SERVER_PLATFORM_PROVIDERS = [PLATFORM_COMMON_PROVIDERS, INTERNAL_SERVER_PLATFORM_PROVIDERS];
function initParse5Adapter() {
    Parse5DomAdapter.makeCurrent();
    wtfInit();
}
/**
 * @experimental
 */
export const platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * @deprecated Use {@link platformServer} instead
 */
export const serverPlatform = platformServer;
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export const platformDynamicServer = createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * @deprecated Use {@link platformDynamicServer} instead
 */
export const serverDynamicPlatform = platformDynamicServer;
/**
 * Used to bootstrap Angular in server environment (such as node).
 *
 * This version of bootstrap only creates platform injector and does not define anything for
 * application injector. It is expected that application providers are imported from other
 * packages such as `@angular/platform-browser` or `@angular/platform-browser-dynamic`.
 *
 * ```
 * import {BROWSER_APP_PROVIDERS} from '@angular/platform-browser';
 * import {BROWSER_APP_COMPILER_PROVIDERS} from '@angular/platform-browser-dynamic';
 *
 * serverBootstrap(..., [BROWSER_APP_PROVIDERS, BROWSER_APP_COMPILER_PROVIDERS])
 * ```
 *
 * @deprecated create an {@link NgModule} and use {@link bootstrapModule} with the {@link
 * serverDynamicPlatform}()
 * instead.
 */
export function serverBootstrap(appComponentType, customProviders) {
    console.warn('serverBootstrap is deprecated. Create an @NgModule and use `bootstrapModule` with the `serverDynamicPlatform()` instead.');
    reflector.reflectionCapabilities = new ReflectionCapabilities();
    const deprecatedConfiguration = analyzeAppProvidersForDeprecatedConfiguration(customProviders);
    const declarations = [deprecatedConfiguration.moduleDeclarations.concat([appComponentType])];
    class DynamicModule {
    }
    /** @nocollapse */
    DynamicModule.decorators = [
        { type: NgModule, args: [{
                    providers: customProviders,
                    declarations: declarations,
                    imports: [BrowserModule],
                    bootstrap: [appComponentType]
                },] },
    ];
    return platformDynamicServer()
        .bootstrapModule(DynamicModule, deprecatedConfiguration.compilerOptions)
        .then((moduleRef) => {
        const console = moduleRef.injector.get(Console);
        deprecatedConfiguration.deprecationMessages.forEach((msg) => console.warn(msg));
        const appRef = moduleRef.injector.get(ApplicationRef);
        return appRef.components[0];
    });
}
//# sourceMappingURL=server.js.map