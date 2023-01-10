import { NgModule } from '@angular/core';
import { ReadMoreComponent } from '../dashboard/read-more/read-more.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [ReadMoreComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ReadMoreComponent,
  ],
})
export class ShareModule { }
