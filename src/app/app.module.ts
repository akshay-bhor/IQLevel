import { MaterialModule } from './material.module';
import { DataService } from './services/data.service';
import { RegisterComponent } from './register/register.component';
import { AppErrorHandler } from './error/app-error-handler';
import { AuthService } from './services/auth.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GuestRegisterComponent } from './guest-register/guest-register.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SwupdateService } from './services/swupdate.service'
import { environment } from '../environments/environment';
import { GauthComponent } from './gauth/gauth.component';
import { GoogleOneTapComponent } from './google-one-tap/google-one-tap.component';
import { SharedModule } from './shared.module';
import * as fromApp from './store/app.reducer'
import { QuesListEffects } from './questions/question-list/store/ques-list.effects';
import { QuesDetailsEffects } from './questions/ques-details/store/ques-details.effects';
import { SigninCompleteComponent } from './signin-complete/signin-complete.component';
import { PrivacyComponent } from './privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    GuestRegisterComponent,
    GauthComponent,
    GoogleOneTapComponent,
    SigninCompleteComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([QuesListEffects, QuesDetailsEffects]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreDevtoolsModule.instrument({ logOnly: environment.production })
  ],
  providers: [
    AuthService,
    Title,
    DataService,
    SwupdateService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
