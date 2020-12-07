import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  sidebarToggle(chk = 0) {
    if(chk == 0) {
      document.getElementById('wrapper').classList.toggle('toggled');
      document.getElementById('backdrop').classList.toggle('backdrop');
    }
    else {
      //CHECK IF NEED TO TOGGLE
      if(document.getElementById('wrapper').classList.contains('toggled') ||
      document.getElementById('backdrop').classList.contains('backdrop')) {
        document.getElementById('wrapper').classList.toggle('toggled');
        document.getElementById('backdrop').classList.toggle('backdrop');
      }
    }
  }
}
