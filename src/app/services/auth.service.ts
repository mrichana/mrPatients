import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseDbAdapterService } from './FirebaseDB/firebase-db-adapter.service';

import { Observable, EMPTY } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private db: FirebaseDbAdapterService,
    private router: Router
  ) {
  }

  async signIn() {
    try {
      await this.db.signIn();
      this.router.navigate(['/']);
    }
    finally {}
  }

  async signOut() {
    await this.db.signOut();
    return this.router.navigate(['/login']);
  }

  public user(): Observable<User> {
    return this.db.user$;
  }
}
