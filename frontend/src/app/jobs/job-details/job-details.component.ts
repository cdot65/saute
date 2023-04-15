import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Params } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { interval, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  data: any;
  isJobCompleted: boolean = false;
  private pollingSubscription: Subscription = new Subscription(); // Initialize the property with a new Subscription
  authToken: string;
  headers: HttpHeaders;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.authToken = this.cookieService.get('auth_token');
    this.headers = new HttpHeaders().set('Authorization', `Token ${this.authToken}`);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const taskId = params['taskId'];
      this.getJobDetails(taskId).subscribe((job: any) => {
        if (job !== null) {
          this.data = job;
          if (job.json_data) {
            this.isJobCompleted = true;
          } else {
            this.startPolling(taskId);
          }
        } else {
          // Handle the case when the job details could not be fetched
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  startPolling(taskId: string) {
    const pollingInterval = 5000; // Poll every 5 seconds

    this.pollingSubscription = timer(0, pollingInterval)
      .pipe(
        switchMap(() => this.getJobDetails(taskId))
      )
      .subscribe((job: any) => {
        if (job !== null) {
          this.data = job;
          if (job.json_data) {
            this.isJobCompleted = true;
            this.stopPolling();
          }
        } else {
          // Handle the case when the job details could not be fetched
        }
      });
  }

  getJobDetails(taskId: string) {
    return this.http.get(`http://localhost:8000/api/v1/jobs/${taskId}/`, { headers: this.headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching job details:', error);
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
    this.router.navigate(['/jobs']);
  }

}
