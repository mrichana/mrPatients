import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DbAdapterService } from '../services/db-adapter.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private db: DbAdapterService,
    private router: Router,
    private titleService: Title
  ) { }

  public user: string;
  public pass: string;
  public passverify: string;

  ngOnInit() {
    this.titleService.setTitle('Ασθενείς - Σύνδεση');
  }

  public async login() {
    try {
      await this.db.signIn({ user: this.user, pass: this.pass });
      this.router.navigate(['/patients']);
    } catch (e) {
      this.pass = '';
    }
  }

  public async signup() {
    if (this.pass === this.passverify) {
      try {
        await this.db.signUp({ user: this.user, pass: this.pass });
        this.router.navigate(['/patients']);
      } catch {
        this.pass = '';
      }
    }
  }
}
