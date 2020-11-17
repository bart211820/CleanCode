import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistInComponent } from './regist-in.component';

describe('RegistInComponent', () => {
  let component: RegistInComponent;
  let fixture: ComponentFixture<RegistInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
