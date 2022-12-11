import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { CreateEditFeedComponent } from './create-edit-feed/create-edit-feed.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule } from '@nebular/theme';

@NgModule({
  declarations: [
    FeedComponent,
    CreateEditFeedComponent,
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    ReactiveFormsModule,
    ThemeModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbSelectModule,
    NbLayoutModule,
  ],
})
export class FeedModule { }
