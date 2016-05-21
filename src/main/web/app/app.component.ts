'use strict';

import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, Routes} from '@angular/router';

import {HelloComponent} from './hello/hello.component';
import {Bootstrap4Component} from './bootstrap4/bootstrap4.component';
import {HomeComponent} from './home/home.component';

@Component({
    selector: 'spring-boot-angular2',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS]
})
@Routes([
    {path: '/', component: HomeComponent},
    {path: '/bootstrap4', component: Bootstrap4Component},
    {path: '/hello', component: HelloComponent}
])
export class AppComponent {

    constructor(private router:Router) {}

}
