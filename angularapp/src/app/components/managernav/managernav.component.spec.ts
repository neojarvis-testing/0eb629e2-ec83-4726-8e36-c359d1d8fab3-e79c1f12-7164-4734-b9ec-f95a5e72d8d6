import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNavComponent } from './managernav.component';

describe('ManagernavComponent', () => {
  let component: ManagerNavComponent;
  let fixture: ComponentFixture<ManagerNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerNavComponent]
    });
    fixture = TestBed.createComponent(ManagerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
