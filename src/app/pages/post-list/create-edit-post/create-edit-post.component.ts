import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../common/services/post.service';
import { CreatePostRequest } from '../../../common/interfaces/post';
import { FileTypeEnum } from '../../../common/enum/fileType.enum';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FileService } from '../../../common/services/file.service';

@Component({
  selector: 'ngx-create-edit-post',
  templateUrl: './create-edit-post.component.html',
  styleUrls: ['./create-edit-post.component.scss'],
})
export class CreateEditPostComponent implements OnInit {

  @Input() title: string;
  postForm: FormGroup;

  imageListToDisplay: string[] = [];
  imageListToUpload: File[] = [];

  constructor(
    protected ref: NbDialogRef<CreateEditPostComponent>,
    private postService: PostService,
    private fileService: FileService,
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
    // this.imageList.setValue([...this.imageList.value, imageSrc]);

  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      imageList: new FormControl([
        {
        name: 'image',
        type: FileTypeEnum.IMAGE,
        url: 'https://images.adsttc.com/media/images/629f/3517/c372/5201/650f/1c7f/large_jpg/hyde-park-house-robeson-architects_1.jpg?1654601149'
        },
        {
          name: 'image',
          type: FileTypeEnum.IMAGE,
          url: 'https://images.adsttc.com/media/images/629f/3517/c372/5201/650f/1c7f/large_jpg/hyde-park-house-robeson-architects_1.jpg?1654601149'
        },
        {
          name: 'image',
          type: FileTypeEnum.IMAGE,
          url: 'https://images.adsttc.com/media/images/629f/3517/c372/5201/650f/1c7f/large_jpg/hyde-park-house-robeson-architects_1.jpg?1654601149'
        },
        {
          name: 'image',
          type: FileTypeEnum.IMAGE,
          url: 'https://images.adsttc.com/media/images/629f/3517/c372/5201/650f/1c7f/large_jpg/hyde-park-house-robeson-architects_1.jpg?1654601149'
        },
        {
          name: 'image',
          type: FileTypeEnum.IMAGE,
          url: 'https://images.adsttc.com/media/images/629f/3517/c372/5201/650f/1c7f/large_jpg/hyde-park-house-robeson-architects_1.jpg?1654601149'
        },
        {
          name: 'image',
          type: FileTypeEnum.IMAGE,
          url: 'https://images.adsttc.com/media/images/629f/3517/c372/5201/650f/1c7f/large_jpg/hyde-park-house-robeson-architects_1.jpg?1654601149'
        },
      ], Validators.maxLength(6)),
      address: new FormControl('', Validators.required),
    });
  }

  submit() {
    if (this.postForm.invalid) {
      return;
    }

    from(this.imageListToUpload)
      .pipe(
        mergeMap((file) => {
          return this.fileService.uploadFile(file);
        }),
      ).subscribe(res => {
      console.log(res);
    });

    const body: CreatePostRequest = {
      title: this.postTitle.value,
      description: this.description.value,
      address: this.address.value,
      images: this.imageList.value,
    };

    this.postService.createPost(body).subscribe(res => {
      this.dismiss();
    });
  }

  get address() {
    return this.postForm.get('address');
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
