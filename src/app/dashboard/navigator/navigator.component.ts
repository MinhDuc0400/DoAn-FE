import { Component } from '@angular/core';
import { URL_LOGOUT } from '../../common/constants/url.constant';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../common/services/autentication.service';
import { UserTypeEnum } from '../../common/enum/userType.enum';
import { UserService } from '../../common/services/user.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent {

  userType = localStorage.getItem('userType');
  navigationArray = [
    {
      label: 'Feed',
      route: 'feed',
      visible: this.userType !== UserTypeEnum.ADMIN,
      icon: 'grid-outline',
    },
    {
      label: 'Message',
      route: 'message',
      visible: this.userType !== UserTypeEnum.ADMIN,
      icon: 'message-square-outline',
    },
    {
      label: 'Explore',
      route: 'explore',
      visible: this.userType === UserTypeEnum.TENANT,
      icon: 'bulb-outline',
    },
    {
      label: 'Management',
      route: 'management',
      visible: this.userType === UserTypeEnum.LANDLORD,
      icon: 'list',
    },
    {
      label: 'Notification',
      route: 'notification',
      visible: true,
      icon: 'bell-outline',
    },
    {
      label: 'Profile',
      route: 'profile',
      visible: true,
      icon: 'person-outline',
    },
    {
      label: 'Settings',
      route: 'settings',
      visible: true,
      icon: 'settings-outline',
    },
  ];

  constructor(
    public router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
  ) {
    this.userService.currentUser.subscribe(res => {
      if (res) {
        this.userType = localStorage.getItem('userType');
      }
    });
  }


}
