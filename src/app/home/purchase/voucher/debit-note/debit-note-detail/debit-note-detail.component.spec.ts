import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitNoteDetailComponent } from './debit-note-detail.component';

describe('DebitNoteDetailComponent', () => {
  let component: DebitNoteDetailComponent;
  let fixture: ComponentFixture<DebitNoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebitNoteDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebitNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
