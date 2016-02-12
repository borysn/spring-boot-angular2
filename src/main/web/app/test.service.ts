import {Injectable,Inject} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TestService {

    constructor(@Inject(Http) private http: Http) {}

    getTest() {
        return this.http.get('http://localhost:8080/test/get/json')
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
