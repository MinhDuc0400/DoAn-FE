import { Component, OnInit } from '@angular/core';
import { CreateEditFeedComponent } from './create-edit-feed/create-edit-feed.component';
import { NbDialogService } from '@nebular/theme';
import { PostService } from '../../common/services/post.service';
import { Post } from '../../common/interfaces/post';
import { UserService } from '../../common/services/user.service';
import { URL_CONVERSATION } from '../../common/constants/url.constant';
import { Router } from '@angular/router';
import { ConversationService } from '../../common/services/conversation.service';
import { AuthenticationService } from '../../common/services/autentication.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  postList: Post[] = [];
  userType = this.userService.currentUser.getValue()?.userType;
  constructor(
    private dialogService: NbDialogService,
    private postService: PostService,
    public userService: UserService,
    private router: Router,
    private conversationService: ConversationService,
    public authService: AuthenticationService

  ) {}
  ngOnInit() {
    this.postService.getAllPosts().subscribe(res => {
      this.postList = res;
    });
  }
  openCreateDialog() {
    this.dialogService.open(CreateEditFeedComponent, {
      context: {
        title: 'Create Post',
      },
    });
  }

  interestPost(post: Post) {
    if (post.votedUsers.includes(this.userService.currentUser.getValue()?._id)) {
      this.postService.dislikePost(post._id, this.userService.currentUser.getValue()?._id)
        .subscribe(res => {
          if (res) {
            const index = this.postList.findIndex(element => element._id === res._id);
            if (index > -1) {
              this.postList[index] = {
                ...this.postList[index],
                vote: res.vote,
                votedUsers: res.votedUsers,
              };
            }
          }
        });
    } else {
      this.postService.likePost(post._id, this.userService.currentUser.getValue()._id)
        .subscribe(res => {
          if (res) {
            const index = this.postList.findIndex(element => element._id === res._id);
            if (index > -1) {
              this.postList[index] = {
                ...this.postList[index],
                vote: res.vote,
                votedUsers: res.votedUsers,
              };
            }
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
