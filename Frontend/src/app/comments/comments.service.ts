import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly commentsApiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<any> {
    return this.http.get(this.commentsApiUrl, httpOptions);
  }

  deleteComment(commentId: string): Observable<null> {
    return this.http.delete<any>(`${this.commentsApiUrl}/${commentId}`);
  }

  getComment(commentId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/comment/${commentId}`, httpOptions);
  }

  updateComment(comment): Observable<null> {
    return this.http.put<any>(`${this.commentsApiUrl}/${comment.id}`,comment);
  }

  createComment(comment): Observable<null> {
    return this.http.post<any>(`${this.commentsApiUrl}`,comment);
  }
}
