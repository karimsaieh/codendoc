import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import {MdTooltipModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ProjectSharedService} from './services/project-shared.service';
import { UserService } from "./services/user.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [NotFoundComponent, UnauthorizedComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdMenuModule,
    MdTooltipModule,
    BrowserAnimationsModule

  ],
  providers:[ProjectSharedService,UserService],
  //exports notfoundcomponent to use it as a directiv e?
})
export class SharedModule { }
