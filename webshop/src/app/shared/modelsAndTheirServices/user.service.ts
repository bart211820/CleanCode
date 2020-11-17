import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {ApiService} from "../api.service";
import {AuthorizationService} from "../authorization.service";

import { User } from './user';
import {Order} from "./order";

@Injectable({
  providedIn: ApiService,
})
export class UserService
{
  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private router: Router)
  {

  }

  public getAll(): Observable<User[]>
  {
    return this.api.get<User[]>('users');
  }

  public getOne(userID: number): Observable<User[]>
  {
    return this.api.get<User[]>('users/' + userID);
  }

  public register(user: User): void
  {
    let data = user.getData();

    this.api.post<void>('users', data).subscribe
    (
      data =>
      {
        this.login(user, true);
      },
      error =>
      {
        alert('Het registreren is mislukt');
      }
    );
  }

  public login(user: User, remember: boolean): void
  {
    this.authService.setAuthorization(user.getEmailAddress(), user.getPassword());

    this.api.get<User>('users/me').subscribe (
      authenticator => {
        this.authService.storeAuthorization(authenticator, remember);

        this.goToPageAfterLogin(authenticator);
      },
      error => {
        alert('Het inloggen is mislukt');
      }
    );
  }

  public logout()
  {
    this.authService.deleteAuthorization();

    this.goHome();
  }

  public goHome()
  {
    this.router.navigate(['']);
  }

  public goToPageAfterLogin(user){
    if (user.roles.includes('ADMIN')) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/me']);
    }
  }

  public update(user: User): void {
    const data = user.getData();
    this.api.put<void>('users/' + user.getUserID(), data).subscribe (
      data => {
        console.log('User has been updated.');
      },
      error => {
        console.log('User has NOT been updated!!! D:');
      }
    );
  }

  public delete(userID: number): void {
    this.api.delete<void>('users/' + userID).subscribe (
      data => {
        console.log('User got deleted');
      },
      error => {
        alert('Could not delete user!');
      }
    );
  }
}
