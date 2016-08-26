export declare class PositionService {
    /**
     * Provides read-only equivalent of jQuery's position function:
     * http://api.jquery.com/position/
     */
    position(nativeEl: HTMLElement): {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    /**
     * Provides read-only equivalent of jQuery's offset function:
     * http://api.jquery.com/offset/
     */
    offset(nativeEl: any): {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    /**
     * Provides coordinates for the targetEl in relation to hostEl
     */
    positionElements(hostEl: HTMLElement, targetEl: HTMLElement, positionStr: string, appendToBody: boolean): {
        top: number;
        left: number;
    };
    private window;
    private document;
    private getStyle(nativeEl, cssProp);
    /**
     * Checks if a given element is statically positioned
     * @param nativeEl - raw DOM element
     */
    private isStaticPositioned(nativeEl);
    /**
     * returns the closest, non-statically positioned parentOffset of a given
     * element
     * @param nativeEl
     */
    private parentOffsetEl(nativeEl);
}
export declare const positionService: PositionService;
