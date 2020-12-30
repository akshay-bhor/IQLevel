import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from "../services/auth-guard.service";
import { LevelAccessGuardService } from "../services/level-access-guard.service";
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