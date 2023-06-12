import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PanoramaService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchPanoramaData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/api/v1/panorama/`).pipe(
      catchError((error) => {
        console.error("Error fetching Panorama data:", error);
        return of([]);
      })
    );
  }

  postSoftwareInformation(softwareInformation: any): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<any>(
        `${this.API_URL}/api/v1/report/get-system-info`,
        softwareInformation,
        { headers: headers }
      )
      .pipe(
        catchError((error) => {
          console.error("Error posting software information:", error);
          return of(null);
        })
      );
  }

  executeAdminReport(jobDetails: any): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<any>(`${this.API_URL}/api/v1/assessment/admin-report`, jobDetails, {
        headers: headers,
      })
      .pipe(
        catchError((error) => {
          console.error("Error executing request:", error);
          return of(null);
        })
      );
  }
}
