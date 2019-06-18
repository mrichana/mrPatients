import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator} from '@angular/forms';
import { PatientFormatingService } from '../services/patient-formating.service';

@Directive({
  selector: '[appTelephoneValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: TelephoneValidatorDirective, multi: true}]
})
export class TelephoneValidatorDirective implements Validator {
  constructor(
    private patientFormat: PatientFormatingService
  ) { }

  validate(control: AbstractControl): ValidationErrors | null {
    return !control.value || this.patientFormat.verifyTelephone(control.value) ? null : {'notValidTelephone': {value: control.value}};
  }
}
