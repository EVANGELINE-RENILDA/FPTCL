import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversingJournalDetailComponent } from './reversing-journal-detail.component';

describe('ReversingJournalDetailComponent', () => {
  let component: ReversingJournalDetailComponent;
  let fixture: ComponentFixture<ReversingJournalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReversingJournalDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReversingJournalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
