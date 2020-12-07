import { UnauthorisedError } from './../error/unauth';
import { BadInput } from './../error/bad-input';
import { SeoService } from './../services/seo.service';
import { ToastService } from './../services/toast.service';
import { NetworkError } from './../error/network-error';
import { AppError } from './../error/app-error';
import { DataService } from './../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  httpSubscription;
  levelid;
  loading: boolean = true;
  sloading: boolean;
  eligibility = localStorage.getItem('level');
  queres;
  ansres;
  timeout: boolean;
  x;
  qtans;
  duration;
  errFlag: boolean;
  ans_arr:number[] = [];
  cans:number[] = [];

  constructor(public authService: AuthService, 
      private dataService: DataService, 
      private toast: ToastService,
      private router: Router, 
      private SEO: SeoService,
      private route: ActivatedRoute) 
      {
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
      }
   }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.levelid = +params.get('levelid');
    });

    this.getQuestion();
  }

  getQuestion() {
    this.clearParams();
    let url = 'https://www.iqlevel.net/api/get-question';
    let data = {'level':this.levelid};
    this.httpSubscription = this.dataService.authpost(url, data).subscribe(res => {
      this.loading = false;
      if(res.status == 1) {
        this.queres = res;
        if(res.time) {
          this.duration = res.time;
          this.cTimer();
          this.SEO.setTitle(this.stripHtml(res.question.question));
        }
      }
      else {
        this.errFlag = true;
        if(res.status == 204) {
          //NO QUESTIONS
          this.next();
        }
        throw res.err;
      }
    },
    (error: AppError) => {
      this.errFlag = true;
      this.loading = false;
      if(error instanceof NetworkError)
        throw 'No Internet!';
      else if(error instanceof UnauthorisedError)
        this.authService.logout();
      else
        throw 'Unexpected Error Occured!';
    });
  }

  submitAns() {
    let url = 'https://www.iqlevel.net/api/answer';
    let pdata:any = {};
    pdata.level = this.levelid;
    pdata.qid = this.queres.question.qid;
    if(this.queres.question.optiontype == 1) {
      if(this.queres.question.anstype == 1 && this.ans_arr.length != 1) 
        throw 'Please Select an Answer!';
      if(this.queres.question.anstype == 2 && this.ans_arr.length != 2) 
        throw 'Please Select 2 Answers!';
      pdata.ans = this.ans_arr;
    }
    if(this.queres.question.optiontype == 2) {
      if(this.qtans === '' || this.qtans == null) 
        throw 'Answer Cannnot be Empty!';
      pdata.ans = this.qtans;
    }
    if(this.queres.time) {
      pdata.token = this.queres.queToken;
    }

    //CLEAR TIMEOUTS
    this.timeout = false;
    this.duration = null;
    clearInterval(this.x);
    //FLAG
    this.sloading = true;

    this.httpSubscription = this.dataService.authpost(url, pdata).subscribe(res => {
      this.sloading = false;
      if(res.status == 1) {
        this.ansres = res;
        this.cans = this.ansres.correctAns.split(' ');
        localStorage.setItem('level', this.ansres.eligibility);
        this.eligibility = this.ansres.eligibility;
        //SET IQ SCORE IN LOCALSTORAGE
        this.authService.setUserScore = this.ansres.score;
      }
      else {
        throw res.err;
      }
    },
    (error: AppError) => {
      this.sloading = false;
      if(error instanceof BadInput)
        throw 'Bad Input';
      if(error instanceof NetworkError)
        throw 'No Internet!';
      if(error instanceof UnauthorisedError)
        this.authService.logout();
      throw 'Unexpected Error Occured!';
    });
  }

  selAns(id) {
    if(this.ans_arr.indexOf(id) == -1)
      this.ans_arr.push(id);
    let max = this.queres.question.anstype;
    if(this.ans_arr.length > max) {
      this.ans_arr.shift();
    }
  }

  cTimer() {
    this.x = setInterval(()=> { this.timer(); }, 1000);
  }

  timer() { 
    let timer = this.duration, minutes, seconds;
        minutes = (timer / 60);
        seconds = (timer % 60);

        minutes = Math.trunc(minutes);
        seconds = Math.trunc(seconds);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById('cTimer').textContent = minutes + ":" + seconds;

        if (--timer < 0) {
           this.timeout = true;
           this.getQuestion();
           clearInterval(this.x);
        }
        if(timer == 10) {
          this.toast.warningMsg('Less Than 10 Sec Left!', 'Warning');
        }
        --this.duration;
  }

  next() {
    if(this.eligibility > this.levelid) {
      this.router.navigate(['/level/' + (this.levelid + 1)]);
    }
    else return;
  }

  ngOnDestroy() {
    this.clearParams();
  }

  clearParams() {
    if(this.httpSubscription)
      this.httpSubscription.unsubscribe();
    this.timeout = false;
    this.duration = null;
    clearInterval(this.x);
    this.loading = true;
    this.sloading = false;
    this.qtans = null;
    this.queres = null;
    this.ansres = null;
    this.errFlag = false;
    this.ans_arr.length = 0;
    this.cans.length = 0;
  }

  stripHtml(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
  }

  reload() {
    location.reload();
  }
}
