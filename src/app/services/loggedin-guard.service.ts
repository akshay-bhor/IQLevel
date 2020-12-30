import { AuthService } from './auth.service';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if(!this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['level']);
  }

  canActivateChild() {
    if(!this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['level']);
  }
}
