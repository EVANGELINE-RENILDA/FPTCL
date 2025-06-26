import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyDeceasedEstateComponent } from './notify-deceased-estate.component';

describe('NotifyDeceasedEstateComponent', () => {
  let component: NotifyDeceasedEstateComponent;
  let fixture: ComponentFixture<NotifyDeceasedEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifyDeceasedEstateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotifyDeceasedEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
