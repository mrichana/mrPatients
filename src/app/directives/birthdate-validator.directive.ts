import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator} from '@angular/forms';
import * as moment from 'moment';
import { PatientFormatingService } from '../services/patient-formating.service';

@Directive({
  selector: '[appBirthdateValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: BirthdateValidatorDirective, multi: true}]
})
export class BirthdateValidatorDirective implements Validator {
  constructor(
    private patientFormat: PatientFormatingService
  ) { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      return this.patientFormat.verifyBirthdate(control.value) ? null : {'notValidBirthdate': {value: control.value}};
    }
    return null;
  }
}
