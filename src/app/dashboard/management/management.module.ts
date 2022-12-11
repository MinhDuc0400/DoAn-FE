import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ManagementDetailComponent } from './management-detail/management-detail.component';
import { NbDatepickerModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-chartjs';


@NgModule({
  declarations: [
    ManagementComponent,
    ManagementDetailComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    Ng2SmartTableModule,
    NbIconModule,
    ReactiveFormsModule,
    NbInputModule,
    NbDatepickerModule,
    ChartModule
  ]
})
export class ManagementModule { }
