import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of, race } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { map, mapTo, switchMap, take } from 'rxjs/operators';
import * as QuesDetailsAction from './store/ques-details.actions'

@Injectable({
  providedIn: 'root'
})
export class QuesDetailsResolverService implements Resolve<any> {
  url;
  postData: any = {}
  constructor(
    private store: Store<fromApp.appState>,
    private actiions$: Actions
    ) { 
    this.url = "https://www.iqlevel.net/api/que-details";
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.postData.qid = +route.params['qid'];
    // return this.dataService.post(this.url, this.postData).catch(error => {
    //       throw error;

    //   return of();
    // });

    return this.store.select('quesDetails').pipe(
      take(1),
      map(resData => {
        return resData.resData[this.postData.qid]
      }),
      switchMap(list => {
        if(!list) {
          this.store.dispatch(QuesDetailsAction.fetchQuesDetails({ index: this.postData.qid }))

          return this.actiions$.pipe(
            ofType(QuesDetailsAction.setQuesDetails, QuesDetailsAction.handleError),
            take(1)
          )
          // const errRes = this.actiions$.pipe(
          //   ofType(QuesDetailsAction.handleError),
          //   take(1),
          //   mapTo('false')
          // )

          // return race(res, errRes).pipe(
          //   take(1),
          //   switchMap(res => {
          //     if(res == 'true') {
          //       return of(true)
          //     }
          //     else {
          //       return EMPTY
          //     }
          //   })
          // )
        } 
        else {
          return of(list)
        }
      })
    )
  }
}
