import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PostService } from '../../../common/services/post.service';
import { UserService } from '../../../common/services/user.service';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';

@Component({
  selector: 'ngx-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.scss'],
})
export class PostManagementComponent implements OnInit {
  settings = {
    actions: false,
    columns: {
      _id: {
        title: 'id',
        type: 'string',
        editable: false,
      },
      createdBy: {
        title: 'Created By',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return this.userService.getDisplayName(row.user.firstName, row.user.lastName);
        },
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
      location: {
        title: 'Address',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.address + row.location.districtId + row.location.provinceId;
        },
      },
      status: {
        title: 'Status',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  private firstTimeInit = true;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(res => {
      this.source.load(res);
    });
  }

  onRowSelected(event): void {
    !this.firstTimeInit && this.router.navigateByUrl(`pages/admin/post-detail/${event.data._id}`);
    this.firstTimeInit = false;
  }

}
