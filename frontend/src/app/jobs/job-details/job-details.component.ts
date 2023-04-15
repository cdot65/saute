import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const taskId = params['taskId'];
      this.getJobDetails(taskId);
    });
  }

  getJobDetails(taskId: string) {
    this.http.get(`http://localhost:8000/api/v1/jobs/${taskId}/`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching job details:', error);
          return of(null);
        })
      )
      .subscribe((job: any) => {
        if (job !== null) {
          this.data = job;
        } else {
          // Handle the case when the job details could not be fetched
        }
      });
  }

  close(): void {
    this.router.navigate(['/jobs']);
  }

}
