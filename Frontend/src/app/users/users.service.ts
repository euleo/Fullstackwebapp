import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly usersApiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(this.usersApiUrl, httpOptions);
  }

  deleteUser(userId: string): Observable<null> {
    return this.http.delete<any>(`${this.usersApiUrl}/${userId}`);
  }

  getUser(userId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${userId}`, httpOptions);
  }

  updateUser(user): Observable<null> {
    return this.http.put<any>(`${this.usersApiUrl}/${user.id}`,user);
  }

  createUser(user): Observable<null> {
    return this.http.post<any>(`${environment.apiUrl}/register`,user);
  }
}
