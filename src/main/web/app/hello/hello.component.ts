import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelloService } from './hello.service';

interface MessageJson {
    title: string;
    message: string;
}

@Component({
    selector: 'test',
    templateUrl: 'app/hello/hello.component.html',
    styleUrls: ['css/hello.css'],
    providers: [HelloService]
})
export class HelloComponent implements OnInit, OnDestroy {

    // vars
    private jsonResponse: string;
    private messages: Array<MessageJson>;
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
