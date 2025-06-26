import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationSearchComponent } from './reconciliation-search.component';

describe('ReconciliationSearchComponent', () => {
  let component: ReconciliationSearchComponent;
  let fixture: ComponentFixture<ReconciliationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReconciliationSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReconciliationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
