import { Component, OnInit } from '@angular/core';
import { TwoWayAuthService, getClientSettings } from 'src/service/two-way-auth.service';
import { Router } from '@angular/router';
import { UserManager, User } from 'oidc-client';

@Component({
  selector: 'app-notisfy-home',
  templateUrl: './notisfy-home.component.html',
  styleUrls: ['./notisfy-home.component.css']
})
export class NotisfyHomeComponent implements OnInit {

  public isLoggedIn = false;
  private manager = new UserManager(getClientSettings());
  private user: User = null;

  constructor(
    private twoWayAuth: TwoWayAuthService, public router: Router) { }

  ngOnInit() {
    this.manager.getUser().then(user => {
      this.user = user;
    });
    this.startAuthentication();
  }

  login() {
    // this._service.retrieveToken("client_id=fooClientId&redirect_uri=http:%2F%2Flocalhost:8084%2F");
    // window.location.href = 'http://localhost:4200/oauth/authorize?response_type=code&client_id=' + this._service.clientId + '&redirect_uri='+ this._service.redirectUri
  }

  logout() {
    // this._service.logout();
  }
  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
    });
  }
}
