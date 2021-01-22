import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../shared/api.service";
import {AuthorizationService} from "../../shared/authorization.service";
import {MerchandiseService} from "../../shared/modelsAndTheirServices/merchandise.service";
import {Merchandise} from "../../shared/modelsAndTheirServices/merchandise";
import {AnimatorService} from "../../shared/modelsAndTheirServices/animator.service";
import {Animator} from "../../shared/modelsAndTheirServices/animator";
import {Basket} from "../../shared/modelsAndTheirServices/basket";
import {BasketService} from "../../shared/modelsAndTheirServices/basket.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    MerchandiseService,
    AnimatorService,
    BasketService
  ]
})
export class ItemComponent implements OnInit {
  private merchandiseObservable;
  private merchandise: Merchandise;
  private animatorObservable;
  private animator: Animator;
  private merchandiseID;
  private componentIsReadyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private merchandiseService: MerchandiseService, private animatorService: AnimatorService, private basketService: BasketService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setMerchandiseIDBasedOnRoute();
    this.getMerchandiseObservable();
    this.getMerchandiseFromObservable();
  }

  setMerchandiseIDBasedOnRoute() {
    this.merchandiseID = this.route.snapshot.params['id'];
  }

  getMerchandiseObservable() {
    this.merchandiseObservable = this.merchandiseService.getOne(this.merchandiseID);
  }

  getMerchandiseFromObservable() {
    this.merchandiseObservable.subscribe(data => {
      this.merchandise = new Merchandise(data);
      this.getAnimatorObservable(this.merchandise.getMerchandiseAnimatorId());
      this.getAnimatorFromObservable();
    });
  }

  getAnimatorObservable(animatorID) {
    this.animatorObservable = this.animatorService.getOne(animatorID);
  }

  getAnimatorFromObservable() {
    this.animatorObservable.subscribe(data => {
      this.animator = new Animator(data);
      this.setComponentReadyToDisplay();
    });
  }

  setComponentReadyToDisplay() {
    this.componentIsReadyToDisplay = true;
  }

  addToCard() {
    try {
      this.tryAddToCard();
    } catch (e) {
      if(e.message === "NotSignedIn"){
        this.router.navigate(['/login']);
      } else {
        console.error(e);
      }
    }
  }

  tryAddToCard() {
    const session = this.authService.getSession();
    this.basketService.addMerchandise(session.authenticator.userID, this.merchandiseID);
  }
}
