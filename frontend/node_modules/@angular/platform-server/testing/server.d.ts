import { PlatformRef } from '@angular/core';
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare const platformServerTesting: (extraProviders?: any[]) => PlatformRef;
/**
 * @deprecated Use {@link platformServerTesting} instead
 */
export declare const serverTestingPlatform: (extraProviders?: any[]) => PlatformRef;
/**
 * NgModule for testing.
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare class ServerTestingModule {
}
/**
 * Providers of the `serverTestingPlatform` to be used for creating own platform based on this.
 *
 * @deprecated Use `platformServerTesting()` or create a custom platform factory via
 * `createPlatformFactory(platformServerTesting, ...)`
 */
export declare const TEST_SERVER_PLATFORM_PROVIDERS: Array<any>;
/**
 * @deprecated Use initTestEnvironment with ServerTestModule instead. This is empty for backwards
 * compatibility,
 * as all of our bootstrap methods add a module implicitly, i.e. keeping this filled would add the
 * providers 2x.
 */
export declare const TEST_SERVER_APPLICATION_PROVIDERS: Array<any>;
