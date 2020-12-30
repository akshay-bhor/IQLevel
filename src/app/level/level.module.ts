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

@NgModule({
    declarations: [
        LevelListComponent,
        LevelComponent,
        QuestionComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        FormsModule,
        LevelRoutingModule,
        MaterialModule
    ]
})
export class LevelModule {}