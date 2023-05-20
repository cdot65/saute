import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FirewallService {
  constructor(private http: HttpClient) {}

  fetchFirewallData(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8000/api/v1/firewall/").pipe(
      catchError((error) => {
        console.error("Error fetching Firewall data:", error);
        return of([]);
      })
    );
  }

  executeAdminReport(jobDetails: any): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<any>(
        "http://localhost:8000/api/v1/assessment/admin-report",
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

  assessmentArpEntry(jobDetails: any): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<any>(
        "http://localhost:8000/api/v1/operations/assurance-arp-entry",
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
