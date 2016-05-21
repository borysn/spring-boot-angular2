'use strict';

import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AlertComponent, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'bootstrap4',
    templateUrl: 'app/bootstrap4/bootstrap4.component.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES,
                AlertComponent, DATEPICKER_DIRECTIVES]
})
export class Bootstrap4Component {

    // date picker
    public dt:Date = new Date();
    private minDate:Date = null;
    private events:Array<any>;
    private tomorrow:Date;
    private afterTomorrow:Date;
    private formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
    private format = this.formats[0];
    private dateOptions:any = {
      formatYear: 'YY',
      startingDay: 1
    };

    private opened:boolean = false;

    public getDate():number {
      return this.dt && this.dt.getTime() || new Date().getTime();
    }
}
