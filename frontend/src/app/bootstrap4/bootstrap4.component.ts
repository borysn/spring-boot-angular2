'use strict';

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AlertComponent, DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'bootstrap4',
    templateUrl: 'bootstrap4.component.html',
    directives: [ROUTER_DIRECTIVES, AlertComponent, DATEPICKER_DIRECTIVES]
})
export class Bootstrap4Component {

    // date picker
    public date:Date = new Date();
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
      return this.date && this.date.getTime() || new Date().getTime();
    }
}
