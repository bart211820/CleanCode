import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../../../shared/modelsAndTheirServices/item";
import {ApiService} from "../../../../shared/api.service";
import {AuthorizationService} from "../../../../shared/authorization.service";
import {Router} from "@angular/router";
import {ItemService} from "../../../../shared/modelsAndTheirServices/item.service";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    ItemService
  ]
})
export class OrderItemComponent implements OnInit {

  @Input() order;
  item;
  itemObject: Item;
  readyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private itemService: ItemService) { }

  ngOnInit() {
    this.item = this.itemService.getOne(this.order.getOrderItemID());
    this.getAll();
  }

  getAll(): void {
    this.item.subscribe(data => {
      this.itemObject = new Item(data);
      this.readyToDisplay = true;
    });
  }

}
