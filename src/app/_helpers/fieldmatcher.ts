import { FormGroup } from '@angular/forms';

export function IsMatch(control1: string, control2: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[control1];
        const matchControl = formGroup.controls[control2];

        if (matchControl.errors && !matchControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchControl.value) {
            matchControl.setErrors({ mustMatch: true });
        } else {
            matchControl.setErrors(null);
        }
    };
}
