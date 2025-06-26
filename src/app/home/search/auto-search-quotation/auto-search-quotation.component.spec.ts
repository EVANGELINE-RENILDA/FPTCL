import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSearchQuotationComponent } from './auto-search-quotation.component';

describe('AutoSearchQuotationComponent', () => {
  let component: AutoSearchQuotationComponent;
  let fixture: ComponentFixture<AutoSearchQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoSearchQuotationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoSearchQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
