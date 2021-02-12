import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared.module";
import { LevelListComponent } from "./level-list/level-list.component";
import { LevelRoutingModule } from "./level-routing.module";
import { LevelComponent } from "./level.component";
import { QuestionComponent } from "./question/question.component";
import { CommonModule } from "@angular/common";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { IqTestModule } from "../iq-test/iq-test.module";

@NgModule({
    declarations: [
        LevelListComponent,
        LevelComponent,
        QuestionComponent,
        LeaderboardComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        FormsModule,
        LevelRoutingModule,
        MaterialModule,
        IqTestModule
    ]
})
export class LevelModule {}