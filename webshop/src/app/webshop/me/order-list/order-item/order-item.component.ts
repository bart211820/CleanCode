import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Merchandise} from "../../../../shared/modelsAndTheirServices/merchandise";
import {ApiService} from "../../../../shared/api.service";
import {AuthorizationService} from "../../../../shared/authorization.service";
import {Router} from "@angular/router";
import {MerchandiseService} from "../../../../shared/modelsAndTheirServices/merchandise.service";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    MerchandiseService
  ]
})
export class OrderItemComponent implements OnInit {

  @Input() order;
  private item;
  private itemObject: Merchandise;
  private readyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private itemService: MerchandiseService) { }

  ngOnInit() {
    this.item = this.itemService.getOne(this.order.getOrderItemID());
    this.getAll();
  }

  getAll(): void {
    this.item.subscribe(data => {
      this.itemObject = new Merchandise(data);
      this.readyToDisplay = true;
    });
  }

}
