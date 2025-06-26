import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAttachmentComponent } from './tax-attachment.component';

describe('TaxAttachmentComponent', () => {
  let component: TaxAttachmentComponent;
  let fixture: ComponentFixture<TaxAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
