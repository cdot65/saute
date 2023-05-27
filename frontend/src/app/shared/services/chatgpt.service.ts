import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ChatGptService {
  constructor(private http: HttpClient) {}

  fetchChatGptData(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8000/api/v1/chatgpt/").pipe(
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
        "http://localhost:8000/api/v1/chatgpt/send-script",
        scriptDetails,
        { headers: headers }
      )
      .pipe(
        catchError((error) => {
          console.error("Error sending script:", error);
          return of(null);
        })
      );
  }

  // Add other methods similar to FirewallService as needed
}
