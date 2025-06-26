import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtainGrantComponent } from './obtain-grant.component';

describe('ObtainGrantComponent', () => {
  let component: ObtainGrantComponent;
  let fixture: ComponentFixture<ObtainGrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObtainGrantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObtainGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
