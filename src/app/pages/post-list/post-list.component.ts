import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditPostComponent } from './create-edit-post/create-edit-post.component';
import { PostService } from '../../common/services/post.service';
import { Post } from '../../common/interfaces/post';
import { UserService } from '../../common/services/user.service';
import { ConversationService } from '../../common/services/conversation.service';

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
  ) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(res => {
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
    this.conversationService.createConversation(_id, title, description).subscribe(res => {
      console.log(res);
    });
  }

}
