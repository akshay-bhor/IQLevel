import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr:ToastrService) { }

  successMsg(msg, title) {
    this.toastr.success(msg, title);
  }

  errorMsg(msg, title) {
    this.toastr.error(msg, title);
  }

  infoMsg(msg, title) {
    this.toastr.info(msg, title);
  }

  warningMsg(msg, title) {
    this.toastr.warning(msg, title);
  }
}
