import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(JSON.parse(window.localStorage.getItem('authorization')) == undefined ) {
      this.router.navigate(['/shop']);
      return false;
    }
    const session = JSON.parse(window.localStorage.getItem('authorization'));
    const roles = session.authenticator.roles;
    if(!roles.includes('ADMIN')){
      this.router.navigate(['/shop']);
      return false;
    }
    return true;
  }

}
