import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorage } from '../token.storage';
import { UsersService } from '../users/users.service';
import { LoginService } from './login.service';

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
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password)
        .subscribe(response => {
          if (response && response.token) {
            const rawtoken = response.token;
            this.tokenStorage.saveToken(rawtoken);
            let user :any = this.jwtHelperServive.decodeToken(rawtoken);
            this.tokenStorage.saveUser(user);
            this.router.navigateByUrl('/comments');
          } else {
            alert("Authentication Error");
          }
        });
    } else {
      alert("Please insert credentials");
    }
  }

}
