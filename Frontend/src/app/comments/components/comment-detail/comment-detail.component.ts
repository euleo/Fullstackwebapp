import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../../comments.service';
import { Observable } from 'rxjs';
import { Comment } from '../../../models/comment';

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
    private commentsService: CommentsService) { }

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
        this.comment.userId = +localStorage.getItem("loggedUserId");
        this.commentsService.createComment(this.comment)
          .subscribe(res => {
            this.router.navigate(["comments"]);
          });

      }
    } else {
      alert("Please insert all fields");
    }
  }

}
