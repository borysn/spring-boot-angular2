'use strict';

import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HelloService } from './hello.service';

interface MessageJson {
    title: string;
    message: string;
}

@Component({
    selector: 'test',
    templateUrl: 'hello.component.html',
    providers: [HelloService],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class HelloComponent {

    // vars
    private jsonResponse: string;
    private messages: Array<MessageJson>;
    private subscription;

    // constructor
    constructor(private helloService: HelloService) {}

    // on-init
    ngOnInit() {
        // save subscription
        this.subscription = this.helloService.getTest()
            .subscribe(
                (data) => {
                    this.jsonResponse = JSON.stringify(data);
                    this.messages = data;
                },
                (err) => console.log(err),
                () => console.log('hello service test complete')
        );
    }

    // on-destroy
    ngOnDestroy() {
        // unsubscribe
        this.subscription.unsubscribe();
    }
}
