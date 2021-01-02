import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading: boolean = false;
  httpSubscription;
  successMsg:string;

  constructor(public authService: AuthService, 
    private SEO: SeoService,
    private postService: DataService) { 

    this.form = new FormGroup({
      opass : new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      npass: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      cpass: new FormControl('', [
        Validators.required
      ])
    });
    this.form.setValidators(this.comparePassword("npass", "cpass"));
  }

  ngOnInit(): void {
    this.SEO.setTitle("Account");
  }

  cPass() {
    this.loading = true;
    let url = "https://www.iqlevel.net/api/register/changepass";

    this.httpSubscription = this.postService.authpost(url, this.form.value).subscribe(res => {
      this.loading = false;
      if(res.status == 1) {
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token);
        this.successMsg = 'Password Updated Successfully!';
      }
      else {
        throw res.err;
      }
    },
    (error: Error) => {
      this.loading = false;

      throw error;
    }
    )
  }

  get f() {
    return this.form.controls;
  } 

  comparePassword(npass, cpass): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const control = formGroup.controls[npass];
      const matchControl = formGroup.controls[cpass];

      if (matchControl.errors && !matchControl.errors.mustMatch) {
        return;
      }
  
      if (control.value !== matchControl.value) {
        matchControl.setErrors({ mustMatch: true });
      } else {
        matchControl.setErrors(null);
      }
    };
  }

  ngOnDestroy() {
    if(this.httpSubscription)
      this.httpSubscription.unsubscribe();
  }
}
