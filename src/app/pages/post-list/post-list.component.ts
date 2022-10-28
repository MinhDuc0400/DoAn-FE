import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditPostComponent } from './create-edit-post/create-edit-post.component';
import { PostService } from '../../common/services/post.service';
import { Post } from '../../common/interfaces/post';

@Component({
  selector: 'ngx-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  postList: Post[] = [];

  constructor(
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

}
