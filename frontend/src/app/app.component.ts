import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'spring-boot-angular2',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['app.scss'],
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
    name = 'spring-boot-angular2';
}
