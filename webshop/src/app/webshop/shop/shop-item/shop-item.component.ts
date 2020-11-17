import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../shared/modelsAndTheirServices/item";

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

}
