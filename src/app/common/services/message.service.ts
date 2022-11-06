import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly url = environment.serverURL + environment.message;

  constructor(
    private apiService: ApiService,
  ) { }

  getHistoryConversation(conversationId: string) {
    return this.apiService.getAPI<Message[]>(`${this.url}?conversationId=${conversationId}`);
  }
}
