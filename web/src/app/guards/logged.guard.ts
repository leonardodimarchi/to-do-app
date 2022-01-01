import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {

  constructor(
    private readonly router: Router,
  ) {}

  public async canActivate(route: ActivatedRouteSnapshot, _: RouterStateSnapshot) {
    const { isProtectedRoute, routeToRedirect } = route.data || {};

    if (!routeToRedirect)
      return true;

    const hasToken = !!JSON.parse(localStorage.getItem(environment.keys.userToken));

    if (hasToken && isProtectedRoute || !hasToken && !isProtectedRoute)
      return true;

    return await this.router.navigate([routeToRedirect], { replaceUrl: true });
  }
}
