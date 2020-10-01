import { Injectable } from '@angular/core';
import { User } from './models/user';

const TOKEN_KEY = 'token';


@Injectable()
export class TokenStorage {
  private storage: Storage = window.sessionStorage;

  signOut(): void {
    this.storage.removeItem(TOKEN_KEY);
  }

  saveToken(token: string): void {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  saveUser(user: User): void {
    this.storage.removeItem('user');
    this.storage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(sessionStorage.getItem('user'));
  }
}
