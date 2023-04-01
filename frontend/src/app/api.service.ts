import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  getPanorama(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/panorama`);
  }

  getPrisma(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/prisma`);
  }
}
