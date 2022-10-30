import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PostManagementComponent } from './post-management/post-management.component';
import { AccountManagementComponent } from './account-management/account-management.component';


const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'post-management',
      component: PostManagementComponent,
    },
    {
      path: 'account-management',
      component: AccountManagementComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
