import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerImpl implements ErrorHandler {
  constructor(private injector: Injector) { }

  get router(): Router {
    return this.injector.get(Router);
  }

  handleError(error: any | HttpErrorResponse): void {
    // alert(error.error.details);
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        alert('Unauthorized!');
      } else if (error.status === 403) {
        this.router.navigateByUrl('/login');
      }
    }
  }
}
