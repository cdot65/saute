import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss']
})
export class EditEntryComponent implements OnInit {
  @Output() entryUpdated = new EventEmitter<any>();
  @Output() entryDeleted = new EventEmitter<{ type: string; id: number }>();
  entryForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm(): void {
    const formControls: { [key: string]: FormControl } = {};

    for (const field of this.data.content) {
      formControls[field.key] = new FormControl(field.value);
    }

    this.entryForm = new FormGroup(formControls);
  }

  updateEntry(updatedEntry: any): void {
    if (this.entryForm.valid) {
      const authToken = this.cookieService.get('auth_token');
      const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);
      const apiUrl = `http://localhost:8000/api/v1/${this.data.type}/${this.data.id}/`;
      updatedEntry.id = this.data.id;

      if (!updatedEntry.ipv6_address) {
        updatedEntry.ipv6_address = null;
      }

      this.http.patch(apiUrl, updatedEntry, { headers }).subscribe({
        next: (response) => {
          console.log('Entry updated:', response);
          this.entryUpdated.emit({ type: this.data.type, data: updatedEntry });
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error updating entry:', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.entryDeleted.emit({ type: this.data.type, id: this.data.id });
      this.dialogRef.close();
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
