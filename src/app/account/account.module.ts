import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { AccountRoutingModule } from "./account-routing.module";
import { AccountComponent } from "./account/account.component";

@NgModule({
    declarations:[
        AccountComponent
    ],
    imports:[
        MaterialModule,
        CommonModule,
        RouterModule,
        FormsModule, 
        ReactiveFormsModule,
        AccountRoutingModule
    ]
})
export class AccountModule {}