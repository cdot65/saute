import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsComponent } from './job-details/job-details.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit, AfterViewInit {
  jobsData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'description', 'result', 'created_at'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.jobsData = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.fetchJobsData();
  }

  ngAfterViewInit(): void {
    this.jobsData.paginator = this.paginator;
    this.jobsData.sort = this.sort;
  }

  fetchJobsData() {
    this.http.get<any[]>('http://localhost:8000/api/v1/jobs')
      .pipe(
        map((data: any[]) => data.map(item => {
          return item;
        })),
        catchError((error) => {
          console.error('Error fetching Jobs data:', error);
          return of([]);
        })
      )
      .subscribe((data: any[]) => {
        this.jobsData.data = data;
      });
  }

  openJobDetails(job: any): void {
    this.dialog.open(JobDetailsComponent, {
      width: '80%',
      data: job
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.jobsData.filter = filterValue.trim().toLowerCase();

    if (this.jobsData.paginator) {
      this.jobsData.paginator.firstPage();
    }
  }
}
