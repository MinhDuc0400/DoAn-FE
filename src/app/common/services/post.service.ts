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

  editPost(body: CreatePostRequest, postId: string) {
    return this.apiService.putAPI<CreatePostRequest>(this.url + environment.landlord + `/${postId}`, body);
  }

  getVerifiedPost() {
    return this.apiService.getAPI<Post[]>(this.url + environment.tenant);
  }

  getPostLandlord() {
    return this.apiService.getAPI<Post[]>(this.url + environment.landlord);
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

  deletePost(postId: string) {
    return this.apiService.deleteAPI(this.url + environment.landlord + `/${postId}`);
  }

  dislikePost(postId: string, userId: string) {
    return this.apiService.postAPI<Post, {postId, userId}>(this.url + environment.tenant + '/dislike', {
      postId,
      userId,
    });
  }

}
