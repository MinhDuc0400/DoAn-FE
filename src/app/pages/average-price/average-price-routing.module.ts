import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AveragePriceComponent } from './average-price.component';
import { AveragePriceDetailComponent } from './average-price-detail/average-price-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: AveragePriceDetailComponent,
  },
  {
    path: '',
    component: AveragePriceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AveragePriceRoutingModule { }
