import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../common/services/autentication.service';
import { User } from '../../common/interfaces/user';
import { UserService } from '../../common/services/user.service';
import { URL_LOGOUT } from '../../common/constants/url.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(
    private authService: AuthenticationService,
    public userServce: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  logout() {
    this.router.navigate([URL_LOGOUT]);
    this.authService.logout();
  }
}
