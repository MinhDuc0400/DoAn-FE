import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { PostManagementComponent } from './post-management/post-management.component';
import { AccountManagementComponent } from './account-management/account-management.component';



@NgModule({
  declarations: [AdminComponent, PostManagementComponent, AccountManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
})
export class AdminModule { }
