import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prisma',
  templateUrl: './prisma.component.html',
  styleUrls: ['./prisma.component.scss']
})
export class PrismaComponent implements OnInit {
  prismaData: any;
  displayedColumns: string[] = ['id']; // Add other column names

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPrismaData();
  }

  fetchPrismaData() {
    this.http.get('http://localhost:8000/api/v1/prisma').subscribe(
      (data: any) => {
        this.prismaData = data;
      },
      (error) => {
        console.error('Error fetching Prisma data:', error);
      }
    );
  }
}
