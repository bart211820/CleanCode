import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {AuthorizationService} from "../../../shared/authorization.service";
import {AnimatorService} from "../../../shared/modelsAndTheirServices/animator.service";
import {Router} from "@angular/router";
import {Animator} from "../../../shared/modelsAndTheirServices/animator";

@Component({
  selector: 'app-add-animator',
  templateUrl: './add-animator.component.html',
  styleUrls: ['./add-animator.component.css'],
  providers: [
    ApiService,
    AuthorizationService,
    AnimatorService
  ]
})
export class AddAnimatorComponent implements OnInit {

  animatorName;
  animatorLink;
  animatorImage;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private animatorService: AnimatorService) { }

  ngOnInit() {
  }

  makeAnimator() {
    const animatorData = {
      animatorID: undefined,
      animatorName: this.animatorName,
      animatorLink: this.animatorLink,
      animatorImage: this.animatorImage
    };
    this.animatorService.create(new Animator(animatorData));
  }

}
