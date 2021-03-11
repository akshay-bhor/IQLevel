import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of, race } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { map, mapTo, switchMap, take, tap } from 'rxjs/operators';
import * as QuesDetailsAction from './store/ques-details.actions'

@Injectable({
  providedIn: 'root'
})
export class QuesDetailsResolverService implements Resolve<any> {
  url;
  postData: any = {}
  constructor(
    private store: Store<fromApp.appState>,
    private actions$: Actions,
    private router: Router
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

          const res = this.actions$.pipe(
            ofType(QuesDetailsAction.setQuesDetails),
            take(1)
          )
          const errRes = this.actions$.pipe(
            ofType(QuesDetailsAction.handleError),
            take(1),
            tap(() => { this.router.navigate([this.router.url]); })
          )

          return race(res, errRes).pipe(take(1))
        } 
        else {
          return of(list)
        }
      })
    )
  }
}
