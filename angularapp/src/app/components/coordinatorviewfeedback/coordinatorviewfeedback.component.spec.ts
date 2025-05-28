import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorViewFeedbackComponent } from './coordinatorviewfeedback.component';

describe('CoordinatorViewFeedbackComponent', () => {
  let component: CoordinatorViewFeedbackComponent;
  let fixture: ComponentFixture<CoordinatorViewFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinatorViewFeedbackComponent]
    });
    fixture = TestBed.createComponent(CoordinatorViewFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
