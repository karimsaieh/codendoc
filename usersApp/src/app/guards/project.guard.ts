import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ProjectService } from '../dashboard/services/project.service';




@Injectable()
export class ProjectGuard implements CanActivate {

    constructor(private router: Router,
        private projectService: ProjectService) { }

    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<boolean> | boolean {
        return this.projectService.getProjectById(activatedRouteSnapshot.params['id']).map(
            response => {
                if (response)
                    return true;
            }).catch(error => {
                this.router.navigate(['/dashboard']);
                return Observable.of(false);
            });
    }
}