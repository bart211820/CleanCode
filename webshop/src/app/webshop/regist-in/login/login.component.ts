import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../shared/api.service';
import {AuthorizationService} from '../../../shared/authorization.service';
import {UserService} from '../../../shared/modelsAndTheirServices/user.service';
import {Router} from '@angular/router';
import {User} from '../../../shared/modelsAndTheirServices/user';

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

  private email: String;
  private password: String;
  @Output() emitSwitchToRegisterScreen = new EventEmitter<boolean>();

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
  }

  login() {
    const userData = this.constructUserDataWithCurrentEmailAndPassword();
    this.userService.login(new User(userData));
  }

  constructUserDataWithCurrentEmailAndPassword() {
    return {
      userID: undefined,
      fullName: undefined,
      postcode: undefined,
      streetnumber: undefined,
      emailAddress: this.email,
      password: this.password,
      roles: undefined
    };
  }

  switchToRegistering() {
    this.emitSwitchToRegisterScreen.emit(true);
  }
}
