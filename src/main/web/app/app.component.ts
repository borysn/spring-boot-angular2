import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {TestComponent} from './test/test.component';
import {HomeComponent} from './home/home.component';

@Component({
    selector: 'spring-boot-angular2',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
        {path: '/home', name: 'Home', component: HomeComponent},
        {path: '/test', name: 'Test', component: TestComponent},
        {path: '/**', redirectTo: ['Home']}
])
export class AppComponent {
}