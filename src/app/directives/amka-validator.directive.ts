import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator} from '@angular/forms';
import { PatientFormatingService } from '../services/patient-formating.service';

@Directive({
  selector: '[appAmkaValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: AmkaValidatorDirective, multi: true}]
})
export class AmkaValidatorDirective implements Validator {
  constructor(
    private patientFormat: PatientFormatingService
  ) { }


  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) { return null; }
    return this.patientFormat.verifyAmka(control.value) ? null : {'notValidAmka': {value: control.value}};
  }
}
