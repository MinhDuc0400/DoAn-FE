import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../common/services/user.service';
import { Post } from '../../../common/interfaces/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../common/services/post.service';
import { PostStatusTypeEnum } from '../../../common/enum/postStatusType.enum';
import { URL_POST_MANAGEMENT } from '../../../common/constants/url.constant';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { CreateEditPostComponent } from '../../post-list/create-edit-post/create-edit-post.component';

@Component({
  selector: 'ngx-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  PostStatusTypeEnum = PostStatusTypeEnum;
  post: Post;
  private postId: string;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private toastService: NbToastrService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params.id;
    this.postService.getPostDetail(this.postId).subscribe(res => {
      res && (this.post = res);
    });
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe(res => {
      this.toastService.success( `Delete ${postId} successfully`, 'SUCCESS');
      this.router.navigate([URL_POST_MANAGEMENT]);
    });
  }

  open(post: Post) {
    this.dialogService.open(CreateEditPostComponent, {
      context: {
        title: 'Edit Post',
        post: post,
      },
    }).onClose.subscribe(() => {
      this.postService.getPostDetail(this.postId).subscribe(res => {
        res && (this.post = res);
      });
    });
  }


}
