import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AveragePriceRoutingModule } from './average-price-routing.module';
import { AveragePriceComponent } from './average-price.component';
import { ChartModule } from 'angular2-chartjs';
import { NbSelectModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AveragePriceComponent
  ],
  imports: [
    CommonModule,
    AveragePriceRoutingModule,
    ChartModule,
    NbSelectModule,
    ReactiveFormsModule
  ]
})
export class AveragePriceModule { }
