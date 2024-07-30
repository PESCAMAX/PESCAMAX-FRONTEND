import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasTemperaturaComponent } from './graficas-temperatura.component';

describe('GraficasTemperaturaComponent', () => {
  let component: GraficasTemperaturaComponent;
  let fixture: ComponentFixture<GraficasTemperaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficasTemperaturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficasTemperaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
