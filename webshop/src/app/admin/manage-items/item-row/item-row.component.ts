import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {AuthorizationService} from "../../../shared/authorization.service";
import {MerchandiseService} from "../../../shared/modelsAndTheirServices/merchandise.service";
import {AnimatorService} from "../../../shared/modelsAndTheirServices/animator.service";
import {Router} from "@angular/router";
import {Merchandise} from "../../../shared/modelsAndTheirServices/merchandise";
import {Animator} from "../../../shared/modelsAndTheirServices/animator";
import {Basket} from "../../../shared/modelsAndTheirServices/basket";

@Component({
  selector: 'app-item-row',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    MerchandiseService,
    AnimatorService
  ]
})
export class ItemRowComponent implements OnInit {

  @Input() item;
  private itemName;
  private itemDescription;
  private itemPrice;
  private itemImage;
  private itemType;
  private itemAnimatorID;

  private animators;
  private animatorList = [];
  private readyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private itemService: MerchandiseService, private animatorService: AnimatorService) { }

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
    const updatedItem = new Merchandise(itemData);
    this.itemService.update(updatedItem);
  }

  deleteItem() {
    this.itemService.delete(this.item.getItemID());
  }
}
