import { Component, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
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

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

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
