import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenStorage } from './token.storage';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private tokenStorage: TokenStorage) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addTokenToRequest(req);
    return next.handle(req);
  }

  protected addTokenToRequest(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenStorage.getToken();
    if (token) {
      return req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    } else {
      return req;
    }
  }
}
