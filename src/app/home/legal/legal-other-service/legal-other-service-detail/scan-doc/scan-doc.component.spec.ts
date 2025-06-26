import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanDocComponent } from './scan-doc.component';

describe('ScanDocComponent', () => {
  let component: ScanDocComponent;
  let fixture: ComponentFixture<ScanDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScanDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
