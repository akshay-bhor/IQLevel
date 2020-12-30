import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-iq-test-analysis',
  templateUrl: './iq-test-analysis.component.html',
  styleUrls: ['./iq-test-analysis.component.css']
})
export class IqTestAnalysisComponent implements OnInit, OnDestroy {
  test_key: string;
  loading: boolean = true;
  httpSubscription;
  postData: any = {};
  errFlag: boolean = false;
  queData;
  panelOpenState:boolean = false;

  constructor(
    private SEO: SeoService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //Set title
    this.SEO.setTitle("IQ Test Analysis");

    // Get route Params
    this.route.paramMap.subscribe(params => {
      this.test_key = params.get('tkey');
    })

    // Get Analysis from api
    this.getAnalysis();
  }

  getAnalysis() {
    this.clearParams();

    this.postData.tkey = this.test_key;
    let url = "https://www.iqlevel.net/api/iq-analysis";

    this.httpSubscription = this.dataService.authpost(url, this.postData).subscribe(res => {
      this.loading = false;
      if(res.status == 1) {
        this.queData = res;
      }
      else {
        this.errFlag = true;
        throw res.err;
      }
    },
    (error: Error) => {
      this.errFlag = true;
      this.loading = false;
      // if(error instanceof NetworkError)
      //   throw 'No Internet!';
      // else if(error instanceof UnauthorisedError)
      //   this.authService.logout();
      // else if(error instanceof GatewayTimeoutError)
      //   throw 'Request Timed Out!';
      // else
        throw error;
    });
  }

  ngOnDestroy() {
    this.clearParams();
  }

  clearParams() {
    if(this.httpSubscription)
      this.httpSubscription.unsubscribe();
    this.errFlag = false;
  }
}
