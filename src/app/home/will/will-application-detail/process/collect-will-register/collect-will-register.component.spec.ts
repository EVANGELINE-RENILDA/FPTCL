import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectWillRegisterComponent } from './collect-will-register.component';

describe('CollectWillRegisterComponent', () => {
  let component: CollectWillRegisterComponent;
  let fixture: ComponentFixture<CollectWillRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectWillRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectWillRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
