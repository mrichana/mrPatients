import { Component, OnInit } from '@angular/core';
import { DbAdapterService } from '../services/db-adapter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.less']
})
export class LogoutComponent implements OnInit {

  constructor( private db: DbAdapterService, private router: Router ) { }

  async ngOnInit() {
    await this.db.signOut();
    this.router.navigate(['/patients']);
  }

}
