import {Component, EventEmitter, Output} from '@angular/core';
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
export class RegisterComponent {

  private fullName: String;
  private email: String;
  private password: String;
  private postcode: String;
  private streetnumber: String;
  @Output() emitSwitchToLoginScreen = new EventEmitter<boolean>();

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private userService: UserService) { }

  register() {
    const userData = this.constructUserDataWithCurrentEmailAndPassword()
    this.userService.register(new User(userData));
  }

  constructUserDataWithCurrentEmailAndPassword() {
    return {
      userID: undefined,
      fullName: this.fullName,
      postcode: this.postcode,
      streetnumber: this.streetnumber,
      emailAddress: this.email,
      password: this.password,
      roles: ["GUEST"]
    };
  }

  switchToLogin() {
    this.emitSwitchToLoginScreen.emit(false);
  }

}
