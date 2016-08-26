import { ComponentRef, PlatformRef } from '@angular/core';
import { ConcreteType } from './facade/lang';
export declare const INTERNAL_SERVER_PLATFORM_PROVIDERS: Array<any>;
/**
 * A set of providers to initialize the Angular platform in a server.
 *
 * Used automatically by `serverBootstrap`, or can be passed to `platform`.
 * @deprecated Use `platformServer()` or create a custom platform factory via
 * `createPlatformFactory(platformServer, ...)`
 */
export declare const SERVER_PLATFORM_PROVIDERS: Array<any>;
/**
 * @experimental
 */
export declare const platformServer: (extraProviders?: any[]) => PlatformRef;
/**
 * @deprecated Use {@link platformServer} instead
 */
export declare const serverPlatform: (extraProviders?: any[]) => PlatformRef;
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export declare const platformDynamicServer: (extraProviders?: any[]) => PlatformRef;
/**
 * @deprecated Use {@link platformDynamicServer} instead
 */
export declare const serverDynamicPlatform: (extraProviders?: any[]) => PlatformRef;
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
export declare function serverBootstrap<T>(appComponentType: ConcreteType<T>, customProviders: Array<any>): Promise<ComponentRef<T>>;
