import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {Router} from "@angular/router";
import {AuthorizationService} from "../../shared/authorization.service";
import {Observable} from "rxjs";
import {Item} from "../../shared/modelsAndTheirServices/item";
import {ItemService} from "../../shared/modelsAndTheirServices/item.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    ItemService
  ]
})
export class ShopComponent implements OnInit {
  private items;
  private itemList = [];

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private itemService: ItemService) { }

  ngOnInit() {
    this.items = this.itemService.getAll();
    this.getAll();
  }

  getAll(): void {
    this.items.subscribe(data => {
      for(let itemData of data) {
        this.itemList.push(new Item(itemData));
      }
    });
  }



}
