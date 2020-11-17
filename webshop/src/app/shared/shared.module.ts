import {Component, NgModule} from '@angular/core';

import { PublicModule } from '../public.module';

import { AuthorizationService } from './authorization.service';
import { ApiService } from './api.service';
import {ShopComponent} from "../webshop/shop/shop.component";

@NgModule({
  imports: [ PublicModule ],
  declarations: [ ShopComponent ],
  exports: [ ShopComponent ],
  providers: [
    ApiService,
    AuthorizationService
  ]
})
export class SharedModule { }
