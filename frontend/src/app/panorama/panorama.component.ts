import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-panorama',
  templateUrl: './panorama.component.html',
  styleUrls: ['./panorama.component.scss']
})
export class PanoramaComponent implements OnInit {
  panoramaData: any;
  displayedColumns: string[] = ['hostname', 'ipv4_address', 'ipv6_address', 'api_token', 'author', 'created_at'];

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchPanoramaData();
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

  maskValue(value: string): string {
    return 'xxxxxxxxxx-' + value.slice(-4);
  }
}
