import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  isAuthenticated(): boolean {
    return this.cookieService.check('auth_token');
  }

  logout() {
    this.cookieService.delete('auth_token');
    this.snackBar.open('You have been successfully logged out', 'Close', {
      duration: 3000,
    });
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
  title = 'frontend';
}
