import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitNoteSearchComponent } from './debit-note-search.component';

describe('DebitNoteSearchComponent', () => {
  let component: DebitNoteSearchComponent;
  let fixture: ComponentFixture<DebitNoteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebitNoteSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebitNoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
