import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'prefix',
      },
      {
        path: 'feed',
        loadChildren: () => import('./feed/feed.module')
          .then(m => m.FeedModule),
      },
      {
        path: 'message',
        loadChildren: () => import('./message/message.module')
          .then(m => m.MessageModule),
      },
      {
        path: 'explore',
        loadChildren: () => import('./explore/explore.module')
          .then(m => m.ExploreModule),
      },
      {
        path: 'management',
        loadChildren: () => import('./management/management.module')
          .then(m => m.ManagementModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
