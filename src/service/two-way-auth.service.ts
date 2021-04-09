import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { UserManager, UserManagerSettings, User } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class TwoWayAuthService {

  private manager = new UserManager(getClientSettings());
  private user: User = null;

  public clientId = 'Notisify';
  public redirectUri = 'http://localhost:8084/login';

  constructor(
  ) { }

}
export function getClientSettings(): UserManagerSettings {
  return {
      authority: 'http://172.16.8.193:8084/EA/oauth',
      client_id: 'Notisify',
      redirect_uri: 'http://localhost:4200/callback',
      post_logout_redirect_uri: 'http://localhost:4200/',
      response_type:"id_token token",
      scope:"openid profile api1",
      filterProtocolClaims: true,
      loadUserInfo: true
  };
}