import { createReducer, on, Action } from '@ngrx/store';
import { QuesDetailsResData } from '../../ques-details/store/ques-details.effects';
import * as QuesDetailsAction from './ques-details.actions';

export interface State {
    resData: QuesDetailsResData[],
}

const initialState: State = {
    resData: []
};

const _quesDetailsReducer = createReducer(
    initialState,
    on(
        QuesDetailsAction.setQuesDetails,
        (state, action) => {
            const updatedData = {
                ...state.resData[action.index],
                ...action.payload
            };
            const updatedRes = [...state.resData];
            updatedRes[action.index] = updatedData;

            return {
                ...state,
                resData: updatedRes
            };
        }
    )
);

export function QuesDetailsReducer(state: State, action: Action) {
    return _quesDetailsReducer(state, action)
}