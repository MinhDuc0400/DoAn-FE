import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { UserService } from '../../common/services/user.service';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { PostService } from '../../common/services/post.service';
import { CreateEditPostComponent } from '../post-list/create-edit-post/create-edit-post.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.scss'],
})
export class PostManagementComponent implements OnInit {

  private firstTimeInit = true;
  source: LocalDataSource = new LocalDataSource();

  settings = {
    actions: false,
    columns: {
      _id: {
        title: 'id',
        type: 'string',
        editable: false,
      },
      createdAt: {
        title: 'Created At',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return dayjs(row.createdAt).format('MMM D, YYYY h:mm A');
        },
        editable: false,
      },
      updatedAt: {
        title: 'Last Updated At',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return dayjs(row.updatedAt).format('MMM D, YYYY h:mm A');
        },
        editable: false,
      },
      title: {
        title: 'Title',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
    },
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private postService: PostService,
    private dialogService: NbDialogService,

  ) { }

  ngOnInit(): void {
    this.postService.getPostLandlord().subscribe(res => {
      this.source.load(res);
    });
  }

  open() {
    this.dialogService.open(CreateEditPostComponent, {
      context: {
        title: 'Create Post',
      },
    }).onClose.subscribe(() => {
      this.firstTimeInit = true;
      this.postService.getPostLandlord().subscribe(res => {
        this.source.load(res);
      });
    });
  }

  onRowSelected(event): void {
    !this.firstTimeInit && this.router.navigateByUrl(`pages/post-management/post-detail/${event.data._id}`);
    this.firstTimeInit = false;
  }

}
