import {Component, Inject} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {TestService} from './test.service';

@Component({
    selector: 'test',
    template: '<div>{{test}}</div>',
    providers: [TestService],
    directives: [CORE_DIRECTIVES]
})

export class TestComponent {

    private test: string;

    constructor(@Inject(TestService) private testService: TestService) {}

    ngOnInit() {
        this.testService.getTest().subscribe(
            res => this.test = JSON.parse(res),
            () => console.log('get test returned: \n' + this.test)
        );
    }
}
