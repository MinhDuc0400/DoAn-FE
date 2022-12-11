import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore.component';
import { ExploreDetailComponent } from './explore-detail/explore-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: ExploreDetailComponent,
  },
  {
    path: '',
    component: ExploreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreRoutingModule { }
