import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDeAlertasComponent } from './historial-de-alertas.component';

describe('HistorialDeAlertasComponent', () => {
  let component: HistorialDeAlertasComponent;
  let fixture: ComponentFixture<HistorialDeAlertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialDeAlertasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialDeAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
