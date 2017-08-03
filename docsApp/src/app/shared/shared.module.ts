import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [NotFoundComponent]
})
export class SharedModule { }
