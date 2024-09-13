import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonConfirmarComponent } from './button-confirmar.component';

describe('ButtonConfirmarComponent', () => {
  let component: ButtonConfirmarComponent;
  let fixture: ComponentFixture<ButtonConfirmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonConfirmarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
