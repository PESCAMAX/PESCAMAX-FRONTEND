import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasRecientesComponent } from './alertas-recientes.component';

describe('AlertasRecientesComponent', () => {
  let component: AlertasRecientesComponent;
  let fixture: ComponentFixture<AlertasRecientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertasRecientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertasRecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
