import { Injectable } from '@angular/core';
import { DbAdapterService } from './db-adapter.service';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private db: DbAdapterService) {  }

  async signIn() {
    try {
      await this.db.signIn();
    } catch (e) {
      console.log(e);
    }
  }

  async signOut() {

    await this.db.signOut();
  }

  public user(): Observable<User> {
    return this.db.getUser();
  }
}
