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

  @Input() merchandise;
  private merchandiseName;
  private merchandiseDescription;
  private merchandisePrice;
  private merchandiseImage;
  private merchandiseType;
  private merchandiseAnimatorID;

  private animatorObservable;
  private animators = [];
  private componentIsReadyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private merchandiseService: MerchandiseService, private animatorService: AnimatorService) { }

  ngOnInit() {
    this.fillTextBoxes();
    this.clearAnimatorList();
    this.getAnimatorObservable();
    this.fillAnimators();
  }

  fillTextBoxes() {
    this.merchandiseName = this.merchandise.getMerchandiseName();
    this.merchandiseDescription = this.merchandise.getMerchandiseDescription();
    this.merchandisePrice = this.merchandise.getMerchandisePrice();
    this.merchandiseImage = this.merchandise.getMerchandiseImage();
    this.merchandiseType = this.merchandise.getMerchandiseType();
    this.merchandiseAnimatorID = this.merchandise.getMerchandiseAnimatorId();
  }

  clearAnimatorList() {
    this.animators = [];
  }

  getAnimatorObservable() {
    this.animatorObservable = this.animatorService.getAll();
  }

  fillAnimators() {
    this.animatorObservable.subscribe(data => {
      for(let animatorData of data) {
        this.addAnimatorToAnimators(new Animator(animatorData));
      }
      this.setComponentReadyToDisplay();
    });
  }

  addAnimatorToAnimators(animator){
    this.animators.push(animator);
  }

  setComponentReadyToDisplay() {
    this.componentIsReadyToDisplay = true;
  }

  editItem() {
    const updatedMerchandise = new Merchandise(this.createMerchandiseDataObject());
    this.merchandiseService.update(updatedMerchandise);
  }

  createMerchandiseDataObject() {
    return {
      itemID: this.merchandise.getMerchandiseID(),
      itemName: this.merchandiseName,
      itemDescription: this.merchandiseDescription,
      itemPrice: this.merchandisePrice,
      itemImage: this.merchandiseImage,
      itemType: this.merchandiseType,
      itemAnimatorID: this.merchandiseAnimatorID
    };
  }

  deleteItem() {
    this.merchandiseService.delete(this.merchandise.getMerchandiseID());
  }
}
