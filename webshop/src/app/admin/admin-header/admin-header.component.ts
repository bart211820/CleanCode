import { Component, } from '@angular/core';
import {UserService} from "../../shared/modelsAndTheirServices/user.service";
import {ApiService} from "../../shared/api.service";
import {AuthorizationService} from "../../shared/authorization.service";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    UserService
  ]
})
export class AdminHeaderComponent {

  constructor(private userService: UserService) { }

  logOut(){
    this.userService.logout();
  }
}
