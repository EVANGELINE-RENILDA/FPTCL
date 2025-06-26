import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalTrustEstateDetailComponent } from './journal-trust-estate-detail.component';

describe('JournalTrustEstateDetailComponent', () => {
  let component: JournalTrustEstateDetailComponent;
  let fixture: ComponentFixture<JournalTrustEstateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalTrustEstateDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JournalTrustEstateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
