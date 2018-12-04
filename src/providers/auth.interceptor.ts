import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { AuthService } from './auth.service';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.getCurrentAuthData().mergeMap(authData => {
      if (
          authData.accessToken != null &&
          authData.client != null &&
          authData.expiry != null &&
          authData.tokenType != null &&
          authData.uid != null
      ) {
        const headers = {
          'access-token': authData.accessToken,
          'client':       authData.client,
          'expiry':       authData.expiry,
          'token-type':   authData.tokenType,
          'uid':          authData.uid
        };

        req = req.clone({
          setHeaders: headers
        });
      }

      return next.handle(req).pipe(tap(
        res => this.handleResponse(res),
        err => this.handleResponse(err)
      ));
    });
  }

  // Parse Auth data from response
  private handleResponse(res: any): void {
    if (res instanceof HttpResponse || res instanceof HttpErrorResponse) {
      this.authService.getAuthHeadersFromResponse(<any>res);
    }
  }
}