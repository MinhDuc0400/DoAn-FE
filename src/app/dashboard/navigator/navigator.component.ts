import { Component } from '@angular/core';
import { URL_LOGOUT } from '../../common/constants/url.constant';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../common/services/autentication.service';
import { UserTypeEnum } from '../../common/enum/userType.enum';
import { UserService } from '../../common/services/user.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent {

  userType = this.userService.currentUser.value.userType;
  navigationArray = [
    {
      label: 'Feed',
      route: 'feed',
      visible: this.userType !== UserTypeEnum.ADMIN,
    },
    {
      label: 'Message',
      route: 'message',
      visible: this.userType !== UserTypeEnum.ADMIN,
    },
    {
      label: 'Explore',
      route: 'explore',
      visible: this.userType === UserTypeEnum.TENANT,
    },
    {
      label: 'Management',
      route: 'management',
      visible: this.userType === UserTypeEnum.LANDLORD,
    },
  ];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
  ) {
  }

  logout() {
    this.router.navigate([URL_LOGOUT]);
    this.authService.logout();
  }
}
