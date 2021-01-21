import { Injectable } from '@angular/core';

import { AuthorizationService } from './authorization.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private authService: AuthorizationService) {

  }

  public get<T>(path: string, queryParameters?: object): Observable<any> {
    const requestProperties = this.createRequestProperties(path, queryParameters);
    console.log(requestProperties.uri);
    return this.http.get(requestProperties.uri, requestProperties.options);
  }

  public post<T>(path: string, data: Object, queryParameters?: Object): Observable<any> {
    const requestProperties = this.createRequestProperties(path, queryParameters);
    return this.http.post(requestProperties.uri, data, requestProperties.options);
  }

  public put<T>(path: string, data: Object, queryParameters?: Object): Observable<any> {
    const requestProperties = this.createRequestProperties(path, queryParameters);
    return this.http.put(requestProperties.uri, data, requestProperties.options);
  }

  public delete<T>(path: string, queryParameters?: Object): Observable<any> {
    const requestProperties = this.createRequestProperties(path, queryParameters);
    console.log(requestProperties.uri);
    return this.http.delete(requestProperties.uri, requestProperties.options);
  }

  private createRequestProperties(path, queryParameters) {
    const uri = this.createURI(path, queryParameters);
    const headers = this.createRequestHeaders();

    return {uri: uri, options: {headers: headers}};
  }

  private createURI(path: string, queryParameters: object): string {
    const queryString = this.getQueryString(queryParameters);
    return `/api/${path}${queryString}`;
  }

  private getQueryString(queryParameters: object): string {
    let queryString = '';
    if (typeof queryParameters === 'object') {
      queryString = this.createQueryString(queryParameters);
    }

    return queryString;
  }

  private createQueryString(queryParameters) {
    let queryString = '';
    for (const key in queryParameters) {
      const value = queryParameters[key];
      const prefix = queryString.length === 0 ? '?' : '&';

      queryString += `${prefix}${key}=${value}`;
    }

    return queryString;
  }

  private createRequestHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    if (this.authService.hasAuthorization()) {
      headers = headers.set('Authorization', this.authService.createAuthorizationString());
    }

    return headers;
  }
}
