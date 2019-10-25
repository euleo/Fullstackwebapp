import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material';
import { User } from '../models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User;

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit() {
    this.user = new User();
  }

  register(): void {
    if (this.user.email && this.user.password && this.user.name && this.user.surname && this.user.role) {
      this.userService.createUser(this.user)
        .subscribe(user => {
          this.router.navigate(["login"]);
        });
    } else {
      alert("Please fill all fields");
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/login');
  }
}
