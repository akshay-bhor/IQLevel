import { NgModule } from "@angular/core";
import { QuestionsComponent } from './questions.component';
import { QuesDetailsComponent } from './ques-details/ques-details.component';
import { QuestionListComponent } from "./question-list/question-list.component";
import { MaterialModule } from "../material.module";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared.module";
import { QueRoutingModule } from './questions-routing.module';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        QuesDetailsComponent,
        QuestionsComponent,
        QuestionListComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        RouterModule,
        QueRoutingModule
    ]
})
export class QuestionsModule {}