import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatCollectedDetailDetailComponent } from './vat-collected-detail-detail.component';

describe('VatCollectedDetailDetailComponent', () => {
  let component: VatCollectedDetailDetailComponent;
  let fixture: ComponentFixture<VatCollectedDetailDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VatCollectedDetailDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VatCollectedDetailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
