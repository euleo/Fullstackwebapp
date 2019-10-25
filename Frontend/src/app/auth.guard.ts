import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorage } from './token.storage';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorage,
              private router: Router) { }

  canActivate(): boolean {
    console.log("canActivate");
    if (!this.tokenStorage.getToken()) {
      console.log("canActivate false");
      this.router.navigateByUrl('/login');
      alert("You don't have permission, please login");
      return false;
    }
    console.log("canActivate true");
    return true;
  }
}
