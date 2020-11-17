import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { RegistInComponent } from './regist-in/regist-in.component';
import { LoginComponent } from './regist-in/login/login.component';
import { RegisterComponent } from './regist-in/register/register.component';

@NgModule({
  declarations: [ItemComponent, RegistInComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule
  ]
})
export class WebshopModule { }
