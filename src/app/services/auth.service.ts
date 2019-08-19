import { Injectable } from '@angular/core';
import { DbAdapterService } from './db-adapter.service';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private db: DbAdapterService) { }

  async signIn(credentials: { username: string, password: string }) {
    return await this.db.signIn(credentials);
  }

  async signUp(credentials: { username: string, password: string }) {
    return await this.db.signUp(credentials);
  }

  async signOut() {

    await this.db.signOut();
  }

  public user(): Observable<User> {
    return this.db.getUser();
  }
}
