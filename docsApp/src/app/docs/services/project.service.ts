import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as myGlobals from '../../shared/my-globals';

@Injectable()
export class ProjectService {

  constructor(private http: Http) {
  }

    getProjectByName(projectName): Observable<any> {
    let headers = new Headers(
      {
        'Authorization': localStorage.getItem('token')
      });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(myGlobals.url + "docs/project/" + projectName, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    return Observable.empty<Response>();
  }


}
