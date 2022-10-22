import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationListRoutingModule } from './conversation-list-routing.module';
import { ChatService } from '../extra-components/chat/chat.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConversationListRoutingModule,
  ],
  providers: [
    ChatService,
  ],
})
export class ConversationListModule { }
