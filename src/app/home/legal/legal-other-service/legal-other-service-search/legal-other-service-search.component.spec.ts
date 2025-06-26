import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalOtherServiceSearchComponent } from './legal-other-service-search.component';

describe('LegalOtherServiceSearchComponent', () => {
  let component: LegalOtherServiceSearchComponent;
  let fixture: ComponentFixture<LegalOtherServiceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalOtherServiceSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalOtherServiceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
