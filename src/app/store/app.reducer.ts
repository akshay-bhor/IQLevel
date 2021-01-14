import { ActionReducerMap } from '@ngrx/store';
import * as fromQuesList from '../questions/store/ques-list.reducer';

export interface appState {
    quesList: fromQuesList.State;
};


export const appReducer: ActionReducerMap<appState> = {
    quesList: fromQuesList.QuesDetailsReducer
}
    

