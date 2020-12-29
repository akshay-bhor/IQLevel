import { LoggedInGuardService } from './services/loggedin-guard.service';
import { MaterialModule } from './material.module';
import { LevelAccessGuardService } from './services/level-access-guard.service';
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
import { IqExitGuardService } from './iq-test/iq-exit-guard.service';
import { QuesDetailsResolverService } from './ques-details/ques-details-resolver.service';
import { QuestionsResolverService } from './questions/questions-resolver.service';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { IqTestHistoryComponent } from './iq-test-history/iq-test-history.component';
import { IqTestAnalysisComponent } from './iq-test-history/iq-test-analysis/iq-test-analysis.component';
import { GoogleOneTapComponent } from './google-one-tap/google-one-tap.component';

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
    QueSkeletonComponent,
    LeaderboardComponent,
    IqTestHistoryComponent,
    IqTestAnalysisComponent,
    GoogleOneTapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [LoggedInGuardService] },
      { path: 'login', component: LoginComponent, canActivate: [LoggedInGuardService] },
      { path: 'level/:levelid', component: QuestionComponent, canActivate: [AuthGuardService, LevelAccessGuardService] },
      { path: 'level', component: LevelComponent, canActivate: [AuthGuardService] },
      { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuardService] },
      { path: 'continue', component: ContinueComponent, canActivate: [LoggedInGuardService] },
      { path: 'gauth', component: GauthComponent, canActivate: [LoggedInGuardService] },
      { path: 'guest-register', component: GuestRegisterComponent, canActivate: [LoggedInGuardService] },
      { path: 'iq-test', component: IqTestComponent, canActivate: [AuthGuardService], canDeactivate: [IqExitGuardService]  },
      { path: 'result/:test_key', component: ResultComponent, canActivate: [AuthGuardService]  },
      { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuardService] },
      { path: 'iq-tests/analyze/:tkey', component: IqTestAnalysisComponent, canActivate: [AuthGuardService] },
      { path: 'iq-tests', component: IqTestHistoryComponent, canActivate: [AuthGuardService] },
      { 
        path: 'questions/:qid/:que', 
        component: QuesDetailsComponent, 
        canActivate: [LoggedInGuardService], 
        resolve: { queData: QuesDetailsResolverService }
      },
      { 
        path: 'questions', 
        component: QuestionsComponent, 
        canActivate: [LoggedInGuardService],
        resolve: { ques: QuestionsResolverService },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      { path:'**', redirectTo: '' }
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
