import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../common/services/post.service';
import { CreatePostRequest, Post } from '../../../common/interfaces/post';
import { FileTypeEnum } from '../../../common/enum/fileType.enum';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { FileService } from '../../../common/services/file.service';
import { LocationService } from '../../../common/services/location.service';
import { ResultDistrict, ResultProvince } from '../../../common/interfaces/location';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'ngx-create-edit-post',
  templateUrl: './create-edit-post.component.html',
  styleUrls: ['./create-edit-post.component.scss'],
})
export class CreateEditPostComponent implements OnInit {

  @Input() title: string;
  @Input() post: Post;
  postForm: FormGroup;

  imageListToDisplay: string[] = [];
  imageListToUpload: File[] = [];

  provinceArray: ResultProvince[] = [];
  districtArray: ResultDistrict[] = [];
  downloadURL: Observable<string>;

  constructor(
    protected ref: NbDialogRef<CreateEditPostComponent>,
    private postService: PostService,
    private fileService: FileService,
    private locationService: LocationService,
    private storage: AngularFireStorage,
  ) {}

  dismiss() {
    this.imageListToDisplay.map(src => URL.revokeObjectURL(src));
    this.ref.close();
  }

  onImageFileSelect(ev: Event): void {
    const imageFile = (<HTMLInputElement>ev.target)?.files.item(0);
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
              this.imageList.setValue([...this.imageList.value, {
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

  ngOnInit(): void {
    this.locationService.getListProvinces('https://vapi.vnappmob.com/api/province').subscribe(res => {
      this.provinceArray = res.results;
    });
    if (!this.post) {
      this.postForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
        price: new FormControl(0, [Validators.required]),
        imageList: new FormControl([]),
        address: new FormControl('', Validators.required),
        districtId: new FormControl('', Validators.required),
        provinceId: new FormControl('', Validators.required),
      });
    } else {
      this.postForm = new FormGroup({
        title: new FormControl(this.post.title, [Validators.required, Validators.maxLength(60)]),
        description: new FormControl(this.post.description, [Validators.required, Validators.maxLength(250)]),
        price: new FormControl(+this.post.price, [Validators.required]),
        imageList: new FormControl(this.post.images),
        address: new FormControl(this.post.address, Validators.required),
        districtId: new FormControl(this.post.location.districtId, Validators.required),
        provinceId: new FormControl(this.post.location.provinceId, Validators.required),
      });
    }

    this.provinceId.valueChanges
      .pipe(switchMap(id => this.locationService.getListDistrictsByProvinceId('https://vapi.vnappmob.com/api/province/district/' + id)))
      .subscribe(res => {
        this.districtArray = res.results;
      });
  }

  submit() {
    if (this.postForm.invalid) {
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
    if (!this.post) {
      this.postService.createPost(body).subscribe(() => {
        this.dismiss();
      });
    } else {
      this.postService.editPost(body, this.post._id).subscribe(() => {
        this.dismiss();
      });
    }

  }

  get price() {
    return this.postForm.get('price');
  }

  get address() {
    return this.postForm.get('address');
  }

  get districtId() {
    return this.postForm.get('districtId');
  }

  get provinceId() {
    return this.postForm.get('provinceId');
  }

  get postTitle() {
    return this.postForm.get('title');
  }

  get description() {
    return this.postForm.get('description');
  }

  get imageList() {
    return this.postForm.get('imageList');
  }

}
