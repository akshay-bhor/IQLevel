import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../services/auth-guard.service";
import { AccountComponent } from "./account/account.component";

const Routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        canActivate: [AuthGuardService]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(Routes)
    ],
    exports: [RouterModule]
})
export class AccountRoutingModule {}