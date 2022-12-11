import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbSelectModule } from '@nebular/theme';
import { ChartModule } from 'angular2-chartjs';
import { ExploreDetailComponent } from './explore-detail/explore-detail.component';


@NgModule({
  declarations: [
    ExploreComponent,
    ExploreDetailComponent,
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    ReactiveFormsModule,
    NbSelectModule,
    ChartModule,
  ],
})
export class ExploreModule { }
