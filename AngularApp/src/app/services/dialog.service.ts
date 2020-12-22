import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../general/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(title: string, message: string): Observable<any> {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });
    return confirmDialog.afterClosed();
  }
}
