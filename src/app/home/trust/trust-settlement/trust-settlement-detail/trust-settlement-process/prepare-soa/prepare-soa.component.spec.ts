import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareSoaComponent } from './prepare-soa.component';

describe('PrepareSoaComponent', () => {
  let component: PrepareSoaComponent;
  let fixture: ComponentFixture<PrepareSoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepareSoaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrepareSoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
