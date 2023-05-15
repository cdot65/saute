import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PrismaService {
  constructor(private http: HttpClient) {}

  fetchPrismaData(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8000/api/v1/prisma/").pipe(
      catchError((error) => {
        console.error("Error fetching Prisma data:", error);
        return of([]);
      })
    );
  }

  postSyncInformation(syncInformation: any): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<any>(
        "http://localhost:8000/api/v1/configuration/sync-to-prisma",
        syncInformation,
        { headers: headers }
      )
      .pipe(
        catchError((error) => {
          console.error("Error posting software information:", error);
          return of(null);
        })
      );
  }
}
