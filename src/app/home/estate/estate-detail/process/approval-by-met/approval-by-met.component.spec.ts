import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalByMetComponent } from './approval-by-met.component';

describe('ApprovalByMetComponent', () => {
  let component: ApprovalByMetComponent;
  let fixture: ComponentFixture<ApprovalByMetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalByMetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalByMetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
