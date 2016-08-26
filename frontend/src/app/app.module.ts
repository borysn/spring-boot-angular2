import { NgModule, CUSTOM_ELEMENTS_SCHEMA, provide } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appRouterProviders } from './app.routes';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { Bootstrap4Component } from './bootstrap4/bootstrap4.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [AppComponent, HelloComponent, Bootstrap4Component, HomeComponent],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        HTTP_PROVIDERS,
        appRouterProviders,
        provide(APP_BASE_HREF, {useValue: '/'}),
        provide(LocationStrategy, {useClass: HashLocationStrategy})
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
