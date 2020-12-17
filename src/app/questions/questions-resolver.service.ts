import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GatewayTimeoutError } from '../error/gateway-timeout-error';
import { NetworkError } from '../error/network-error';
import { UnauthorisedError } from '../error/unauth';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class QuestionsResolverService implements Resolve<any> {
  url;
  postData:any = {}
  constructor(private dataService:DataService, private authService: AuthService) { 
    this.url = "https://www.iqlevel.net/api/questions";
  }

  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<any> | Promise<any> | any { 
      let p = +route.queryParams['p'];
      if(!p) p = 1;
      this.postData.p = p;
      return this.dataService.post(this.url, this.postData).catch(error => {
        if(error instanceof NetworkError)
            throw 'No Internet!';
          else if(error instanceof UnauthorisedError)
            this.authService.logout();
          else if(error instanceof GatewayTimeoutError)
            throw 'Request Timed Out!';
          else
            throw 'Unexpected Error Occured!';

        return of();
      });
  }
}
