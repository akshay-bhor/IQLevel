import { Component, OnInit } from '@angular/core';
import { OauthProviderService } from '../services/oauth-provider.service';

@Component({
  selector: 'continue-dialog',
  template: '<app-signin-options></app-signin-options>',
  // templateUrl: './continue-dialog.component.html',
  styleUrls: ['./continue-dialog.component.css']
})
export class ContinueDialogComponent implements OnInit {

  constructor(public oauthProviderService: OauthProviderService) { }

  ngOnInit(): void {
  }

}
