import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { JobDialogComponent } from '../../../shared/job-dialog/job-dialog.component';

@Component({
  selector: 'app-get-certificate-chain',
  templateUrl: './get-certificate-chain.component.html',
  styleUrls: ['./get-certificate-chain.component.scss']
})
export class GetCertificateChainComponent implements OnInit {
  firewalls: any[] = [];
  certificateChainForm: FormGroup;

  constructor(private http: HttpClient, private cookieService: CookieService, private dialog: MatDialog) {
    this.certificateChainForm = new FormGroup({
      selectedFirewall: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.fetchFirewallData();
  }

  // Fetch data from the API
  fetchFirewallData() {
    const authToken = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);

    this.http.get<any[]>('http://localhost:8000/api/v1/firewall/', { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching Firewall data:', error);
          return of([]);
        })
      )
      .subscribe((data: any[]) => {
        this.firewalls = data;
      });
  }

  onSubmit(): void {
    if (this.certificateChainForm.valid) {
      const selectedFirewall = this.certificateChainForm.value.selectedFirewall;
      const certificateChainUrl = this.certificateChainForm.value.url;
      const apiUrl = this.getApiUrl();

      console.log('Selected Firewall:', selectedFirewall);
      console.log('Certificate chain URL:', certificateChainUrl);

      const payload = {
        pan_url: selectedFirewall.hostname,
        api_token: selectedFirewall.api_token,
        url: certificateChainUrl
      };

      this.http.post(apiUrl, payload).subscribe((response: any) => {
        console.log(response);
        this.dialog.open(JobDialogComponent, {
          data: { taskId: response.task_id },
        });
      });
    } else {
      console.error('Form is invalid');
    }
  }

  getApiUrl(): string {
    const baseUrl = 'http://localhost:8000/api/v1';
    const endpoint = 'configuration/upload-cert-chain';
    return `${baseUrl}/${endpoint}`;
  }
}
