import {provideRouter, RouterConfig} from '@angular/router';

import {HelloComponent} from './hello/hello.component';
import {Bootstrap4Component} from './bootstrap4/bootstrap4.component';
import {HomeComponent} from './home/home.component';

const routes: RouterConfig = [
    {path: '', component: HomeComponent},
    {path: 'bootstrap4', component: Bootstrap4Component},
    {path: 'hello', component: HelloComponent}
];

export const appRouterProviders = [
    provideRouter(routes)
];