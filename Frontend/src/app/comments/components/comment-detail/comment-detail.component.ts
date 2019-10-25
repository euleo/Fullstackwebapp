import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../../comments.service';
import { Observable } from 'rxjs';
import { Comment } from '../../../models/comment';
import { UsersService } from '../../../users/users.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {
  comment: Comment;
  id: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private commentsService: CommentsService,
    private usersService: UsersService) { }

  ngOnInit() {
    this.comment = new Comment();

    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id > 0) {
      this.commentsService.getComment(this.id).subscribe(res => {
        this.comment = res[0];
      });
    }
  }

  save(): void {
    if (this.comment.title && this.comment.body) {
      if (this.id > 0) {
        //modify
        this.commentsService.updateComment(this.comment)
          .subscribe(res => {
            this.router.navigate(["comments"]);
          });
      } else {
        //add
        this.comment.userId = this.usersService.loggedUser.id;
        this.commentsService.createComment(this.comment)
          .subscribe(res => {
            this.router.navigate(["comments"]);
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
