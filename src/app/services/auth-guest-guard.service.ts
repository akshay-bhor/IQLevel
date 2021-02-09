import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuestGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if(this.authService.getUserData.signin == 'guest') {
      return true
    }
    this.router.navigate(['/level'])
  }
}
