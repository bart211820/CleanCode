import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {AuthorizationService} from "../../../shared/authorization.service";
import {Router} from "@angular/router";
import {OrderService} from "../../../shared/modelsAndTheirServices/order.service";
import {Order} from "../../../shared/modelsAndTheirServices/order";

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
  orders;
  orderList = [];
  readyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.orderList = [];
    this.orders = this.orderService.getFromUser(this.userID);
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.orders.subscribe(data => {
      for(let orderData of data) {
        this.orderList.push(new Order(orderData));
      }
      this.readyToDisplay = true;
    });
  }

}
