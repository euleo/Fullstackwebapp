import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorage } from '../token.storage';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  private jwtHelperServive = new JwtHelperService();

  constructor(
    private router: Router,
    private loginService: LoginService,
    private tokenStorage: TokenStorage,
    private userService: UsersService,
  ) { }

  ngOnInit() {
  }

  login(): void {
    console.log("login");
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password)
        .subscribe(response => {

          console.log("response", response);
          console.log("response.token", response.token);

          if (response && response.token) {
            const rawtoken = response.token;
            console.log("rawtoken: " + rawtoken);
            this.tokenStorage.saveToken(rawtoken);
            this.userService.loggedUser = this.jwtHelperServive.decodeToken(rawtoken);
            console.log("user: ", this.userService.loggedUser);
            this.router.navigateByUrl('/comments');
          }
          else {
            console.log("error", response);
            alert("Authentication Error");
          }
        });
    } else {
      alert("Please insert credentials");
    }
  }

}
