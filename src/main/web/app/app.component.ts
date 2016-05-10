'use strict';

import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {HelloComponent} from './hello/hello.component';
import {HomeComponent} from './home/home.component';

@Component({
    selector: 'spring-boot-angular2',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
        {path: '/home', name: 'HomePage', component: HomeComponent},
        {path: '/hello', name: 'HelloPage', component: HelloComponent},
        {path: '/**', redirectTo: ['HomePage']}
])
export class AppComponent {
}
