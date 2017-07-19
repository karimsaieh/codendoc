import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';


import { ProjectIndexComponent } from './project-index/project-index.component';

import { NotFoundComponent } from './../shared/not-found/not-found.component';

import { PagesListResolve } from './../reolvers/pages-list-resolve';


export const ProjectPanelRoutingModule: Routes = [

  {
    path: 'index', component: ProjectIndexComponent,
    resolve: {
      pagesList: PagesListResolve
    }
  },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

