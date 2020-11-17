import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Basket} from "../../../../shared/modelsAndTheirServices/basket";
import {ApiService} from "../../../../shared/api.service";
import {AuthorizationService} from "../../../../shared/authorization.service";
import {Router} from "@angular/router";
import {ItemService} from "../../../../shared/modelsAndTheirServices/item.service";
import {Item} from "../../../../shared/modelsAndTheirServices/item";
import {NgForm} from "@angular/forms";
import {BasketService} from "../../../../shared/modelsAndTheirServices/basket.service";

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    ItemService,
    BasketService
  ]
})
export class BasketItemComponent implements OnInit {

  @Input() basket: Basket;
  @Output() totalPriceUpdate = new EventEmitter<boolean>();
  item;
  itemObject: Item;
  itemAmount: number;
  readyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private itemService: ItemService, private basketService: BasketService) { }

  ngOnInit() {
    this.item = this.itemService.getOne(this.basket.getBasketItemID());
    this.getAll();
    this.itemAmount = this.basket.getBasketItemAmount();
  }

  getAll(): void {
    this.item.subscribe(data => {
      this.itemObject = new Item(data);
      this.readyToDisplay = true;
    });
  }

  updateAmount() {
    const basketData = {
      basketID: this.basket.getBasketID(),
      basketUserID: this.basket.getBasketUserID(),
      basketItemID: this.basket.getBasketItemID(),
      basketItemAmount: this.itemAmount
    };
    const newBasket = new Basket(basketData);
    this.basketService.update(newBasket);
    this.updateTotalPrice();
  }

  removeBasket() {
    this.basketService.delete(this.basket.getBasketID());
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    this.totalPriceUpdate.emit(true);
  }
}
