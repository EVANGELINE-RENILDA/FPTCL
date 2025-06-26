import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInProcessComponent } from './service-in-process.component';

describe('ServiceInProcessComponent', () => {
  let component: ServiceInProcessComponent;
  let fixture: ComponentFixture<ServiceInProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceInProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
