import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../../shared/modelsAndTheirServices/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MeComponent implements OnInit {

  userID: number;

  constructor(private router: Router) { }

  ngOnInit() {
    if(JSON.parse(window.localStorage.getItem('authorization')) == undefined ) {
      this.router.navigate(['/shop']);
    }
    const session = JSON.parse(window.localStorage.getItem('authorization'));
    this.userID = session.authenticator.userID;
  }

}
