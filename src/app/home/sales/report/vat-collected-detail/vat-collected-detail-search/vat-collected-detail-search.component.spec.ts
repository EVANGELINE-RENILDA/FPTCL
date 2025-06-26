import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatCollectedDetailSearchComponent } from './vat-collected-detail-search.component';

describe('VatCollectedDetailSearchComponent', () => {
  let component: VatCollectedDetailSearchComponent;
  let fixture: ComponentFixture<VatCollectedDetailSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VatCollectedDetailSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VatCollectedDetailSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
