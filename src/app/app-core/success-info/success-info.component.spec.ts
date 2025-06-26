import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessInfoComponent } from './success-info.component';

describe('SuccessInfoComponent', () => {
  let component: SuccessInfoComponent;
  let fixture: ComponentFixture<SuccessInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
