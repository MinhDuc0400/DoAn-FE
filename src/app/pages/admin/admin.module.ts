import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { PostManagementComponent } from './post-management/post-management.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { NbButtonModule, NbCardModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [AdminComponent, PostManagementComponent, AccountManagementComponent, PostDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbUserModule,
    NbButtonModule,
    SwiperModule,
  ],
})
export class AdminModule { }
