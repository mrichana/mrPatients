import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appAmkaValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: AmkaValidatorDirective, multi: true}]
})
export class AmkaValidatorDirective implements Validator {
  static regexAmka = /\b(?<Birthdate>\d{6})\d{3}(?<Sex>\d)(?<Checksum>\d)\b/;
  luhnValid(amka: string) {
    let length = amka.length;
    let multiple = 0;
    const producedValue = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
    ];
    let sum = 0;
    while (length--) {
      sum += producedValue[multiple][parseInt(amka.charAt(length), 10)];
      multiple = multiple ? 0 : 1;
    }
    return (sum % 10 === 0 && sum > 0);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const amkaTest = control.value ? AmkaValidatorDirective.regexAmka.test(control.value) : true;
    return control.value && amkaTest && this.luhnValid(control.value) ? null : {'notValidAmka': {value: control.value}};
  }
}
