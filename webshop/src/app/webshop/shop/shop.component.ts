import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {Router} from '@angular/router';
import {AuthorizationService} from '../../shared/authorization.service';
import {Merchandise} from '../../shared/modelsAndTheirServices/merchandise';
import {MerchandiseService} from '../../shared/modelsAndTheirServices/merchandise.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    MerchandiseService
  ]
})
export class ShopComponent implements OnInit {
  private merchandiseObservable;
  private merchandises = [];

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private merchandiseService: MerchandiseService) { }

  ngOnInit() {
    this.getMerchandiseObservable();
    this.fillMerchandises();
  }

  getMerchandiseObservable() {
    this.merchandiseObservable = this.merchandiseService.getAll();
  }

  fillMerchandises() {
    this.merchandiseObservable.subscribe(data => {
      for (const merchandiseData of data) {
        this.addMerchandiseToMerchandises(new Merchandise(merchandiseData));
      }
    });
  }

  addMerchandiseToMerchandises(merchandise) {
    this.merchandises.push(merchandise);
  }

}
