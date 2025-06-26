import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalOfStatementComponent } from './approval-of-statement.component';

describe('ApprovalOfStatementComponent', () => {
  let component: ApprovalOfStatementComponent;
  let fixture: ComponentFixture<ApprovalOfStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalOfStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalOfStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
