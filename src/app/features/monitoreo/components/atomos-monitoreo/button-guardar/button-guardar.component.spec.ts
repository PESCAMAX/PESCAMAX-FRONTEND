import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGuardarComponent } from './button-guardar.component';

describe('ButtonGuardarComponent', () => {
  let component: ButtonGuardarComponent;
  let fixture: ComponentFixture<ButtonGuardarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonGuardarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonGuardarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
