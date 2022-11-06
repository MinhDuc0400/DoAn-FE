import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../extra-components/chat/chat.service';
import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { ConversationService } from '../../common/services/conversation.service';
import { UserService } from '../../common/services/user.service';
import { Conversation } from '../../common/interfaces/conversation';
@Component({
  selector: 'ngx-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
})
export class ConversationListComponent implements OnInit, OnDestroy {
  messages: any[];
  private socket;

  conversationList: Conversation[] = [];
  constructor(
    private chatService: ChatService,
    private conversationService: ConversationService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.conversationService.getConversationList(this.userService.currentUser.getValue()?._id)
      .subscribe(list => {
        this.conversationList = list;
      });

    const idToken = localStorage.getItem('idToken');
    this.socket = io(`${environment.socketURL}?token=${idToken}`, {
      auth: {
        query: idToken,
      },
      transports: ['websocket'],
      upgrade: false,
    }).connect();

    this.messages = this.chatService.loadMessages();
    this.socket.on('connect', () => {});

    this.socket.on('new-message', data => {});

    this.socket.on('message-received', data => {});

  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'nb-compose',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Duc Nguyen',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
    // const botReply = this.chatService.reply(event.message);
    // if (botReply) {
    //   setTimeout(() => { this.messages.push(botReply); }, 500);
    // }
  }

}
