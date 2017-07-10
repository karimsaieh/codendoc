import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [NotFoundComponent],
    exports : [
    CommonModule,
    FormsModule,
  ],
//exports notfoundcomponent to use it as a directiv e?
})
export class SharedModule { }
