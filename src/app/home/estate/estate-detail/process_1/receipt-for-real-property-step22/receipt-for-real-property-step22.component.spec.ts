import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptForRealPropertyStep22Component } from './receipt-for-real-property-step22.component';

describe('ReceiptForRealPropertyStep22Component', () => {
  let component: ReceiptForRealPropertyStep22Component;
  let fixture: ComponentFixture<ReceiptForRealPropertyStep22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptForRealPropertyStep22Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptForRealPropertyStep22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
