import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'siscontrol';

  constructor(
    private router: Router
  ){
    const routes = this.router.config;
    console.log(routes);
  }
}
