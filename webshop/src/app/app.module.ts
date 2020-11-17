import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './webshop/footer/footer.component';
import { HeaderComponent } from './webshop/header/header.component';
import { ShopComponent } from './webshop/shop/shop.component';
import { ShopItemComponent } from './webshop/shop/shop-item/shop-item.component';
import { ItemComponent } from "./webshop/item/item.component";
import { RegistInComponent } from "./webshop/regist-in/regist-in.component";
import { LoginComponent } from "./webshop/regist-in/login/login.component";
import { RegisterComponent } from "./webshop/regist-in/register/register.component";
import { FormsModule } from "@angular/forms";
import { AdminIndexComponent } from "./admin/admin-index/admin-index.component";
import { MeComponent } from './webshop/me/me.component';
import { AdminComponent } from './admin/admin.component';
import { BasketListComponent } from './webshop/me/basket-list/basket-list.component';
import { OrderListComponent } from './webshop/me/order-list/order-list.component';
import { AccountComponent } from './webshop/me/account/account.component';
import { BasketItemComponent } from './webshop/me/basket-list/basket-item/basket-item.component';
import { OrderItemComponent } from './webshop/me/order-list/order-item/order-item.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { ManageItemsComponent } from './admin/manage-items/manage-items.component';
import { ItemRowComponent } from './admin/manage-items/item-row/item-row.component';
import { ManageAnimatorsComponent } from './admin/manage-animators/manage-animators.component';
import { AnimatorRowComponent } from './admin/manage-animators/animator-row/animator-row.component';
import { MakeAdminComponent } from './admin/make-admin/make-admin.component';
import { AddItemComponent } from './admin/manage-items/add-item/add-item.component';
import { AddAnimatorComponent } from './admin/manage-animators/add-animator/add-animator.component';
import { AuthGuard } from "./auth-guard";
import {AuthorizationService} from "./shared/authorization.service";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ShopComponent,
    ShopItemComponent,
    ItemComponent,
    RegistInComponent,
    LoginComponent,
    RegisterComponent,
    AdminIndexComponent,
    MeComponent,
    AdminComponent,
    BasketListComponent,
    OrderListComponent,
    AccountComponent,
    BasketItemComponent,
    OrderItemComponent,
    AdminHeaderComponent,
    ManageItemsComponent,
    ItemRowComponent,
    ManageAnimatorsComponent,
    AnimatorRowComponent,
    MakeAdminComponent,
    AddItemComponent,
    AddAnimatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    HttpClientModule,
    HttpClient,
    AuthorizationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
