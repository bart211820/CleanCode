import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AuthorizationService} from '../../shared/authorization.service';
import {AnimatorService} from '../../shared/modelsAndTheirServices/animator.service';
import {Router} from '@angular/router';
import {Animator} from '../../shared/modelsAndTheirServices/animator';

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
  private animatorObservable;
  private animators = [];

  constructor(private api: ApiService, private authService: AuthorizationService, private router: Router, private animatorService: AnimatorService) { }

  ngOnInit() {
    this.getAnimatorObservable();
    this.fillAnimators();
  }

  getAnimatorObservable() {
    this.animatorObservable = this.animatorService.getAll();
  }

  fillAnimators() {
    this.animatorObservable.subscribe(data => {
      for (const animatorsData of data) {
        this.addAnimatorToAnimators(new Animator(animatorsData));
      }
    });
  }

  addAnimatorToAnimators(animator) {
    this.animators.push(animator);
  }
}
