import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-iq-test-history',
  templateUrl: './iq-test-history.component.html',
  styleUrls: ['./iq-test-history.component.css']
})
export class IqTestHistoryComponent implements OnInit, OnDestroy {
  @Input() setTitle: boolean = true;
  httpSubscription;
  loading: boolean = true;
  errFlag: boolean = false;
  tdata;
  iqavg = 'NA';
  errMsg: string = '';

  constructor(
    private dataService: DataService,
    private SEO: SeoService
    ) { }

  ngOnInit(): void {
    if(this.setTitle)
      this.SEO.setTitle('IQ Tests History');

    //Fetch History
    this.getIqHistory();
  }

  getIqHistory() {
    this.clearParams();
    this.loading = true;
    let url = "https://www.iqlevel.net/api/iq-tests-history";
    this.httpSubscription = this.dataService.authget(url).subscribe(res => {
      this.loading = false;
      if(res.status == 1) {
        this.tdata = res;
        this.iqavg = this.tdata.avg;
      }
      else {
        this.errFlag = true;
        this.errMsg = res.err;
      }
    },
    (error) => {
      this.errFlag = true;
      this.loading = false;
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
    this.errMsg = '';
    this.loading = false;
  }
}
