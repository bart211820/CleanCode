import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/api.service';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Router} from '@angular/router';
import {OrderService} from '../../../shared/modelsAndTheirServices/order.service';
import {Order} from '../../../shared/modelsAndTheirServices/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    OrderService
  ]
})
export class OrderListComponent implements OnInit {

  @Input() userID;
  private ordersObservable;
  private orders = [];
  private componentIsReadyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.clearOrders();
    this.getOrderObservable();
    this.fillOrders();
  }

  clearOrders() {
    this.orders = [];
  }

  getOrderObservable() {
    this.ordersObservable = this.orderService.getFromUser(this.userID);
  }

  fillOrders() {
    this.ordersObservable.subscribe(data => {
      for (const orderData of data) {
        this.addOrderToOrders(new Order(orderData));
      }
      this.setComponentReadyToDisplay();
    });
  }

  addOrderToOrders(order) {
    this.orders.push(order);
  }

  setComponentReadyToDisplay() {
    this.componentIsReadyToDisplay = true;
  }
}
