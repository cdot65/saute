import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenUrl = environment.tokenUrl;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({username, password});

    return this.http.post<any>(`${this.apiUrl}${this.tokenUrl}`, body, { headers });
  }
}
