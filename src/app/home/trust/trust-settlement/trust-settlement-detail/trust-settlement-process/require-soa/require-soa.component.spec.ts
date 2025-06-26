import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireSoaComponent } from './require-soa.component';

describe('RequireSoaComponent', () => {
  let component: RequireSoaComponent;
  let fixture: ComponentFixture<RequireSoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequireSoaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequireSoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
