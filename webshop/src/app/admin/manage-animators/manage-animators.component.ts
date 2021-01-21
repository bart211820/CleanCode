import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {AuthorizationService} from "../../shared/authorization.service";
import {AnimatorService} from "../../shared/modelsAndTheirServices/animator.service";
import {Router} from "@angular/router";
import {Animator} from "../../shared/modelsAndTheirServices/animator";

@Component({
  selector: 'app-manage-animators',
  templateUrl: './manage-animators.component.html',
  styleUrls: ['./manage-animators.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    AnimatorService
  ]
})
export class ManageAnimatorsComponent implements OnInit {

  private animatorObservable;
  private animators = [];
  private componentIsReadyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private animatorService: AnimatorService) { }

  ngOnInit() {
    this.getAnimatorsFromApi();
  }

  getAnimatorsFromApi() {
    this.clearAnimators();
    this.getAnimatorObservable();
    this.fillAnimators();
  }

  clearAnimators() {
    this.animators = [];
  }

  getAnimatorObservable() {
    this.animatorObservable = this.animatorService.getAll();
  }

  fillAnimators() {
    this.animatorObservable.subscribe(data => {
      for(let animatorData of data) {
        this.addAnimatorToAnimators(new Animator(animatorData));
      }
      this.setComponentReadyToDisplay();
    });
  }

  addAnimatorToAnimators(animator){
    this.animators.push(animator);
  }

  setComponentReadyToDisplay() {
    this.componentIsReadyToDisplay = true;
  }
}
