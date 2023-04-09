import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-prisma',
  templateUrl: './prisma.component.html',
  styleUrls: ['./prisma.component.scss']
})
export class PrismaComponent implements OnInit {
  prismaData: any;
  displayedColumns: string[] = ['tenant_name', 'client_id', 'client_secret', 'tsg_id', 'author', 'created_at'];

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  showCreateForm = false;
  prisma = {
    tenant_name: '',
    client_id: '',
    client_secret: '',
    tsg_id: '',
    author: ''
  };

  ngOnInit(): void {
    this.fetchPrismaData();
    this.getCurrentUserId();
  }

  fetchPrismaData() {
    this.http.get<any[]>('http://localhost:8000/api/v1/prisma')
      .pipe(
        map((data: any[]) => data.map(item => {
          item.client_secret = this.maskValue(item.client_secret);
          return item;
        })),
        catchError((error) => {
          console.error('Error fetching Prisma data:', error);
          return of([]);
        })
      )
      .subscribe((data: any[]) => {
        this.prismaData = data;
      });
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
        .subscribe({
          next: response => {
            console.log('New prisma tenant created:', response);
            this.fetchPrismaData();
            this.resetForm();
          },
          error: error => {
            console.error('Error creating prisma tenant:', error);
          }
        });
    }
  }

  resetForm() {
    this.prisma = {
      tenant_name: '',
      client_id: '',
      client_secret: '',
      tsg_id: '',
      author: this.prisma.author
    };
  }

  maskValue(value: string): string {
    return 'xxxxxxxxxx-' + value.slice(-4);
  }
}
