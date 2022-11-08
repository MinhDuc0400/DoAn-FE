import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostManagementRoutingModule } from './post-management-routing.module';
import { PostManagementComponent } from './post-management.component';
import { NbButtonModule, NbCardModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PostDetailComponent } from './post-detail/post-detail.component';


@NgModule({
  declarations: [
    PostManagementComponent,
    PostDetailComponent,
  ],
  imports: [
    CommonModule,
    PostManagementRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbUserModule,
    NbButtonModule,

  ],
})
export class PostManagementModule { }
