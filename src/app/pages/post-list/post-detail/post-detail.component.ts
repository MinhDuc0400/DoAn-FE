import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../common/services/user.service';
import { Post } from '../../../common/interfaces/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../common/services/post.service';
import { PostStatusTypeEnum } from '../../../common/enum/postStatusType.enum';
import { URL_CONVERSATION } from '../../../common/constants/url.constant';
import { FormControl } from '@angular/forms';
import { ConversationService } from '../../../common/services/conversation.service';

@Component({
  selector: 'ngx-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  PostStatusTypeEnum = PostStatusTypeEnum;
  post: Post;
  private postId: string;

  form: FormControl;
  data: any;
  options: any;
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private conversationService: ConversationService,
  ) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params.id;
    this.postService.getPostDetail(this.postId).subscribe(res => {
      res && (this.post = res);
    });

    this.form = new FormControl('');
  }

  interestPost(post: Post) {
    if (post.votedUsers.includes(this.userService.currentUser.getValue()?._id)) {
      this.postService.dislikePost(post._id, this.userService.currentUser.getValue()?._id)
        .subscribe(res => {
          if (res) {
            this.post = res;
          }
        });
    } else {
      this.postService.likePost(post._id, this.userService.currentUser.getValue()._id)
        .subscribe(res => {
          if (res) {
            this.post = res;
          }
        });
    }

  }

  chat(post: Post) {
    const {_id, title, description} = post;
    this.conversationService.createConversation(_id, title, description).subscribe(
      () => {
        this.router.navigate([URL_CONVERSATION]);
      },
      () => {

      });
  }

}
