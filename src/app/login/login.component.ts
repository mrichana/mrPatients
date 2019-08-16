import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { DbAdapterService } from '../services/db-adapter.service';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm', { static: false }) public loginForm: NgForm;

  constructor(
    private db: DbAdapterService,
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
      await this.db.signIn({ user: this.user, pass: this.pass });
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
      }
      this.snackBar.open(message, null, {duration: 3000});
      this.pass = '';
    } finally {
      this.loginForm.form.enable();
    }
  }

  public async signup() {
    if (this.pass === this.passverify) {
      try {
        await this.db.signUp({ user: this.user, pass: this.pass });
        this.router.navigate(['/patients']);
      } catch (e) {
        let message = '';
        switch (e.status) {
          case undefined:
            message = 'Αδυναμία σύνδεσης';
            break;
        }
        this.snackBar.open(message);
          this.pass = '';
        this.passverify = '';
      }
    }
  }
}
