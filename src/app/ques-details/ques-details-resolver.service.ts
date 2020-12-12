import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class QuesDetailsResolverService implements Resolve<any> {
  url;
  postData: any = {}
  constructor(private dataService: DataService) { 
    this.url = "https://www.iqlevel.net/api/que-details";
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.postData.qid = +route.params['qid'];
    return this.dataService.post(this.url, this.postData);
  }
}
