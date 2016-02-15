import {bootstrap}    from 'angular2/platform/browser';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {bind, provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {AppComponent} from './app.component';

bootstrap(AppComponent,
    [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        bind(LocationStrategy).toClass(HashLocationStrategy),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent})
    ]);
