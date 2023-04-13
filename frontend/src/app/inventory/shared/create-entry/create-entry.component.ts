import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss']
})
export class CreateEntryComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onSubmit(form: any): void {
    if (form.valid) {
      this.dialogRef.close(form.value);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
