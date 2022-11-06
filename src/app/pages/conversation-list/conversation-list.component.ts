import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../extra-components/chat/chat.service';
import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { ConversationService } from '../../common/services/conversation.service';
import { UserService } from '../../common/services/user.service';
import { Conversation } from '../../common/interfaces/conversation';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../common/services/message.service';
import { URL_CONVERSATION } from '../../common/constants/url.constant';
import { Message, MessageEmit } from '../../common/interfaces/message';
@Component({
  selector: 'ngx-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
})
export class ConversationListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private socket;

  conversationList: Conversation[] = [];
  conversationId: string;
  constructor(
    private chatService: ChatService,
    private conversationService: ConversationService,
    private messageService: MessageService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.handleSocket();

    this.conversationId = this.route.snapshot.params.conversationId;
    this.conversationService.getConversationList(this.userService.currentUser.getValue()?._id)
      .subscribe(list => {
        this.conversationList = list.map(conv => {
          conv.users = conv.users.filter(user => user._id !== this.userService.currentUser.getValue()._id);
          return conv;
        });

        if (!this.conversationId) {
          this.conversationId = this.conversationList[0]._id;
          this.openConversation(this.conversationId);
        } else {
          this.getHistory(this.conversationId);

        }
      });
  }

  openConversation(conversationId: string) {
    this.conversationId = conversationId;
    this.router.navigate([URL_CONVERSATION + `/${conversationId}`]);
    this.getHistory(conversationId);
  }

  getHistory(conversationId: string) {
    this.messageService.getHistoryConversation(conversationId).subscribe(res => {
      this.messages = res;
    });
  }

  handleSocket() {
    const idToken = localStorage.getItem('idToken');
    this.socket = io(`${environment.socketURL}?token=${idToken}`, {
      auth: {
        query: idToken,
      },
      transports: ['websocket'],
      upgrade: false,
    }).connect();
    this.socket.on('message-received', data => {
      if (data.userId === this.userService.currentUser.getValue()._id || data.conversationId !== this.conversationId) {
        return;
      }
      const message = {
        message: data.message,
        reply: false,
        type: 'text',
        // file: files,
        user: data.user,
        userId: data.userId,
        conversationId: this.conversationId,
      };
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  sendMessage(event: MessageEmit) {
    // const files = !event.files ? [] : event.files.map((file) => {
    //   return {
    //     url: file.src,
    //     type: file.type,
    //     icon: 'nb-compose',
    //   };
    // });

    const user = this.userService.currentUser.getValue();

    const message = {
      message: event.message,
      reply: true,
      type: 'text',
      // file: files,
      user,
      userId: user._id,
      conversationId: this.conversationId,
    };

    this.messages.push(message);

    this.socket.emit('new-message', {
      conversationId: message.conversationId,
      message: message.message,
      userId: message.userId,
    });
  }

}
