import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundTransferNoteDetailComponent } from './fund-transfer-note-detail.component';

describe('FundTransferNoteDetailComponent', () => {
  let component: FundTransferNoteDetailComponent;
  let fixture: ComponentFixture<FundTransferNoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundTransferNoteDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FundTransferNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
