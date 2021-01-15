import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects"
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { QuesDetailQue } from "../../ques-details.model";
import * as QuesDetailsActions from "./ques-details.actions";

export interface QuesDetailsResData {
    question: QuesDetailQue,
    options:[],
    status: number,
    title: string,
    next?:string,
    desc?: string,
    err?:string
}

const errHandler = (err: any) => {
    let errMsg = "Unexpected Error Occured!";

    switch(+err.status) {
      case 0:
        errMsg = "No Internet!"; break;
      case 404:
        errMsg = "URL Not Found!"; break;
      case 504:
        errMsg = "Oops! Request Timed Out."; break;
      case 400:
        errMsg = "Bad Input!"; break;
    }
    return errMsg;
}

@Injectable()
export class QuesDetailsEffects {
    id: number
    @Effect()
    fetchQuesDetails = this.actions$.pipe( 
        ofType(QuesDetailsActions.fetchQuesDetails),
        switchMap(action => {
            this.id = action.index;
            return this.http.post<QuesDetailsResData>(
                'https://www.iqlevel.net/api/que-details',
                {
                    "qid": this.id
                }
            )
            .pipe(
                map(res => {
                    if(res.status == 1) {
                        return QuesDetailsActions.setQuesDetails({ index: this.id, payload: res })
                    }
                    else {
                        let errMsg = res.err;
                        return QuesDetailsActions.handleError({ msg: errMsg })
                    }
                }),
                catchError(errRes => {
                    let errMsg = errHandler(errRes);
                    return of(QuesDetailsActions.handleError({ msg: errMsg }));
                })
                )
        })
    );


    @Effect({ dispatch: false })
    handleError = this.actions$.pipe(
        ofType(QuesDetailsActions.handleError),
        tap(action => setTimeout(() => { throw action.msg  }, 0)),
        switchMap(() => {
            return of({})
        })
    );

    constructor(
        private http: HttpClient, 
        private actions$: Actions
        ) {

    }
}