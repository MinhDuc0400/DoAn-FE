import { Injectable } from '@angular/core';
import { PostStatusTypeEnum } from '../enum/postStatusType.enum';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { ChangePostStatusRequest, Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private url = environment.serverURL + environment.admin + environment.post;
  constructor(
    private apiService: ApiService,
  ) { }

  getPostListByStatus(status: PostStatusTypeEnum) {
    return this.apiService.getAPI<Post[]>(this.url);
  }

  changePostStatus(postId: string, status: PostStatusTypeEnum) {
    return this.apiService.postAPI<Post, ChangePostStatusRequest>(this.url + '/change-status', {postId, status});
  }
}
