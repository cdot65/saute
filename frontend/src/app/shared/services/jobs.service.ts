import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { CookieService } from "ngx-cookie-service";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class JobsService {
  private url = "http://localhost:8000/api/v1/jobs/";
  private authToken: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.authToken = this.cookieService.get("auth_token");
    this.headers = new HttpHeaders().set(
      "Authorization",
      `Token ${this.authToken}`
    );
  }

  fetchJobsData(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      catchError((error) => {
        console.error("Error fetching Jobs data:", error);
        return of([]);
      })
    );
  }

  getJobDetails(taskId: string): Observable<any> {
    return this.http
      .get(`${this.url}${taskId}/`, { headers: this.headers })
      .pipe(
        catchError((error) => {
          console.error("Error fetching Job details:", error);
          return of(null);
        })
      );
  }
}
