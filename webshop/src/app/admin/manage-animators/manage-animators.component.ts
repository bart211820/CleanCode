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

  private animators;
  private animatorList = [];
  private readyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private animatorService: AnimatorService) { }

  ngOnInit() {
    this.getAnimatorsFromApi();
  }

  getAnimatorsFromApi() {
    this.animatorList = [];
    this.animators = this.animatorService.getAll();
    this.getAnimators();
  }

  getAnimators() {
    this.animators.subscribe(data => {
      for(let animatorData of data) {
        this.animatorList.push(new Animator(animatorData));
      }
      this.readyToDisplay = true;
    });
  }

}
