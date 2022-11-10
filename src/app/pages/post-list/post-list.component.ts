import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateEditPostComponent } from './create-edit-post/create-edit-post.component';
import { PostService } from '../../common/services/post.service';
import { Post } from '../../common/interfaces/post';
import { UserService } from '../../common/services/user.service';
import { ConversationService } from '../../common/services/conversation.service';
import { Router } from '@angular/router';
import { URL_CONVERSATION } from '../../common/constants/url.constant';
import { FormControl, FormGroup } from '@angular/forms';
import { ResultDistrict, ResultProvince } from '../../common/interfaces/location';
import { LocationService } from '../../common/services/location.service';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  postList: Post[] = [];
  provinceArray: ResultProvince[] = [];
  districtArray: ResultDistrict[] = [];
  filterForm: FormGroup;

  constructor(
    public userService: UserService,
    private conversationService: ConversationService,
    private dialogService: NbDialogService,
    private postService: PostService,
    private router: Router,
    private locationService: LocationService,
  ) { }

  ngOnInit(): void {
    this.locationService.getListProvinces('https://vapi.vnappmob.com/api/province').subscribe(res => {
      this.provinceArray = res.results;
    });

    this.filterForm = new FormGroup({
      startPrice: new FormControl(''),
      endPrice: new FormControl(''),
      provinceId: new FormControl(''),
      districtId: new FormControl(''),
    });

    this.postService.getVerifiedPost().subscribe(res => {
      this.postList = res;
    });

    this.provinceId.valueChanges
      .pipe(switchMap(id => this.locationService.getListDistrictsByProvinceId('https://vapi.vnappmob.com/api/province/district/' + id)))
      .subscribe(res => {
        this.districtArray = res.results;
      });

    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(() => this.postService.getVerifiedPost(
        +this.startPrice.value,
        +this.endPrice.value,
        this.provinceId.value,
        this.districtId.value,
      )))
      .subscribe(res => {
        this.postList = res;
      });
  }

  get startPrice() {
    return this.filterForm.get('startPrice');
  }

  get endPrice() {
    return this.filterForm.get('endPrice');
  }


  get districtId() {
    return this.filterForm.get('districtId');
  }

  get provinceId() {
    return this.filterForm.get('provinceId');
  }

  open() {
    this.dialogService.open(CreateEditPostComponent, {
      context: {
        title: 'Create Post',
      },
    });
  }

  interestPost(post: Post) {
    if (post.votedUsers.includes(this.userService.currentUser.getValue()._id)) {
      this.postService.dislikePost(post._id, this.userService.currentUser.getValue()._id)
        .subscribe(res => {
          if (res) {
            const index = this.postList.findIndex(element => element._id === res._id);
            if (index > -1) {
              this.postList[index] = {
                ...res,
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
                ...res,
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
