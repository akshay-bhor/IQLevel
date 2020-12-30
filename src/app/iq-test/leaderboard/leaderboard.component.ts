import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  page: number = 1;
  httpSubscription;
  postData: any = {};
  rankings: any = {};
  loading: boolean = true;
  errFlag: boolean;
  hasNext:boolean = true;

  constructor(
    public authService: AuthService,
    private SEO: SeoService,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    this.SEO.setTitle('LeaderBoard');
    this.getRankData();
  }

  getRankData() {
    this.clearParams();
    this.postData.p = this.page;

    let url = "https://www.iqlevel.net/api/get-rank";
    this.httpSubscription = this.dataService.authpost(url, this.postData).subscribe(res => {
      this.loading = false;
      if(res.status == 1) {
        if(this.postData.p == 1) {
          // Assign
          this.rankings = res;
          this.hasNext = res.hasNext;
        }
        else {
          // Append
          Array.prototype.push.apply(this.rankings.rankData, res.rankData);
          // this.rankings.rankData.concat(res.rankData);
          this.hasNext = res.hasNext;
        }
        this.page++;
      }
      else {
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
      // else
        throw error;
    });
  }

  next() {
    this.clearParams();
    this.getRankData();
  }

  ngOnDestroy() {
    this.clearParams();
  }

  clearParams() {
    if(this.httpSubscription)
      this.httpSubscription.unsubscribe();
    this.loading = true;
    this.errFlag = false;
  }

}
