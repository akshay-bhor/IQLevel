import { flatten } from '@angular/compiler';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { ScriptService } from '../services/script.service';
import { SeoService } from '../services/seo.service';

declare let Layer:any;
declare let callVerification:Function;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  amt: number;
  httpSubscription: Subscription;
  loading: boolean = false;
  returnUrl:string;
  payment_id: string;
  accessKey: string;
  payment_token: object;
  hash: string; 
  errFlag:boolean = false;
  verifyErr: boolean = false;
  scriptLoaded:boolean = false;
  tokenLoaded: boolean = false;
  verifyProgress: boolean = false;
  verificationData: any = {};
  verifyMsg:string;

  constructor(private SEO: SeoService, 
    private dataService: DataService, 
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private script: ScriptService) {
      this.script.load('layer').then(data => {
        this.scriptLoaded = true
      })
      .catch(err => {
        this.scriptLoaded = false
        throw 'Error Importing Javascript Resources!';
      });
    }

  ngOnInit(): void {
    this.SEO.setTitle('Payment');

    // Get return URL
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    //Get Info
    this.getInfo();
    //Expose componenet method globally
    window['angularComponentReference'] = { component: this, zone: this.ngZone, callVerification: (data) => this.verifyPayment(data), }; 
  }

  getInfo() {
    this.clearParams();
    this.loading = true;
    let url = "https://www.iqlevel.net/api/payment/info";
    this.httpSubscription = this.dataService.authget(url).subscribe(res => {
      this.loading = false;
      if(res.status == 1) {
        this.amt = res.payment_token.amount;
        this.payment_token = res.payment_token;
        this.accessKey = res.access_key;
        this.hash = res.hash;
        this.payment_id = res.payment_token.id;
        this.tokenLoaded = true;
      }
      else if(res.status == 2) {
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token);
        this.router.navigate([this.returnUrl || '/iq-test/history'])
      }
      else {
        this.errFlag = true;
        throw res.err;
      }
    },
    (error) => {
      this.errFlag = true;
      this.loading = false;
      throw error;
    });
  }

  pay() {
    if(!this.tokenLoaded || !this.scriptLoaded) return
    
    Layer.checkout({
      token: this.payment_id,
      accesskey: this.accessKey
    },
    function(response) {
      if (response.status == "captured") {
        //Verify Payment
        // As we are outside angular zone so call outside function (custom.js) which will call inside function
        callVerification(response);
      } else if (response.status == "created") {
        
      } else if (response.status == "pending") {
        throw 'Payment Pending!';
      } else if (response.status == "failed") {
        throw 'Payment failed, please retry or contact support!'
      } else if (response.status == "cancelled") {
        throw 'Payment Cancelled!'
      }
    },
    function(err) {
        //integration errors
        throw 'Integration Error!'
    }
    );
  }

  verifyPayment(pData) {
    this.clearParams();
    this.loading = true;
    this.verifyProgress = true;
    pData.hash = this.hash;
    let url = "https://www.iqlevel.net/api/payment/verify";
    this.httpSubscription = this.dataService.authpost(url, pData).subscribe(res => {
      this.loading = false;
      this.verifyProgress = false;
      if(res.status == 1 && (res.payment_status == 'captured' || res.payment_status == 'authorized')) {
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token);
        this.router.navigate([this.returnUrl || '/iq-test/history'])
      }
      else {
        this.verifyErr = true;
        this.verifyMsg = res.err || res.msg;
        throw res.err;
      }
    },
    (error) => {
      this.verifyErr = true;
      this.verifyMsg = error;
      this.loading = false;
      this.verifyProgress = false;
      throw error;
    });
  }

  reload() {
    location.reload();
  }

  clearParams() {
    if(this.httpSubscription)
      this.httpSubscription.unsubscribe();
    this.errFlag = false;
    this.loading = false;
    this.verifyProgress = false;
    this.verifyErr = false;
    this.verifyMsg = ''
  }

  ngOnDestroy() {
    this.clearParams();
  }
}
