import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'spring-boot-angular2',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['css/app.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    name = 'spring-boot-angular2';
}
