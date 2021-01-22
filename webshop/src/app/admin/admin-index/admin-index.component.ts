import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../shared/authorization.service';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.css']
})
export class AdminIndexComponent implements OnInit {

  private myName = '';

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.setMyName();
  }

  setMyName() {
    const session = this.authorizationService.getSession();
    this.myName = session.authenticator.fullName;
  }

}
