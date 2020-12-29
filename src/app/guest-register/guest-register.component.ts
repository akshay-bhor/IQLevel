import { AgeValidator } from './../register/age.validators';
import { UnameValidator } from './../register/uname.validators';
import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SeoService } from './../services/seo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'guest-register',
  templateUrl: './guest-register.component.html',
  styleUrls: ['./guest-register.component.css']
})
export class GuestRegisterComponent implements OnInit {
  invalidRegister:boolean;
  formError: any;
  loading:boolean;
  url: string;

  constructor(private router: Router, private SEO: SeoService, private postService: DataService) { }

  ngOnInit(): void {
    this.SEO.setTitle('Guest Register');
  }

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UnameValidator.words
    ]),
    age: new FormControl('', [
      Validators.required,
      AgeValidator.ageGroup
    ])
  })

  register() {
    this.loading = true;
    this.invalidRegister = false;
    this.url = 'https://www.iqlevel.net/api/register/guest';

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
    (error) => {
      this.loading = false;
      // if(error instanceof BadInput) {
      //   //TOAST HERE
      // }
      // else if(error instanceof NetworkError) {
      //   alert('No Internet!');
      // }
      throw error;
    });
  }

  get name() {
    return this.form.get('name');
  }
  get age() {
    return this.form.get('age');
  }
}
