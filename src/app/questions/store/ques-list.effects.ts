import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from "@angular/common/http";
import { Store } from  '@ngrx/store';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as QuesAction from './ques-list.actions';
import { QuesList } from '../ques-list.model';
import * as fromApp from '../../store/app.reducer';


export interface resData {
    status: number,
    questions?: QuesList[],
    hasNext?: boolean,
    err?: string
}

const errHandler = (err: any) => {
    let errMsg = "Unexpected Error Occured!";

    switch(+err.status) {
      case 0:
        errMsg = "No Internet!"; break;
      case 404:
        errMsg = "URL Not Found!"; break;
        break;
      case 504:
        errMsg = "Oops! Request Timed Out."; break;
      case 400:
        errMsg = "Bad Input!"; break;
    }
    return errMsg;
}

@Injectable()
export class QuesListEffects {
    page: number;

    @Effect()
    fetchQuesList$ = this.actions$.pipe(
            ofType(QuesAction.fetchQuesList),
            switchMap(action => {
                this.page = action.page;
                return this.http.post<resData>(
                    'https://www.iqlevel.net/api/questions',
                    {
                        'p': action.page 
                    }
                )
            }),
            map(res => {
                if(res.status == 1) {
                    return QuesAction.setQuesList({ payload: res, index: this.page })
                }
                else {
                    let errMsg = res.err;
                    return QuesAction.handleError({ msg: errMsg });
                }  
            }),
            catchError(errRes => {
                let errMsg = errHandler(errRes);
                return of(QuesAction.handleError({ msg: errMsg }));
            })
        ); 

  @Effect({ dispatch:false })
    handleError$ = 
    this.actions$.pipe(
        ofType(QuesAction.handleError),
        tap(action => setTimeout(() => { throw action.msg  }, 0))
    );

    constructor (
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.appState>
    ) {}
}