import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/api.service';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/modelsAndTheirServices/user.service';
import {User} from '../../../shared/modelsAndTheirServices/user';

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
  private fullName: String;
  private emailAddress: String;
  private password: String;
  private postcode: String;
  private streetnumber: String;
  private roles: String[];

  private oldPassword: String;

  private userObservable;
  private user: User;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getUserObservable();
    this.setUserData();
  }

  getUserObservable() {
    this.userObservable = this.userService.getOne(this.userID);
  }

  setUserData() {
    this.userObservable.subscribe(data => {
      this.user = new User(data);
      this.fillAttributesWithObjectData();
    });
  }

  fillAttributesWithObjectData() {
    this.fullName = this.user.getFullName();
    this.emailAddress = this.user.getEmailAddress();
    this.postcode = this.user.getPostcode();
    this.streetnumber = this.user.getStreetnumber();
    this.roles = this.user.getRoles();
    this.oldPassword = this.user.getPassword();
  }

  logOut() {
    this.userService.logout();
  }

  editAccount() {
    let userData = this.constructUserDataObjectWithCurrentData();
    userData = this.addNewPasswordIfANewOneIsSet(userData);
    this.userService.update(new User(userData));
  }

  constructUserDataObjectWithCurrentData() {
    return {
      userID: this.userID,
      fullName: this.fullName,
      postcode: this.postcode,
      streetnumber: this.streetnumber,
      emailAddress: this.emailAddress,
      password: this.oldPassword,
      roles: this.user.getRoles()
    };
  }

  addNewPasswordIfANewOneIsSet(userData) {
    if (this.password !== undefined && this.password !== '') {
      userData.password = this.password;
    }
    return userData;
  }
}
