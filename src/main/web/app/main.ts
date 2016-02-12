import {bootstrap}    from 'angular2/platform/browser';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Http, Response} from 'angular2/http';

import {AppComponent} from './app.component';
import {TestComponent} from './test.component';
import {TestService} from './test.service';

bootstrap(AppComponent);
bootstrap(TestComponent, [Http, Response, TestService, CORE_DIRECTIVES]);
