import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyTestatorComponent } from './identify-testator.component';

describe('IdentifyTestatorComponent', () => {
  let component: IdentifyTestatorComponent;
  let fixture: ComponentFixture<IdentifyTestatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentifyTestatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdentifyTestatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
