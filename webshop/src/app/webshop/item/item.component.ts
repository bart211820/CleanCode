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
  private pageIsReadyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private merchandiseService: MerchandiseService, private animatorService: AnimatorService, private basketService: BasketService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setMerchandiseIDBasedOnRoute();
    this.getMerchandiseObservable();
    this.getMerchandiseFromObservable();
  }

  setMerchandiseIDBasedOnRoute(){
    this.merchandiseID = this.route.snapshot.params['id'];
  }

  getMerchandiseObservable() {
    this.merchandiseObservable = this.merchandiseService.getOne(this.merchandiseID);
  }

  getMerchandiseFromObservable(): void {
    this.merchandiseObservable.subscribe(data => {
      this.merchandise = new Merchandise(data);
      this.getAnimatorObservable(this.merchandise.getMerchandiseAnimatorId());
      this.getAnimatorFromObservable();
    });
  }

  getAnimatorObservable(animatorID) {
    this.animatorObservable = this.animatorService.getOne(animatorID);
  }

  getAnimatorFromObservable(): void {
    this.animatorObservable.subscribe(data => {
      this.animator = new Animator(data);
      this.setPageReadyToDisplay();
    });
  }

  setPageReadyToDisplay(){
    this.pageIsReadyToDisplay = true;
  }

  addToCard(){
    try {
      this.tryAddToCard();
    } catch (e) {
      this.router.navigate(['/login']);
    }
  }

  tryAddToCard(){
    const session = this.getSession();
    this.basketService.addMerchandise(session.authenticator.userID, this.merchandiseID);
  }

  getSession() {
    const session = JSON.parse(window.localStorage.getItem('authorization'));
    if(session === undefined){
      throw new Error("NotSignedIn");
    } else {
      return session;
    }
  }
}
