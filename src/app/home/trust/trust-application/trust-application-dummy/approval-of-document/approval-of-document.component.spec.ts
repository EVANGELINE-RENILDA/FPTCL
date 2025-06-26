import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalOfDocumentComponent } from './approval-of-document.component';

describe('ApprovalOfDocumentComponent', () => {
  let component: ApprovalOfDocumentComponent;
  let fixture: ComponentFixture<ApprovalOfDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalOfDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalOfDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
