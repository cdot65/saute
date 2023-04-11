import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { EditEntryComponent } from '../shared/edit-entry/edit-entry.component';
import { CreateEntryComponent } from '../shared/create-entry/create-entry.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-panorama',
  templateUrl: './panorama.component.html',
  styleUrls: ['./panorama.component.scss']
})
export class PanoramaComponent implements OnInit, AfterViewInit {
  @Input() userId: string | undefined;
  panoramaData: MatTableDataSource<any>;
  displayedColumns: string[] = ['hostname', 'ipv4_address', 'ipv6_address', 'api_token'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private cookieService: CookieService, private dialog: MatDialog) {
    this.panoramaData = new MatTableDataSource();
  }

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
    if (this.userId) {
      this.panorama.author = this.userId;
    }
  }

  ngAfterViewInit(): void {
    this.panoramaData.paginator = this.paginator;
  }

  // Fetch data from the API and apply a mask to the API token
  fetchPanoramaData() {
    this.http.get<any[]>('http://localhost:8000/api/v1/panorama/')
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
        this.panoramaData.data = data;
      });
  }

  // Get the current user's ID from the API
  getCurrentUserId() {
    const authToken = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);

    this.http.get<any[]>('http://localhost:8000/api/v1/users/', { headers })
      .subscribe({
        next: response => {
          const user = response[0];
          this.panorama.author = user['id'];
        },
        error: error => {
          console.error('Error getting current user id:', error);
        }
      });
  }

  // Handle form submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      const authToken = this.cookieService.get('auth_token');
      const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);

      this.http.post('http://localhost:8000/api/v1/panorama/', this.panorama, { headers })
        .subscribe({
          next: response => {
            console.log('New panorama created:', response);
            this.fetchPanoramaData();
            this.resetForm();
          },
          error: error => {
            console.error('Error creating panorama:', error);
          }
        });
    } else {
      console.error('Form is invalid');
    }
  }

  // Reset the form
  resetForm() {
    this.panorama = {
      hostname: '',
      ipv4_address: '',
      ipv6_address: '',
      api_token: '',
      author: this.panorama.author
    };
  }

  openEditEntryDialog(row: any): void {
    const dialogRef = this.dialog.open(EditEntryComponent, {
      width: '80%',
      data: {
        title: 'Edit Entry',
        type: 'panorama',
        id: row.id,
        content: Object.entries(row).map(([key, value]) => ({ key, value })),
      },
    });

    dialogRef.componentInstance.entryUpdated.subscribe((updatedEntry: any) => {
      if (updatedEntry.type === 'panorama') {
        this.fetchPanoramaData();
      }
    });

    dialogRef.componentInstance.entryDeleted.subscribe((deletedEntry: any) => {
      if (deletedEntry.type === 'panorama') {
        this.deleteEntry(deletedEntry.id);
      }
    });

  }

  openCreateEntryDialog(): void {
    const dialogRef = this.dialog.open(CreateEntryComponent, {
      width: '80%',
      data: {
        title: 'Create Panorama Instance',
        fields: [
          { name: 'hostname', placeholder: 'Hostname', model: '', required: true },
          { name: 'ipv4_address', placeholder: 'IPv4 Address', model: '', required: true },
          { name: 'ipv6_address', placeholder: 'IPv6 Address', model: '', required: false },
          { name: 'api_token', placeholder: 'API Token', model: '', required: true }
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Extract the form values from the result object
        const { hostname, ipv4_address, ipv6_address, api_token } = result;

        // Create a new Panorama instance with the form values
        const newPanorama = {
          hostname,
          ipv4_address,
          ipv6_address,
          api_token,
          author: this.panorama.author
        };

        // Submit the new Panorama instance using HttpClient
        const authToken = this.cookieService.get('auth_token');
        const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);

        this.http.post('http://localhost:8000/api/v1/panorama/', newPanorama, { headers }).subscribe(
          response => {
            // Handle the successful creation of a new Panorama instance, e.g. update the table data
            console.log('Panorama instance created:', response);
            this.fetchPanoramaData(); // Refresh the table data
          },
          error => {
            // Handle errors in creating a new Panorama instance
            console.error('Error creating Panorama instance:', error);
          }
        );
      }
    });
  }

  // Mask the API token value for display
  maskValue(value: string): string {
    return 'xxxxxxxxxx-' + value.slice(-4);
  }

  // Delete an entry
  deleteEntry(entryId: number): void {
    const authToken = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);
    this.http.delete(`http://localhost:8000/api/v1/panorama/${entryId}/`, { headers }).subscribe(
      response => {
        console.log('Panorama instance deleted:', response);
        this.fetchPanoramaData();
      },
      error => {
        console.error('Error deleting Panorama instance:', error);
      }
    );
  }
}
