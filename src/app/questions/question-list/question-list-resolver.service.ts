import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of, race } from 'rxjs';
import 'rxjs/add/operator/catch';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, mapTo, switchMap, take, tap } from 'rxjs/operators';
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
              take(1)
            )
            const errRes = this.actions$.pipe(
              ofType(QuesListActions.handleError),
              take(1),
              tap(() => { 
                this.router.navigate([this.router.url]);
              })
            )
            return race(res, errRes).pipe(take(1));
          }
          else {
            return of(list)
          }
        })
      )
  }
}
