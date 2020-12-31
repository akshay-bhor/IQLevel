import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from "../services/auth-guard.service";
import { LevelAccessGuardService } from "../services/level-access-guard.service";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { LevelListComponent } from "./level-list/level-list.component";
import { LevelComponent } from "./level.component";
import { QuestionComponent } from "./question/question.component";

const Routes: Routes = [
    {
        path: '',
        component: LevelComponent,
        canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService],
        children: [
          { path: '', component: LevelListComponent },
          { path: 'leaderboard', component: LeaderboardComponent, pathMatch: 'full'},
          { path: ':levelid', component: QuestionComponent, canActivate: [LevelAccessGuardService] }
        ]
      }
];

@NgModule({
    imports: [
        RouterModule.forChild(Routes)
    ],
    exports: [RouterModule]
})

export class LevelRoutingModule {}