import { Component, Input } from '@angular/core';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent {
  @Input() errorLabel: string;
  @Input() control: FormControl;
  @Input() isSubmit: boolean;

  constructor(private formValidationService: FormValidationService) {
  }

  get errorMessage() {
    for (const propName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propName) && this.isSubmit) {
        return this.formValidationService.getErrorMessage(this.errorLabel, propName);
      }
    }
  }
}
