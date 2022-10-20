import { NgModule } from '@angular/core';
import { SweetAlert } from './services/sweet-alert.service';
import { NbToastrModule } from '@nebular/theme';


@NgModule({
  declarations: [],
  providers: [
    SweetAlert,
  ],
  imports: [NbToastrModule]
})
export class CommonModule { }
