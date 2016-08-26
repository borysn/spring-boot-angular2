import { OnInit, OnDestroy, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
export declare class DropdownDirective implements OnInit, OnDestroy {
    isOpen: boolean;
    autoClose: string;
    keyboardNav: boolean;
    appendToBody: boolean;
    onToggle: EventEmitter<boolean>;
    isOpenChange: EventEmitter<boolean>;
    addClass: boolean;
    selectedOption: number;
    menuEl: ElementRef;
    toggleEl: ElementRef;
    el: ElementRef;
    private _isOpen;
    private _changeDetector;
    constructor(el: ElementRef, ref: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    dropDownMenu: {
        el: ElementRef;
    };
    dropDownToggle: {
        el: ElementRef;
    };
    toggle(open?: boolean): boolean;
    focusDropdownEntry(keyCode: number): void;
    focusToggleElement(): void;
}
