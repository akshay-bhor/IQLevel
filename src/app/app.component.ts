import { AuthService } from './services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SwupdateService } from './services/swupdate.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { SeoService } from './services/seo.service';

declare let gtag:Function;
declare let googleSignOut:Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routeHome: boolean;
  routeGauth: boolean;
  routeLoading: boolean = false;
  @ViewChild('snav') sideNav: ElementRef;

  constructor(
    public authService: AuthService, 
    private swUpdate: SwupdateService,
    public router:Router,
    private SEO: SeoService
    ) { 
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

          // Check if on google auth page
          if(event.urlAfterRedirects.split('?')[0] == '/gauth') this.routeGauth = true;
          else this.routeGauth = false;
         
          //Set canonical url
          this.SEO.setCanonicalURL();

          //End route loading
          this.routeLoading = false;
          //Close Sidebar
          this.sidebarToggle(this.sideNav);
          // Check if one tap should be closed
          this.rmOneTap();
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

  rmOneTap() {
    if(this.authService.isLoggedIn()) {
      // Remove One-Tap
      let gPrompt = document.getElementById("credential_picker_container");
      let gPromptMobile = document.getElementById("credential_picker_iframe");
      if(gPrompt)
        gPrompt.remove();
      if(gPromptMobile)
        gPromptMobile.remove();
    }
  }

  gSignOut() {
    googleSignOut();
  }
}
