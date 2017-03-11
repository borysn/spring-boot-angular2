import { Component } from '@angular/core';

@Component({
    selector: 'calendar',
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.scss']
})
export class CalendarComponent {

    // date picker
    public date:Date = new Date();
    private _minDate:Date = null;
    private _events:Array<any>;
    private _tomorrow:Date;
    private _afterTomorrow:Date;
    private _formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
    private _format = this._formats[0];
    private _dateOptions:any = {
      formatYear: 'YY',
      startingDay: 1
    };

    private opened:boolean = false;

    public getDate():number {
      return this.date && this.date.getTime() || new Date().getTime();
    }
}
