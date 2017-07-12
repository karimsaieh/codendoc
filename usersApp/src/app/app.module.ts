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

import { AuthGuard } from './guards/auth.guard';
import { WelcomeGuard } from './guards/welcome.guard';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, 
    DashboardModule,
    HttpModule,
    WelcomeModule,
    RouterModule.forRoot([ 

      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

      //guard sur le project using the magic express middleware && angular guard


      {
        path: 'welcome', component: WelcomeComponent,
        canActivate:[WelcomeGuard], children: WelcomeRoutingModule
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }

    ]),

  ],
  providers: [AuthGuard,WelcomeGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
