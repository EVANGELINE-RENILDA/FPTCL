import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSearchItemsComponent } from './auto-search-items.component';

describe('AutoSearchItemsComponent', () => {
  let component: AutoSearchItemsComponent;
  let fixture: ComponentFixture<AutoSearchItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoSearchItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoSearchItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
