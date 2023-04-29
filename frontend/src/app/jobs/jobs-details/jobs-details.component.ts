import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, switchMap } from "rxjs/operators";
import { of, Subscription, timer } from "rxjs";
import { Params } from "@angular/router";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-jobs-details",
  templateUrl: "./jobs-details.component.html",
})
export class JobsDetailsComponent implements OnInit, OnDestroy {
  data: any;
  isJobCompleted: boolean = false;
  private pollingSubscription: Subscription = new Subscription();
  authToken: string;
  headers: HttpHeaders;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private cdr: ChangeDetectorRef
  ) {
    this.authToken = this.cookieService.get("auth_token");
    this.headers = new HttpHeaders().set(
      "Authorization",
      `Token ${this.authToken}`
    );
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          const taskId = params["id"];
          return this.getJobDetails(taskId);
        })
      )
      .subscribe((job: any) => {
        if (job !== null) {
          this.data = job;
          if (job.json_data) {
            this.isJobCompleted = true;
            this.stopPolling();
          }
          this.cdr.detectChanges();
        }
      });
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  startPolling(taskId: string) {
    const pollingInterval = 5000;

    this.pollingSubscription = timer(0, pollingInterval)
      .pipe(switchMap(() => this.getJobDetails(taskId)))
      .subscribe((job: any) => {
        if (job !== null) {
          this.data = job;
          if (job.json_data) {
            this.isJobCompleted = true;
            this.stopPolling();
          }
          this.cdr.detectChanges();
        }
      });
  }

  getJobDetails(taskId: string) {
    return this.http
      .get(`http://localhost:8000/api/v1/jobs/${taskId}/`, {
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          console.error("Error fetching job details:", error);
          return of(null);
        })
      );
  }

  stopPolling() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  close(): void {
    this.router.navigate(["/inventory/jobs"]);
  }
}
