import { Injectable } from '@angular/core';

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
}
