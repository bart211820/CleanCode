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

  private showRegisterScreen = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.navigateAwayFromPageIfAlreadyLogedIn();
  }

  navigateAwayFromPageIfAlreadyLogedIn() {
    if(this.authService.checkIfLoggedIn()){
      this.userService.goToPageAfterLogin();
    }
  }

  switchLoginOrRegister(registering: boolean) {
    this.showRegisterScreen = registering;
  }

}
