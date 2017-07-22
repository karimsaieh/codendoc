import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,ActivatedRouteSnapshot } from '@angular/router';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { WelcomeModule } from './welcome/welcome.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProjectPanelModule } from './project-panel/project-panel.module';

import { WelcomeRoutingModule } from './welcome/welcome-routing.module';
import { ProjectPanelRoutingModule } from './project-panel/project-panel-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProjectPanelComponent } from './project-panel/project-panel/project-panel.component';

import { AuthGuard } from './guards/auth.guard';
import { WelcomeGuard } from './guards/welcome.guard';
import { ProjectGuard } from './guards/project.guard';


import { ProjectsListResolve } from './reolvers/projects-list-resolve';
import { PagesListResolve } from './reolvers/pages-list-resolve';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    ProjectPanelModule,
    HttpModule,
    BrowserAnimationsModule,
    WelcomeModule,
    RouterModule.forRoot([

      {
        path: 'dashboard', component: DashboardComponent,
        canActivate: [AuthGuard],
        resolve: {
          projectList: ProjectsListResolve
        }
      },
      {
        path: 'project/:id', component: ProjectPanelComponent,
        children: ProjectPanelRoutingModule,
        canActivate: [AuthGuard,ProjectGuard],
      },
      {
        path: 'welcome', component: WelcomeComponent,
        canActivate: [WelcomeGuard], children: WelcomeRoutingModule
      },

      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }

    ]),

  ],
  providers: [AuthGuard, WelcomeGuard, ProjectsListResolve,ProjectGuard,PagesListResolve],
  bootstrap: [AppComponent]
})
export class AppModule { }
