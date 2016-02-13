import {Component, Inject} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {TestService} from './test.service';

@Component({
    selector: 'test',
    template: '<div><h3>JSON</h3><div>{{test}}</div></div>'+
              '<div><h3>message</h3><div>{{message}}</div></div>',
    providers: [TestService],
    directives: [CORE_DIRECTIVES]
})

export class TestComponent {

    private test: string;
    private message: string;

    constructor(@Inject(TestService) private testService: TestService) {}

    ngOnInit() {
        this.testService.getTest().subscribe(
            res => {this.test = JSON.stringify(res)},
            res => {this.message = res.message},
            () => console.log('../test/get/json returned: \n' + this.test)
        );
    }
}
