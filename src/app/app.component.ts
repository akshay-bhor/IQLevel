import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { SwupdateService } from './services/swupdate.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

declare let gtag:Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routeHome: boolean;
  routeLoading: boolean = false;

  constructor(public authService: AuthService, private swUpdate: SwupdateService,
    public router:Router) {
      this.router.events.subscribe(event => {
        
        if(event instanceof NavigationEnd) {
          // Track Pageview Events
          gtag('config', 'G-W3XPL5977T', 
                   {
                     'page_path': event.urlAfterRedirects
                   }
              );
          //Check if on homepage
          if(event.urlAfterRedirects == '/') this.routeHome = true;
          else this.routeHome = false;

          //End route loading
          this.routeLoading = false;
        }

        if(event instanceof NavigationStart) {
          this.routeLoading = true;
        }
        
      });
    }

  sidebarToggle(sideNav, chk = 0) {
    if(chk == 0) {
      sideNav.close();
    }
    else {
      //CHECK IF NEED TO CLOSE
      if(sideNav.open)
        sideNav.close();
      else 
        sideNav.open();
    }
  }

}
