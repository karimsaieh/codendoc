import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProjectService } from './../dashboard/services/project.service';

import { Project } from './../models/project';


@Injectable()
export class ProjectsListResolve implements Resolve<Project> {

  constructor(private projectService: ProjectService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.projectService.getProjects();
  }
}