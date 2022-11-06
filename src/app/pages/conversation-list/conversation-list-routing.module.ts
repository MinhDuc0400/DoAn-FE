import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationListComponent } from './conversation-list.component';

const routes: Routes = [
  {
    path: ':conversationId',
    component: ConversationListComponent,
  },
  {
  path: '',
  component: ConversationListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationListRoutingModule {
}


