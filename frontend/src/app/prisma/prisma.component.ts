import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-prisma',
  templateUrl: './prisma.component.html',
  styleUrls: ['./prisma.component.scss']
})
export class PrismaComponent implements OnInit {
  prismaData: any;
  displayedColumns: string[] = ['tenant_name', 'client_id', 'client_secret', 'tsg_id', 'author', 'created_at'];

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchPrismaData();
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

  maskValue(value: string): string {
    return 'xxxxxxxxxx-' + value.slice(-4);
  }
}
