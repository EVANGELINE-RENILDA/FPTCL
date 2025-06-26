import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAssetsStep10Component } from './confirm-assets-step10.component';

describe('ConfirmAssetsStep10Component', () => {
  let component: ConfirmAssetsStep10Component;
  let fixture: ComponentFixture<ConfirmAssetsStep10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAssetsStep10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmAssetsStep10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
