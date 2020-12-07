import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * Handle any errors thrown by Angular application
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {

    constructor(
        @Inject(Injector) private readonly injector: Injector
    ) {
        super();
    }

    handleError(error) {
        
        this.toastrService.error(error, 'Error!', { onActivateTick: true })
        
        super.handleError(error);
    }

    /**
     * Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
     * @returns {} 
     */
    private get toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }

}
