import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-panorama-create',
  templateUrl: './panorama-create.component.html',
  styleUrls: ['./panorama-create.component.scss']
})
export class PanoramaCreateComponent implements OnInit {
  panorama = {
    hostname: '',
    ipv4_address: '',
    ipv6_address: '',
    api_token: '',
    author: ''
  };

  constructor(public dialogRef: MatDialogRef<PanoramaCreateComponent>, private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.getCurrentUserId();
  }

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
        .subscribe(response => {
          console.log(response);
        });
    }
  }
}
