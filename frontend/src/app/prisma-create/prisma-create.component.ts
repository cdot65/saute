import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prisma-create',
  templateUrl: './prisma-create.component.html',
  styleUrls: ['./prisma-create.component.scss']
})
export class PrismaCreateComponent implements OnInit {
  prisma = {
    tenant_name: '',
    client_id: '',
    client_secret: '',
    tsg_id: '',
    author: ''
  };

  constructor(public dialogRef: MatDialogRef<PrismaCreateComponent>, private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.getCurrentUserId();
  }

  getCurrentUserId() {
    const authToken = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);

    this.http.get<any[]>('http://localhost:8000/api/v1/users/', { headers })
      .subscribe(response => {
        const user = response[0];
        this.prisma.author = user['id'];
      });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const authToken = this.cookieService.get('auth_token');
      const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);

      this.http.post('http://localhost:8000/api/v1/prisma/', this.prisma, { headers })
        .subscribe(response => {
          console.log(response);
        });
    }
  }
}
