import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../common/services/user.service';
import { Post } from '../../../common/interfaces/post';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../common/services/post.service';
import { PostStatusTypeEnum } from '../../../common/enum/postStatusType.enum';
import { AdminService } from '../../../common/services/admin.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'ngx-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  PostStatusTypeEnum = PostStatusTypeEnum;
  post: Post;
  private postId: string;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
  };
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private postService: PostService,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params.id;
    this.postService.getPostDetail(this.postId).subscribe(res => {
      res && (this.post = res);
    });
  }

  changeStatus(status: PostStatusTypeEnum) {
    this.adminService.changePostStatus(this.postId, status).subscribe(res => {
      res && (this.post = res);
    });
  }

}
