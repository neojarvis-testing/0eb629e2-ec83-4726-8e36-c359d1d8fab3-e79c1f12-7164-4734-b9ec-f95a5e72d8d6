import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewFeedbackComponent } from './managerviewfeedback.component';

describe('ManagerviewfeedbackComponent', () => {
  let component: ManagerViewFeedbackComponent;
  let fixture: ComponentFixture<ManagerViewFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerViewFeedbackComponent]
    });
    fixture = TestBed.createComponent(ManagerViewFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
