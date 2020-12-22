import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar) {
    this._snackBar._openedSnackBarRef;
  }

  success(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
      panelClass: ['success-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  error(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
      panelClass: ['error-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  warning(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
      panelClass: ['warning-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
