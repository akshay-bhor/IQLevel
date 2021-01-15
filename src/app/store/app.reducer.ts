import { ActionReducerMap } from '@ngrx/store';
import * as fromQuesList from '../questions/question-list/store/ques-list.reducer';
import * as fromQuesDetails from '../questions/ques-details/store/ques-details.reducer'

export interface appState {
    quesList: fromQuesList.State;
    quesDetails: fromQuesDetails.State;
};


export const appReducer: ActionReducerMap<appState> = {
    quesList: fromQuesList.QuesListReducer,
    quesDetails: fromQuesDetails.QuesDetailsReducer
}
    

