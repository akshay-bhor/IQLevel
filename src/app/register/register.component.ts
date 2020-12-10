import { NetworkError } from './../error/network-error';
import { DataService } from './../services/data.service';
import { BadInput } from './../error/bad-input';
import { AppError } from './../error/app-error';
import { AgeValidator } from './age.validators';
import { UnameValidator } from './uname.validators';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SeoService } from './../services/seo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  invalidRegister:boolean;
  formError: any;
  loading:boolean;
  url: string;

  constructor(private router: Router, private SEO: SeoService, private postService: DataService) { }

  ngOnInit(): void {
    this.SEO.setTitle('Register');
  }

  form = new FormGroup({
    uname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UnameValidator.noSpace,
      UnameValidator.alfanum
    ]
    ),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    age: new FormControl('', [
      Validators.required,
      AgeValidator.ageGroup
    ]),
    pass: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  })

  register() {
    this.loading = true;
    this.invalidRegister = false;
    this.url = 'https://www.iqlevel.net/api/register/';
    this.postService.post(this.url, this.form.value).subscribe(res => {
      if(res.status == 1) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('level', '1');
        this.router.navigate(['/level']);
      }
      else {
        this.invalidRegister = true;
        this.formError = res.err;
      }
      this.loading = false;
    },
    (error: AppError) => {
      this.loading = false;
      if(error instanceof BadInput) {
        throw 'Bad Input!';
      }
      else if(error instanceof NetworkError) {
        throw 'No Internet!';
      }
      else throw 'Unexpected Error Occured!';
    });
  }

  get uname() {
    return this.form.get('uname');
  }
  get email() {
    return this.form.get('email');
  }
  get age() {
    return this.form.get('age');
  }
  get pass() {
    return this.form.get('pass');
  }
}
