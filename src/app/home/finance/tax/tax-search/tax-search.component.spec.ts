import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSearchComponent } from './tax-search.component';

describe('TaxSearchComponent', () => {
  let component: TaxSearchComponent;
  let fixture: ComponentFixture<TaxSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
