import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { JobDialogComponent } from '../../../shared/job-dialog/job-dialog.component';

@Component({
  selector: 'app-panorama-reports',
  templateUrl: './panorama-reports.component.html',
  styleUrls: ['./panorama-reports.component.scss']
})
export class PanoramaReportsComponent implements OnInit {
  panoramas: any[] = [];
  selectedPanorama: any;
  reportForm: FormGroup;
  reportTypes = [
    { name: 'Rules Report to CSV', value: 'rules' },
    { name: 'Tagging Report', value: 'tags' },
    { name: 'Show System Information', value: 'get-system-info' },
    { name: 'Future Report 2', value: 'future' },
    { name: 'Future Report 3', value: 'future' },
  ];

  constructor(private http: HttpClient, private cookieService: CookieService, private dialog: MatDialog) {
    this.reportForm = new FormGroup({
      selectedPanorama: new FormControl('', Validators.required),
      reportType: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.fetchPanoramaData();
  }

  // Fetch data from the API
  fetchPanoramaData() {
    const authToken = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);

    this.http.get<any[]>('http://localhost:8000/api/v1/panorama/', { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching Panorama data:', error);
          return of([]);
        })
      )
      .subscribe((data: any[]) => {
        this.panoramas = data;
      });
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      const selectedPanorama = this.reportForm.value.selectedPanorama;
      const selectedReport = this.reportForm.value.reportType;
      const apiUrl = this.getApiUrl(selectedReport);

      console.log('Selected Panorama:', selectedPanorama);
      console.log('Selected Report Type:', selectedReport);

      const payload = {
        pan_url: selectedPanorama.hostname,
        api_token: selectedPanorama.api_token
      };

      this.http.post(apiUrl, payload).subscribe((response: any) => {
        console.log(response);
        this.dialog.open(JobDialogComponent, {
          data: { jobId: response.job_id },
        });
      });
    } else {
      console.error('Form is invalid');
    }
  }

  getApiUrl(reportType: string): string {
    const baseUrl = 'http://localhost:8000/api/v1/report';
    return `${baseUrl}/${reportType}`;
  }
}
