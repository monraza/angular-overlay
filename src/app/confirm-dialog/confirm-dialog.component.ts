import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  // Close the dialog with a true value (confirmed)
  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  // Close the dialog with a false value (canceled)
  cancelDelete(): void {
    this.dialogRef.close(false);
  }
}
