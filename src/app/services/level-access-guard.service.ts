import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LevelAccessGuardService implements CanActivate {

  constructor(private router :Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
   
      let levelid = +route.paramMap.get('levelid');
      let eligibility = localStorage.getItem('level');

      if(levelid >= 1 && levelid <= 10) {
        if(parseInt(eligibility) >= levelid) {
          localStorage.setItem('clevel', levelid.toString());
          return true;
        }
        else {
          alert('You are Not Eligible for This Level Yet!');
          this.router.navigate(['/level']);
          return false;
        }
      }
      else {
        alert('Page Does Not Exist!');
        this.router.navigate(['/level']);
        return false;
      }
    return false;
  }
}
