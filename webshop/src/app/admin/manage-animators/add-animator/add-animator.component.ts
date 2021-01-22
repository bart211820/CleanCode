import { Component } from '@angular/core';
import {ApiService} from '../../../shared/api.service';
import {AuthorizationService} from '../../../shared/authorization.service';
import {AnimatorService} from '../../../shared/modelsAndTheirServices/animator.service';
import {Router} from '@angular/router';
import {Animator} from '../../../shared/modelsAndTheirServices/animator';

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
export class AddAnimatorComponent {

  private animatorName;
  private animatorLink;
  private animatorImage;

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private animatorService: AnimatorService) { }

  makeAnimator() {
    const newAnimator = new Animator(this.createAnimatorDataObject());
    this.animatorService.create(newAnimator);
  }

  createAnimatorDataObject() {
    return {
      animatorID: undefined,
      animatorName: this.animatorName,
      animatorLink: this.animatorLink,
      animatorImage: this.animatorImage
    };
  }

}
