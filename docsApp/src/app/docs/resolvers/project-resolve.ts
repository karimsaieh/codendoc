import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProjectService } from '../services/project.service';



@Injectable()
export class ProjectResolve implements Resolve<any> {

    constructor(private projectService: ProjectService) { }

    resolve(route: ActivatedRouteSnapshot) {
       return this.projectService.getProjectByName(encodeURIComponent(route.params["projectName"]));
    }

}