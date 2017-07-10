import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';


import { HomeComponent } from '../welcome/home/home.component';
import { AboutComponent } from '../welcome/about/about.component';
import { SignInComponent } from '../welcome/sign-in/sign-in.component';
import { SignUpComponent } from '../welcome/sign-up/sign-up.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';



export const WelcomeRoutingModule: Routes = [

  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
