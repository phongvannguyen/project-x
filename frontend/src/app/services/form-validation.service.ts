import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  public static validatePassword(control: FormControl) {
    if (control.value.length < 8) {
      return { minPasswordLenth: true };
    }
  }

  public getErrorMessage(formControlLabel: string, errorString: string) {
    const errorMessage = {
      required: formControlLabel + ' is required.',
      minPasswordLenth: formControlLabel + ' has to be 8 characters long.',
      email: formControlLabel + ' is not in correct format.'
    };

    return errorMessage[errorString];
  }
}
