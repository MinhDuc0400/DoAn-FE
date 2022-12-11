import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../common/services/autentication.service';
import { User } from '../../common/interfaces/user';
import { UserService } from '../../common/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(
    private authService: AuthenticationService,
    public userServce: UserService
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }
}
