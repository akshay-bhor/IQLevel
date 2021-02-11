import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { PaymentRoutingModule } from "./payment-routing.module";
import { PaymentComponent } from "./payment.component";


@NgModule({
    declarations: [
        PaymentComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        PaymentRoutingModule
    ]
})

export class PaymentModule {}