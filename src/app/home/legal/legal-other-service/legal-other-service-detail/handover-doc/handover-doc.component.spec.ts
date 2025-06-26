import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandoverDocComponent } from './handover-doc.component';

describe('HandoverDocComponent', () => {
  let component: HandoverDocComponent;
  let fixture: ComponentFixture<HandoverDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandoverDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandoverDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
