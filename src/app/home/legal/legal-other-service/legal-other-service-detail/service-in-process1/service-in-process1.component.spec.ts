import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInProcess1Component } from './service-in-process1.component';

describe('ServiceInProcess1Component', () => {
  let component: ServiceInProcess1Component;
  let fixture: ComponentFixture<ServiceInProcess1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceInProcess1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceInProcess1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
