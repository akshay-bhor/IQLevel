import { AbstractControl, ValidationErrors } from '@angular/forms';
export class AgeValidator {
    static ageGroup(control: AbstractControl) : ValidationErrors | null {
        if((control.value as number) < 3 || (control.value as number) > 99) {
            return {
                ageGroup: true
            }
        }
        return null;
    }
}