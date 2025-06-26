import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstateInfoComponent } from './edit-estate-info.component';

describe('EditEstateInfoComponent', () => {
  let component: EditEstateInfoComponent;
  let fixture: ComponentFixture<EditEstateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEstateInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEstateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
