import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-signin-complete',
  templateUrl: './signin-complete.component.html',
  styleUrls: ['./signin-complete.component.css']
})
export class SigninCompleteComponent implements OnInit {
  returnUrl: string = ''
  loading: boolean = false;
  invalidRegister: boolean = false;
  url: string;
  formError:string;
  form: FormGroup;

  constructor(
    private SEO: SeoService,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute
  ) { 
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }

  ngOnInit(): void {
    this.SEO.setTitle('Complete SignIn');

    //Set Return URL
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  register() {
    this.loading = true;
    this.invalidRegister = false;
    this.url = 'https://www.iqlevel.net/api/register/complete';
    this.dataService.authpost(this.url, this.form.value).subscribe(res => {
      if(res.status == 1) {
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token);
        this.router.navigate([this.returnUrl || '/level']);
      }
      else {
        this.invalidRegister = true;
        this.formError = res.err;
      }
      this.loading = false;
    },
    (error) => {
      this.loading = false;
      throw error;
    });
  }

  get f() {
    return this.form.controls;
  }
}
