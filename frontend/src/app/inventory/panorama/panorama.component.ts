import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-panorama',
  templateUrl: './panorama.component.html',
  styleUrls: ['./panorama.component.scss']
})
export class PanoramaComponent implements OnInit {
  panoramaData: any;
  displayedColumns: string[] = ['hostname', 'ipv4_address', 'ipv6_address', 'api_token', 'author', 'created_at'];

  constructor(private http: HttpClient, private cookieService: CookieService, private authService: AuthService) { }

  // Add panorama-create related variables
  showCreateForm = false;
  panorama = {
    hostname: '',
    ipv4_address: '',
    ipv6_address: '',
    api_token: '',
    author: ''
  };

  ngOnInit(): void {
    this.fetchPanoramaData();
    this.getCurrentUserId();
  }

  fetchPanoramaData() {
    this.http.get<any[]>('http://localhost:8000/api/v1/panorama')
      .pipe(
        map((data: any[]) => data.map(item => {
          item.api_token = this.maskValue(item.api_token);
          return item;
        })),
        catchError((error) => {
          console.error('Error fetching Panorama data:', error);
          return of([]);
        })
      )
      .subscribe((data: any[]) => {
        this.panoramaData = data;
      });
  }

  // Add panorama-create related methods
  getCurrentUserId() {
    const authToken = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);

    this.http.get<any[]>('http://localhost:8000/api/v1/users/', { headers })
      .subscribe(response => {
        const user = response[0];
        this.panorama.author = user['id'];
      });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const authToken = this.cookieService.get('auth_token');
      const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);

      this.http.post('http://localhost:8000/api/v1/panorama/', this.panorama, { headers })
      .subscribe(
        response => {
          console.log('New panorama created:', response);
          this.fetchPanoramaData();
          this.resetForm();
        },
        error => {
          console.error('Error creating panorama:', error);
        }
      );
    }
  }

  resetForm() {
    this.panorama = {
      hostname: '',
      ipv4_address: '',
      ipv6_address: '',
      api_token: '',
      author: this.panorama.author
    };
  }

  maskValue(value: string): string {
    return 'xxxxxxxxxx-' + value.slice(-4);
  }
}
