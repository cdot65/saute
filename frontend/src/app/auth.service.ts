import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenUrl = environment.tokenUrl;
  private registrationUrl =
    environment.apiUrl + "/api/v1/dj-rest-auth/registration/"; // Add the registration API endpoint

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  login(username: string, password: string) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const body = JSON.stringify({ username, password });

    return this.http.post<any>(`${this.apiUrl}${this.tokenUrl}`, body, {
      headers,
    });
  }

  // Add the register method
  register(
    username: string,
    email: string,
    password1: string,
    password2: string
  ) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const body = JSON.stringify({ username, email, password1, password2 });
    console.log("Register request body:", body); // Log the request body
    return this.http.post<any>(this.registrationUrl, body, {
      headers,
    });
  }

  logout(): void {
    this.cookieService.delete("auth_token");
    this.router.navigate(["/login"]);
  }
}
