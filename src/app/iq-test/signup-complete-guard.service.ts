import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignupCompleteGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(next, state: RouterStateSnapshot) {
    if(this.authService.getUserData.signin != 'guest') {
      return true
    }
    this.router.navigate(['/complete-signin'], { queryParams: { returnUrl: state.url } })
  }
}
