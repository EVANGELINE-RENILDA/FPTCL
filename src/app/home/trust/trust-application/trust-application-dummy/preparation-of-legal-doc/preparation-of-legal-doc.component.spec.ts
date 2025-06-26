import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationOfLegalDocComponent } from './preparation-of-legal-doc.component';

describe('PreparationOfLegalDocComponent', () => {
  let component: PreparationOfLegalDocComponent;
  let fixture: ComponentFixture<PreparationOfLegalDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreparationOfLegalDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreparationOfLegalDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
