import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.css']
})
export class AdminIndexComponent implements OnInit {

  loginName = '';

  constructor() { }

  ngOnInit() {
    const session = JSON.parse(window.localStorage.getItem('authorization'));
    this.loginName = session.authenticator.fullName;
  }

}
