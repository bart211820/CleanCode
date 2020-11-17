import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {AuthorizationService} from "../../../shared/authorization.service";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/modelsAndTheirServices/user.service";
import {User} from "../../../shared/modelsAndTheirServices/user";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    UserService
  ]
})
export class AccountComponent implements OnInit {

  @Input() userID;
  fullName: String;
  emailAddress: String;
  password: String;
  postcode: String;
  streetnumber: String;
  roles: String[];

  oldPassword: String;

  private user;
  private userObject: User;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getOne(this.userID);
    this.getUser();
  }

  getUser(): void {
    this.user.subscribe(data => {
      this.userObject = new User(data);
      this.fillAttributesWithObjectData();
    });
  }

  fillAttributesWithObjectData(){
    this.fullName = this.userObject.getFullName();
    this.emailAddress = this.userObject.getEmailAddress();
    this.postcode = this.userObject.getPostcode();
    this.streetnumber = this.userObject.getStreetnumber();
    this.roles = this.userObject.getRoles();
    this.oldPassword = this.userObject.getPassword();
  }

  logOut() {
    this.userService.logout();
  }

  editAccount() {
    const userData = {
      userID: this.userID,
      fullName: this.fullName,
      postcode: this.postcode,
      streetnumber: this.streetnumber,
      emailAddress: this.emailAddress,
      password: this.password,
      roles: this.userObject.getRoles()
    };

    if(userData.password === undefined || userData.password === '') {
      userData.password = this.oldPassword;
    }

    const user = new User(userData);
    this.userService.update(user);
  }
}
