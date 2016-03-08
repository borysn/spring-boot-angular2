'use strict';

import {Injectable, Inject} from 'angular2/core';
import {Http, Response} from 'angular2/http';

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
