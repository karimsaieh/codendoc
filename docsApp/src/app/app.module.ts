import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { DocsModule } from "./docs/docs.module";

import { AppComponent } from './app.component';
import { DocsComponent } from './docs/docs/docs.component';
import { LandingPageComponent } from './docs/landing-page/landing-page.component';
import { PageComponent } from './docs/page/page.component';
import { NotFoundComponent } from "./shared/not-found/not-found.component";

import { PageResolve } from "./docs/resolvers/page-resolve"
import { ProjectResolve } from "./docs/resolvers/project-resolve";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DocsModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: 'docs/:projectName', component: DocsComponent, resolve:{
          project:ProjectResolve,
        }, children: [
          { path: 'page/:pageId', component: PageComponent, resolve:{
             page:PageResolve,
          } },
          { path: 'landingPage', component: LandingPageComponent },
          { path: '', redirectTo: 'landingPage', pathMatch: 'full' },
          { path: '**', component: NotFoundComponent }
        ]
      },
      { path: '**', component: NotFoundComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
