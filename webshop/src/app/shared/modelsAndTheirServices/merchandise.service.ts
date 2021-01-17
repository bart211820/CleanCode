import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from "../api.service";
import {AuthorizationService} from "../authorization.service";
import {Merchandise} from "./merchandise";

@Injectable({
  providedIn: ApiService,
})
export class MerchandiseService {

  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private router: Router) { }

  public getAll(): Observable<Merchandise[]> {
    return this.api.get<Merchandise[]>('items');
  }

  public getOne(merchandiseID: number): Observable<Merchandise[]> {
    return this.api.get<Merchandise[]>('items/' + merchandiseID);
  }

  public create(merchandise: Merchandise): void {
    const data = merchandise.getData();
    this.api.post<void>('items', data).subscribe (
      data => {
        alert('Merchandise aangemaakt.');
        location.reload();
      },
      error => {
        alert('Could not make a new merchandise.');
      }
    );
  }

  public update(merchandise: Merchandise): void {
    const data = merchandise.getData();
    this.api.put<void>('items/' + merchandise.getMerchandiseID(), data).subscribe (
      data => {
        console.log('Merchandise has been updated.');
      },
      error => {
        console.log('Merchandise has NOT been updated!!! D:');
      }
    );
  }

  public delete(merchandiseID: number): void {
    this.api.delete<void>('items/' + merchandiseID).subscribe (
      data => {
        console.log('Merchandise got deleted');
      },
      error => {
        alert('Could not delete merchandise!');
      }
    );
  }

  public register(item: Merchandise): void {
    const data = item.getData();
    this.api.post<void>('items', data).subscribe (
      data => {
        console.log(data);
      },
      error => {
        alert('Het registreren is mislukt');
      }
    );
  }
}
