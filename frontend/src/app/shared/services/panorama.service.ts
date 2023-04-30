import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanoramaService {
  constructor(private http: HttpClient) {}

  fetchPanoramaData(): Observable<any[]> {
    return this.http
      .get<any[]>("http://localhost:8000/api/v1/panorama/")
      .pipe(
        catchError((error) => {
          console.error("Error fetching Panorama data:", error);
          return of([]);
        })
      );
  }
}
