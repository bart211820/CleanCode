import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class AuthorizationService {
  private login: string = null;
  private password: string = null;
  private authenticator: object = null;

  public authorized$ = new Subject<boolean>();

  constructor() {
    this.restoreAuthorization();
  }

  public hasAuthorization(): boolean {
    return this.login !== null && this.password !== null;
  }

  public setAuthorization(login: string, password: string): void {
    this.login = login;
    this.password = password;
  }

  private restoreAuthorization(): void {
    let authorizationString = sessionStorage.getItem('authorization');

    if (authorizationString === null) {
      authorizationString = localStorage.getItem('authorization');
    }

    if (authorizationString !== null) {
      const authorization = JSON.parse(authorizationString);

      this.setLogin(authorization['login']);
      this.setPassword(authorization['password']);
      this.setAuthenticator(authorization['authenticator']);

      this.authorized$.next(true);
    }
  }

  public deleteAuthorization(): void {
    this.login = null;
    this.password = null;
    this.authenticator = null;

    localStorage.removeItem('authorization');

    this.authorized$.next(false);
  }

  public createAuthorizationString(): string {
    // btoa encodes a string in base-64
    return 'Basic ' + btoa(this.login + ':' + this.password);
  }

  private setLogin(login) {
    this.login = login;
  }

  private setPassword(password) {
    this.password = password;
  }

  public getAuthenticator(): Object {
    return this.authenticator;
  }

  public setAuthenticator(authenticator: Object): void {
    this.authenticator = authenticator;
  }

  public getSession() {
    const session = JSON.parse(window.localStorage.getItem('authorization'));
    if (session === null) {
      throw new Error('NotSignedIn');
    } else {
      return session;
    }
  }

  public checkIfLoggedIn() {
    try {
      this.getSession();
      return true;
    } catch (e) {
      return false;
    }
  }



  // De functie "storeAuthorization" is gebruikt voor het "Refactoring van Fowler" onderdeel van het verslag
  // en is daarom niet gerefactored in de codebase. Onder de functie staat een voorbeeld van hoe de functie
  // eruit had gezien als deze wel gerefactord was.

  public storeAuthorization(authenticator: object) {
    this.authenticator = authenticator;

    const authorization = {
      login: this.login,
      password: this.password,
      authenticator: this.authenticator
    };

    const authorizationString = JSON.stringify(authorization);

    localStorage.setItem('authorization', authorizationString);

    this.authorized$.next(true);
  }

  // public storeAuthorization(authenticator: object) {
  //   this.authenticator = authenticator;
  //
  //   const authorizationString = this.constructAuthorizationString();
  //   localStorage.setItem('authorization', authorizationString);
  //
  //   this.authorized$.next(true);
  // }
  //
  // public constructAuthorizationString() {
  //   const authorization = {
  //     login: this.login,
  //     password: this.password,
  //     authenticator: this.authenticator
  //   };
  //   return JSON.stringify(authorization);
  // }
}
