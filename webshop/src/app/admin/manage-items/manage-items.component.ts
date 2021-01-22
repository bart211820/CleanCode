import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AuthorizationService} from '../../shared/authorization.service';
import {Router} from '@angular/router';
import {MerchandiseService} from '../../shared/modelsAndTheirServices/merchandise.service';
import {Merchandise} from '../../shared/modelsAndTheirServices/merchandise';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    MerchandiseService
  ]
})
export class ManageItemsComponent implements OnInit {

  private merchandiseObservable;
  private merchandises = [];
  private componentIsReadyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private merchandiseService: MerchandiseService) { }

  ngOnInit() {
    this.getMerchandisesFromApi();
  }

  getMerchandisesFromApi() {
    this.clearMerchandises();
    this.getMerchandiseObservable();
    this.fillMerchandises();
  }

  clearMerchandises() {
    this.merchandises = [];
  }

  getMerchandiseObservable() {
    this.merchandiseObservable = this.merchandiseService.getAll();
  }

  fillMerchandises() {
    this.merchandiseObservable.subscribe(data => {
      for (const merchandiseData of data) {
        this.addMerchandiseToMerchandises(new Merchandise(merchandiseData));
      }
      this.setComponentReadyToDisplay();
    });
  }

  addMerchandiseToMerchandises(merchandise) {
    this.merchandises.push(merchandise);
  }

  setComponentReadyToDisplay() {
    this.componentIsReadyToDisplay = true;
  }
}
