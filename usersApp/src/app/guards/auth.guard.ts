import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { JwtHelper } from 'angular2-jwt';



@Injectable()
export class AuthGuard implements CanActivate {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private router: Router) { }

    canActivate() {
        let token = localStorage.getItem('token')
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        }
        
        // not logged in so redirect to login page
        this.router.navigate(['/welcome']);
        return false;
    }
}