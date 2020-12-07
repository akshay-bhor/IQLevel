import { Component, OnInit } from '@angular/core';
import { OauthProviderService } from '../../services/oauth-provider.service'

@Component({
  selector: 'app-signin-options',
  templateUrl: './signin-options.component.html',
  styleUrls: ['./signin-options.component.css']
})
export class SigninOptionsComponent implements OnInit {

  constructor(public oauthProviderService: OauthProviderService) { }

  ngOnInit(): void {
  }

}
