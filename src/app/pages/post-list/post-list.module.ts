import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { PostListRoutingModule } from './post-list-routing.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { CreateEditPostComponent } from './create-edit-post/create-edit-post.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PostDetailComponent } from './post-detail/post-detail.component';



@NgModule({
  declarations: [
    PostListComponent,
    CreateEditPostComponent,
    PostDetailComponent,
  ],
  imports: [
    CommonModule,
    PostListRoutingModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbInputModule,
    NbButtonModule,

    ThemeModule,
    ReactiveFormsModule,
    NbSelectModule,
  ],
})
export class PostListModule { }
