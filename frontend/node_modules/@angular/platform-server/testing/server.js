/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var compiler_1 = require('@angular/compiler');
var testing_1 = require('@angular/compiler/testing');
var core_1 = require('@angular/core');
var testing_2 = require('@angular/core/testing');
var testing_3 = require('@angular/platform-browser-dynamic/testing');
var core_private_1 = require('../core_private');
var server_1 = require('../src/server');
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
exports.platformServerTesting = core_1.createPlatformFactory(testing_1.platformCoreDynamicTesting, 'serverTesting', server_1.INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * @deprecated Use {@link platformServerTesting} instead
 */
exports.serverTestingPlatform = exports.platformServerTesting;
var ServerTestingModule = (function () {
    function ServerTestingModule() {
    }
    /** @nocollapse */
    ServerTestingModule.decorators = [
        { type: core_1.NgModule, args: [{ exports: [testing_3.BrowserDynamicTestingModule] },] },
    ];
    return ServerTestingModule;
}());
exports.ServerTestingModule = ServerTestingModule;
/**
 * Providers of the `serverTestingPlatform` to be used for creating own platform based on this.
 *
 * @deprecated Use `platformServerTesting()` or create a custom platform factory via
 * `createPlatformFactory(platformServerTesting, ...)`
 */
exports.TEST_SERVER_PLATFORM_PROVIDERS = 
// Note: This is not a real provider but a hack to still support the deprecated
// `setBaseTestProviders` method!
[function (appProviders) {
        var deprecatedConfiguration = compiler_1.analyzeAppProvidersForDeprecatedConfiguration(appProviders);
        var platformRef = core_1.createPlatformFactory(exports.platformServerTesting, 'serverTestingDeprecated', [{
                provide: core_1.COMPILER_OPTIONS,
                useValue: deprecatedConfiguration.compilerOptions,
                multi: true
            }])();
        var DynamicTestModule = (function () {
            function DynamicTestModule() {
            }
            /** @nocollapse */
            DynamicTestModule.decorators = [
                { type: core_1.NgModule, args: [{
                            exports: [ServerTestingModule],
                            declarations: [deprecatedConfiguration.moduleDeclarations]
                        },] },
            ];
            return DynamicTestModule;
        }());
        var testInjector = testing_2.TestBed.initTestEnvironment(DynamicTestModule, platformRef);
        var console = testInjector.get(core_private_1.Console);
        deprecatedConfiguration.deprecationMessages.forEach(function (msg) { return console.warn(msg); });
    }];
/**
 * @deprecated Use initTestEnvironment with ServerTestModule instead. This is empty for backwards
 * compatibility,
 * as all of our bootstrap methods add a module implicitly, i.e. keeping this filled would add the
 * providers 2x.
 */
exports.TEST_SERVER_APPLICATION_PROVIDERS = [];
//# sourceMappingURL=server.js.map