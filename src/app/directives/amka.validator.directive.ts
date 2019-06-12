import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appAmka]',
  providers: [{provide: NG_VALIDATORS, useExisting: AmkaValidatorDirective, multi: true}]
})
export class AmkaValidatorDirective implements Validator {
  static regexAmka = /\b(?<Birthdate>\d{6})\d{3}(?<Sex>\d)\d\b/;

  validate(control: AbstractControl): ValidationErrors | null {
    const amkaTest = AmkaValidatorDirective.regexAmka.test(control.value);
    return amkaTest ? {'notValidAmka': {value: control.value}} : null;
  }
}
