import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../shared/api.service';
import {AuthorizationService} from '../../../shared/authorization.service';
import {MerchandiseService} from '../../../shared/modelsAndTheirServices/merchandise.service';
import {AnimatorService} from '../../../shared/modelsAndTheirServices/animator.service';
import {Router} from '@angular/router';
import {Animator} from '../../../shared/modelsAndTheirServices/animator';
import {Merchandise} from '../../../shared/modelsAndTheirServices/merchandise';

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

  private merchandiseName;
  private merchandiseDescription;
  private merchandisePrice;
  private merchandiseImage;
  private merchandiseType;
  private merchandiseAnimatorID;

  private animatorObservable;
  private animators = [];

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private merchandiseService: MerchandiseService, private animatorService: AnimatorService) { }

  ngOnInit() {
    this.getAnimatorObservable();
    this.fillAnimators();
  }

  getAnimatorObservable() {
    this.animatorObservable = this.animatorService.getAll();
  }

  fillAnimators() {
    this.animatorObservable.subscribe(data => {
      for (const animatorData of data) {
        this.addAnimatorToAnimators(new Animator(animatorData));
      }
    });
  }

  addAnimatorToAnimators(animator) {
    this.animators.push(animator);
  }

  makeItem() {
    const newMerchandise = new Merchandise(this.createMerchandiseDataObject());
    this.merchandiseService.create(newMerchandise);
  }

  createMerchandiseDataObject() {
    return {
      itemID: undefined,
      itemName: this.merchandiseName,
      itemDescription: this.merchandiseDescription,
      itemPrice: this.merchandisePrice,
      itemImage: this.merchandiseImage,
      itemType: this.merchandiseType,
      itemAnimatorID: this.merchandiseAnimatorID
    };
  }

}
