import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { CreatePostRequest, CreatePostResponse, Post, PostVoteChartItem } from '../interfaces/post';

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

  getVoteByPostIdFromTo(postId: string, from: string, to: string) {
    return this.apiService.getAPINoPluck<PostVoteChartItem[]>(
      environment.serverURL + environment.vote + `?postId=${postId}&startDate=${from}&endDate=${to}`);
  }

  editPost(body: CreatePostRequest, postId: string) {
    return this.apiService.putAPI<CreatePostRequest>(this.url + environment.landlord + `/${postId}`, body);
  }

  getVerifiedPost(startPrice?: number, endPrice?: number, provinceId?: string, districtId?: string) {
    return this.apiService.getAPI<Post[]>(
      this.url +
      environment.tenant +
      '?startPrice=' + (startPrice || '') +
      '&endPrice=' + (endPrice || '') +
      '&provinceId=' + (provinceId || '') +
      '&districtId=' + (districtId || ''));
  }

  getPostLandlord() {
    return this.apiService.getAPI<Post[]>(this.url + environment.landlord);
  }

  getAllPosts() {
    return this.apiService.getAPI<Post[]>(this.url + environment.landlord + '/all');
  }

  getVerifiedPosts() {
    return this.apiService.getAPI<Post[]>(this.url + environment.tenant);
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

  getAveragePriceInProvince(provinceId: string) {
    return this.apiService.getAPI(this.url + environment.common + `/price-by-location?provinceId=${provinceId}`);
  }

  getPostPriceRangeByDistrictId(districtId: string) {
    return this.apiService.getAPI(this.url + environment.common + `/price-range?districtId=${districtId}`);
  }

}
