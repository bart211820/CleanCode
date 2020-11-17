import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAnimatorsComponent } from './manage-animators.component';

describe('ManageAnimatorsComponent', () => {
  let component: ManageAnimatorsComponent;
  let fixture: ComponentFixture<ManageAnimatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAnimatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAnimatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
