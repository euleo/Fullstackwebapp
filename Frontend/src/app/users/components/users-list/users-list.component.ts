import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';
import { TokenStorage } from 'src/app/token.storage';

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
    private usersService: UsersService,
    private tokenStorage: TokenStorage) { }

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
      if(user.id == this.tokenStorage.getUser().id){
        this.tokenStorage.getUser().role = user.role;      
      }
      this.router.navigate(["comments"]);
    });
  }
  goBack(): void {
    this.router.navigateByUrl('/comments');
  }
}
