import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {AuthorizationService} from "../../shared/authorization.service";
import {Router} from "@angular/router";
import {ItemService} from "../../shared/modelsAndTheirServices/item.service";
import {Order} from "../../shared/modelsAndTheirServices/order";
import {Item} from "../../shared/modelsAndTheirServices/item";
import {OrderService} from "../../shared/modelsAndTheirServices/order.service";

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    ItemService
  ]
})
export class ManageItemsComponent implements OnInit {

  items;
  itemList = [];
  readyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private itemService: ItemService) { }

  ngOnInit() {
    this.getItemsFromApi();
  }

  getItemsFromApi() {
    this.itemList = [];
    this.items = this.itemService.getAll();
    this.getItems();
  }

  getItems() {
    this.items.subscribe(data => {
      for(let itemData of data) {
        this.itemList.push(new Item(itemData));
      }
      this.readyToDisplay = true;
    });
  }
}
