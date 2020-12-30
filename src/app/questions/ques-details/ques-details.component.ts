import { ContinueDialogComponent } from '../../continue-dialog/continue-dialog.component';
import { SeoService } from '../../services/seo.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ques-details',
  templateUrl: './ques-details.component.html',
  styleUrls: ['./ques-details.component.css']
})
export class QuesDetailsComponent implements OnInit {
  qid;
  question;
  queres;
  errFlag:boolean;
  loading:boolean;
  ans_arr:number[] = [];
  httpSubscription;

  constructor(
    private dataService: DataService, 
    private SEO: SeoService,
    private router: Router,
    public dialog: MatDialog,
    private route:ActivatedRoute) { 
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
      }
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.qid = params.get('qid');
      this.question = params.get('que');
    });
    // this.setTitle(this.question);
    // this.getQuestion(this.qid);
    
    //GET Data from resolver
    this.route.data.subscribe((data: Data) => {
      this.queres = data['queData'];

      this.loadQueData();
    })
  }

  loadQueData() {
      if(this.queres.status == 1) {
        // Set Title
        this.setTitle(this.queres.title);

        // Set Description
        if(this.queres.desc) this.setDesc(this.queres.desc);

        // If question has image set og:image meta tag
        if(this.queres.question.questiontype == 2 || this.queres.question.questiontype == 3) {
          this.SEO.setOGImg('https://www.iqlevel.net/uploads/questions/' + this.queres.question.queimg[0]);
        }
      }
      else {
        this.errFlag = true;
        throw this.queres.err;
      }
  }

  // getQuestion(queid) {
  //   this.loading = true;
  //   this.clearParams();
  //   let url = 'https://www.iqlevel.net/api/que-details';
  //   let data:any = {};
  //   data.qid = queid;
  //   this.httpSubscription = this.dataService.post(url, data).subscribe(res => {
  //     this.loading = false;
  //     if(res.status == 1) {
  //       this.queres = res;
  //       if(res.desc) this.setDesc(res.desc);

  //       // If question has image set og:image meta tag
  //       if(this.queres.question.questiontype == 2 || this.queres.question.questiontype == 3) {
  //         this.SEO.setOGImg('https://www.iqlevel.net/uploads/questions/' + this.queres.question.queimg[0]);
  //       }
  //     }
  //     else {
  //       this.errFlag = true;
  //       throw res.err;
  //     }
  //   },
  //   (error: AppError) => {
  //     this.errFlag = true;
  //     this.loading = false;
  //     if(error instanceof NetworkError)
  //       throw 'No Internet!';
  //     else
  //       throw 'Unexpected Error Occured!';
  //   });
  // }

  openDialog() {
    const dialogRef = this.dialog.open(ContinueDialogComponent, {
      maxWidth: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  selAns(id) {
    this.ans_arr.push(id);
    let max = this.queres.question.anstype;
    if(this.ans_arr.length > max) {
      this.ans_arr.shift();
    }
  }

  setTitle(t) {
    this.SEO.setTitle(t);
  }

  setDesc(d) {
    this.SEO.setDesc(d);
  }

  reload() {
    location.reload();
  }

  ngOnDestroy() {
    this.clearParams();
    this.dialog.closeAll();
  }

  clearParams() {
    if(this.httpSubscription)
      this.httpSubscription.unsubscribe();
    this.qid = null;
    this.question = null;
    this.loading = true;
    this.queres = null;
    this.errFlag = false;
    this.ans_arr.length = 0;
  }
}
