import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryOfAccountSearchComponent } from './summary-of-account-search.component';

describe('SummaryOfAccountSearchComponent', () => {
  let component: SummaryOfAccountSearchComponent;
  let fixture: ComponentFixture<SummaryOfAccountSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryOfAccountSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryOfAccountSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
