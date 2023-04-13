import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  userId: string | undefined;

  constructor(public dialog: MatDialog, private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.getCurrentUserId();
  }

  getCurrentUserId() {
    // ... same implementation as before, but assign user ID to this.userId ...
    const authToken = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);

    this.http.get<any[]>('http://localhost:8000/api/v1/users/', { headers })
      .subscribe({
        next: response => {
          const user = response[0];
          this.userId = user['id'];
        },
        error: error => {
          console.error('Error getting current user id:', error);
        }
      });
  }
}
