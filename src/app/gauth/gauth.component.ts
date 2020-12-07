import { Component, OnInit } from '@angular/core';
import { DataService } from './../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { NetworkError } from './../error/network-error';
import { AppError } from './../error/app-error';
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

  constructor(private router:Router, private authService: AuthService, 
    private postService: DataService, private SEO: SeoService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/level']);
    }
    this.route.queryParamMap.subscribe(params => {
      this.code = params.get('code');
    });
    // Set Title
    this.SEO.setTitle('Sign in with Google');

    // Check if code is received
    if(this.validCode(this.code)) {
      // Sign in
      this.signIn(this.code);
    }
    else {
      this.invalidSignin = true;
      this.errMsg = 'Error occurred retrieving credentials!';
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
      else {
        this.errMsg = res.err;
        this.invalidSignin = true;
      }
    },
    (error:AppError) => {
      this.invalidSignin = true;
      this.loading = false;
      if(error instanceof NetworkError)
        throw 'No Internet!';
      else
        throw 'Unexpected Error Occured!';
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
