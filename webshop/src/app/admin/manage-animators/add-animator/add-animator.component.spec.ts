import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnimatorComponent } from './add-animator.component';

describe('AddAnimatorComponent', () => {
  let component: AddAnimatorComponent;
  let fixture: ComponentFixture<AddAnimatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnimatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnimatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
