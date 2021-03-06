import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from '../api.service';
import {AuthorizationService} from '../authorization.service';
import {Basket} from './basket';

@Injectable({
  providedIn: ApiService,
})
export class BasketService {

  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private router: Router) { }

  public getAll(): Observable<Basket[]> {
    return this.api.get<Basket[]>('baskets');
  }

  public getOne(basketID: number): Observable<Basket[]> {
    return this.api.get<Basket[]>('baskets/' + basketID);
  }

  public getFromUser(basketUserID: number): Observable<Basket[]> {
    return this.api.get<Basket[]>('baskets/from/' + basketUserID);
  }

  public getFromUserWithItem(basketUserID: number, basketItemID: number): Observable<Basket[]> {
    return this.api.get<Basket[]>('baskets/from/' + basketUserID + '/' + basketItemID);
  }

  public create(basket: Basket): void {
    const data = basket.getData();
    this.api.post<void>('baskets', data).subscribe (
      data => {
        alert('Basket aangemaakt.');
        location.reload();
      },
      error => {
        alert('Could not make a new basket.');
      }
    );
  }

  public update(basket: Basket): void {
    const data = basket.getData();
    this.api.put<void>('baskets/' + basket.getBasketID(), data).subscribe (
      data => {
        console.log('Basket has been updated.');
      },
      error => {
        console.log('Basket has NOT been updated!!! D:');
      }
    );
  }

  public delete(basketID: number): void {
    this.api.delete<void>('baskets/' + basketID).subscribe (
      data => {
        console.log('Basket got deleted');
      },
      error => {
        alert('Could not delete basket!');
      }
    );
  }

  public deleteFromUser(basketUserID: number): void {
    this.api.delete<void>('baskets/from/' + basketUserID).subscribe (
      data => {
        console.log('Baskets got deleted');
      },
      error => {
        alert('Could not delete baskets!');
      }
    );
  }

  public register(basket: Basket): void {
    const data = basket.getData();
    this.api.post<void>('baskets', data).subscribe (
      data => {
        console.log(data);
      },
      error => {
        alert('Het registreren is mislukt');
      }
    );
  }



  public addMerchandise(userID: number, merchandiseID: number): void {
    const currentBasket = this.getFromUserWithItem(userID, merchandiseID);

    currentBasket.subscribe(data => {
      if (data.length == 0) {
        this.makeNewBasketAndMakeRequest(userID, merchandiseID);
      } else {
        this.updateCurrentBasketAndMakeRequest(data);
      }
    });
  }

  private makeNewBasketAndMakeRequest(userID: number, merchandiseID: number) {
    const basketData = {
      basketID: undefined,
      basketUserID: userID,
      basketItemID: merchandiseID,
      basketItemAmount: 1
    };
    this.create(new Basket(basketData));
  }

  private updateCurrentBasketAndMakeRequest(currentBasketData) {
    const basket = new Basket(currentBasketData[0]);
    basket.addOneToAmount();
    this.update(basket);
  }


}
