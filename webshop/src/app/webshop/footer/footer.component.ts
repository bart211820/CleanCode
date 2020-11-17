import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {AuthorizationService} from "../../shared/authorization.service";
import {AnimatorService} from "../../shared/modelsAndTheirServices/animator.service";
import {Router} from "@angular/router";
import {Animator} from "../../shared/modelsAndTheirServices/animator";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    AnimatorService
  ]
})
export class FooterComponent implements OnInit {
  private animators;
  private animatorsList = [];

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private animatorService: AnimatorService) { }

  ngOnInit() {
    this.animators = this.animatorService.getAll();
    this.getAll();
  }

  getAll(): void {
    this.animators.subscribe(data => {
      for(let animatorData of data) {
        this.animatorsList.push(new Animator(animatorData));
      }
    });
  }

}
