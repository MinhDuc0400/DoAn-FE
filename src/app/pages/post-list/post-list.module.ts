import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { PostListRoutingModule } from './post-list-routing.module';
import { NbButtonModule, NbCardModule, NbInputModule, NbListModule, NbUserModule } from '@nebular/theme';
import { CreateEditPostComponent } from './create-edit-post/create-edit-post.component';
import { ThemeModule } from '../../@theme/theme.module';



@NgModule({
  declarations: [
    PostListComponent,
    CreateEditPostComponent,
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
  ],
})
export class PostListModule { }
