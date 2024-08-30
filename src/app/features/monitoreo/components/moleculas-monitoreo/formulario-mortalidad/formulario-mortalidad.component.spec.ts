import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMortalidadComponent } from './formulario-mortalidad.component';

describe('FormularioMortalidadComponent', () => {
  let component: FormularioMortalidadComponent;
  let fixture: ComponentFixture<FormularioMortalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioMortalidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioMortalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
