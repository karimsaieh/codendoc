import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { JwtHelper } from 'angular2-jwt';



@Injectable()
export class WelcomeGuard implements CanActivate {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private router: Router) { }

    canActivate() {
        let token = localStorage.getItem('token')
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.router.navigate(['/dashboard']);
            return false;
        }
        return true;
    }
}