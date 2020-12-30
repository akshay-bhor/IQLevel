import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from "../services/auth-guard.service";
import { IqTestAnalysisComponent } from "./iq-test-history/iq-test-analysis/iq-test-analysis.component";
import { IqTestHistoryComponent } from "./iq-test-history/iq-test-history.component";
import { IqExitGuardService } from "./iq-test-questions/iq-exit-guard.service";
import { IqTestQuestionsComponent } from "./iq-test-questions/iq-test-questions.component";
import { IqTestComponent } from "./iq-test.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { ResultComponent } from "./result/result.component";

const Routes: Routes = [
    {
        path: '', 
        component: IqTestComponent, 
        canActivate: [AuthGuardService], 
        canActivateChild: [AuthGuardService],
        children: [
          { path: '', component: IqTestQuestionsComponent, canDeactivate: [IqExitGuardService] },
          { path: 'result/:test_key', component: ResultComponent },
          { path: 'leaderboard', component: LeaderboardComponent },
          { path: 'analyze/:tkey', component: IqTestAnalysisComponent },
          { path: 'history', component: IqTestHistoryComponent },
        ]
      },
];

@NgModule({
    imports: [
        RouterModule.forChild(Routes)
    ],
    exports: [RouterModule]
})

export class IqTestRoutingModule {}