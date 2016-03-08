'use strict';

import {Component, Inject} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Response} from 'angular2/http';
import {RouterLink} from 'angular2/router';
import {HelloService} from './hello.service';

@Component({
    selector: 'test',
    templateUrl: 'app/hello/hello.component.html',
    providers: [HelloService],
    directives: [CORE_DIRECTIVES, RouterLink]
})
export class HelloComponent {

    private jsonResponse: string;
    private message: string;

    constructor(@Inject(HelloService) private helloService: HelloService) {}

    ngOnInit() {
        this.helloService.getTest().subscribe(
            data => {this.jsonResponse = JSON.stringify(data),
                     this.message = data.test.message},
            () => console.log('../test/get/json returned: \n' + this.jsonResponse)
        );
    }
}
