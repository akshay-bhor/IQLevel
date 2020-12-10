import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SeoService } from './../services/seo.service';

@Component({
  selector: 'continue',
  templateUrl: './continue.component.html',
  styleUrls: ['./continue.component.css']
})
export class ContinueComponent implements OnInit {

  constructor(private router: Router, 
    private SEO: SeoService) { }

  ngOnInit(): void {
    this.SEO.setTitle('Continue As');
  }

}
