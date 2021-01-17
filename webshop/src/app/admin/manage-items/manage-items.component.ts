import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {AuthorizationService} from "../../shared/authorization.service";
import {Router} from "@angular/router";
import {MerchandiseService} from "../../shared/modelsAndTheirServices/merchandise.service";
import {Order} from "../../shared/modelsAndTheirServices/order";
import {Merchandise} from "../../shared/modelsAndTheirServices/merchandise";
import {OrderService} from "../../shared/modelsAndTheirServices/order.service";

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    MerchandiseService
  ]
})
export class ManageItemsComponent implements OnInit {

  private items;
  private itemList = [];
  private readyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private itemService: MerchandiseService) { }

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
        this.itemList.push(new Merchandise(itemData));
      }
      this.readyToDisplay = true;
    });
  }
}
