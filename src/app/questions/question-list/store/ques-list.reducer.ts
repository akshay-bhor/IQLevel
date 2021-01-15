import { Action, createReducer, on } from '@ngrx/store';
import { QuesList } from '../../ques-list.model';
import *  as QuesListActions from './ques-list.actions';

export interface queData {
    status: number,
    questionList: QuesList[],
    hasNext: boolean
}

export interface State {
    pageData: queData[],
}

const initialState: State = {
    pageData: []
};

const _quesListReducer = createReducer(
    initialState,
    on (
        QuesListActions.setQuesList,
        (state, action) => {
            const updatedData = {
                ...state.pageData[action.index],
                ...action.payload
            }
            const updatedRes = [...state.pageData];
            updatedRes[action.index] = updatedData;
            return {
                ...state,
                pageData: updatedRes
            }
        }
    )
);

export function QuesListReducer(state: State = initialState, action: Action) {
    return _quesListReducer(state, action)
}