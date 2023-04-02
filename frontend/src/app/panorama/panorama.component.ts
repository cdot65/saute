import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

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
    this.http.get('http://localhost:8000/api/v1/panorama').subscribe(
      (data: any) => {
        this.panoramaData = data;
      },
      (error) => {
        console.error('Error fetching Panorama data:', error);
      }
    );
  }
}
