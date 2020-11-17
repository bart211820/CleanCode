import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './webshop/shop/shop.component';
import { ItemComponent } from "./webshop/item/item.component";
import { RegistInComponent } from "./webshop/regist-in/regist-in.component";
import { MeComponent } from "./webshop/me/me.component";
import { AdminIndexComponent } from "./admin/admin-index/admin-index.component";
import { AdminComponent } from "./admin/admin.component";
import { ManageItemsComponent } from "./admin/manage-items/manage-items.component";
import { ManageAnimatorsComponent } from "./admin/manage-animators/manage-animators.component";
import { MakeAdminComponent } from "./admin/make-admin/make-admin.component";
import { AuthGuard } from "./auth-guard";

const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/:id', component: ItemComponent },
  { path: 'login', component: RegistInComponent },
  { path: 'me', component: MeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: '/admin/index', pathMatch: 'full'},
      { path: 'index', component: AdminIndexComponent },
      { path: 'items', component: ManageItemsComponent },
      { path: 'animators', component: ManageAnimatorsComponent },
      { path: 'admins', component: MakeAdminComponent }
      ]},
  { path: '**', redirectTo: 'shop' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
