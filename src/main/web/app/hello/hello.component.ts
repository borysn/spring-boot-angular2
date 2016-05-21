'use strict';

import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HelloService} from './hello.service';

@Component({
    selector: 'test',
    templateUrl: 'app/hello/hello.component.html',
    providers: [HelloService],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class HelloComponent {

    private jsonResponse: string;
    private message: string;

    constructor(private helloService: HelloService) {}

    ngOnInit() {
        this.helloService.getTest().subscribe(
            data => {this.jsonResponse = JSON.stringify(data),
                     this.message = data.test.message},
            () => console.log('../test/get/json returned: \n' + this.jsonResponse)
        );
    }
}
