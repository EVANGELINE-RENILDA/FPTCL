import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAssetsComponent } from './confirm-assets.component';

describe('ConfirmAssetsComponent', () => {
  let component: ConfirmAssetsComponent;
  let fixture: ComponentFixture<ConfirmAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAssetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
