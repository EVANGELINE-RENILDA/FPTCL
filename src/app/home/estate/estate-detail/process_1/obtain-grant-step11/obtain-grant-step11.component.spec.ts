import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtainGrantStep11Component } from './obtain-grant-step11.component';

describe('ObtainGrantStep11Component', () => {
  let component: ObtainGrantStep11Component;
  let fixture: ComponentFixture<ObtainGrantStep11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObtainGrantStep11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObtainGrantStep11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
