import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillDetailComponent } from './will-detail.component';

describe('WillDetailComponent', () => {
  let component: WillDetailComponent;
  let fixture: ComponentFixture<WillDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WillDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WillDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
