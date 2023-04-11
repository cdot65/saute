import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
  selector: 'app-prisma',
  templateUrl: './prisma.component.html',
  styleUrls: ['./prisma.component.scss']
})
export class PrismaComponent implements OnInit, AfterViewInit {
  prismaData: MatTableDataSource<any>;
  displayedColumns: string[] = ['tenant_name', 'tsg_id', 'client_id', 'client_secret'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private cookieService: CookieService, private dialog: MatDialog) {
    this.prismaData = new MatTableDataSource();
  }

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

  ngAfterViewInit(): void {
    this.prismaData.paginator = this.paginator;
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
        this.prismaData.data = data;
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
        this.prisma.author = user['id'];
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
    } else {
      console.error('Form is invalid');
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

  openEditEntryDialog(row: any): void {
    const dialogRef = this.dialog.open(EditEntryComponent, {
      width: '80%',
      data: {
        title: 'Edit Entry',
        type: 'prisma',
        id: row.id,
        content: Object.entries(row).map(([key, value]) => ({ key, value })),
      },
    });


    dialogRef.componentInstance.entryUpdated.subscribe((updatedEntry: any) => {
      if (updatedEntry.type === 'prisma') {
        this.fetchPrismaData();
      }
    });

    dialogRef.componentInstance.entryDeleted.subscribe((deletedEntry: any) => {
      if (deletedEntry.type === 'prisma') {
        this.deleteEntry(deletedEntry.id);
      }
    });


  }

  openCreateEntryDialog(): void {
    const dialogRef = this.dialog.open(CreateEntryComponent, {
      width: '80%',
      data: {
        title: 'Create Prisma Tenant',
        fields: [
          { name: 'tenant_name', placeholder: 'Tenant Name', model: '', required: true },
          { name: 'client_id', placeholder: 'Client ID', model: '', required: true },
          { name: 'client_secret', placeholder: 'Client Secret', model: '', required: false },
          { name: 'tsg_id', placeholder: 'TSG ID', model: '', required: true }
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Extract the form values from the result object
        const { tenant_name, client_id, client_secret, tsg_id } = result;

        // Create a new Prisma tenant with the form values
        const newPrismaTenant = {
          tenant_name,
          client_id,
          client_secret,
          tsg_id,
          author: this.prisma.author
        };

        // Submit the new Prisma tenant using HttpClient
        const authToken = this.cookieService.get('auth_token');
        const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);

        this.http.post('http://localhost:8000/api/v1/prisma/', newPrismaTenant, { headers }).subscribe(
          response => {
            // Handle the successful creation of a new Prisma tenant, e.g. update the table data
            console.log('Prisma tenant created:', response);
            this.fetchPrismaData(); // Refresh the table data
          },
          error => {
            // Handle errors in creating a new Prisma tenant
            console.error('Error creating Prisma tenant:', error);
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
    this.http.delete(`http://localhost:8000/api/v1/prisma/${entryId}/`, { headers }).subscribe(
      response => {
        console.log('Prisma instance deleted:', response);
        this.fetchPrismaData();
      },
      error => {
        console.error('Error deleting Prisma instance:', error);
      }
    );
  }

}
