import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AuthService } from './services/auth.service';

import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
     RouterModule
     ],
  declarations: [WelcomeComponent, HomeComponent, AboutComponent, SignInComponent, SignUpComponent],
  providers:[AuthService]
})
export class WelcomeModule { }
