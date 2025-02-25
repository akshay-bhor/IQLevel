import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ContinueComponent } from './continue/continue.component';
import { GauthComponent } from './gauth/gauth.component';
import { GuestRegisterComponent } from './guest-register/guest-register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthGuestGuardService } from './services/auth-guest-guard.service';
import { LoggedInGuardService } from './services/loggedin-guard.service';
import { SigninCompleteComponent } from './signin-complete/signin-complete.component';


const appRoutes: Routes = [
      { path: '', component: HomeComponent, canActivate: [LoggedInGuardService] },
      { path: 'login', component: LoginComponent, canActivate: [LoggedInGuardService] },
      { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuardService] },
      { path: 'continue', component: ContinueComponent, canActivate: [LoggedInGuardService] },
      { path: 'gauth', component: GauthComponent, canActivate: [LoggedInGuardService] },
      { path: 'guest-register', component: GuestRegisterComponent, canActivate: [LoggedInGuardService] },
      { path: 'complete-signin', component: SigninCompleteComponent, canActivate: [AuthGuardService, AuthGuestGuardService] },
      { path: 'privacy', component: PrivacyComponent },
      { 
        path: 'questions',
        loadChildren: () => import('./questions/questions.module').then(q => q.QuestionsModule)
      },
      {
        path: 'level',
        loadChildren: () => import('./level/level.module').then(l => l.LevelModule)
      },
      {
        path: 'iq-test',
        loadChildren: () => import('./iq-test/iq-test.module').then(i => i.IqTestModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(a => a.AccountModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('./payment/payment.module').then(p => p.PaymentModule)
      },
      { path:'**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
