import { Compiler, NgModuleFactory, NgModuleFactoryLoader } from '@angular/core';
/**
 * A spy for {@link NgModuleFactoryLoader} that allows tests to simulate the loading of ng module
 * factories.
 *
 * @experimental
 */
export declare class SpyNgModuleFactoryLoader implements NgModuleFactoryLoader {
    private compiler;
    stubbedModules: {
        [path: string]: any;
    };
    constructor(compiler: Compiler);
    load(path: string): Promise<NgModuleFactory<any>>;
}
/**
 * A module setting up the router that should be used for testing.
 * It provides spy implementations of Location, LocationStrategy, and NgModuleFactoryLoader.
 *
 * # Example:
 *
 * ```
 * beforeEach(() => {
 *   configureModule({
 *     modules: [RouterTestingModule],
 *     providers: [provideRoutes(
 *         [{path: '', component: BlankCmp}, {path: 'simple', component: SimpleCmp}])]
 *   });
 * });
 * ```
 *
 * @experimental
 */
export declare class RouterTestingModule {
}
