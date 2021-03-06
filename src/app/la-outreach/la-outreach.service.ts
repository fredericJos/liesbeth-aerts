import { Injectable } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LaOutreachService {
  url: string;

  constructor(private http: Http) {
    this.url = 'http://localhost:8888/api/outreach.php';
  }

  getItems(): Observable<any> {
    return this.http.get(`${this.url}/outreach`)
                    .map((response: Response) => {
                      return JSON.parse(response.text()).data;
                    })
                    .catch(this.handleError);
  }

  handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
