import { Component, OnInit } from '@angular/core';
import { DataService } from './../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from './../services/seo.service';

@Component({
  selector: 'app-gauth',
  templateUrl: './gauth.component.html',
  styleUrls: ['./gauth.component.css']
})
export class GauthComponent implements OnInit {
  invalidSignin:boolean;
  loading:boolean;
  code:string;
  errMsg:string;
  httpSubscription;
  dobprompt;
  needDob: boolean = false;
  formError;
  invalidData: boolean = false;

  constructor(private router:Router, 
    private postService: DataService, private SEO: SeoService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      //Check Whether navigation from oauth or one-tap

      // Oauth
      this.code = params.get('code');
      
      // One Tap
      this.dobprompt = params.get('birthday');
    });
    // Set Title
    this.SEO.setTitle('Sign in with Google');

    // Check if code is received
    if(this.code && this.validCode(this.code)) {
      // Sign in
      this.signIn(this.code);
    }
    else {
      // Check if prompt for birthday
      if(this.dobprompt == 'true') {
        this.needDob = true;
      }
      else {
        this.invalidSignin = true;
        this.errMsg = 'Error occurred retrieving credentials!';

        setTimeout(() => {
          this.router.navigate['/continue'];
        }, 2000)
      }
    }
    
  }

  signIn(code) {
    this.loading = true;
    this.clearParams();
    let postData:any = {};
    postData.code = code;

    let url = 'https://www.iqlevel.net/api/social-signin/google';
    this.httpSubscription = this.postService.post(url, postData).subscribe(res => {
      this.loading = false;
      if(res.status == 1) {
        this.invalidSignin = false;
        localStorage.setItem('token', res.token);
        if(res.level)
          localStorage.setItem('level', res.level);
        else
          localStorage.setItem('level', '1');

        //Navigate to app
        this.router.navigate(['/level']);
      }
      else if(res.status == 2) {
        // Birthday fail
        this.needDob = true;
      }
      else {
        this.errMsg = res.err;
        this.invalidSignin = true;
      }
    },
    (error) => {
      this.invalidSignin = true;
      this.loading = false;
      // if(error instanceof NetworkError)
      //   throw 'No Internet!';
      // else
      //   throw 'Unexpected Error Occured!';
      throw error;
    });
  }

  postDob(data) {
    this.loading = true;
    this.clearParams();

    let url = 'https://www.iqlevel.net/api/social-signin/google-sign-in';
    this.httpSubscription = this.postService.post(url, data).subscribe(res => {
      this.loading = false;
      if(res.status == 1) {
        this.invalidSignin = false;
        localStorage.setItem('token', res.token);
        if(res.level)
          localStorage.setItem('level', res.level);
        else
          localStorage.setItem('level', '1');

        //Navigate to app
        this.router.navigate(['/level']);
      }
      else {
        this.formError = res.err;
        this.invalidData = true;
      }
    },
    (error) => {
      this.invalidData = true;
      this.loading = false;
      // if(error instanceof NetworkError)
      //   throw 'No Internet!';
      // else
      //   throw 'Unexpected Error Occured!';
      throw error;
    });

  }

  validCode(code) {
    if(code.length > 10) return true;
    else return false;
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
