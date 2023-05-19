import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PanoramaService {
  constructor(private http: HttpClient) {}

  fetchPanoramaData(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8000/api/v1/panorama/").pipe(
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
        "http://localhost:8000/api/v1/report/get-system-info",
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

  executeAdminReport(panoramaDetails: any): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<any>(
        "http://localhost:8000/api/v1/assessment/admin-report",
        panoramaDetails,
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
