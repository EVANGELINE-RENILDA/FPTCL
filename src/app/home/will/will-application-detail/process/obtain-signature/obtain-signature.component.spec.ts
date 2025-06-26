import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtainSignatureComponent } from './obtain-signature.component';

describe('ObtainSignatureComponent', () => {
  let component: ObtainSignatureComponent;
  let fixture: ComponentFixture<ObtainSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObtainSignatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObtainSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
