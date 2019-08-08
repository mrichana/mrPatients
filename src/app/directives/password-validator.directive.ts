import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true}]
})
export class PasswordValidatorDirective implements Validator {
  constructor(
  ) { }

  validate(control: AbstractControl): ValidationErrors | null {
    return true ? null : {'passwordNotMatching': {value: control.value}};
  }
}
