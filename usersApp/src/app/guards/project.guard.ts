import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ProjectService } from '../dashboard/services/project.service';
import { ProjectSharedService } from '../shared/services/project-shared.service';




@Injectable()
export class ProjectGuard implements CanActivate {

    constructor(private router: Router,
        private projectService: ProjectService,
    private projectSharedService:ProjectSharedService) { }

    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<boolean> | boolean {
        return this.projectService.getProjectById(activatedRouteSnapshot.params['id']).map(
            response => {
                if (response){
                    this.projectSharedService.project=response;
                    return true;
                }
                    
            }).catch(error => {
                this.router.navigate(['/dashboard']);
                return Observable.of(false);
            });
    }
}