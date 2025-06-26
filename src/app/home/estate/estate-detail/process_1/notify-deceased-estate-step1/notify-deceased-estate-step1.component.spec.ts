import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyDeceasedEstateStep1Component } from './notify-deceased-estate-step1.component';

describe('NotifyDeceasedEstateStep1Component', () => {
  let component: NotifyDeceasedEstateStep1Component;
  let fixture: ComponentFixture<NotifyDeceasedEstateStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifyDeceasedEstateStep1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotifyDeceasedEstateStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
