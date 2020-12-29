import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { throwError } from 'rxjs';


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
      }),
      catchError(this.handleError)
      );
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

  private handleError(error: Response) { 
    let errMsg = "Unexpected Error Occured!";

    switch(+error.status) {
      case 0:
        errMsg = "No Internet!"; break;
      case 404:
        errMsg = "URL Not Found!"; break;
      case 504:
        errMsg = "Oops! Request Timed Out."; break;
      case 400:
        errMsg = "Bad Input!"; break;
    }
    return throwError(errMsg);
  }
}
