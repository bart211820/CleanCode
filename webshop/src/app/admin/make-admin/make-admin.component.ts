import { Component } from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {AuthorizationService} from "../../shared/authorization.service";
import {Router} from "@angular/router";
import {UserService} from "../../shared/modelsAndTheirServices/user.service";
import {User} from "../../shared/modelsAndTheirServices/user";

@Component({
  selector: 'app-make-admin',
  templateUrl: './make-admin.component.html',
  styleUrls: ['./make-admin.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    UserService
  ]
})
export class MakeAdminComponent {

  private fullName: String;
  private postcode: String;
  private streetnumber: String;
  private email: String;
  private password: String;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private userService: UserService) { }

  makeAdminAccount() {
    const user = new User(this.makeAdminUserDataObject());
    this.userService.register(user);
  }

  makeAdminUserDataObject() {
    return {
      userID: undefined,
      fullName: this.fullName,
      postcode: this.postcode,
      streetnumber: this.streetnumber,
      emailAddress: this.email,
      password: this.password,
      roles: ["GUEST", "ADMIN"]
    };
  }

}
