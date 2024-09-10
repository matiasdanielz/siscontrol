import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Importações PRIME-NG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    LogInComponent,
    SignInComponent,
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    CardModule,
    PasswordModule,
    FloatLabelModule,
    AppRoutingModule,
  ]
})
export class AuthenticationModule { }
