import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from './../services/seo.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, private route: Router, private SEO: SeoService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.route.navigate(['/level']);
    }

    // Set title
    this.SEO.setDesc('Take the most accurate Online IQ Test. Find out your IQ Level with IQ Test Questions and Answers. Find IQ Score. Free IQ Test. Play IQ Game, Solve IQ Puzzles & Boost Your IQ.');
    this.SEO.setTitle('Take Free IQ Test Online, Play IQ Quiz Game & Boost IQ ');
  }


}
