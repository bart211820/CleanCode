import {Component, Input, OnInit} from '@angular/core';
import {Merchandise} from '../../../../shared/modelsAndTheirServices/merchandise';
import {ApiService} from '../../../../shared/api.service';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {Router} from '@angular/router';
import {MerchandiseService} from '../../../../shared/modelsAndTheirServices/merchandise.service';

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
  private merchandiseObservable;
  private merchandise: Merchandise;
  private componentIsReadyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private merchandiseService: MerchandiseService) { }

  ngOnInit() {
    this.getMerchandiseObservable();
    this.setMerchandise();
  }

  getMerchandiseObservable() {
    this.merchandiseObservable = this.merchandiseService.getOne(this.order.getOrderItemID());
  }

  setMerchandise() {
    this.merchandiseObservable.subscribe(data => {
      this.merchandise = new Merchandise(data);
      this.setComponentReadyToDisplay();
    });
  }

  setComponentReadyToDisplay() {
    this.componentIsReadyToDisplay = true;
  }

}
