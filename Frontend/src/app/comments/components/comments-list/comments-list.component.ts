import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../../../models/comment';
import { UsersService } from '../../../users/users.service';
import { TokenStorage } from 'src/app/token.storage';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  displayedColumns: string[] = ['created_at', 'author', 'title', 'body', 'modify', 'cancel'];
  comments: Comment[];
  showButton = false;

  constructor(private commentService: CommentsService,
    private router: Router,
    private usersService: UsersService,
    private tokenStorage: TokenStorage) { }

  ngOnInit() {
    if (this.tokenStorage.getUser().role === "admin") {
      this.showButton = true;
    }

    this.loadComments();
  }

  loadComments() {
    this.commentService.getAllComments().subscribe(res => {
      this.comments = res;
    });
  }

  add() {
    this.router.navigateByUrl('/comments/0');
  };

  edit(comment) {
    this.router.navigateByUrl('/comments/' + comment.id);
  }

  delete(commentId) {
    this.commentService.deleteComment(commentId).subscribe(res => this.loadComments());
  }

  myProfile() {
    this.router.navigateByUrl('/users/' + this.tokenStorage.getUser().id);
  }

  logout() {
    this.router.navigateByUrl('/logout');
  }

  goToUsers() {
    this.router.navigateByUrl('/users');
  }
}
