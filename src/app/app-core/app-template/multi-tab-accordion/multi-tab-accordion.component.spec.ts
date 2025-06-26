import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiTabAccordionComponent } from './multi-tab-accordion.component';

describe('MultiTabAccordionComponent', () => {
  let component: MultiTabAccordionComponent;
  let fixture: ComponentFixture<MultiTabAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiTabAccordionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiTabAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
