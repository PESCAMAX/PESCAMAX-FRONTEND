import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMasrecientesComponent } from './button-masrecientes.component';

describe('ButtonMasrecientesComponent', () => {
  let component: ButtonMasrecientesComponent;
  let fixture: ComponentFixture<ButtonMasrecientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonMasrecientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonMasrecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
