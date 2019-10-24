import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentDetailComponent } from './components/comment-detail/comment-detail.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { routing } from './comments.routing';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CommentDetailComponent, CommentsListComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule, 
    routing,
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class CommentsModule { }
