import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEspecieComponent } from './crear-especie.component';

describe('CrearEspecieComponent', () => {
  let component: CrearEspecieComponent;
  let fixture: ComponentFixture<CrearEspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearEspecieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
