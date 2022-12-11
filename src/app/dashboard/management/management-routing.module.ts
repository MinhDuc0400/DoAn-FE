import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { ManagementDetailComponent } from './management-detail/management-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
  },
  {
    path: ':id',
    component: ManagementDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
