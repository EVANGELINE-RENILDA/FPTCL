import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversingJournalSearchComponent } from './reversing-journal-search.component';

describe('ReversingJournalSearchComponent', () => {
  let component: ReversingJournalSearchComponent;
  let fixture: ComponentFixture<ReversingJournalSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReversingJournalSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReversingJournalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
