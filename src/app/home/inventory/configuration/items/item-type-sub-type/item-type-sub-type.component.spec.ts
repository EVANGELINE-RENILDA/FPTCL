import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeSubTypeComponent } from './item-type-sub-type.component';

describe('ItemTypeSubTypeComponent', () => {
  let component: ItemTypeSubTypeComponent;
  let fixture: ComponentFixture<ItemTypeSubTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTypeSubTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemTypeSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
