import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SeoService } from './../../services/seo.service';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})
export class LevelListComponent implements OnInit {
  levels = [1,2,3,4,5,6,7,8,9,10];
  uLevel = localStorage.getItem('level');
  cLevel = localStorage.getItem('clevel');

  constructor(public authService: AuthService, private route: Router, private SEO: SeoService) { }
  
  ngOnInit(): void {
    this.setTitle();
    if(this.uLevel === '' || this.uLevel == null) {
      localStorage.setItem('level', '1');
      this.uLevel = localStorage.getItem('level');
    }
  }

  setTitle() {
    this.SEO.setTitle('Levels');
  }

  routeTo(lvl) { 
    if(lvl <= this.uLevel) {
      this.route.navigate(['/level/', lvl]);
    }
    else {
      return;
    }
  }

}
