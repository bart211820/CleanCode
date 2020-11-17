import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../shared/api.service";
import {AuthorizationService} from "../../shared/authorization.service";
import {ItemService} from "../../shared/modelsAndTheirServices/item.service";
import {Item} from "../../shared/modelsAndTheirServices/item";
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
    ItemService,
    AnimatorService,
    BasketService
  ]
})
export class ItemComponent implements OnInit {
  private item;
  private itemObject: Item;
  private animator;
  private animatorObject: Animator;
  private basket;
  private basketObject: Basket;
  private itemID;
  private readyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private itemService: ItemService, private animatorService: AnimatorService, private basketService: BasketService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.itemID = this.route.snapshot.params['id'];
    this.item = this.itemService.getOne(this.itemID);
    this.getItem();
  }

  getItem(): void {
    this.item.subscribe(data => {
      this.itemObject = new Item(data);
      this.animator = this.animatorService.getOne(this.itemObject.getItemAnimatorId());
      this.getAnimator();
    });
  }

  getAnimator(): void {
    this.animator.subscribe(data => {
      this.animatorObject = new Animator(data);
      this.readyToDisplay = true;
    });
  }

  tryAddToCard() {
    const session = JSON.parse(window.localStorage.getItem('authorization'));
    if(session == undefined){
      this.router.navigate(['/login']);
    }
    else {
      this.getMyBasketFromAPI(session.authenticator.userID);
    }
  }

  getMyBasketFromAPI(userID: number) {
    this.basket = this.basketService.getFromUserWithItem(userID, this.itemID);
    this.addItemToCard(userID);
  }

  addItemToCard(userID: number) {
    this.basket.subscribe(data => {
      if(data.length == 0){
        const basketData = {
          basketID: undefined,
          basketUserID: userID,
          basketItemID: this.itemID,
          basketItemAmount: 1
        };
        this.basketObject = new Basket(basketData);
        this.basketService.create(this.basketObject);
      }
      else {
        this.basketObject = new Basket(data[0]);
        this.basketObject.addAnotherOne();
        this.basketService.update(this.basketObject);
      }
    });
  }


}
