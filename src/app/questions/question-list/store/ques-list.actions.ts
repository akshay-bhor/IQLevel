import { createAction, props } from '@ngrx/store';
import { resData } from './ques-list.effects';

export const fetchQuesList = createAction(
    '[QuesList] Fetch Ques List',
    props<{
        page: number
    }>()
);

export const setQuesList = createAction(
    '[QuesList] Set Ques List',
    props<{
        payload: resData,
        index: number
    }> ()
);

export const handleError = createAction(
    '[QuesList] Handle Errors',
    props<{
        msg: string
    }>()
);