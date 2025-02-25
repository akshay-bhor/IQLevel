import { ActivatedRoute, Data, Router } from '@angular/router';
import { SeoService } from './../../services/seo.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  que;
  page;
  httpSubscription;
  storeSubs;
  loading:boolean = true;
  hasNext:boolean = true;
  errFlag:boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.appState>,
    private SEO: SeoService) { 
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
      }
    }

  ngOnInit(): void { 
    this.SEO.setTitle('Questions');

    this.route.queryParamMap.subscribe(params => {
      if(+params.get('p') != 0)
        this.page = +params.get('p');
      else
        this.page = 1;
      //GET QUESTIONS
      // this.route.data.subscribe((data: Data) => {
      //   this.clearParams();
      //   this.que = data['ques'];

      //   this.loadQues();
      // })
      this.storeSubs = this.store.select('quesList').pipe(take(1)).subscribe(queData => {
        this.que = queData.pageData[this.page];
        this.loading = false
      })
    });

  }

  loadQues() {

    if(this.que.status == 1) {
      this.hasNext = this.que.hasNext;
    }
    else {
      this.errFlag = true;
      throw this.que.err;
    }
  }

  // getQuestions(p) { 
  //   if(this.loading) return;
  //   if(!this.hasNext) return;
  //   this.clearParams();
  //   let data:any = {};
  //   data.p = p;
  //   let url = 'https://www.iqlevel.net/api/questions';
  //   this.loading = true;

  //   this.httpSubscription = this.dataService.post(url, data).subscribe(res => {
  //     this.loading = false;
  //     if(res.status == 1) {
  //       this.que = res;
  //       this.hasNext = res.hasNext;
  //     }
  //     else {
  //       this.errFlag = true;
  //       throw res.err;
  //     }
  //   },
  //   (error: AppError) => {
  //     this.loading = false;
  //     this.errFlag = true;
  //     if(error instanceof NetworkError)
  //       throw 'No Internet';
  //     throw 'Unexpected Error Occurred!';
  //   }
  //   );
  // }

  ngOnDestroy() {
    this.clearParams();
  }

  reload() {
    location.reload();
  }

  clearParams() {
    if(this.httpSubscription)
      this.httpSubscription.unsubscribe();
    if(this.storeSubs)
      this.storeSubs.unsubscribe();
    this.loading = false;
    this.que = null;
    this.errFlag = false;
  }
}
