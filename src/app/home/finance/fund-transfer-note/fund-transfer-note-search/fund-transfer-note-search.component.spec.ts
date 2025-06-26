import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundTransferNoteSearchComponent } from './fund-transfer-note-search.component';

describe('FundTransferNoteSearchComponent', () => {
  let component: FundTransferNoteSearchComponent;
  let fixture: ComponentFixture<FundTransferNoteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundTransferNoteSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FundTransferNoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
