import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { CreatePostRequest, CreatePostResponse, Post } from '../interfaces/post';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly url = environment.serverURL + environment.post;
  constructor(
    private apiService: ApiService,
  ) {}

  createPost(body: CreatePostRequest) {
    return this.apiService.postAPI<CreatePostResponse, CreatePostRequest>(this.url + environment.landlord, body);
  }

  getVerifiedPost() {
    return this.apiService.getAPI<Post[]>(this.url + environment.tenant);
  }

  getAllPosts() {
    return this.apiService.getAPI<Post[]>(this.url + environment.landlord + '/all');
  }

  getPostDetail(id: string) {
    return this.apiService.getAPI<Post>(this.url + environment.common + `/${id}`);
  }

  likePost(postId: string, userId: string) {
    return this.apiService.postAPI<Post, {postId, userId}>(this.url + environment.tenant + '/like', {
      postId,
      userId,
    });
  }

  dislikePost(postId: string, userId: string) {
    return this.apiService.postAPI<Post, {postId, userId}>(this.url + environment.tenant + '/dislike', {
      postId,
      userId,
    });
  }

}
