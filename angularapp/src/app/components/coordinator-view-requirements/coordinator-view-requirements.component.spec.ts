import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorViewRequirementComponent } from './coordinator-view-requirements.component';

describe('CoordinatorViewRequirementsComponent', () => {
  let component: CoordinatorViewRequirementComponent;
  let fixture: ComponentFixture<CoordinatorViewRequirementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinatorViewRequirementComponent]
    });
    fixture = TestBed.createComponent(CoordinatorViewRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
