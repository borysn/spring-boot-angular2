import { ElementRef, Renderer } from '@angular/core';
export declare class ModalBackdropOptions {
    animate: boolean;
    constructor(options: ModalBackdropOptions);
}
export declare class ModalBackdropComponent {
    isAnimated: boolean;
    isShown: boolean;
    element: ElementRef;
    renderer: Renderer;
    private _isAnimated;
    private _isShown;
    constructor(options: ModalBackdropOptions, element: ElementRef, renderer: Renderer);
}
