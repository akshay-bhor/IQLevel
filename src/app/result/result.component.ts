import { UnauthorisedError } from './../error/unauth';
import { NetworkError } from './../error/network-error';
import { AppError } from './../error/app-error';
import { SeoService } from './../services/seo.service';
import { DataService } from './../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  loading:boolean;
  err:boolean;
  data;
  test_key;
  httpSubscription;

  constructor(public authService: AuthService, 
    private route: ActivatedRoute, 
    private dataService: DataService,
    private SEO: SeoService) { }

  ngOnInit(): void {
    this.SEO.setTitle('Your IQ Score');

    this.route.paramMap.subscribe(params => {
      this.test_key = params.get('test_key');

      // Get Score
      this.getScore();
    });

  }

  getScore() {
    this.loading = true;
    this.err = false;
    let postData:any = {};
    postData.tkey = this.test_key;

    let url = 'https://www.iqlevel.net/api/get-iq';
    this.httpSubscription = this.dataService.authpost(url, postData).subscribe(res => {
      this.loading = false;
      if(res.status == 1) {
        this.data = res;
        //SET SCORE
        // this.authService.setUserScore = this.data.score;
      }
      else {
        this.err = true;
        throw res.err;
      }
    },
    (error: AppError) => {
      this.loading = false;
      this.err = true;
      if(error instanceof NetworkError)
        throw 'No Internet!';
      else if(error instanceof UnauthorisedError)
        this.authService.logout();
      else
        throw 'Unexpected Error Occured!';
    });
  }

  ngOnDestroy() {
    this.clearParams();
  }

  clearParams() {
    if(this.httpSubscription)
      this.httpSubscription.unsubscribe();
    this.loading = true;
  }

}
