import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private cookieService: CookieService) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.cookieService.set('auth_token', response.key);
          // Save the token and handle successful login here
        },
        (error) => {
          console.log('Login failed:', error);
          // Handle login failure here
        }
      );
    }
  }
}
