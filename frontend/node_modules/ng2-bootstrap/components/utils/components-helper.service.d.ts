import { ApplicationRef, ViewContainerRef, ComponentRef, ComponentResolver, Type, Injector } from '@angular/core';
/**
 * Components helper class to easily work with
 * allows to:
 * - get application root view container ref
 */
export declare class ComponentsHelper {
    private applicationRef;
    private componentResolver;
    private injector;
    constructor(applicationRef: ApplicationRef, componentResolver: ComponentResolver, injector: Injector);
    getDocument(): any;
    /**
     * This is a name conventional class to get application root view component ref
     * to made this method working you need to add:
     * ```typescript
     *  @Component({
     *   selector: 'my-app',
     *   ...
     *   })
     *  export class MyApp {
     *    constructor(viewContainerRef: ViewContainerRef) {
     *        // A Default view container ref, usually the app root container ref.
     *        // Has to be set manually until we can find a way to get it automatically.
     *        this.viewContainerRef = viewContainerRef;
     *      }
     *  }
     * ```
     * @returns {ViewContainerRef} - application root view component ref
     */
    getRootViewContainerRef(): ViewContainerRef;
    /**
     * Helper methods to add ComponentClass(like modal backdrop) with options
     * of type ComponentOptionsClass to element next to application root
     * or next to provided instance of view container
     * @param ComponentClass - @Component class
     * @param ComponentOptionsClass - options class
     * @param options - instance of options
     * @param _viewContainerRef - optional instance of ViewContainerRef
     * @returns {Promise<ComponentRef<T>>} - returns a promise with ComponentRef<T>
     */
    appendNextToRoot<T extends Type, N>(ComponentClass: T, ComponentOptionsClass: N, options: any, _viewContainerRef?: ViewContainerRef): Promise<ComponentRef<any>>;
}
