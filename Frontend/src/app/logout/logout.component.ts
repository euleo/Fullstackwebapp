import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../token.storage';
import { Router } from '@angular/router';

@Component({ template: '' })
export class LogoutComponent {
  constructor(private tokenStorage: TokenStorage,
              private router: Router) {
    tokenStorage.signOut();
    this.router.navigateByUrl('/login');
  }
}
