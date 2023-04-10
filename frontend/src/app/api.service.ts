import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient, private cookieService: CookieService) {}


  getHeaders(): HttpHeaders {
    const token = this.cookieService.get('auth_token');
    return new HttpHeaders().set('Authorization', `Token ${token}`);
  }

  getPanorama() {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/panorama`, { headers });
  }

  getPrisma() {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/prisma`, { headers });
  }
}
