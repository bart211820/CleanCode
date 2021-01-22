import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from '../../shared/authorization.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MeComponent implements OnInit {

  private myUserID: number;

  constructor(private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
    this.navigateToShopIfNotLoggedIn();
  }

  navigateToShopIfNotLoggedIn() {
    try {
      const session = this.authService.getSession();
      this.myUserID = session.authenticator.userID;
    } catch (e) {
      this.router.navigate(['/shop']);
    }
  }

}
