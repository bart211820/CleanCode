import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/api.service";
import {AuthorizationService} from "../../../shared/authorization.service";
import {Router} from "@angular/router";
import {AnimatorService} from "../../../shared/modelsAndTheirServices/animator.service";
import {Merchandise} from "../../../shared/modelsAndTheirServices/merchandise";
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

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private animatorService: AnimatorService) { }

  ngOnInit() {
    this.fillTextBoxes();
  }

  fillTextBoxes() {
    this.animatorName = this.animator.getAnimatorName();
    this.animatorLink = this.animator.getAnimatorLink();
    this.animatorImage = this.animator.getAnimatorImage();
  }

  editAnimator() {
    const updatedAnimator = new Animator(this.createAnimatorDataObject());
    this.animatorService.update(updatedAnimator);
  }

  createAnimatorDataObject() {
    return {
      animatorID: this.animator.getAnimatorID(),
      animatorName: this.animatorName,
      animatorLink: this.animatorLink,
      animatorImage: this.animatorImage
    };
  }

  deleteAnimator() {
    this.animatorService.delete(this.animator.getAnimatorID());
  }

}
