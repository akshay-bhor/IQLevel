import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../services/auth-guard.service";
import { SignupCompleteGuardService } from "../services/signup-complete-guard.service";
import { PaymentComponent } from "./payment.component";

const Routes: Routes = [
    { path: '', component: PaymentComponent, canActivate: [AuthGuardService, SignupCompleteGuardService] }
];

@NgModule({
imports:[
    RouterModule.forChild(Routes)
],
exports:[
    RouterModule
]
})

export class PaymentRoutingModule {}