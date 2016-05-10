'use strict';

import {Component} from '@angular/core';
import {RouterLink, RouteParams} from '@angular/router-deprecated';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html',
    directives: [RouterLink]
})
export class HomeComponent {
    constructor(private routeParams: RouteParams) {}
}
