import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    private storage: Storage
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  async ngOnInit(): Promise<void> {
    const isLoggedIn = await this.storage.get("isLoggedIn");

    if (isLoggedIn !== 'true') {
      this.router.navigate(['', 'LogIn']);
    } else {
      this.router.navigate(['', 'Regions']);
    }
  }
}
