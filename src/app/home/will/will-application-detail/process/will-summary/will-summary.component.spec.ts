import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillSummaryComponent } from './will-summary.component';

describe('WillSummaryComponent', () => {
  let component: WillSummaryComponent;
  let fixture: ComponentFixture<WillSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WillSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WillSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
