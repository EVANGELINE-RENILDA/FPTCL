import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalTrustEstateSearchComponent } from './journal-trust-estate-search.component';

describe('JournalTrustEstateSearchComponent', () => {
  let component: JournalTrustEstateSearchComponent;
  let fixture: ComponentFixture<JournalTrustEstateSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalTrustEstateSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JournalTrustEstateSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
