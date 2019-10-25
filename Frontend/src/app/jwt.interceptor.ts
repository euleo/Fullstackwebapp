import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenStorage } from './token.storage';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private tokenStorage: TokenStorage) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercept");
    req = this.addTokenToRequest(req);
    return next.handle(req);
  }

  protected addTokenToRequest(req: HttpRequest<any>): HttpRequest<any> {
    console.log("addTokenToRequest");
    const token = this.tokenStorage.getToken();
    console.log("interceptor: ",token);
    if (token) {
      return req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    } else {
      return req;
    }
  }
}
