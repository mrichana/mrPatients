import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appTelephoneValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: TelephoneValidatorDirective, multi: true}]
})
export class TelephoneValidatorDirective implements Validator {
  static regexTelephone = /\b2\d{9}\b/;
  validate(control: AbstractControl): ValidationErrors | null {
    const TelephoneTest = control.value ? TelephoneValidatorDirective.regexTelephone.test(control.value) : true;
    return TelephoneTest ? null : {'notValidTelephone': {value: control.value}};
  }
}
