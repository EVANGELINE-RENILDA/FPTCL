import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationInfoComponent } from './reconciliation-info.component';

describe('ReconciliationInfoComponent', () => {
  let component: ReconciliationInfoComponent;
  let fixture: ComponentFixture<ReconciliationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReconciliationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReconciliationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
