import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {TestComponent} from './test/test.component';

@Component({
    selector: 'spring-boot-angular2',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
        { path: '/', as: 'TestComponent', component: TestComponent, useAsDefault: true},
])
export class AppComponent {
}
