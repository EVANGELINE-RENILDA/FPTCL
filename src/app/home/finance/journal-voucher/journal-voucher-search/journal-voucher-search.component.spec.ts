import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalVoucherSearchComponent } from './journal-voucher-search.component';

describe('JournalVoucherSearchComponent', () => {
  let component: JournalVoucherSearchComponent;
  let fixture: ComponentFixture<JournalVoucherSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalVoucherSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JournalVoucherSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
