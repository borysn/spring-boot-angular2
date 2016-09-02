import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing, appRouterProviders } from './app.routing';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [AppComponent,
                   HelloComponent,
                   CalendarComponent,
                   HomeComponent],
    imports: [BrowserModule,
              FormsModule,
              ReactiveFormsModule,
              HttpModule,
              AlertModule,
              DatepickerModule,
              routing],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        appRouterProviders,
        [{provide: APP_BASE_HREF, useValue: '/'}],
        [{provide: LocationStrategy, useClass: HashLocationStrategy}]
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
