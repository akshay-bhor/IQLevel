import { ErrorHandler, Injectable } from '@angular/core';
import { ToastService } from '../services/toast.service';

/**
 * Handle any errors thrown by Angular application
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {

    constructor(private toast:ToastService) {
        super();
    }

    handleError(error) {

        this.toast.show(error, 'error');
        
        super.handleError(error);
    }

}
