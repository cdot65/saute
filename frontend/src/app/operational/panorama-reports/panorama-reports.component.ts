import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-panorama-reports',
  templateUrl: './panorama-reports.component.html',
  styleUrls: ['./panorama-reports.component.scss']
})
export class PanoramaReportsComponent implements OnInit {
  panoramas: any[] = [];
  selectedPanorama: any;
  reportForm: FormGroup;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.reportForm = new FormGroup({
      selectedPanorama: new FormControl()
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
      console.log('Selected Panorama:', selectedPanorama);

      const payload = {
        pan_url: selectedPanorama.hostname,
        api_token: selectedPanorama.api_token
      };

      this.http.post('http://localhost:8000/api/v1/report/rules', payload).subscribe((response: any) => {
        console.log(response);
        alert(`Task has been executed. Job ID: ${response.job_id}`);
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
