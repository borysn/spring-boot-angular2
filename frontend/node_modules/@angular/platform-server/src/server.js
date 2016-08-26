/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common_1 = require('@angular/common');
var compiler_1 = require('@angular/compiler');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var core_private_1 = require('../core_private');
var parse5_adapter_1 = require('./parse5_adapter');
function notSupported(feature) {
    throw new Error("platform-server does not support '" + feature + "'.");
}
var ServerPlatformLocation = (function (_super) {
    __extends(ServerPlatformLocation, _super);
    function ServerPlatformLocation() {
        _super.apply(this, arguments);
    }
    ServerPlatformLocation.prototype.getBaseHrefFromDOM = function () { throw notSupported('getBaseHrefFromDOM'); };
    ;
    ServerPlatformLocation.prototype.onPopState = function (fn) { notSupported('onPopState'); };
    ;
    ServerPlatformLocation.prototype.onHashChange = function (fn) { notSupported('onHashChange'); };
    ;
    Object.defineProperty(ServerPlatformLocation.prototype, "pathname", {
        get: function () { throw notSupported('pathname'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerPlatformLocation.prototype, "search", {
        get: function () { throw notSupported('search'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerPlatformLocation.prototype, "hash", {
        get: function () { throw notSupported('hash'); },
        enumerable: true,
        configurable: true
    });
    ServerPlatformLocation.prototype.replaceState = function (state, title, url) { notSupported('replaceState'); };
    ;
    ServerPlatformLocation.prototype.pushState = function (state, title, url) { notSupported('pushState'); };
    ;
    ServerPlatformLocation.prototype.forward = function () { notSupported('forward'); };
    ;
    ServerPlatformLocation.prototype.back = function () { notSupported('back'); };
    ;
    return ServerPlatformLocation;
}(common_1.PlatformLocation));
exports.INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: core_1.PLATFORM_INITIALIZER, useValue: initParse5Adapter, multi: true },
    { provide: common_1.PlatformLocation, useClass: ServerPlatformLocation },
];
/**
 * A set of providers to initialize the Angular platform in a server.
 *
 * Used automatically by `serverBootstrap`, or can be passed to `platform`.
 * @deprecated Use `platformServer()` or create a custom platform factory via
 * `createPlatformFactory(platformServer, ...)`
 */
exports.SERVER_PLATFORM_PROVIDERS = [core_1.PLATFORM_COMMON_PROVIDERS, exports.INTERNAL_SERVER_PLATFORM_PROVIDERS];
function initParse5Adapter() {
    parse5_adapter_1.Parse5DomAdapter.makeCurrent();
    core_private_1.wtfInit();
}
/**
 * @experimental
 */
exports.platformServer = core_1.createPlatformFactory(core_1.platformCore, 'server', exports.INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * @deprecated Use {@link platformServer} instead
 */
exports.serverPlatform = exports.platformServer;
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
exports.platformDynamicServer = core_1.createPlatformFactory(compiler_1.platformCoreDynamic, 'serverDynamic', exports.INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * @deprecated Use {@link platformDynamicServer} instead
 */
exports.serverDynamicPlatform = exports.platformDynamicServer;
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
function serverBootstrap(appComponentType, customProviders) {
    console.warn('serverBootstrap is deprecated. Create an @NgModule and use `bootstrapModule` with the `serverDynamicPlatform()` instead.');
    core_private_1.reflector.reflectionCapabilities = new core_private_1.ReflectionCapabilities();
    var deprecatedConfiguration = compiler_1.analyzeAppProvidersForDeprecatedConfiguration(customProviders);
    var declarations = [deprecatedConfiguration.moduleDeclarations.concat([appComponentType])];
    var DynamicModule = (function () {
        function DynamicModule() {
        }
        /** @nocollapse */
        DynamicModule.decorators = [
            { type: core_1.NgModule, args: [{
                        providers: customProviders,
                        declarations: declarations,
                        imports: [platform_browser_1.BrowserModule],
                        bootstrap: [appComponentType]
                    },] },
        ];
        return DynamicModule;
    }());
    return exports.platformDynamicServer()
        .bootstrapModule(DynamicModule, deprecatedConfiguration.compilerOptions)
        .then(function (moduleRef) {
        var console = moduleRef.injector.get(core_private_1.Console);
        deprecatedConfiguration.deprecationMessages.forEach(function (msg) { return console.warn(msg); });
        var appRef = moduleRef.injector.get(core_1.ApplicationRef);
        return appRef.components[0];
    });
}
exports.serverBootstrap = serverBootstrap;
//# sourceMappingURL=server.js.map