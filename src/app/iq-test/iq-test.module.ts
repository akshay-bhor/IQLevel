import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { IqTestHistoryComponent } from "./iq-test-history/iq-test-history.component";
import { IqTestRoutingModule } from "./iq-test-routing.module";
import { IqTestComponent } from "./iq-test.component";
import { LeaderboardComponent } from "../iq-test/leaderboard/leaderboard.component";
import { ResultComponent } from "./result/result.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared.module";
import { IqTestQuestionsComponent } from "./iq-test-questions/iq-test-questions.component";
import { IqTestAnalysisComponent } from "./iq-test-history/iq-test-analysis/iq-test-analysis.component";

@NgModule({
    declarations: [
        IqTestHistoryComponent,
        IqTestComponent,
        LeaderboardComponent,
        ResultComponent,
        IqTestQuestionsComponent,
        IqTestAnalysisComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MaterialModule,
        SharedModule,
        IqTestRoutingModule,
    ]
})
export class IqTestModule {}