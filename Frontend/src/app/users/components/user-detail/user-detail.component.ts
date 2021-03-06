import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  id: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id > 0) {
      this.usersService.getUser(this.id).subscribe(res => {
        this.user = res[0];
      });
    }
  }

  save(): void {
    if (this.user.email && this.user.name && this.user.surname) {
      if (this.id > 0) {
        //modify
        this.usersService.updateUser(this.user)
          .subscribe(res => {
            this.router.navigate(["comments"]);
          });
      } else {
        //add
        this.usersService.createUser(this.user)
          .subscribe(res => {
            this.router.navigate(["users"]);
          });

      }
    } else {
      alert("Please insert all fields");
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/comments');
  }
}
