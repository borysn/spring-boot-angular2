import {bootstrap}    from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {CORE_DIRECTIVES} from 'angular2/common';

import {AppComponent} from './app.component';
import {TestComponent} from './test/test.component';
import {TestService} from './test/test.service';

bootstrap(AppComponent);
bootstrap(TestComponent, [TestService, HTTP_PROVIDERS, CORE_DIRECTIVES]);
