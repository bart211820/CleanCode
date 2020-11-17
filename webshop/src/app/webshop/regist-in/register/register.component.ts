import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {AuthorizationService} from "../../../shared/authorization.service";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/modelsAndTheirServices/user.service";
import {User} from "../../../shared/modelsAndTheirServices/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    UserService
  ]
})
export class RegisterComponent implements OnInit {

  fullName: String;
  email: String;
  password: String;
  postcode: String;
  streetnumber: String;
  @Output() newScreenShowing = new EventEmitter<boolean>();

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  register() {
    const userData = {
      userID: undefined,
      fullName: this.fullName,
      postcode: this.postcode,
      streetnumber: this.streetnumber,
      emailAddress: this.email,
      password: this.password,
      roles: ["GUEST"]
    };
    const user = new User(userData);
    this.userService.register(user);
  }

  switchToLogin() {
    this.newScreenShowing.emit(false);
  }

}
