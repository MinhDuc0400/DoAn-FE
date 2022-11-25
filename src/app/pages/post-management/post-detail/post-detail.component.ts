import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../common/services/user.service';
import { Post } from '../../../common/interfaces/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../common/services/post.service';
import { PostStatusTypeEnum } from '../../../common/enum/postStatusType.enum';
import { URL_POST_MANAGEMENT } from '../../../common/constants/url.constant';
import { NbColorHelper, NbDialogService, NbThemeService, NbToastrService } from '@nebular/theme';
import { CreateEditPostComponent } from '../../post-list/create-edit-post/create-edit-post.component';
import { FormControl, FormGroup } from '@angular/forms';
import * as dayjs from 'dayjs';

@Component({
  selector: 'ngx-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  PostStatusTypeEnum = PostStatusTypeEnum;
  post: Post;
  private postId: string;
  urlTenant: string;

  form: FormControl;
  data: any;
  options: any;

  colors: any;
  chartjs: any;
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private toastService: NbToastrService,
    private dialogService: NbDialogService,
    private theme: NbThemeService,
  ) { }

  ngOnInit(): void {
    this.theme.getJsTheme().subscribe(res => {
      this.colors = res.variables;
      this.chartjs = res.variables.chartjs;
    });
    this.postId = this.route.snapshot.params.id;
    this.urlTenant = 'http://localhost:4200/pages/post/' + this.postId;
    this.postService.getPostDetail(this.postId).subscribe(res => {
      res && (this.post = res);
    });

    this.form = new FormControl('');

    this.form.valueChanges.subscribe(res => {
      if (res && res.start && res.end) {
        const startDate = dayjs(res.start).format('YYYY-MM-DD');
        const endDate = dayjs(res.end).format('YYYY-MM-DD');
        this.postService.getVoteByPostIdFromTo(this.postId, startDate, endDate).subscribe(vote => {
          console.log(vote);
          if (vote) {
            this.data = {
              labels: vote.map(el => dayjs(el.day).format('YYYY-MM-DD')),
              datasets: [{
                data: vote.map(el => el.votes),
                label: 'Like Chart',
                backgroundColor: NbColorHelper.hexToRgbA(this.colors.primaryLight, 0.8),
              },
              ],
            };
          }
        });
      }
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
