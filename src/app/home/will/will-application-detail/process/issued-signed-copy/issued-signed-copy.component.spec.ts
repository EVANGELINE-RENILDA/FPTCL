import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedSignedCopyComponent } from './issued-signed-copy.component';

describe('IssuedSignedCopyComponent', () => {
  let component: IssuedSignedCopyComponent;
  let fixture: ComponentFixture<IssuedSignedCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuedSignedCopyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssuedSignedCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
