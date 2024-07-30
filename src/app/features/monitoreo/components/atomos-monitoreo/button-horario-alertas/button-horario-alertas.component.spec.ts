import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonHorarioAlertasComponent } from './button-horario-alertas.component';

describe('ButtonHorarioAlertasComponent', () => {
  let component: ButtonHorarioAlertasComponent;
  let fixture: ComponentFixture<ButtonHorarioAlertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonHorarioAlertasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonHorarioAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
