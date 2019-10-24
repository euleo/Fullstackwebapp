import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  email: string;
  password: string;

  ngOnInit() {
  }

  login(): void {
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password)
        .subscribe(user => {
          localStorage.setItem('loggedUserId', user.details[0].id);
          this.router.navigate(["comments"]);
        });
    } else {
      alert("Please insert credentials");
    }
  }
}
