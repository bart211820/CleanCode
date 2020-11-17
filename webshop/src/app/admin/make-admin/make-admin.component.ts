import { Component, OnInit } from '@angular/core';
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
export class MakeAdminComponent implements OnInit {

  fullName: String;
  postcode: String;
  streetnumber: String;
  email: String;
  password: String;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  makeAccount() {
    const userData = {
      userID: undefined,
      fullName: this.fullName,
      postcode: this.postcode,
      streetnumber: this.streetnumber,
      emailAddress: this.email,
      password: this.password,
      roles: ["GUEST", "ADMIN"]
    };
    const user = new User(userData);
    this.userService.register(user);
  }

}
