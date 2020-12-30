import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuardService } from "../services/loggedin-guard.service";
import { QuesDetailsResolverService } from "./ques-details/ques-details-resolver.service";
import { QuesDetailsComponent } from "./ques-details/ques-details.component";
import { QuestionListResolverService } from "./question-list/question-list-resolver.service";
import { QuestionListComponent } from "./question-list/question-list.component";
import { QuestionsComponent } from "./questions.component";

const Routes: Routes = [
    { 
        path: '', 
        component: QuestionsComponent,
        canActivate: [LoggedInGuardService],
        canActivateChild: [LoggedInGuardService],
        children: [
          {
            path: '', 
            component: QuestionListComponent, 
            resolve: { ques: QuestionListResolverService },
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',

          },
          {
            path: ':qid/:que', 
            component: QuesDetailsComponent, 
            canActivate: [LoggedInGuardService], 
            resolve: { queData: QuesDetailsResolverService }
          }
        ]
      }
];

@NgModule({
    imports: [
        RouterModule.forChild(Routes)
    ],
    exports: [RouterModule]
})
export class QueRoutingModule {}
