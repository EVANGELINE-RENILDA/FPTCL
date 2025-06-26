import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoGetItemComponent } from './auto-get-item.component';

describe('AutoGetItemComponent', () => {
  let component: AutoGetItemComponent;
  let fixture: ComponentFixture<AutoGetItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoGetItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoGetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
