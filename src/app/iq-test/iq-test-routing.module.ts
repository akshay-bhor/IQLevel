import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from "../services/auth-guard.service";
import { IqTestAnalysisComponent } from "./iq-test-history/iq-test-analysis/iq-test-analysis.component";
import { IqTestHistoryComponent } from "./iq-test-history/iq-test-history.component";
import { IqExitGuardService } from "./iq-test-questions/iq-exit-guard.service";
import { IqTestQuestionsComponent } from "./iq-test-questions/iq-test-questions.component";
import { IqTestComponent } from "./iq-test.component";
import { LeaderboardComponent } from "../iq-test/leaderboard/leaderboard.component";
import { ResultComponent } from "./result/result.component";
import { SignupCompleteGuardService } from "../services/signup-complete-guard.service";
import { PayGaurdService } from "../services/pay-gaurd.service";

const Routes: Routes = [
    {
        path: '', 
        component: IqTestComponent, 
        canActivate: [AuthGuardService], 
        canActivateChild: [AuthGuardService],
        children: [
          { path: '', component: IqTestQuestionsComponent, canDeactivate: [IqExitGuardService] },
          { path: 'result/:test_key', component: ResultComponent, canActivate: [SignupCompleteGuardService] },
          { path: 'leaderboard', component: LeaderboardComponent },
          { path: 'analyze/:tkey', component: IqTestAnalysisComponent, canActivate: [SignupCompleteGuardService, PayGaurdService] },
          { path: 'history', component: IqTestHistoryComponent, canActivate: [SignupCompleteGuardService] },
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