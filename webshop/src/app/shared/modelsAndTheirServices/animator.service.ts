import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from "../api.service";
import {AuthorizationService} from "../authorization.service";
import {Animator} from "./animator";
import {Basket} from "./basket";

@Injectable({
  providedIn: ApiService,
})
export class AnimatorService {

  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private router: Router) { }

  public getAll(): Observable<Animator[]> {
    return this.api.get<Animator[]>('animators');
  }

  public getOne(animatorID: number): Observable<Animator[]> {
    return this.api.get<Animator[]>('animators/' + animatorID);
  }

  public create(animator: Animator): void {
    const data = animator.getData();
    this.api.post<void>('animators', data).subscribe (
      data => {
        alert('Animator aangemaakt.');
        location.reload();
      },
      error => {
        alert('Could not make a new animator.');
      }
    );
  }

  public update(animator: Animator): void {
    const data = animator.getData();
    this.api.put<void>('animators/' + animator.getAnimatorID(), data).subscribe (
      data => {
        console.log('Animator has been updated.');
      },
      error => {
        console.log('Animator has NOT been updated!!! D:');
      }
    );
  }

  public delete(animatorID: number): void {
    this.api.delete<void>('animators/' + animatorID).subscribe (
      data => {
        console.log('Animator got deleted');
      },
      error => {
        alert('Could not delete animator!');
      }
    );
  }

  public register(animator: Animator): void {
    const data = animator.getData();
    this.api.post<void>('animators', data).subscribe (
      data => {
        console.log(data);
      },
      error => {
        alert('Het registreren is mislukt');
      }
    );
  }
}
