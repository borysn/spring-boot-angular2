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
    styleUrls: ['hello.scss'],
    providers: [HelloService],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class HelloComponent {

    // vars
    public jsonResponse: string;
    public messages: Array<MessageJson>;
    private _subscription;

    // constructor
    constructor(private _helloService: HelloService) {}

    // on-init
    ngOnInit() {
        // save _subscription
        this._subscription = this._helloService.getTest()
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
        this._subscription.unsubscribe();
    }
}
