import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UnameValidator {

    static noSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0) {
            return {
                noSpace:true
            }
        }
        return null;
    }
    
    static alfanum(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).match('^[a-zA-Z0-9]+$') == null) {
            return {
                alfanum:true
            }
        }
        return null;
    }

    static words(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).match('^[a-zA-Z ]+$') == null) {
            return {
                words:true
            }
        }
        return null;
    }
}