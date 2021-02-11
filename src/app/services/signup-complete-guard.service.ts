import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignupCompleteGuardService implements CanActivate {
  url:string;
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(next, state: RouterStateSnapshot) {
    if(this.authService.getUserData.signin != 'guest') {
      return true
    }
    this.url = decodeURIComponent(state.url);
    this.router.navigate(['/complete-signin'], { queryParams: { returnUrl: this.url } })
  }
}
