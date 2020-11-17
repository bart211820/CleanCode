import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {AuthorizationService} from "../../../shared/authorization.service";
import {Router} from "@angular/router";
import {AnimatorService} from "../../../shared/modelsAndTheirServices/animator.service";
import {Item} from "../../../shared/modelsAndTheirServices/item";
import {Animator} from "../../../shared/modelsAndTheirServices/animator";

@Component({
  selector: 'app-animator-row',
  templateUrl: './animator-row.component.html',
  styleUrls: ['./animator-row.component.css']
})
export class AnimatorRowComponent implements OnInit {

  @Input() animator;
  private animatorName;
  private animatorLink;
  private animatorImage;
  private readyToDisplay = false;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private animatorService: AnimatorService) { }

  ngOnInit() {
    this.fillAttributes();
  }

  fillAttributes() {
    this.animatorName = this.animator.getAnimatorName();
    this.animatorLink = this.animator.getAnimatorLink();
    this.animatorImage = this.animator.getAnimatorImage();
  }

  editAnimator() {
    const animatorData = {
      animatorID: this.animator.getAnimatorID(),
      animatorName: this.animatorName,
      animatorLink: this.animatorLink,
      animatorImage: this.animatorImage
    };
    const updatedAnimator = new Animator(animatorData);
    this.animatorService.update(updatedAnimator);
  }

  deleteAnimator() {
    this.animatorService.delete(this.animator.getAnimatorID());
  }

}
