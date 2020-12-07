import { QuesGuardService } from './services/ques-guard.service';
import { MaterialModule } from './material.module';
import { QueAccessGuardService } from './services/que-access-guard.service';
import { DataService } from './services/data.service';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AppErrorHandler } from './error/app-error-handler';
import { AuthService } from './services/auth.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LevelComponent } from './level/level.component';
import { ContinueComponent } from './continue/continue.component';
import { GuestRegisterComponent } from './guest-register/guest-register.component';
import { QuestionComponent } from './question/question.component';
import { AuthGuardService } from './services/auth-guard.service';
import { IqTestComponent } from './iq-test/iq-test.component';
import { ResultComponent } from './result/result.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuesDetailsComponent } from './ques-details/ques-details.component';
import { ContinueDialogComponent } from './continue-dialog/continue-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SwupdateService } from './services/swupdate.service'
import { environment } from '../environments/environment';
import { GauthComponent } from './gauth/gauth.component';
import { SigninOptionsComponent } from './continue/signin-options/signin-options.component';
import { QueSkeletonComponent } from './que-skeleton/que-skeleton.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LevelComponent,
    RegisterComponent,
    ContinueComponent,
    GuestRegisterComponent,
    QuestionComponent,
    IqTestComponent,
    ResultComponent,
    QuestionsComponent,
    QuesDetailsComponent,
    ContinueDialogComponent,
    GauthComponent,
    SigninOptionsComponent,
    QueSkeletonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      closeButton: true,
      preventDuplicates: true
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'level/:levelid', component: QuestionComponent, canActivate: [AuthGuardService, QueAccessGuardService] },
      { path: 'level', component: LevelComponent, canActivate: [AuthGuardService] },
      { path: 'register', component: RegisterComponent },
      { path: 'continue', component: ContinueComponent },
      { path: 'gauth', component: GauthComponent },
      { path: 'guest-register', component: GuestRegisterComponent },
      { path: 'iq-test', component: IqTestComponent, canActivate: [AuthGuardService]  },
      { path: 'result/:test_key', component: ResultComponent, canActivate: [AuthGuardService]  },
      { path: 'questions/:qid/:que', component: QuesDetailsComponent, canActivate: [QuesGuardService] },
      { path: 'questions', component: QuestionsComponent, canActivate: [QuesGuardService] },
      { path:'**', component: HomeComponent }
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

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
