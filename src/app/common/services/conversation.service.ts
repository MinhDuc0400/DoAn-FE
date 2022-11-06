import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { Conversation } from '../interfaces/conversation';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private readonly url = environment.serverURL + environment.conversation;

  constructor(
    private apiService: ApiService,
  ) { }

  createConversation(postId: string, title: string, description: string) {
    return this.apiService.postAPI(this.url, {
      postId,
      title,
      description,
    });
  }

  getConversationList(userId: string) {
    return this.apiService.getAPI<Conversation[]>(this.url + '/list-by-user?userId=' + userId);
  }
}
