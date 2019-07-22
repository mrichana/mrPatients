import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor() { }

  public user: string;
  public pass: string;

  ngOnInit() {
  }

  public login() {
    console.log(this.user);
    console.log(this.pass);
  }

}
