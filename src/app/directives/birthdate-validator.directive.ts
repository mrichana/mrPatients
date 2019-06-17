import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appBirthdateValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: BirthdateValidatorDirective, multi: true}]
})
export class BirthdateValidatorDirective implements Validator {
  static regexBirthdate = /\b(?<Birthdate>\d{6})\d{3}(?<Sex>\d)\d\b/;

  validate(control: AbstractControl): ValidationErrors | null {
    const BirthdateTest = control.value? BirthdateValidatorDirective.regexBirthdate.test(control.value) : true;
    return BirthdateTest ? null : {'notValidBirthdate': {value: control.value}};
  }
}
