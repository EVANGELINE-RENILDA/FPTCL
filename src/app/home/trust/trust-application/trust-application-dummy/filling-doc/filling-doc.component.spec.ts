import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingDocComponent } from './filling-doc.component';

describe('FillingDocComponent', () => {
  let component: FillingDocComponent;
  let fixture: ComponentFixture<FillingDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillingDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FillingDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
