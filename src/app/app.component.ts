import { AuthService } from './services/auth.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SwupdateService } from './services/swupdate.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

declare let gtag:Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routeHome: boolean;
  routeLoading: boolean = false;
  @ViewChild('snav') sideNav: ElementRef;

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
          //Close Sidebar
          this.sidebarToggle(this.sideNav);
        }

        if(event instanceof NavigationStart) {
          // Start route loading
          this.routeLoading = true;
          //Close Sidebar
          this.sidebarToggle(this.sideNav);
        }

        if(event instanceof NavigationCancel || event instanceof NavigationError) {
          // Check for cancels or errors in route loading
          this.routeLoading = false;
          //Close Sidebar
          this.sidebarToggle(this.sideNav);
        }
        
      });
    }

  sidebarToggle(sideNav) { 
    sideNav.close();
  }

}
