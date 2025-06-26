import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryOfAccountSoaComponent } from './summary-of-account-soa.component';

describe('SummaryOfAccountSoaComponent', () => {
  let component: SummaryOfAccountSoaComponent;
  let fixture: ComponentFixture<SummaryOfAccountSoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryOfAccountSoaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryOfAccountSoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
