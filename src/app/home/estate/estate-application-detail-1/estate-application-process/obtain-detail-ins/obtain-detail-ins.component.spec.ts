import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtainDetailInsComponent } from './obtain-detail-ins.component';

describe('ObtainDetailInsComponent', () => {
  let component: ObtainDetailInsComponent;
  let fixture: ComponentFixture<ObtainDetailInsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObtainDetailInsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObtainDetailInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
