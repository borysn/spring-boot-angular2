'use strict';

import {Injectable, Inject} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HelloService {

    constructor(@Inject(Http) private http: Http) {}

    getTest() {
        return this.http.get('/test/get/json')
            .map((res:Response) => res.json());
    }
}
