import { NgModule } from '@angular/core';
import { NbCardModule, NbChatModule, NbListModule, NbMenuModule, NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ConversationListComponent } from './conversation-list/conversation-list.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbChatModule,
  ],
  declarations: [
    PagesComponent,
    ConversationListComponent,
  ],
})
export class PagesModule {
}
