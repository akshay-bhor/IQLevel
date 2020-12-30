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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    GuestRegisterComponent,
    GauthComponent,
    GoogleOneTapComponent
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
