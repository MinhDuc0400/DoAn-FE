import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../common/services/user.service';
import { Post } from '../../../common/interfaces/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {

  post: Post;
  private postId: string;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params.id;
    console.log(this.postId);
  }

}
