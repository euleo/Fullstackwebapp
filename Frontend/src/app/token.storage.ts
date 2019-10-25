import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';


@Injectable()
export class TokenStorage {
  private storage: Storage = window.sessionStorage;

  signOut(): void {
    console.log("signOut");
    this.storage.removeItem(TOKEN_KEY);
  }

  saveToken(token: string): void {
    console.log("saveToken");
    this.storage.removeItem(TOKEN_KEY);
    this.storage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    console.log("getToken");
    // console.log("getToken: "+sessionStorage.getItem(TOKEN_KEY));
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
