import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalByMlComponent } from './approval-by-ml.component';

describe('ApprovalByMlComponent', () => {
  let component: ApprovalByMlComponent;
  let fixture: ComponentFixture<ApprovalByMlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalByMlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalByMlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
