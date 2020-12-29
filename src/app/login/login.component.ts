import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SeoService } from './../services/seo.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin:boolean;
  loading:boolean;

  constructor(private router:Router, private service: AuthService, private SEO: SeoService) { }

  ngOnInit(): void {
    this.SEO.setTitle('Login');
    if(this.service.isLoggedIn()) {
      this.router.navigate(['/level']);
    }
  }

  login(data) { 
    this.loading = true;
    this.service.login(data).subscribe(res => {
      if(res) {
        this.router.navigate(['/level']);
      }
      else {
        this.invalidLogin = true;
        this.loading = false;
      }
    },
    (error) => {
      this.loading = false;
      throw error;
    });
  }
}
