import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitDeathStep19Component } from './remit-death-step19.component';

describe('RemitDeathStep19Component', () => {
  let component: RemitDeathStep19Component;
  let fixture: ComponentFixture<RemitDeathStep19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemitDeathStep19Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemitDeathStep19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
