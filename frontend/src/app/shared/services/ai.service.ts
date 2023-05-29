import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AiService {
  constructor(private http: HttpClient) {}

  fetchAiData(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8000/api/v1/ai/").pipe(
      catchError((error) => {
        console.error("Error fetching ChatGPT data:", error);
        return of([]);
      })
    );
  }

  sendScript(scriptDetails: any): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<any>(
        "http://localhost:8000/api/v1/ai/create-script",
        scriptDetails,
        {
          headers: headers,
        }
      )
      .pipe(
        catchError((error) => {
          console.error("Error sending script:", error);
          return of(null);
        })
      );
  }

  getJobDetails(jobId: string): Observable<any> {
    return this.http
      .get<any>(`http://localhost:8000/api/v1/jobs/${jobId}/`)
      .pipe(
        catchError((error) => {
          console.error("Error fetching job details:", error);
          return of(null);
        })
      );
  }
}
