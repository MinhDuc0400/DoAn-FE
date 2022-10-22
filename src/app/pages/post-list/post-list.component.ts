import { Component, OnInit } from '@angular/core';
import { fruits } from '../layout/list/fruits-list';
import { NbDialogService } from '@nebular/theme';
import { CreateEditPostComponent } from './create-edit-post/create-edit-post.component';

@Component({
  selector: 'ngx-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  fruits = fruits;

  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];

  constructor(
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
  }

  open() {
    this.dialogService.open(CreateEditPostComponent, {
      context: {
        title: 'Create Post',
      },
    });
  }

}
