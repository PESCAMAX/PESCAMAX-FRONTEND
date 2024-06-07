import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionarEspecieComponent } from './seleccionar-especie.component';
import { SharedModule } from '../../../../../shared/shared.module'; // Asegúrate de que la ruta es correcta

describe('SeleccionarEspecieComponent', () => {
  let component: SeleccionarEspecieComponent;
  let fixture: ComponentFixture<SeleccionarEspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [SeleccionarEspecieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
