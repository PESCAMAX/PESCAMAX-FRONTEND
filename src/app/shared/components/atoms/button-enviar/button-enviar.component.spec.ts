import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonEnviarComponent } from './button-enviar.component';

describe('ButtonEnviarComponent', () => {
  let component: ButtonEnviarComponent;
  let fixture: ComponentFixture<ButtonEnviarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonEnviarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonEnviarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
