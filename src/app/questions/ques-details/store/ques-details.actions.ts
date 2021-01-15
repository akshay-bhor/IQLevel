import { createAction, props } from '@ngrx/store';
import { QuesDetailQue } from '../../ques-details.model';

export const setQuesDetails = createAction(
    '[QuesDetails] Set Ques Details',
    props<{
        index: number,
        payload: QuesDetailQue
    }>()

);

export const fetchQuesDetails = createAction(
    '[QuesDetails] Fetch Ques Details',
    props<{
        index: number
    }>()
);

export const handleError = createAction(
    '[QuesDetails] HandleError',
    props<{
        msg: string
    }>()
);