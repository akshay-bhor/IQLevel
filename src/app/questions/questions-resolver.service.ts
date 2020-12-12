import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsResolverService implements Resolve<any> {
  url;
  postData:any = {}
  constructor(private dataService:DataService) { 
    this.url = "https://www.iqlevel.net/api/questions";
  }

  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<any> | Promise<any> | any { console.log('fired');
      let p = +route.queryParams['p'];
      if(!p) p = 1;
      this.postData.p = p;
      return this.dataService.post(this.url, this.postData);
  }
}
