import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FirewallService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchFirewallData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/api/v1/firewall/`).pipe(
      catchError((error) => {
        console.error("Error fetching Firewall data:", error);
        return of([]);
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

  assessmentArpEntry(jobDetails: any): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<any>(
        `${this.API_URL}/api/v1/operations/assurance-arp-entry`,
        jobDetails,
        { headers: headers }
      )
      .pipe(
        catchError((error) => {
          console.error("Error executing request:", error);
          return of(null);
        })
      );
  }

  assessmentSnapshot(jobDetails: any): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<any>(
        `${this.API_URL}/api/v1/operations/assurance-snapshot`,
        jobDetails,
        { headers: headers }
      )
      .pipe(
        catchError((error) => {
          console.error("Error executing request:", error);
          return of(null);
        })
      );
  }
}
