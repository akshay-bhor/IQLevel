import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(data) {
      return this.http.post<any>('https://www.iqlevel.net/api/login', JSON.stringify(data)).pipe(map(response => {
        let res = response;
        if(res.status == 1 && res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('level', res.level);
          return true;
        }
        return false;
      }));
  }

  logout() {
    
    if(this.router.url != '/level') {
      this.router.navigate(['/level']).then(success => {
        if(success) {
          this.clearAuthCredentials();
    
          this.router.navigate(['/']);
        }
        else {
  
        }
      },
      err => {
        
      });
    }
    else {
      this.clearAuthCredentials();

      this.router.navigate(['/']);
    }
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  clearAuthCredentials() {
    localStorage.removeItem('token');
    localStorage.removeItem('level');
    localStorage.removeItem('clevel');
    localStorage.removeItem('score');
  }

  get getUserData() {
    let token = localStorage.getItem('token');
    if(!token) return null;

    return new JwtHelper().decodeToken(token);
  }

  set setUserScore(score) {
    localStorage.setItem('score', score);
  }

  get getUserScore() {
    return localStorage.getItem('score');
  }

  get getUserAge() {
    return this.getUserData.age;
  }
}
