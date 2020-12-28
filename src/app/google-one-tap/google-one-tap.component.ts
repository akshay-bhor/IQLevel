import { Component, OnInit } from '@angular/core';
import { OauthProviderService } from '../services/oauth-provider.service';

@Component({
  selector: 'app-google-one-tap',
  templateUrl: './google-one-tap.component.html',
  styleUrls: ['./google-one-tap.component.css']
})
export class GoogleOneTapComponent implements OnInit {
  // invalidSignin:boolean;
  // loading:boolean;
  // code:string;
  // errMsg:string;
  // httpSubscription;

  constructor(public oAuth: OauthProviderService) { }

  ngOnInit(): void {
  }

}
