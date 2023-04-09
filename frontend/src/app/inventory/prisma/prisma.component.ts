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

  // Add prisma-create related variables
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

  // Fetch data from the API and apply a mask to the API token
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

  // Get the current user's ID from the API
  getCurrentUserId() {
    const authToken = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);

    this.http.get<any[]>('http://localhost:8000/api/v1/users/', { headers })
      .subscribe(response => {
        const user = response[0];
        this.prisma.author = user['id'];
      });
  }

  // Handle form submission
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

  // Reset the form
  resetForm() {
    this.prisma = {
      tenant_name: '',
      client_id: '',
      client_secret: '',
      tsg_id: '',
      author: this.prisma.author
    };
  }

  // Mask the API token value for display
  maskValue(value: string): string {
    return 'xxxxxxxxxx-' + value.slice(-4);
  }
}
