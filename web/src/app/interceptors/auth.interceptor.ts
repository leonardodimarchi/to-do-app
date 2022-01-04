import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenFromStorage = localStorage.getItem(environment.keys.userToken);
    const token: { access_token: string } = JSON.parse(tokenFromStorage);

    if (!token)
      return next.handle(req);

    const headers = req.headers.set('Authorization', 'Bearer ' + token.access_token);

    req = req.clone({
      headers,
    });

    return next.handle(req);
  }

  //#endregion

}
