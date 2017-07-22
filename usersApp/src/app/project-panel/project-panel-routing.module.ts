import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';


import { ProjectIndexComponent } from './project-index/project-index.component';
import { ProjectConfigComponent } from './project-config/project-config.component';
import { PageEditorComponent } from './page-editor/page-editor.component';
import { EmptyEditorComponent } from './empty-editor/empty-editor.component';


import { NotFoundComponent } from './../shared/not-found/not-found.component';

import { PagesListResolve } from './../reolvers/pages-list-resolve';


export const ProjectPanelRoutingModule: Routes = [

  {
    path: 'docs', component: ProjectIndexComponent,
    resolve: {
      pagesList: PagesListResolve
    },
    children: [
      { path: 'page/:pageId', component: PageEditorComponent },
      { path: 'emptyEditor', component: EmptyEditorComponent },
      { path: '', redirectTo: 'emptyEditor', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ],

  },
  {
    path: 'config', component: ProjectConfigComponent,
  },
  { path: '', redirectTo: 'docs', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

