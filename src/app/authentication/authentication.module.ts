import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AppRoutingModule } from '../app-routing.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule } from '@angular/forms';
import { GenericComponentsModule } from '../generic-components/generic-components.module';

//Importações PRIME-NG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [
    LogInComponent,
    AuthenticationComponent,
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
    ToastModule,
    RippleModule,
    FormsModule,
    ProgressSpinnerModule,
    GenericComponentsModule,
    IonicStorageModule.forRoot()

  ]
})
export class AuthenticationModule { }
