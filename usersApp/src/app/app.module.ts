import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { WelcomeModule } from './welcome/welcome.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WelcomeRoutingModule } from './welcome/welcome-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, 
    DashboardModule,
    WelcomeModule,
    RouterModule.forRoot([ 

      { path: 'admin', component: DashboardComponent },//protected by a guard
      {
        path: 'welcome', component: WelcomeComponent,children: WelcomeRoutingModule
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }

    ]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
