import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent
  },
  {
    path: 'LogIn',
    component: LogInComponent
  },
  {
    path: 'SignIn',
    component: SignInComponent
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthenticationRoutingModule { }
