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
  selector: 'app-iq-test',
  templateUrl: './iq-test.component.html',
  styleUrls: ['./iq-test.component.css']
})
export class IqTestComponent implements OnInit {

  httpSubscription;
  test_key;
  loading: boolean = true;
  sloading: boolean;
  queres;
  ansres;
  timeout: boolean;
  x;
  qtans;
  duration;
  errFlag: boolean;
  ans_arr:number[] = [];
  answered:number[] = [];
  qno;
  current;

  constructor(public authService: AuthService, 
      private dataService: DataService, 
      private toast: ToastService,
      private router: Router, 
      private SEO: SeoService) 
      { }

  ngOnInit(): void {

    this.getQuestion();
  }

  getQuestion() {
    this.clearParams();
    let url = 'https://www.iqlevel.net/api/get-iq-question';
    this.httpSubscription = this.dataService.authget(url).subscribe(res => {
      this.loading = false;
      if(res.status == 1) {
        this.queres = res;
        this.test_key = res.tkey;
        if(res.time) {
          this.duration = res.time;
          this.qno = res.questions.length;
          this.current = 0;
          this.cTimer();
          this.SEO.setTitle(this.stripHtml(res.questions[this.current].question));
        }
      }
      else {
        this.errFlag = true;
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
    let url = 'https://www.iqlevel.net/api/iq-answer';
    let pdata:any = {};
    pdata.qid = this.queres.questions[this.current].qid;
    pdata.qno = (this.current + 1);
    if(this.queres.questions[this.current].optiontype == 1) {
      if(this.queres.questions[this.current].anstype == 1 && this.ans_arr.length != 1) 
        throw 'Please Select an Answer!';
      if(this.queres.questions[this.current].anstype == 2 && this.ans_arr.length != 2) 
        throw 'Please Select 2 Answers!';
      pdata.ans = this.ans_arr;
    }
    if(this.queres.questions[this.current].optiontype == 2) {
      if(this.qtans === '' || this.qtans == null) 
        throw 'Answer Cannnot be Empty!';
      pdata.ans = this.qtans;
    }
    if(this.queres.time) {
      pdata.token = this.queres.testToken;
    }

    //FLAG
    this.sloading = true;

    this.httpSubscription = this.dataService.authpost(url, pdata).subscribe(res => {
      this.sloading = false;
      if(res.status == 1) {
        this.ansres = res;
        if(this.answered.indexOf(this.current) == -1)
          this.answered.push(this.current);
        this.next();
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
    if(this.sloading) return;
    if(this.ans_arr.indexOf(id) == -1)
      this.ans_arr.push(id);
    let max = this.queres.questions[this.current].anstype;
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
           clearInterval(this.x);
           this.router.navigate(['result']);
        }
        if(timer == 10) {
          this.toast.warningMsg('Less Than 10 Sec Left!', 'Warning');
        }
        --this.duration;
  }

  next() { 
    if(this.sloading) return;
    if(this.current >= (this.qno - 1)) {
      return;
    }
    this.qtans = null;
    this.ansres = null;
    this.ans_arr.length = 0;
    this.current++;
    this.SEO.setTitle(this.stripHtml(this.queres.questions[this.current].question));
  }

  selQue(i) {
    if(this.sloading) return;
    if(i > (this.qno - 1)) {
      return;
    }
    this.qtans = null;
    this.ansres = null;
    this.ans_arr.length = 0;
    this.current = i;
    this.SEO.setTitle(this.stripHtml(this.queres.questions[this.current].question));
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
    this.answered.length = 0;
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
