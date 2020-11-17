import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../shared/modelsAndTheirServices/user.service";
import {ApiService} from "../../shared/api.service";
import {AuthorizationService} from "../../shared/authorization.service";
import {User} from "../../shared/modelsAndTheirServices/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-regist-in',
  templateUrl: './regist-in.component.html',
  styleUrls: ['./regist-in.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    ApiService,
    AuthorizationService,
    UserService
  ]
})
export class RegistInComponent implements OnInit {

  registering = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    if(JSON.parse(window.localStorage.getItem('authorization')) != undefined ) {
      const session = JSON.parse(window.localStorage.getItem('authorization'));
      const userData = {
        userID: session.authenticator.userID,
        fullName: session.authenticator.fullName,
        postcode: session.authenticator.postcode,
        streetnumber: session.authenticator.streetnumber,
        emailAddress: session.authenticator.emailAddress,
        password: session.authenticator.password,
        roles: session.authenticator.roles
      };
      this.userService.goToPageAfterLogin(new User(userData));
    }
  }

  switchLoginOrRegister(agreed: boolean) {
    this.registering = agreed;
  }

}
