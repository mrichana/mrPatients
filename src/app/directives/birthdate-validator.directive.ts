import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator} from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[appBirthdateValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: BirthdateValidatorDirective, multi: true}]
})
export class BirthdateValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const Birthdate = moment(control.value, 'DDMMYYYY');
      return Birthdate.isSameOrBefore(moment()) ? null : {'notValidBirthdate': {value: control.value}};
    }
    return null;
  }
}
