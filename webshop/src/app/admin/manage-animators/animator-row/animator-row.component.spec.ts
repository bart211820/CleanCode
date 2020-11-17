import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatorRowComponent } from './animator-row.component';

describe('AnimatorRowComponent', () => {
  let component: AnimatorRowComponent;
  let fixture: ComponentFixture<AnimatorRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatorRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatorRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
