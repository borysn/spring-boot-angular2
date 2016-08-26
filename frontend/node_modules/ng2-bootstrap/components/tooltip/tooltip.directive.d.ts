import { DynamicComponentLoader, ViewContainerRef } from '@angular/core';
export declare class TooltipDirective {
    content: string;
    htmlContent: string;
    placement: string;
    isOpen: boolean;
    enable: boolean;
    animation: boolean;
    appendToBody: boolean;
    popupClass: string;
    viewContainerRef: ViewContainerRef;
    loader: DynamicComponentLoader;
    private visible;
    private tooltip;
    constructor(viewContainerRef: ViewContainerRef, loader: DynamicComponentLoader);
    show(): void;
    hide(): void;
}
