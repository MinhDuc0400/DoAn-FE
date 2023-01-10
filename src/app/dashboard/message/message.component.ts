import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../../common/interfaces/message';
import { Conversation } from '../../common/interfaces/conversation';
import { ConversationService } from '../../common/services/conversation.service';
import { MessageService } from '../../common/services/message.service';
import { UserService } from '../../common/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { User } from '../../common/interfaces/post';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private socket;
  conversationList: Conversation[] = [];
  conversationId: string;
  selectedUser: User;

  messageForm: FormControl;
  constructor(
    private conversationService: ConversationService,
    private messageService: MessageService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.messageForm = new FormControl('', Validators.required);
    this.handleSocket();
    this.route.paramMap.subscribe(param => {
      if (param && param.get('id')) {
        this.conversationId = param.get('id');
        this.userService.currentUser.subscribe(res => {
          if (res) {
            this.conversationService.getConversationList(res._id)
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
        });
      } else {
        this.userService.currentUser.subscribe(res => {
          if (res) {
            this.conversationService.getConversationList(res._id)
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
        });
      }
    });

  }

  openConversation(conversationId: string) {
    this.conversationId = conversationId;
    this.selectedUser = this.conversationList
      .find(el => el._id === conversationId)?.users[0];
    this.router.navigate(['/dashboard/message' + `/${conversationId}`]);
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
      const message = {
        message: data.message,
        reply: false,
        type: 'text',
        // file: files,
        user: data.user,
        userId: data.userId,
        conversationId: this.conversationId,
      };
      this.sortConversationList(data.conversationId);
      data.conversationId === this.conversationId && this.messages.push(message);
    });
  }

  sortConversationList(conversationId) {
    const index = this.conversationList.findIndex(el => el._id === conversationId);
    this.conversationList[index] = {
      ...this.conversationList[index],
      updatedAt: new Date().toISOString(),
    };
    console.log(this.conversationList)
    this.conversationList = this.conversationList.sort((a, b) => {
      return new Date(b.updatedAt).getDate() - new Date(a.updatedAt).getDate();
    });
    console.log(this.conversationList)

  }

  sendMessage() {
    const user = this.userService.currentUser.getValue();

    const message = {
      message: this.messageForm.value,
      reply: true,
      type: 'text',
      user,
      userId: user._id,
      conversationId: this.conversationId,
    };
    this.socket.emit('new-message', {
      conversationId: message.conversationId,
      message: message.message,
      userId: message.userId,
    });
    this.messageForm.reset('');
  }



  ngOnDestroy() {
    this.socket.disconnect();
  }

}
