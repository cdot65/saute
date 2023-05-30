import { Observable, of } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class JobsService {
  private url = "http://localhost:8000/api/v1/jobs/";

  constructor(private http: HttpClient) {}

  fetchJobsData(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      catchError((error) => {
        console.error("Error fetching Jobs data:", error);
        return of([]);
      })
    );
  }
}
