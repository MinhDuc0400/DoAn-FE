import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ManagementDetailComponent } from './management-detail/management-detail.component';
import { NbDatepickerModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-chartjs';
import { CreateEditFeedComponent } from './management-detail/edit-post-management/create-edit-feed.component';
import { ThemeModule } from '../../@theme/theme.module';
import { SwiperModule } from 'swiper/angular';
import { ShareModule } from '../../common/common.module';


@NgModule({
  declarations: [
    ManagementComponent,
    ManagementDetailComponent,
    CreateEditFeedComponent,
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    Ng2SmartTableModule,
    NbIconModule,
    ReactiveFormsModule,
    NbInputModule,
    NbDatepickerModule,
    ChartModule,
    NbSelectModule,
    ThemeModule,
    ShareModule,
    SwiperModule,
  ],
})
export class ManagementModule { }
