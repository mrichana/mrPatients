import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true }]
})
export class PasswordValidatorDirective implements Validator {
  constructor(
  ) { }

  validate(form: FormGroup): ValidationErrors | null {
    const password = form.get('password');
    const verifypassword = form.get('passverify');

    if (!password || !verifypassword) {
      return null;
    }

    if (password.errors && !verifypassword.errors['passwordsDoNotMatch']) {
      return null;
    }

    if (password.value !== verifypassword.value) {
      verifypassword.setErrors({ 'passwordsDoNotMatch': true });
    } else {
      verifypassword.setErrors(null);

    }
    return null;
  }
}