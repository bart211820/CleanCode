import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Basket} from "../../../../shared/modelsAndTheirServices/basket";
import {ApiService} from "../../../../shared/api.service";
import {AuthorizationService} from "../../../../shared/authorization.service";
import {Router} from "@angular/router";
import {MerchandiseService} from "../../../../shared/modelsAndTheirServices/merchandise.service";
import {Merchandise} from "../../../../shared/modelsAndTheirServices/merchandise";
import {NgForm} from "@angular/forms";
import {BasketService} from "../../../../shared/modelsAndTheirServices/basket.service";
import {Animator} from "../../../../shared/modelsAndTheirServices/animator";

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    MerchandiseService,
    BasketService
  ]
})
export class BasketItemComponent implements OnInit {

  @Input() basket: Basket;
  @Output() basketUpdate = new EventEmitter<boolean>();
  private merchandiseObservable;
  private merchandise: Merchandise;
  private merchandiseAmount: number;
  private componentIsReadyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private merchandiseService: MerchandiseService, private basketService: BasketService) { }

  ngOnInit() {
    this.getMerchandiseObservable();
    this.setMerchandise();
    this.setMerchandiseAmount(this.basket.getBasketItemAmount());
  }

  getMerchandiseObservable(){
    this.merchandiseObservable = this.merchandiseService.getOne(this.basket.getBasketItemID());
  }

  setMerchandise() {
    this.merchandiseObservable.subscribe(data => {
      this.merchandise = new Merchandise(data);
      this.setComponentReadyToDisplay();
    });
  }

  setComponentReadyToDisplay() {
    this.componentIsReadyToDisplay = true;
  }

  setMerchandiseAmount(merchandiseAmount) {
    this.merchandiseAmount = merchandiseAmount;
  }

  updateMerchandiseAmount() {
    const newBasket = new Basket(this.makeBasketDataObjectFromBasket());
    this.basketService.update(newBasket);
    this.emitBasketUpdate();
  }

  makeBasketDataObjectFromBasket(){
    return {
      basketID: this.basket.getBasketID(),
      basketUserID: this.basket.getBasketUserID(),
      basketItemID: this.basket.getBasketItemID(),
      basketItemAmount: this.merchandiseAmount
    };
  }

  removeBasket() {
    this.basketService.delete(this.basket.getBasketID());
    this.emitBasketUpdate();
  }

  emitBasketUpdate() {
    this.basketUpdate.emit(true);
  }
}
