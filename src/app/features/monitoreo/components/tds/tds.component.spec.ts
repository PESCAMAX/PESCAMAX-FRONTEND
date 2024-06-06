import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../../shared/shared.module'; // Asegúrate de que la ruta sea correcta
import { TdsComponent } from './tds.component';

describe('TdsComponent', () => {
  let component: TdsComponent;
  let fixture: ComponentFixture<TdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule], // Importa SharedModule aquí
      declarations: [TdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

