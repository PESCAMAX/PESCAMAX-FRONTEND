import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaTemperaturaComponent } from './grafica-temperatura.component';

describe('GraficaTemperaturaComponent', () => {
  let component: GraficaTemperaturaComponent;
  let fixture: ComponentFixture<GraficaTemperaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficaTemperaturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficaTemperaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
