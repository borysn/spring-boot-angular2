'use strict';

import {Component, Inject} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Response} from '@angular/http';
import {RouterLink} from '@angular/router-deprecated';
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
