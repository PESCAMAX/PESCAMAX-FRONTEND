// src/app/shared/components/molecules/tabla-seleccionar/tabla-seleccionar.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TablaSeleccionarComponent } from './tabla-seleccionar.component';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

describe('TablaSeleccionarComponent', () => {
  let component: TablaSeleccionarComponent;
  let fixture: ComponentFixture<TablaSeleccionarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaSeleccionarComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [ApiService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaSeleccionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
