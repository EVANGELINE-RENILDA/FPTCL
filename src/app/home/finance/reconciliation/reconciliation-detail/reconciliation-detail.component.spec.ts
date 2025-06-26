import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationDetailComponent } from './reconciliation-detail.component';

describe('ReconciliationDetailComponent', () => {
  let component: ReconciliationDetailComponent;
  let fixture: ComponentFixture<ReconciliationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReconciliationDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReconciliationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
