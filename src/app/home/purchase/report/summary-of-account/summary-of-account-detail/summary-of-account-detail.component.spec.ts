import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryOfAccountDetailComponent } from './summary-of-account-detail.component';

describe('SummaryOfAccountDetailComponent', () => {
  let component: SummaryOfAccountDetailComponent;
  let fixture: ComponentFixture<SummaryOfAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryOfAccountDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryOfAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
