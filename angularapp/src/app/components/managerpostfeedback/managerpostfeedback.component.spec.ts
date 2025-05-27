import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPostFeedbackComponent } from './managerpostfeedback.component';

describe('ManagerpostfeedbackComponent', () => {
  let component: ManagerPostFeedbackComponent;
  let fixture: ComponentFixture<ManagerPostFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerPostFeedbackComponent]
    });
    fixture = TestBed.createComponent(ManagerPostFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
