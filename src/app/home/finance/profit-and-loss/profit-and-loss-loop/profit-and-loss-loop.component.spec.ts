import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitAndLossLoopComponent } from './profit-and-loss-loop.component';

describe('ProfitAndLossLoopComponent', () => {
  let component: ProfitAndLossLoopComponent;
  let fixture: ComponentFixture<ProfitAndLossLoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfitAndLossLoopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfitAndLossLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
