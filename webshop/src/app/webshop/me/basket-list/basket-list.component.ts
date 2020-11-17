import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {AuthorizationService} from "../../../shared/authorization.service";
import {Router} from "@angular/router";
import {BasketService} from "../../../shared/modelsAndTheirServices/basket.service";
import {Basket} from "../../../shared/modelsAndTheirServices/basket";
import {Item} from "../../../shared/modelsAndTheirServices/item";
import {ItemService} from "../../../shared/modelsAndTheirServices/item.service";
import {OrderService} from "../../../shared/modelsAndTheirServices/order.service";
import {Order} from "../../../shared/modelsAndTheirServices/order";

@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    BasketService,
    ItemService,
    OrderService
  ]
})
export class BasketListComponent implements OnInit {

  @Input() userID;
  baskets;
  basketList = [];
  itemList = [];
  totalPrice = 0;
  readyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private basketService: BasketService, private itemService: ItemService, private orderService: OrderService) { }

  ngOnInit() {
    this.getAllBasketsFromAPI();
  }

  getAllBasketsFromAPI() {
    this.basketList = [];
    this.itemList = [];
    this.baskets = this.basketService.getFromUser(this.userID);
    this.getAllBaskets();
  }

  getAllBaskets(): void {
    this.baskets.subscribe(data => {
      for(let basketData of data) {
        this.basketList.push(new Basket(basketData));
      }
      this.getItemsFromAPI();
      this.readyToDisplay = true;
    });
  }

  getItemsFromAPI() {
    for(let basket of this.basketList) {
      const item = this.itemService.getOne(basket.getBasketItemID());
      this.getItem(item);
    }
  }

  getItem(item): void {
    item.subscribe(data => {
      this.itemList.push(new Item(data));
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    for(var i = 0; i < this.basketList.length; i++) {
      this.totalPrice += (this.itemList[i].itemPrice * this.basketList[i].basketItemAmount);
    }
  }

  recalculateTotalPrice(agreed: boolean) {
    setTimeout(() => {
      this.getAllBasketsFromAPI();
    }, 1000);

  }

  orderEverything() {
    var date = new Date();
    date.setDate(date.getDate() + 3);

    for(let basketToOrder of this.basketList){
      let orderData = {
        orderID: undefined,
        orderUserID: basketToOrder.basketUserID,
        orderItemID: basketToOrder.basketItemID,
        orderItemAmount: basketToOrder.basketItemAmount,
        orderDelivery: date
      }
      let newOrder = new Order(orderData);
      this.orderService.create(newOrder);
    }

    this.basketService.deleteFromUser(this.userID);
  }

}
