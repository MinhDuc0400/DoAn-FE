import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-create-edit-post',
  templateUrl: './create-edit-post.component.html',
  styleUrls: ['./create-edit-post.component.scss'],
})
export class CreateEditPostComponent implements OnInit {

  @Input() title: string;
  postForm: FormGroup;

  imageListToDisplay: string[] = [];

  constructor(protected ref: NbDialogRef<CreateEditPostComponent>) {}

  dismiss() {
    this.imageListToDisplay.map(src => URL.revokeObjectURL(src));
    this.ref.close();
  }

  onImageFileSelect(ev: Event): void {
    const imageFile = (<HTMLInputElement>ev.target)?.files.item(0);
    if (!imageFile) {
      return;
    }

    const imageSrc = URL.createObjectURL(imageFile);
    this.imageListToDisplay = [
      ...this.imageListToDisplay,
      imageSrc,
    ];
    // this.imageList.setValue([...this.imageList.value, imageSrc]);

  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      imageList: new FormControl([], Validators.maxLength(6)),
    });
  }

  get description() {
    return this.postForm.get('description');
  }

  get imageList() {
    return this.postForm.get('imageList');
  }

}
