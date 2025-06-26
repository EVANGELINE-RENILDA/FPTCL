import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtainDetailInsStep3Component } from './obtain-detail-ins-step3.component';

describe('ObtainDetailInsStep3Component', () => {
  let component: ObtainDetailInsStep3Component;
  let fixture: ComponentFixture<ObtainDetailInsStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObtainDetailInsStep3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObtainDetailInsStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
