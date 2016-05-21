'use strict';

import {Component} from '@angular/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class HomeComponent {
    constructor() {}
}
