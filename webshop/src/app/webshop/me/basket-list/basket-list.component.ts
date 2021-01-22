import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {AuthorizationService} from "../../../shared/authorization.service";
import {Router} from "@angular/router";
import {BasketService} from "../../../shared/modelsAndTheirServices/basket.service";
import {Basket} from "../../../shared/modelsAndTheirServices/basket";
import {Merchandise} from "../../../shared/modelsAndTheirServices/merchandise";
import {MerchandiseService} from "../../../shared/modelsAndTheirServices/merchandise.service";
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
    MerchandiseService,
    OrderService
  ]
})
export class BasketListComponent implements OnInit {

  @Input() userID;
  private basketsObservable;
  private baskets = [];
  private merchandises = [];
  private totalPrice = 0;
  private componentIsReadyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private basketService: BasketService, private merchandiseService: MerchandiseService, private orderService: OrderService) { }

  ngOnInit() {
    this.loadBasketData();
  }

  loadBasketData() {
    this.clearBasketsAndMerchandises();
    this.getBasketsObservable();
    this.fillBaskets();
  }

  clearBasketsAndMerchandises() {
    this.clearBaskets();
    this.clearMerchandises();
  }

  clearBaskets() {
    this.baskets = [];
  }

  clearMerchandises() {
    this.merchandises = [];
  }

  getBasketsObservable() {
    this.basketsObservable = this.basketService.getFromUser(this.userID);
  }

  fillBaskets() {
    this.basketsObservable.subscribe(data => {
      for(let basketData of data) {
        this.addBasketToBaskets(new Basket(basketData));
      }
      this.fillMerchandises();
    });
  }

  addBasketToBaskets(basket) {
    this.baskets.push(basket);
  }

  fillMerchandises() {
    for(let basket of this.baskets) {
      const merchandiseObservable = this.merchandiseService.getOne(basket.getBasketID());
      this.addMerchandiseToMerchandises(merchandiseObservable);
    }
  }

  addMerchandiseToMerchandises(merchandise) {
    merchandise.subscribe(data => {
      this.merchandises.push(new Merchandise(data));
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    for(var i = 0; i < this.baskets.length; i++) {
      this.totalPrice += (this.merchandises[i].merchandisePrice * this.baskets[i].basketItemAmount);
    }
    this.setComponentReadyToDisplay();
  }

  setComponentReadyToDisplay() {
    this.componentIsReadyToDisplay = true;
  }

  handleBasketUpdate() {
    this.loadBasketData();
  }

  orderEverythingInMyBasket() {
    let deliveryDate = this.getDateOfDayIn3DaysFromNow(); // Delivery date is always 3 days after today
    for(let basketToOrder of this.baskets) {
      this.makeOrderFromBasket(basketToOrder, deliveryDate);
    }
    this.deleteBasketsFromUser();
  }

  getDateOfDayIn3DaysFromNow() {
    let today = this.getDateOfToday();
    const threeDaysFromNow = this.add3DaysToDate(today);
    return new Date(threeDaysFromNow);
  }

  getDateOfToday() {
    return new Date();
  }

  add3DaysToDate(date) {
    return date.setDate(date.getDate() + 3);
  }

  makeOrderFromBasket(basket, deliveryDate) {
    const orderData = this.makeOrderDataObjectFromBasket(basket, deliveryDate);
    const order = new Order(orderData);
    this.orderService.create(order);
  }

  makeOrderDataObjectFromBasket(basket, deliveryDate) {
    return {
      orderID: undefined,
      orderUserID: basket.basketUserID,
      orderItemID: basket.basketItemID,
      orderItemAmount: basket.basketItemAmount,
      orderDelivery: deliveryDate
    };
  }

  deleteBasketsFromUser() {
    this.basketService.deleteFromUser(this.userID);
  }
}
