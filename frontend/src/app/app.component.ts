import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(public cookieService: CookieService, private router: Router) {}

    logout() {
      this.cookieService.delete('auth_token');
      this.router.navigate(['/login']);
    }
    title = 'frontend';
}
