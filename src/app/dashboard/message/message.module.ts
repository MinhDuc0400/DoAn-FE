import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message.component';
import { NbInputModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MessageComponent,
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    NbInputModule,
    ReactiveFormsModule,
  ],
})
export class MessageModule { }
