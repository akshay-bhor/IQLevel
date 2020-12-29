import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-iq-test-history',
  templateUrl: './iq-test-history.component.html',
  styleUrls: ['./iq-test-history.component.css']
})
export class IqTestHistoryComponent implements OnInit, OnDestroy {
  httpSubscription;
  loading: boolean = true;
  errFlag: boolean = false;
  tdata;

  constructor(
    private dataService: DataService,
    private SEO: SeoService
    ) { }

  ngOnInit(): void {
    this.SEO.setTitle('IQ Tests History');

    //Fetch History
    this.getIqHistory();
  }

  getIqHistory() {
    let url = "https://www.iqlevel.net/api/iq-tests-history";
    this.httpSubscription = this.dataService.authget(url).subscribe(res => {
      this.loading = false;
      if(res.status == 1) {
        this.tdata = res;
      }
      else {
        this.errFlag = true;
        throw res.err;
      }
    },
    (error) => {
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
