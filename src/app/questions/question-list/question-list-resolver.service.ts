import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of, race } from 'rxjs';
import 'rxjs/add/operator/catch';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, mapTo, switchMap, take } from 'rxjs/operators';
import * as QuesListActions from './store/ques-list.actions'

@Injectable({
  providedIn: 'root'
})
export class QuestionListResolverService implements Resolve<any> {
  url;
  postData:any = {}
  constructor(
    private store: Store<fromApp.appState>, private actions$: Actions,
    private router: Router) { 
    this.url = "https://www.iqlevel.net/api/questions";
  }

  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<any> | Promise<any> | any { 
      let p = +route.queryParams['p'];
      if(!p) p = 1;
      this.postData.p = p;
      // return this.dataService.post(this.url, this.postData).catch(error => {
      //       throw error;

      //   return of();
      // });
      return this.store.select('quesList').pipe(
        take(1),
        map(queList => {
          return queList.pageData[p];
        }),
        switchMap(list => { 
          if(!list) {
            this.store.dispatch(QuesListActions.fetchQuesList({ page: p }));
            const res = this.actions$.pipe(
              ofType(QuesListActions.setQuesList),
              mapTo('true'),
              take(1)
            )
            const errRes = this.actions$.pipe(
              ofType(QuesListActions.handleError),
              mapTo('false'),
              take(1)
            )
            return race(res, errRes).pipe(
                take(1),
                switchMap(res => {
                  if(res == 'true') {
                    return of(true)
                  }
                  else {
                    return EMPTY
                  }
                })
              )
          }
          else {
            return of(list)
          }
        })
      )
  }
}
