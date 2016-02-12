import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {TestService} from './test.service';

@Component({
    selector: 'test',
    template: '<div>{{oauthUrl}}</div>',
    providers: [TestService],
    directives: [CORE_DIRECTIVES]
})

export class TestComponent {
    oauthUrl: string;

    constructor(private testService: TestService) {}

    ngOnInit() {
        this.testService.getTest()
            .map((res) => res.json())
            .subscribe((res) => {
                this.oauthUrl = res;
                console.log(this.oauthUrl);
            });
    }
}
