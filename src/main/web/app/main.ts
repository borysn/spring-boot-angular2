'use strict';

import {provide} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser';
import {ROUTER_PROVIDERS,
        LocationStrategy,
        HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {AppComponent} from './app.component';

bootstrap(AppComponent, [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy})
    ]).catch(err => console.error(err));
