import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import * as myGlobals from '../../shared/my-globals';

import { Project } from '../../models/project';


@Injectable()
export class ProjectService {

  constructor(private http: Http) {
  }

  create(project: Project): Observable<Object> {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(project);
    return this.http.post(myGlobals.url + "api/project", body, options)
      .map((res: Response) => res.json())
      .catch(this.handleJsonError);
  }
  private handleJsonError(error: Response) {
    return Observable.throw(error.json());
  }
  getProjects(): Observable<Project> {
    let headers = new Headers(
      {
        'Authorization': localStorage.getItem('token')
      });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(myGlobals.url + "api/project", options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.empty<Response>();
  }

}
