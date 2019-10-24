import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  displayedColumns: string[] = ['created_at', 'author', 'title', 'body', 'modify', 'cancel'];
  comments: Comment[];
  loggedUserId: number;
  showButtons: boolean;

  constructor(private commentService: CommentsService, private router: Router, ) { }

  ngOnInit() {
    this.loggedUserId = +localStorage.getItem("loggedUserId");
    this.loadComments();
  }

  loadComments() {
    this.commentService.getAllComments().subscribe(res => {
      
      for(let i = 0; i < res.length; i++){
        let tmpDate = res[i].created_at.split("T");
        res[i].created_at = tmpDate[0] + " " + tmpDate[1].split(".")[0];
      }

      this.comments = res;
    });
  }

  add() {
    this.router.navigateByUrl('/comments/0');
  };

  edit(comment) {
    this.router.navigateByUrl('/comments/'+comment.id);
  }

  delete(commentId) {
    this.commentService.deleteComment(commentId).subscribe(res => this.loadComments());
  }

  myProfile(){
    this.router.navigateByUrl('/users/'+this.loggedUserId);
  }
}
