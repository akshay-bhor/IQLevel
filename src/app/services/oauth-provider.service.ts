import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OauthProviderService {

  constructor() { }

  get oauthRedirectURL() {
    return encodeURI('https://www.iqlevel.net/gauth');
  }

  get oauthClientID() {
    return '541190633432-fj2nf2j5asd3ka5qsbgpi4uq03aeteke.apps.googleusercontent.com';
  }

  get oauthScope() {
    let scopes = ['https://www.googleapis.com/auth/userinfo.profile', 
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/user.birthday.read'];

    return encodeURI(scopes.join(' '));
  }

  get loginUri() {
    return encodeURI('https://www.iqlevel.net/login');
  }
}


