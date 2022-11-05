import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditPostComponent } from './create-edit-post/create-edit-post.component';
import { PostService } from '../../common/services/post.service';
import { Post } from '../../common/interfaces/post';
import { UserService } from '../../common/services/user.service';
import { ConversationService } from '../../common/services/conversation.service';
import { Router } from '@angular/router';
import { URL_CONVERSATION } from '../../common/constants/url.constant';

@Component({
  selector: 'ngx-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  postList: Post[] = [];

  constructor(
    public userService: UserService,
    private conversationService: ConversationService,
    private dialogService: NbDialogService,
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.postService.getVerifiedPost().subscribe(res => {
      this.postList = res;
    });
  }

  open() {
    this.dialogService.open(CreateEditPostComponent, {
      context: {
        title: 'Create Post',
      },
    });
  }

  chat(post: Post) {
    const {_id, title, description} = post;
    this.conversationService.createConversation(_id, title, description).subscribe(
      res => {
        this.router.navigate([URL_CONVERSATION]);
      },
      error => {

      });
  }

}
