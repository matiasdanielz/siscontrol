import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(
    private route: Router
  ){

  }

  protected moveToLogInPage(){
    this.route.navigate(['/', 'LogIn']);
  }
}
