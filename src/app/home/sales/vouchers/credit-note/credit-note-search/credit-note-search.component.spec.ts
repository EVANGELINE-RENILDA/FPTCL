import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNoteSearchComponent } from './credit-note-search.component';

describe('CreditNoteSearchComponent', () => {
  let component: CreditNoteSearchComponent;
  let fixture: ComponentFixture<CreditNoteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditNoteSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditNoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
