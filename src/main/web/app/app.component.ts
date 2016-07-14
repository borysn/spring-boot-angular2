'use strict';

import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {HelloComponent} from './hello/hello.component';
import {Bootstrap4Component} from './bootstrap4/bootstrap4.component';
import {HomeComponent} from './home/home.component';

@Component({
    selector: 'spring-boot-angular2',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS],
    precompile: [HomeComponent, HelloComponent, Bootstrap4Component]
})
export class AppComponent {}