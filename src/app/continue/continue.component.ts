import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SeoService } from './../services/seo.service';
import { OauthProviderService } from '../services/oauth-provider.service';

@Component({
  selector: 'continue',
  templateUrl: './continue.component.html',
  styleUrls: ['./continue.component.css']
})
export class ContinueComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, 
    private SEO: SeoService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/level']);
    }
    this.SEO.setTitle('Continue As');
  }

}
