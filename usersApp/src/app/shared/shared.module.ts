import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [NotFoundComponent, UnauthorizedComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  //exports notfoundcomponent to use it as a directiv e?
})
export class SharedModule { }
