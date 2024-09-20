import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  constructor(
    private route: Router
  ){

  }

  protected logIn(){
    this.route.navigate(['', 'Portal']);
  }

  protected moveToSignInPage(){
    this.route.navigate(['/', 'SignIn']);
  }
}
