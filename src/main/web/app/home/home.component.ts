'use strict';

import {Component} from 'angular2/core';
import {RouterLink, RouteParams} from 'angular2/router';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html',
    directives: [RouterLink]
})
export class HomeComponent {
    constructor(private routeParams: RouteParams) {}
}
