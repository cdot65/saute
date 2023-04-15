import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
})
export class JobDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<JobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: string }
  ) {}

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.data.taskId).then(
      () => {
        console.log('Task ID copied to clipboard');
      },
      (err) => {
        console.error('Failed to copy Task ID: ', err);
      }
    );
  }

}
