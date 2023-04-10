import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobsData: any;
  displayedColumns: string[] = ['name', 'description', 'result', 'author', 'created_at'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchJobsData();
  }

  fetchJobsData() {
    this.http.get('http://localhost:8000/api/v1/jobs').subscribe(
      (data: any) => {
        this.jobsData = data;
      },
      (error) => {
        console.error('Error fetching Jobs data:', error);
      }
    );
  }
}
