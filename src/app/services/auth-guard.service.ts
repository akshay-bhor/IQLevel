import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }
    canActivate() {
      if(this.authService.isLoggedIn()) {
        return true;
      }
      this.router.navigate(['continue']);
    }

    canActivateChild() {
      return this.canActivate();
    }
}
