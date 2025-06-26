import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalOtherServiceDetailComponent } from './legal-other-service-detail.component';

describe('LegalOtherServiceDetailComponent', () => {
  let component: LegalOtherServiceDetailComponent;
  let fixture: ComponentFixture<LegalOtherServiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalOtherServiceDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalOtherServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
