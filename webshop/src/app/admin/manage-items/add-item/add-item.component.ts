import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {AuthorizationService} from "../../../shared/authorization.service";
import {MerchandiseService} from "../../../shared/modelsAndTheirServices/merchandise.service";
import {AnimatorService} from "../../../shared/modelsAndTheirServices/animator.service";
import {Router} from "@angular/router";
import {Animator} from "../../../shared/modelsAndTheirServices/animator";
import {Merchandise} from "../../../shared/modelsAndTheirServices/merchandise";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    MerchandiseService,
    AnimatorService
  ]
})
export class AddItemComponent implements OnInit {

  private itemName;
  private itemDescription;
  private itemPrice;
  private itemImage;
  private itemType;
  private itemAnimatorID;

  private animators;
  private animatorList = [];

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private itemService: MerchandiseService, private animatorService: AnimatorService) { }

  ngOnInit() {
    this.animators = this.animatorService.getAll();
    this.getAnimators();
  }

  getAnimators() {
    this.animators.subscribe(data => {
      for(let animatorData of data) {
        this.animatorList.push(new Animator(animatorData));
      }
    });
  }

  makeItem() {
    const itemData = {
      itemID: undefined,
      itemName: this.itemName,
      itemDescription: this.itemDescription,
      itemPrice: this.itemPrice,
      itemImage: this.itemImage,
      itemType: this.itemType,
      itemAnimatorID: this.itemAnimatorID
    };
    this.itemService.create(new Merchandise(itemData));
  }

}
