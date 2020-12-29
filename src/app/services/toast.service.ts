import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar:MatSnackBar, private zone: NgZone) { }

  /**
   * Error Handler runs outside of angular zone
   * so to correct behaviour we ran it using Ngzone
   */
  show(msg, type) {
    let snackClass = "bg-success-sm";
    if(type = 'error') snackClass = "bg-danger-sm";
    this.zone.run(() => {
      const snack = this.snackBar.open(msg, 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: [snackClass]
      });
  
      snack.onAction().subscribe(() => {
        snack.dismiss();
      });
    });
  }
}
