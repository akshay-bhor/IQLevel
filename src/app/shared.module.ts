import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ContinueDialogComponent } from "./continue-dialog/continue-dialog.component";
import { ContinueComponent } from "./continue/continue.component";
import { SigninOptionsComponent } from "./continue/signin-options/signin-options.component";
import { MaterialModule } from "./material.module";
import { QueSkeletonComponent } from "./que-skeleton/que-skeleton.component";

@NgModule({
    declarations: [
        QueSkeletonComponent,
        ContinueComponent,
        SigninOptionsComponent,
        ContinueDialogComponent,
    ],
    imports:[
        RouterModule,
        MaterialModule
    ],
    exports: [
        QueSkeletonComponent,
        ContinueComponent,
        SigninOptionsComponent,
        ContinueDialogComponent
    ]
})
export class SharedModule {}