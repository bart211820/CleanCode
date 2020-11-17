import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {AuthorizationService} from "../../../shared/authorization.service";
import {ItemService} from "../../../shared/modelsAndTheirServices/item.service";
import {AnimatorService} from "../../../shared/modelsAndTheirServices/animator.service";
import {Router} from "@angular/router";
import {Item} from "../../../shared/modelsAndTheirServices/item";
import {Animator} from "../../../shared/modelsAndTheirServices/animator";
import {Basket} from "../../../shared/modelsAndTheirServices/basket";

@Component({
  selector: 'app-item-row',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    ItemService,
    AnimatorService
  ]
})
export class ItemRowComponent implements OnInit {

  @Input() item;
  itemName;
  itemDescription;
  itemPrice;
  itemImage;
  itemType;
  itemAnimatorID;

  animators;
  animatorList = [];
  readyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private itemService: ItemService, private animatorService: AnimatorService) { }

  ngOnInit() {
    this.animatorList = [];
    this.fillAttributes();
    this.animators = this.animatorService.getAll();
    this.getAnimators();
  }

  fillAttributes() {
    this.itemName = this.item.getItemName();
    this.itemDescription = this.item.getItemDescription();
    this.itemPrice = this.item.getItemPrice();
    this.itemImage = this.item.getItemImage();
    this.itemType = this.item.getItemType();
    this.itemAnimatorID = this.item.getItemAnimatorId();
  }

  getAnimators() {
    this.animators.subscribe(data => {
      for(let animatorData of data) {
        this.animatorList.push(new Animator(animatorData));
      }
      this.readyToDisplay = true;
    });
  }

  editItem() {
    const itemData = {
      itemID: this.item.getItemID(),
      itemName: this.itemName,
      itemDescription: this.itemDescription,
      itemPrice: this.itemPrice,
      itemImage: this.itemImage,
      itemType: this.itemType,
      itemAnimatorID: this.itemAnimatorID
    };
    const updatedItem = new Item(itemData);
    this.itemService.update(updatedItem);
  }

  deleteItem() {
    this.itemService.delete(this.item.getItemID());
  }
}
