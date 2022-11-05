import { Component, OnInit } from '@angular/core';
import { fruits } from '../layout/list/fruits-list';
import { ChatService } from '../extra-components/chat/chat.service';
import { WebSocketService } from '../../common/services/web-socket.service';

@Component({
  selector: 'ngx-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
})
export class ConversationListComponent implements OnInit {
  fruits = fruits;
  messages: any[];
  constructor(
    private chatService: ChatService,
    private socketService: WebSocketService,
  ) {
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
      this.socketService.connect();
    }
  }

  ngOnInit(): void {
    this.messages = this.chatService.loadMessages();
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
