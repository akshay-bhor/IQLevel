import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PayGaurdService implements CanActivate {
  isPro: boolean = false;
  url:string;
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.getUserData.pro) {
      if(this.authService.getUserData.pro == 1) {
        this.isPro = true
        console.log('ifcheck');
      }
      else {
        this.isPro = false
      }
    }
    else {
      this.isPro = false
    }
 
    if(this.isPro) {
      return true
    }
    this.url = decodeURIComponent(state.url);
    // this.router.navigate(['/payment'], { queryParams: { returnUrl: this.url } })
    return this.router.createUrlTree(['/payment'], { queryParams: { returnUrl: this.url } });
  }
}
