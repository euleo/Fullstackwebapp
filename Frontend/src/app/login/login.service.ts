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
export class LoginService {
  private readonly loginApiUrl = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = {email, password};
    return this.http.post(this.loginApiUrl, body, httpOptions);
  }
}
