import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(form: NgForm) {
    const { username, password } = form.value;
    this.authService.login(username, password).subscribe({
      next: (response) => {
        // Set the auth_token cookie and navigate to the home route
        this.cookieService.set('auth_token', response.key);
        this.router.navigate(['/']);

        // Display a success message
        this.snackBar.open('Logged in successfully', 'Close', {
          duration: 3000,
        });
      },
      error: (error) => {
        // Handle the error and display the error message
        this.errorMessage = 'Invalid username or password';
      },
    });
  }
}
