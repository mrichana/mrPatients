import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm', { static: false }) public loginForm: NgForm;
  @ViewChild('signupForm', { static: false }) public signupForm: NgForm;

  constructor(
    private auth: AuthService,
    private router: Router,
    private titleService: Title,
    private snackBar: MatSnackBar
  ) { }

  public user: string;
  public pass: string;
  public passverify: string;

  ngOnInit() {
    this.titleService.setTitle('Ασθενείς - Σύνδεση');
  }

  public async login() {
    try {
      this.loginForm.form.disable();
      await this.auth.signIn({ username: this.user, password: this.pass });
      this.router.navigate(['/patients']);
    } catch (e) {
      /* wrong username or password
      { status: 401, error: "unauthorized", name: "unauthorized", 
      message: "Name or password is incorrect.", reason: "Name or password is incorrect."}
      */
      /* connection error
      { message: "Failed to fetch", stack: "TypeError: Failed to fetch" }
      */
      let message = '';
      switch (e.status) {
        case undefined:
          message = 'Αδυναμία σύνδεσης';
          break;
        case 401:
          message = 'Λάθος όνομα ή κωδικός';
          break;
        default:
          message = 'Άγνωστο λάθος';
          console.log(e);
          break;
      }
      this.snackBar.open(message, null, { duration: 3000 });
      this.pass = '';
    } finally {
      this.loginForm.form.enable();
    }
  }

  public async signup() {
    if (this.pass === this.passverify) {
      try {
        this.signupForm.form.disable();
        await this.auth.signUp({ username: this.user, password: this.pass });
        this.router.navigate(['/patients']);
      } catch (e) {
        /* wrong username or password
        { status: 401, error: "unauthorized", name: "unauthorized", 
        message: "Name or password is incorrect.", reason: "Name or password is incorrect."}
        */
        /* connection error
        { message: "Failed to fetch", stack: "TypeError: Failed to fetch" }
        */
        console.log(e);
        let message = '';
        switch (e.status) {
          case undefined:
            message = 'Αδυναμία σύνδεσης';
            break;
          case 409:
            message = 'Το όνομα χρήστη χρησιμοποιείται ήδη.';
            break;
          default:
            message = 'Άγνωστο λάθος';
            console.log(e);
            break;
        }
        this.snackBar.open(message, null, { duration: 3000 });
        this.pass = '';
        this.passverify = '';
      } finally {
        this.signupForm.form.enable();
      }
    }
  }
}
