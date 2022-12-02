import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AveragePriceRoutingModule } from './average-price-routing.module';
import { AveragePriceComponent } from './average-price.component';
import { ChartModule } from 'angular2-chartjs';
import { NbSelectModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { AveragePriceDetailComponent } from './average-price-detail/average-price-detail.component';


@NgModule({
  declarations: [
    AveragePriceComponent,
    AveragePriceDetailComponent,
  ],
  imports: [
    CommonModule,
    AveragePriceRoutingModule,
    ChartModule,
    NbSelectModule,
    ReactiveFormsModule,
  ],
})
export class AveragePriceModule { }
