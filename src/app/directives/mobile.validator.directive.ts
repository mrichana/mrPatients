import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appMobileValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: MobileValidatorDirective, multi: true}]
})
export class MobileValidatorDirective implements Validator {
  static regexMobile = /\b69\d{8}\b/;

  validate(control: AbstractControl): ValidationErrors | null {
    const mobileTest = control.value? MobileValidatorDirective.regexMobile.test(control.value) : true;
    return mobileTest ? null : {'notValidMobile': {value: control.value}};
  }
}
