import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../common/services/autentication.service';
import { Router } from '@angular/router';
import { URL_HOME } from '../../common/constants/url.constant';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
  ) {
  }

  redirectAfter = 3;


  private logoutTimeout: NodeJS.Timeout;

  ngOnInit(): void {
    this.countDownLogout(3);
  }

  countDownLogout(delay: number): void {
    if (delay <= 0) {
      this.redirectAfter = 0;
      this.logout();
      return;
    }

    this.redirectAfter = delay;
    this.logoutTimeout = setTimeout(() => this.countDownLogout(delay - 1), 1000); // update every 1 second
  }

  logout(): void {
    this.authentication.logout();
  }

  logoutNow(): void {
    clearTimeout(this.logoutTimeout);
    this.logout();
  }

  cancelLogout(): void {
    clearTimeout(this.logoutTimeout);
    this.router.navigate([URL_HOME]);
  }
}
