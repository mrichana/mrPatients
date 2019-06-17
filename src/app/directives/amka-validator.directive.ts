import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appAmkaValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: AmkaValidatorDirective, multi: true}]
})
export class AmkaValidatorDirective implements Validator {
  static regexAmka = /\b(?<Birthdate>\d{6})\d{4}(?<Sex>\d)\b/;

  validate(control: AbstractControl): ValidationErrors | null {
    const amkaTest = control.value? AmkaValidatorDirective.regexAmka.test(control.value) : true;
    return amkaTest ? null : {'notValidAmka': {value: control.value}};
  }
}
