import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['email', 'role', 'save'];
  users: User[];

  constructor(
    private router: Router,
    private usersService: UsersService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe(res => {
      this.users = res;
    });
  }

  save(user: User){
    this.usersService.updateUser(user)
    .subscribe(res => {
      this.router.navigate(["comments"]);
    });
  }
  goBack(): void {
    this.router.navigateByUrl('/comments');
  }
}
