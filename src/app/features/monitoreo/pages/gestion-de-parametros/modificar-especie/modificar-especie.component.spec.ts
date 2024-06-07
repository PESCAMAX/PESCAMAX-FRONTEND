import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEspecieComponent } from './modificar-especie.component';

describe('ModificarEspecieComponent', () => {
  let component: ModificarEspecieComponent;
  let fixture: ComponentFixture<ModificarEspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarEspecieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
