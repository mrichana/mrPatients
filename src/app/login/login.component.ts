import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DbAdapterService } from '../services/db-adapter.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private db: DbAdapterService,
    private router: Router
  ) { }

  public user: string;
  public pass: string;

  ngOnInit() {
  }

  public async login() {
    console.log(this.user);
    console.log(this.pass);
    try {
      await this.db.signIn({ user: this.user, pass: this.pass });
      this.router.navigate(['/patients']);
    } catch {
      this.pass = '';
    }
  }

}
