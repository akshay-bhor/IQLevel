import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PayGaurdService implements CanActivate {
  isPro: boolean = false;
  url:string;
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next, state: RouterStateSnapshot) {
    if(this.authService.getUserData.pro) {
      if(this.authService.getUserData.pro == 1) {
        this.isPro = true
      }
    }

    if(this.isPro) {
      return true
    }
    this.url = decodeURIComponent(state.url);
    this.router.navigate(['/payment'], { queryParams: { returnUrl: this.url } })
  }
}
