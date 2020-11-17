import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {ApiService} from "../../../shared/api.service";
import {AuthorizationService} from "../../../shared/authorization.service";
import {UserService} from "../../../shared/modelsAndTheirServices/user.service";
import {Router} from "@angular/router";
import {User} from "../../../shared/modelsAndTheirServices/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    UserService
  ]
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;
  @Output() newScreenShowing = new EventEmitter<boolean>();

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private userService: UserService) { }

  ngOnInit() {

  }

  login() {
    const userData = {
      userID: undefined,
      fullName: undefined,
      postcode: undefined,
      streetnumber: undefined,
      emailAddress: this.email,
      password: this.password,
      roles: undefined
    };
    const user = new User(userData);
    this.userService.login(user, true);
  }

  switchToRegistering() {
    this.newScreenShowing.emit(true);
  }
}
