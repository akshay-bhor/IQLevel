import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class QuesDetailsResolverService implements Resolve<any> {
  url;
  postData: any = {}
  constructor(private dataService: DataService, private authService: AuthService) { 
    this.url = "https://www.iqlevel.net/api/que-details";
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.postData.qid = +route.params['qid'];
    return this.dataService.post(this.url, this.postData).catch(error => {
      // if(error instanceof NetworkError)
      //     throw 'No Internet!';
      //   else if(error instanceof UnauthorisedError)
      //     this.authService.logout();
      //   else if(error instanceof GatewayTimeoutError)
      //     throw 'Request Timed Out!';
      //   else
          throw error;

      return of();
    });
  }
}
