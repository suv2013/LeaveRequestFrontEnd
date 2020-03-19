import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestApprovalComponent } from './leave-request-approval.component';

describe('LeaveRequestApprovalComponent', () => {
  let component: LeaveRequestApprovalComponent;
  let fixture: ComponentFixture<LeaveRequestApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveRequestApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
