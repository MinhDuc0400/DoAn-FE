import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, switchMap } from 'rxjs/operators';
import { ResultDistrict, ResultProvince } from '../../../../common/interfaces/location';
import { LocationService } from '../../../../common/services/location.service';
import { PostService } from '../../../../common/services/post.service';
import { CreatePostRequest, Post } from '../../../../common/interfaces/post';
import { FileTypeEnum } from '../../../../common/enum/fileType.enum';

@Component({
  selector: 'app-create-edit-feed',
  templateUrl: './create-edit-feed.component.html',
  styleUrls: ['./create-edit-feed.component.scss']
})
export class CreateEditFeedComponent implements OnInit {
  @Input() post: Post;
  provinceArray: ResultProvince[] = [];
  districtArray: ResultDistrict[] = [];
  imageListToUpload: File[] = [];
  imageListToDisplay: string[] = [];

  createForm: FormGroup;
  downloadURL: Observable<string>;

  constructor(
    private locationService: LocationService,
    private storage: AngularFireStorage,
    private postService: PostService,
  ) {
  }

  ngOnInit() {
    this.createForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required]),
      description: new FormControl(this.post.description, [Validators.required]),
      price: new FormControl(this.post.price, [Validators.required]),
      imageList: new FormControl(this.post.images, [Validators.required]),
      address: new FormControl(this.post.address, [Validators.required]),
      districtId: new FormControl(this.post.location.districtId, [Validators.required]),
      provinceId: new FormControl(this.post.location.provinceId, [Validators.required]),
    });

    this.locationService.getListProvinces('https://vapi.vnappmob.com/api/province').subscribe(res => {
      this.provinceArray = res.results;
    });

    this.provinceId?.valueChanges
      .pipe(switchMap(id => this.locationService.getListDistrictsByProvinceId('https://vapi.vnappmob.com/api/province/district/' + id)))
      .subscribe(res => {
        this.districtArray = res.results;
      });
  }

  get price() {
    return this.createForm.get('price');
  }

  get address() {
    return this.createForm.get('address');
  }

  get districtId() {
    return this.createForm.get('districtId');
  }

  get provinceId() {
    return this.createForm.get('provinceId');
  }

  get postTitle() {
    return this.createForm.get('title');
  }

  get description() {
    return this.createForm.get('description');
  }

  get imageList() {
    return this.createForm.get('imageList');
  }

  onImageFileSelect(ev: Event): void {
    const imageFile = (<HTMLInputElement>ev.target)?.files?.item(0);
    if (!imageFile) {
      return;
    }

    this.imageListToUpload = [
      ...this.imageListToUpload,
      imageFile,
    ];

    const imageSrc = URL.createObjectURL(imageFile);
    this.imageListToDisplay = [
      ...this.imageListToDisplay,
      imageSrc,
    ];
    const time = Date.now();
    const filePath = `postImage/${time}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`postImage/${time}`, imageFile);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.imageList?.setValue([...this.imageList?.value, {
                name: 'image',
                type: FileTypeEnum.IMAGE,
                url: url,
              }]);
            }
          });
        }),
      )
      .subscribe();
  }

  submit() {
    if (this.createForm.invalid) {
      return;
    }
    const body: CreatePostRequest = {
      title: this.postTitle.value,
      description: this.description.value,
      address: this.address.value,
      images: this.imageList.value,
      price: +this.price.value,
      districtId: this.districtId.value,
      districtName: this.districtArray.find(el => el.district_id === this.districtId.value).district_name,
      provinceId: this.provinceId.value,
      provinceName: this.provinceArray.find(el => el.province_id === this.provinceId.value).province_name,
    };
      this.postService.editPost(body, this.post._id).subscribe(() => {
      });

  }
}
