import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator} from '@angular/forms';
import { PatientFormatingService } from '../services/patient-formating.service';

@Directive({
  selector: '[appMobileValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: MobileValidatorDirective, multi: true}]
})
export class MobileValidatorDirective implements Validator {
  constructor(
    private patientFormat: PatientFormatingService
  ) { }

  validate(control: AbstractControl): ValidationErrors | null {
    return !control.value || this.patientFormat.verifyMobile(control.value) ? null : {'notValidMobile': {value: control.value}};
  }
}
