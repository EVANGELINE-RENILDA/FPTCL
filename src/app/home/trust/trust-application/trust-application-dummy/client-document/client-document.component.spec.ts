import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDocumentComponent } from './client-document.component';

describe('ClientDocumentComponent', () => {
  let component: ClientDocumentComponent;
  let fixture: ComponentFixture<ClientDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
