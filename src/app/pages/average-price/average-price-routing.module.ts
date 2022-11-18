import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AveragePriceComponent } from './average-price.component';

const routes: Routes = [
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
