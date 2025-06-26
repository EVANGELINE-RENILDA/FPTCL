import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTbodyComponent } from './item-tbody.component';

describe('ItemTbodyComponent', () => {
  let component: ItemTbodyComponent;
  let fixture: ComponentFixture<ItemTbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTbodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemTbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
