import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostManagementRoutingModule } from './post-management-routing.module';
import { PostManagementComponent } from './post-management.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-chartjs';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    PostManagementComponent,
    PostDetailComponent,
  ],
  imports: [
    CommonModule,
    PostManagementRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbUserModule,
    NbButtonModule,
    NbDatepickerModule,
    ThemeModule,
    NbInputModule,
    NbSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ChartModule,
    QRCodeModule,
  ],
})
export class PostManagementModule { }
