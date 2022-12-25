import { Component, OnInit } from '@angular/core';
import { CreateEditFeedComponent } from './create-edit-feed/create-edit-feed.component';
import { NbDialogService } from '@nebular/theme';
import { PostService } from '../../common/services/post.service';
import { Post } from '../../common/interfaces/post';
import { UserService } from '../../common/services/user.service';
import { Router } from '@angular/router';
import { ConversationService } from '../../common/services/conversation.service';
import { AuthenticationService } from '../../common/services/autentication.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LocationService } from '../../common/services/location.service';
import { ResultDistrict, ResultProvince } from '../../common/interfaces/location';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SwiperOptions } from 'swiper';
import { ProgressInfo, StatsProgressBarData } from '../../@core/data/stats-progress-bar';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  postList: Post[] = [];
  provinceArray: ResultProvince[] = [];
  districtArray: ResultDistrict[] = [];
  userType = localStorage.getItem('userType');
  filterForm: FormGroup;

  suggestionArray = [
    {
      title: 'CĂN SHOPHOUSE LK13-01 DỰ ÁN AN LẠC GREEN SYMPHONY, CHÍNH CHỦ',
      address: 'Hoài Đức, Hà Nội',
      photos: [
        {
          src: '/assets/images/20221126104429-21c2_wm.jpg'
        },
      ],
      likes: 4,
    },
    {
      title: 'NHÀ Ô TÔ ĐỖ CỬA 3 TẦNG MỚI XÂY GIÁ 1,5 TỶ',
      address: 'Hà Đông, Hà Nội',
      photos: [
        {
          src: '/assets/images/20221223161855-d3ec_wm.jpg'
        },
      ],
      likes: 2,
    },
  ];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
  };
  progressInfoData: ProgressInfo[];

  constructor(
    private dialogService: NbDialogService,
    private postService: PostService,
    public userService: UserService,
    private router: Router,
    private conversationService: ConversationService,
    public authService: AuthenticationService,
    private locationService: LocationService,
    private statsProgressBarService: StatsProgressBarData,

  ) {}
  ngOnInit() {
    this.statsProgressBarService.getProgressInfoData()
      .subscribe((data) => {
        this.progressInfoData = data;
      });

    this.locationService.getListProvinces('https://vapi.vnappmob.com/api/province').subscribe(res => {
      this.provinceArray = res.results;
    });

    this.filterForm = new FormGroup({
      startPrice: new FormControl(''),
      endPrice: new FormControl(''),
      provinceId: new FormControl(''),
      districtId: new FormControl(''),
    });
    this.postService.getAllPosts().subscribe(res => {
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

  chat(post: Post) {
    const {_id, title, description} = post;
    this.conversationService.createConversation(_id, title, description).subscribe(
      () => {
        this.router.navigate(['/dashboard/message']);
      },
      () => {

      });
  }
}
