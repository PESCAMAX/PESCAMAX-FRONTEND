import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechasMensajesComponent } from './fechas-mensajes.component';

describe('FechasMensajesComponent', () => {
  let component: FechasMensajesComponent;
  let fixture: ComponentFixture<FechasMensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FechasMensajesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FechasMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
