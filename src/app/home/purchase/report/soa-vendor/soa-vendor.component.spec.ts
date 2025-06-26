import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoaVendorComponent } from './soa-vendor.component';

describe('SoaVendorComponent', () => {
  let component: SoaVendorComponent;
  let fixture: ComponentFixture<SoaVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoaVendorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoaVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
